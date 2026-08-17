import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const siteContent = sqliteTable("site_content", {
  id: integer("id").primaryKey(),
  contentJson: text("content_json").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const mediaAssets = sqliteTable(
  "media_assets",
  {
    id: text("id").primaryKey(),
    objectKey: text("object_key").notNull().unique(),
    filename: text("filename").notNull(),
    contentType: text("content_type").notNull(),
    size: integer("size").notNull(),
    altEn: text("alt_en").notNull().default(""),
    altAr: text("alt_ar").notNull().default(""),
    createdAt: text("created_at").notNull(),
  },
  (table) => [index("idx_media_assets_created_at").on(table.createdAt)],
);
