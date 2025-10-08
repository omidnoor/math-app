'use client';

import { useEffect, useRef, useState } from 'react';
import { safeTranslate } from '@/lib/content/i18n';

interface TranslatableTextProps {
  tKey: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

export function TranslatableText({
  tKey,
  className = '',
  as: Component = 'span',
  children,
}: TranslatableTextProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const content = children ?? safeTranslate(tKey, 'en');
  const translation = safeTranslate(tKey, 'zh');

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!triggerRef.current) return;
      if (triggerRef.current.contains(event.target as Node)) return;
      setOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <Component
      ref={(node) => {
        triggerRef.current = node as HTMLElement | null;
      }}
      className={`relative cursor-help focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 ${className}`}
      data-l10n-key={tKey}
      role="button"
      tabIndex={0}
      onClick={() => setOpen((prev) => !prev)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          setOpen((prev) => !prev);
        }
      }}
      aria-expanded={open}
      aria-describedby={open ? `${tKey}-tooltip` : undefined}
    >
      {content}
      {open && (
        <span
          id={`${tKey}-tooltip`}
          role="tooltip"
          className="absolute left-1/2 top-full z-20 mt-2 min-w-[200px] -translate-x-1/2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-xl"
        >
          {translation}
        </span>
      )}
    </Component>
  );
}
