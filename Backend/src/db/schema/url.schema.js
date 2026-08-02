import {
  pgTable,
  uuid,
  varchar,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

import { users } from "./users.js";

export const urls = pgTable("urls", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),

  originalUrl: varchar("original_url", {
    length: 2048,
  }).notNull(),

  shortCode: varchar("short_code", {
    length: 20,
  }).notNull().unique(),

  clicks: integer("clicks")
    .default(0)
    .notNull(),

  expiresAt: timestamp("expires_at"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});