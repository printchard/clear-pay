import bcrypt from "bcrypt";
import { db } from "./db";
import { contacts, debts, users } from "./schema";

const userId = crypto.randomUUID();
const contactId = crypto.randomUUID();

async function seedUsers() {
  await db
    .insert(users)
    .values([
      {
        id: userId,
        name: "John Doe",
        email: "john.doe@mail.com",
        password: "password",
      },
      {
        id: crypto.randomUUID(),
        name: "Ricardo",
        email: "ricardo@mail.com",
        password: bcrypt.hashSync("password", 10),
      },
    ])
    .execute();
}

async function seedContacts() {
  await db
    .insert(contacts)
    .values([
      {
        firstName: "John",
        lastName: "Doe",
        userId,
      },
      {
        firstName: "Jane",
        lastName: "Doe",
        userId,
        id: contactId,
      },
    ])
    .execute();
}

async function seedDebts() {
  await db.insert(debts).values([
    {
      amount: 100,
      contactId,
      status: "pending",
    },
    {
      amount: 200,
      contactId,
      status: "paid",
    },
  ]);
}

export async function seed() {
  await Promise.all([seedUsers(), seedContacts(), seedDebts()]);
}
