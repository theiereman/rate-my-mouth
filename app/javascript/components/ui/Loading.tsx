export default function Loading({ text = "Chargement..." }: { text?: string }) {
  return (
    <div className="text-center py-8">
      <span className="material-symbols-outlined animate-spin text-primary-600 text-4xl">
        progress_activity
      </span>
      <p className="mt-2 text-neutral-600">{text}</p>
    </div>
  );
}
