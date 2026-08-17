import { env } from "cloudflare:workers";
import { DEFAULT_CONTENT, type SiteContent } from "./site-content";

type D1Result<T> = { results?: T[] };
type PreparedStatement = {
  bind: (...values: unknown[]) => PreparedStatement;
  first: <T>() => Promise<T | null>;
  run: () => Promise<unknown>;
  all: <T>() => Promise<D1Result<T>>;
};
type D1Like = {
  prepare: (query: string) => PreparedStatement;
  batch: (statements: PreparedStatement[]) => Promise<unknown>;
};
type R2Like = {
  put: (key: string, value: ArrayBuffer, options: { httpMetadata: { contentType: string } }) => Promise<unknown>;
  get: (key: string) => Promise<{ body: ReadableStream; httpMetadata?: { contentType?: string }; size?: number } | null>;
  delete: (key: string) => Promise<unknown>;
};

type AppEnv = { DB?: D1Like; MEDIA?: R2Like };

function bindings(): AppEnv {
  return env as unknown as AppEnv;
}

function cloneDefaults(): SiteContent {
  return JSON.parse(JSON.stringify(DEFAULT_CONTENT)) as SiteContent;
}

async function ensureSchema(db: D1Like) {
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS site_content (
      id INTEGER PRIMARY KEY,
      content_json TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS media_assets (
      id TEXT PRIMARY KEY,
      object_key TEXT NOT NULL UNIQUE,
      filename TEXT NOT NULL,
      content_type TEXT NOT NULL,
      size INTEGER NOT NULL,
      alt_en TEXT NOT NULL DEFAULT '',
      alt_ar TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL
    )`),
    db.prepare(`CREATE INDEX IF NOT EXISTS idx_media_assets_created_at
      ON media_assets(created_at)`),
  ]);
}

export async function readSiteContent(): Promise<SiteContent> {
  const db = bindings().DB;
  if (!db) return cloneDefaults();

  await ensureSchema(db);
  const row = await db
    .prepare("SELECT content_json FROM site_content WHERE id = 1")
    .first<{ content_json: string }>();

  if (!row) {
    const content = cloneDefaults();
    await db
      .prepare("INSERT INTO site_content (id, content_json, updated_at) VALUES (1, ?, ?)")
      .bind(JSON.stringify(content), new Date().toISOString())
      .run();
    return content;
  }

  try {
    return JSON.parse(row.content_json) as SiteContent;
  } catch {
    return cloneDefaults();
  }
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  const db = bindings().DB;
  if (!db) throw new Error("Persistent storage is unavailable.");
  await ensureSchema(db);
  await db
    .prepare(`INSERT INTO site_content (id, content_json, updated_at)
      VALUES (1, ?, ?)
      ON CONFLICT(id) DO UPDATE SET content_json = excluded.content_json, updated_at = excluded.updated_at`)
    .bind(JSON.stringify(content), new Date().toISOString())
    .run();
}

export type MediaAsset = {
  id: string;
  objectKey: string;
  filename: string;
  contentType: string;
  size: number;
  altEn: string;
  altAr: string;
  createdAt: string;
  url: string;
};

export async function listMedia(): Promise<MediaAsset[]> {
  const db = bindings().DB;
  if (!db) return [];
  await ensureSchema(db);
  const result = await db.prepare(`SELECT id, object_key, filename, content_type, size,
    alt_en, alt_ar, created_at FROM media_assets ORDER BY created_at DESC`).all<{
    id: string;
    object_key: string;
    filename: string;
    content_type: string;
    size: number;
    alt_en: string;
    alt_ar: string;
    created_at: string;
  }>();
  return (result.results ?? []).map((row) => ({
    id: row.id,
    objectKey: row.object_key,
    filename: row.filename,
    contentType: row.content_type,
    size: row.size,
    altEn: row.alt_en,
    altAr: row.alt_ar,
    createdAt: row.created_at,
    url: `/media/${encodeURIComponent(row.id)}`,
  }));
}

export async function storeMedia(file: File, altEn: string, altAr: string): Promise<MediaAsset> {
  const { DB: db, MEDIA: media } = bindings();
  if (!db || !media) throw new Error("Media storage is unavailable.");
  await ensureSchema(db);

  const id = crypto.randomUUID();
  const extension = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const objectKey = `uploads/${id}.${extension}`;
  const createdAt = new Date().toISOString();
  await media.put(objectKey, await file.arrayBuffer(), { httpMetadata: { contentType: file.type } });
  await db
    .prepare(`INSERT INTO media_assets
      (id, object_key, filename, content_type, size, alt_en, alt_ar, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(id, objectKey, file.name, file.type, file.size, altEn, altAr, createdAt)
    .run();

  return { id, objectKey, filename: file.name, contentType: file.type, size: file.size, altEn, altAr, createdAt, url: `/media/${encodeURIComponent(id)}` };
}

export async function getMediaObject(key: string) {
  const media = bindings().MEDIA;
  if (!media) return null;
  return media.get(key);
}

export async function getMediaById(id: string) {
  const db = bindings().DB;
  if (!db) return null;
  await ensureSchema(db);
  const row = await db
    .prepare("SELECT object_key, content_type FROM media_assets WHERE id = ?")
    .bind(id)
    .first<{ object_key: string; content_type: string }>();
  if (!row) return null;
  const object = await getMediaObject(row.object_key);
  return object ? { object, contentType: row.content_type } : null;
}
