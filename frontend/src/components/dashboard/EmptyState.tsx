export default function EmptyState() {
  return (
    <div className="rounded-xl border border-dashed bg-card/60 px-6 py-16 text-center">
      <h2 className="text-xl font-semibold tracking-tight">
        No URLs Found
      </h2>

      <p className="text-muted-foreground mt-2">
        Create your shortened URL.
      </p>
    </div>
  );
}
