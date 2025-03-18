export default function ErrorMessage({ error }: { error?: string }) {
  if (!error) return null;

  return <span className="text-red-500 text-sm">{error}</span>;
}
