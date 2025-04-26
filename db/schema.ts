import { relations } from "drizzle-orm";
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
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const usersRelations = relations(users, ({ many }) => ({
  contacts: many(contacts),
}));

export type User = typeof users.$inferSelect;

export const contacts = pgTable("contacts", {
  id: uuid().primaryKey().defaultRandom(),
  firstName: text().notNull(),
  lastName: text(),
  userId: uuid()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const contactsRelations = relations(contacts, ({ one }) => ({
  user: one(users, {
    fields: [contacts.userId],
    references: [users.id],
  }),
}));

export type Contact = typeof contacts.$inferSelect;

export const statusEnum = pgEnum("status", ["paid", "pending"]);

export type StatusEnum = (typeof statusEnum.enumValues)[number];

export function parseStatusEnum(value: string) {
  if (statusEnum.enumValues.includes(value as StatusEnum)) {
    return value as StatusEnum;
  }
  return undefined;
}

export const transactionTypeEnum = pgEnum("transaction_type", [
  "borrowed",
  "lent",
]);

export const debts = pgTable("debts", {
  id: uuid().primaryKey().defaultRandom(),
  amount: integer().notNull(),
  status: statusEnum().default("pending"),
  contactId: uuid()
    .references(() => contacts.id, { onDelete: "cascade" })
    .notNull(),
  transactionType: transactionTypeEnum().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type Debt = typeof debts.$inferSelect;

export const debtsRelations = relations(debts, ({ one }) => ({
  contact: one(contacts, {
    fields: [debts.contactId],
    references: [contacts.id],
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
  contactId: uuid().references(() => contacts.id, { onDelete: "cascade" }),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type PaymentInfo = typeof paymentInfos.$inferSelect;

export const paymentInfosRelations = relations(paymentInfos, ({ one }) => ({
  contact: one(contacts, {
    fields: [paymentInfos.contactId],
    references: [contacts.id],
  }),
}));
