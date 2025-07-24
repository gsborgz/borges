import { concatClassNames } from '@lib/utils';

export default function Card({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={concatClassNames('border border-slate-400 dark:bg-slate-950 bg-slate-50 shadow-md rounded-lg p-8', className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <h2 className={concatClassNames('text-lg font-bold mb-4 text-primary', className)}>
      {children}
    </h2>
  );
}

export function CardText({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={concatClassNames('text-primary', className)}>
      {children}
    </div>
  );
}
