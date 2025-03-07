import { db } from "@/app/db/db";

export default async function Page() {
  const users = await db.query.contacts.findMany();
  return (
    <div className="flex flex-col pt-10">
      <h1 className="text-2xl font-bold">Contacts</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.firstName}</li>
        ))}
      </ul>
    </div>
  );
}
