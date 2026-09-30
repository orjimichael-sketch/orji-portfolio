/**
 * Signature reference-style section label: a small filled dot followed by
 * the label text. Used at the top of every section and inside the footer.
 */
export default function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`flex items-center gap-2.5 text-[15px] font-medium text-ink ${className}`}>
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ink" />
      {children}
    </p>
  );
}
