export default function ErrorMessage({ error }: { error?: string }) {
  if (!error) return null;

  return <span className="text-sm text-red-500">{error}</span>;
}
