import { integer, json, pgTable, text, varchar } from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    credits: integer().default(0)
});

export const WireFrametoCodeTable = pgTable('wireframetocode', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    uid: varchar().notNull(),
    imageUrl: varchar(),
    model: varchar(),
    description: varchar(),
    createdBy: varchar(),
    code: text()
})