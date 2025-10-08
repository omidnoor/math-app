'use client';

import { useMemo, useState } from 'react';
import type { HingeItem } from '@/types';
import { safeTranslate } from '@/lib/content/i18n';
import { TranslatableText } from './TranslatableText';

interface HingeQuestionProps {
  item: HingeItem;
}

export function HingeQuestion({ item }: HingeQuestionProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const feedback = useMemo(() => {
    if (selected === null) return null;
    return (
      safeTranslate(item.rationaleKeys[selected], 'en') ??
      safeTranslate(item.rationaleKeys[0], 'en')
    );
  }, [item.rationaleKeys, selected]);

  return (
    <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <TranslatableText
          tKey={item.stemKey}
          className="text-lg font-semibold text-slate-900"
          as="p"
        />
      </div>

      <div className="space-y-3">
        {item.options.map((optionKey, idx) => {
          const isSelected = selected === idx;
          const isCorrect = idx === item.answerIndex;

          return (
            <button
              key={optionKey}
              type="button"
              onClick={() => {
                setSelected(idx);
                setRevealed(true);
              }}
              className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
                  : 'border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-white'
              }`}
            >
              <TranslatableText tKey={optionKey} />
              {revealed && isSelected && (
                <span
                  className={`ml-2 text-sm font-semibold ${
                    isCorrect ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {isCorrect ? 'Correct' : 'Try again'}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {revealed && selected !== null && feedback && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          {feedback}
        </div>
      )}
    </div>
  );
}
