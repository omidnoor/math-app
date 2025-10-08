'use client';

import { TranslatableText } from './TranslatableText';

interface IntervalTesterProps {
  prompts: string[];
}

export function IntervalTester({ prompts }: IntervalTesterProps) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-inner">
      <TranslatableText
        tKey="lesson.intervalTester.title"
        as="h3"
        className="text-lg font-semibold text-amber-900"
      />
      <TranslatableText
        tKey="lesson.intervalTester.helper"
        as="p"
        className="mt-2 text-sm text-amber-800"
      />

      {prompts.length > 0 && (
        <ul className="mt-4 space-y-2 text-sm text-amber-900">
          {prompts.map((promptKey) => (
            <li key={promptKey} className="flex items-start gap-2">
              <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-400 text-xs font-semibold text-white">
                •
              </span>
              <TranslatableText tKey={promptKey} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
