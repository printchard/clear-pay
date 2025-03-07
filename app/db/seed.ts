import { db } from "./db";
import { contacts, users } from "./schema";

export async function seed() {
  const userId = crypto.randomUUID();
  Promise.all([
    db
      .insert(users)
      .values({
        id: userId,
        name: "John Doe",
        email: "john.doe@mail.com",
        password: "password",
      })
      .execute(),
    db
      .insert(contacts)
      .values({
        firstName: "John",
        lastName: "Doe",
        userId,
      })
      .execute(),
  ]);
}
