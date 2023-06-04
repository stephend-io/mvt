// import { sql } from "@vercel/postgres";
// import { drizzle } from "drizzle-orm/vercel-postgres";
// import {
//   date,
//   integer,
//   pgTable,
//   serial,
//   text,
//   varchar,
// } from "drizzle-orm/pg-core";

// export const musicVideos = pgTable("musicVideos", {
//   id: integer("id").primaryKey(),
//   title: varchar("title").notNull(),
//   artist: varchar("artist").notNull(),
//   createdAt: date("createdAt").defaultNow(),
//   updatedAt: date("updatedAt").defaultNow(),
// });

// export const musicChannels = pgTable("musicChannels", {
//   id: integer("id").primaryKey(),
//   title: varchar("title").notNull(),
//   artist: varchar("artist").notNull(),
//   createdAt: date("createdAt").defaultNow(),
//   updatedAt: date("updatedAt").defaultNow(),
// });

// export const ytVideos = pgTable("ytVideos", {
//   id: integer("id").primaryKey(),
//   title: varchar("title").notNull(),
//   artist: varchar("artist").notNull(),
//   createdAt: date("createdAt").defaultNow(),
//   updatedAt: date("updatedAt").defaultNow(),
// });

// export const ytChannels = pgTable("ytChannels", {
//   id: integer("id").primaryKey(),
//   title: varchar("title").notNull(),
//   artist: varchar("artist").notNull(),
//   createdAt: date("createdAt").defaultNow(),
//   updatedAt: date("updatedAt").defaultNow(),
// });

// export const tVchannels = pgTable("tVchannels", {
//   id: integer("id").primaryKey(),
//   title: varchar("title").notNull(),
//   artist: varchar("artist").notNull(),
//   createdAt: date("createdAt").defaultNow(),
//   updatedAt: date("updatedAt").defaultNow(),
// });

// export const ytPlaylists = pgTable("ytPlaylists", {
//   id: integer("id").primaryKey(),
//   title: varchar("title").notNull(),
//   artist: varchar("artist").notNull(),
//   createdAt: date("createdAt").defaultNow(),
//   updatedAt: date("updatedAt").defaultNow(),
// });

// export const User = pgTable("User", {
//   id: integer("id").primaryKey(),
//   title: varchar("title").notNull(),
//   artist: varchar("artist").notNull(),
//   createdAt: date("createdAt").defaultNow(),
//   updatedAt: date("updatedAt").defaultNow(),
// });

// const db = drizzle(sql);

// function testDrizzle() {}

// testDrizzle();
