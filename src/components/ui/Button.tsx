import * as React from 'react';
import { concatClassNames } from '@lib/utils';
import Link from 'next/link';

// Interfaces e Tipagens
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'ghost' | 'default';
  size?: 'icon' | 'default';
  primary?: boolean;
  danger?: boolean;
  asChild?: boolean;
  href?: string;
  title?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

function getVariantClasses(variant: ButtonProps['variant'], primary?: boolean, danger?: boolean) {
  const primaryBg = 'bg-slate-950 dark:bg-slate-50 text-primary-reversed';
  const secondaryBg = 'hover:bg-slate-300/30 dark:hover:bg-slate-700/30 text-primary';
  const dangerBg = 'bg-red-500 dark:bg-red-600 text-white';
  const defaultBackground = primary ? primaryBg : (danger ? dangerBg : secondaryBg);
  const variants = {
    ghost: 'hover:bg-slate-300/30 dark:hover:bg-slate-700/30 text-slate-950 dark:text-slate-50',
    default: defaultBackground
  };

  return variants[variant || 'default'];
}

function getSizeClasses(size: ButtonProps['size']) {
  const sizes = {
    icon: 'h-9 w-9 p-2',
    default: 'h-10 px-4 py-2'
  };
  return sizes[size || 'default'];
}

export function Button({ className, variant, href, size, primary, danger, children, title, onClick }: ButtonProps) {
  const baseClasses = 'cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  const variantClasses = getVariantClasses(variant, primary, danger);
  const sizeClasses = getSizeClasses(size);
  const buttonClasses = concatClassNames(
    baseClasses,
    variantClasses,
    sizeClasses,
    className
  );

  if (!!href) {
    return (
      <Link className={buttonClasses} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonClasses} onClick={onClick} title={title}>
      {children}
    </button>
  );
}
