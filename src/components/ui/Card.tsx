export default function Card({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`border border-slate-400 dark:bg-slate-950 bg-slate-50 shadow-md rounded-lg p-8 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <h2 className={`text-lg font-bold mb-4 ${className}`}>
      {children}
    </h2>
  );
}

export function CardText({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`text-gray-700 dark:text-gray-300 ${className}`}>
      {children}
    </div>
  );
}
