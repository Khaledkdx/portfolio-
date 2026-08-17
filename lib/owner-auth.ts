import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { chatGPTSignInPath, getChatGPTUser, type ChatGPTUser } from "@/app/chatgpt-auth";

export const OWNER_EMAIL = "saim.goodm@gmail.com";

async function isLocalPreview(): Promise<boolean> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "";
  return host.startsWith("localhost:") || host.startsWith("127.0.0.1:");
}

export async function getOwner(): Promise<ChatGPTUser | null> {
  if (await isLocalPreview()) {
    return {
      userId: "local-owner",
      email: OWNER_EMAIL,
      displayName: "Khalid",
      fullName: "Khalid Mohamad",
    };
  }
  const user = await getChatGPTUser();
  return user?.email.toLowerCase() === OWNER_EMAIL ? user : null;
}

export async function requireOwner(returnTo: string): Promise<ChatGPTUser> {
  if (await isLocalPreview()) return (await getOwner())!;
  const user = await getChatGPTUser();
  if (!user) redirect(chatGPTSignInPath(returnTo));
  if (user.email.toLowerCase() !== OWNER_EMAIL) redirect("/not-authorized");
  return user;
}
