export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="flex flex-col justify-between">
      <h1 className="text-2xl font-bold">Contacts</h1>
      <div className="pt-4"></div>
    </div>
  );
}
