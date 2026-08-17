import { env } from "cloudflare:workers";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export const OWNER_EMAIL = "saim.goodm@gmail.com";
export const ADMIN_COOKIE = "khalid_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

type AuthEnv = {
  ADMIN_EMAIL?: string;
  ADMIN_PASSWORD?: string;
};

export type OwnerUser = {
  userId: string;
  displayName: string;
  email: string;
  fullName: string;
};

function authEnv(): AuthEnv {
  return env as unknown as AuthEnv;
}

function configuredEmail(): string {
  return (authEnv().ADMIN_EMAIL || OWNER_EMAIL).trim().toLowerCase();
}

function owner(email = configuredEmail()): OwnerUser {
  return {
    userId: "portfolio-owner",
    displayName: "Khalid",
    email,
    fullName: "Khalid Mohamad",
  };
}

async function isLocalPreview(): Promise<boolean> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "";
  return host.startsWith("localhost:") || host.startsWith("127.0.0.1:");
}

function bytes(value: string): Uint8Array {
  return new TextEncoder().encode(value);
}

function base64Url(value: Uint8Array): string {
  let binary = "";
  for (const byte of value) binary += String.fromCharCode(byte);
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

async function signature(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    bytes(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return base64Url(
    new Uint8Array(await crypto.subtle.sign("HMAC", key, bytes(payload))),
  );
}

function safeEqual(left: string, right: string): boolean {
  const max = Math.max(left.length, right.length);
  let mismatch = left.length ^ right.length;
  for (let index = 0; index < max; index += 1)
    mismatch |= (left.charCodeAt(index) || 0) ^ (right.charCodeAt(index) || 0);
  return mismatch === 0;
}

export async function verifyAdminCredentials(
  email: string,
  password: string,
): Promise<boolean> {
  const expectedPassword = authEnv().ADMIN_PASSWORD;
  if (!expectedPassword || expectedPassword.length < 12) return false;
  const emailMatches = safeEqual(email.trim().toLowerCase(), configuredEmail());
  const suppliedHash = await signature("admin-password", password);
  const expectedHash = await signature("admin-password", expectedPassword);
  return emailMatches && safeEqual(suppliedHash, expectedHash);
}

export async function createAdminSession(): Promise<{
  token: string;
  expires: Date;
}> {
  const secret = authEnv().ADMIN_PASSWORD;
  if (!secret) throw new Error("ADMIN_PASSWORD is not configured.");
  const expires = new Date(Date.now() + SESSION_DURATION_SECONDS * 1000);
  const emailToken = base64Url(bytes(configuredEmail()));
  const payload = `${emailToken}.${Math.floor(expires.getTime() / 1000)}`;
  return { token: `${payload}.${await signature(payload, secret)}`, expires };
}

async function verifySession(token: string | undefined): Promise<boolean> {
  const secret = authEnv().ADMIN_PASSWORD;
  if (!secret || !token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [emailToken, expiresText, suppliedSignature] = parts;
  const expires = Number(expiresText);
  if (!Number.isFinite(expires) || expires <= Date.now() / 1000) return false;
  if (!safeEqual(emailToken, base64Url(bytes(configuredEmail())))) return false;
  const expectedSignature = await signature(
    `${emailToken}.${expiresText}`,
    secret,
  );
  return safeEqual(suppliedSignature, expectedSignature);
}

export function safeReturnPath(value: string | null | undefined): string {
  if (!value?.startsWith("/") || value.startsWith("//")) return "/admin";
  try {
    const url = new URL(value, "https://portfolio.local");
    if (url.origin !== "https://portfolio.local") return "/admin";
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "/admin";
  }
}

export async function getOwner(): Promise<OwnerUser | null> {
  if (await isLocalPreview()) return owner();
  const session = (await cookies()).get(ADMIN_COOKIE)?.value;
  return (await verifySession(session)) ? owner() : null;
}

export async function requireOwner(returnTo: string): Promise<OwnerUser> {
  const currentOwner = await getOwner();
  if (currentOwner) return currentOwner;
  redirect(`/admin/login?returnTo=${encodeURIComponent(safeReturnPath(returnTo))}`);
}
