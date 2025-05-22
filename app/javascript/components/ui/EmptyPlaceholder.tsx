export default function EmptyPlaceholder({ text }: { text: string }) {
  return (
    <div className="text-center py-4 bg-neutral-50 rounded-lg border border-neutral-100">
      <p className="text-neutral-600 text-sm">{text}</p>
    </div>
  );
}
