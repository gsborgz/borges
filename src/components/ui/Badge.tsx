export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-slate-700 bg-slate-200 rounded-full">
      {children}
    </span>
  );
}
