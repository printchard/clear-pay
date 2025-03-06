import { relations, sql } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp()
    .defaultNow()
    .$onUpdate(() => sql`current_timestamp`),
});

export const usersRelations = relations(users, ({ many }) => ({
  contacts: many(contacts),
}));

export const statusEnum = pgEnum("status", ["paid", "pending"]);

export const debts = pgTable("debts", {
  id: uuid().primaryKey().defaultRandom(),
  amount: integer().notNull(),
  status: statusEnum().default("pending"),
  contactId: uuid().notNull(),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp()
    .defaultNow()
    .$onUpdate(() => sql`current_timestamp`),
});

export const debtsRelations = relations(debts, ({ one }) => ({
  contact: one(contacts, {
    fields: [debts.contactId],
    references: [contacts.id],
  }),
}));

export const contacts = pgTable("contacts", {
  id: uuid().primaryKey().defaultRandom(),
  firstName: text().notNull(),
  lastName: text(),
  userId: uuid(),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp()
    .defaultNow()
    .$onUpdate(() => sql`current_timestamp`),
});

export const contactsRelations = relations(contacts, ({ one }) => ({
  user: one(users, {
    fields: [contacts.userId],
    references: [users.id],
  }),
}));

export const paymentInfoTypeEnum = pgEnum("payment_info", [
  "clabe",
  "tarjeta",
  "cuenta",
]);

export const paymentInfos = pgTable("payment_infos", {
  id: uuid().primaryKey().defaultRandom(),
  type: paymentInfoTypeEnum().notNull(),
  data: text(),
  contactId: uuid(),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp()
    .defaultNow()
    .$onUpdate(() => sql`current_timestamp`),
});
