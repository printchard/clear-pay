import { seed } from "../db/seed";

export default async function Page() {
  await seed();
  return "database seeded";
}
