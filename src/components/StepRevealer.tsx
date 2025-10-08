'use client';

import { useState } from 'react';
import { TranslatableText } from './TranslatableText';

interface StepRevealerProps {
  steps: string[];
}

export function StepRevealer({ steps }: StepRevealerProps) {
  const [visibleCount, setVisibleCount] = useState(() => (steps.length > 0 ? 1 : 0));

  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + 1, steps.length));
  };

  const reset = () => {
    setVisibleCount(steps.length > 0 ? 1 : 0);
  };

  if (!steps.length) {
    return null;
  }

  const hasMore = visibleCount < steps.length;

  return (
    <div className="rounded-2xl border border-purple-200 bg-purple-50 p-5 shadow-inner">
      <ul className="space-y-3 text-sm text-purple-900">
        {steps.slice(0, visibleCount).map((stepKey, index) => (
          <li key={stepKey} className="flex items-start gap-3">
            <span className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-purple-600 text-xs font-semibold text-white">
              {index + 1}
            </span>
            <TranslatableText tKey={stepKey} />
          </li>
        ))}
      </ul>

      <div className="mt-4 flex gap-3">
        {hasMore ? (
          <button
            type="button"
            onClick={showMore}
            className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-purple-700"
          >
            Show Next Step →
          </button>
        ) : (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center rounded-lg border border-purple-300 bg-white px-4 py-2 text-sm font-semibold text-purple-700 shadow-sm transition hover:bg-purple-100"
          >
            ↺ Restart
          </button>
        )}
      </div>
    </div>
  );
}
