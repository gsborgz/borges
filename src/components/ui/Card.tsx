import { concatClassNames } from '@lib/utils';

export default function Card({ children, className, onClick, onMouseEnter, onMouseLeave }: { children: React.ReactNode, className?: string, onClick?: () => void, onMouseEnter?: () => void, onMouseLeave?: () => void }) {
  return (
    <div onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={concatClassNames('cursor-default border border-slate-400 dark:bg-slate-950 bg-slate-50 shadow-md rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 hover:-translate-y-1', className)}>
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
