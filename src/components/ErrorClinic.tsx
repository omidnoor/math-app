'use client';

import { useEffect, useMemo, useState } from 'react';

interface ErrorOption {
  id?: string;
  label: string;
  correct: boolean;
  explanation: string;
}

interface ErrorCase {
  id?: string;
  work: string;
  fix?: string;
  options: ErrorOption[];
}

interface NormalizedErrorOption {
  id: string;
  label: string;
  correct: boolean;
  explanation: string;
}

interface NormalizedErrorCase {
  id: string;
  work: string;
  fix?: string;
  options: NormalizedErrorOption[];
}

interface ErrorClinicProps {
  cases: ErrorCase[];
}

export function ErrorClinic({ cases }: ErrorClinicProps) {
  const normalizedCases = useMemo<NormalizedErrorCase[]>(
    () =>
      cases.map((item, index) => ({
        id: item.id ?? `case-${index}`,
        work: item.work,
        fix: item.fix,
        options: item.options.map((option, optionIndex) => ({
          id: option.id ?? `option-${optionIndex}`,
          label: option.label,
          correct: option.correct,
          explanation: option.explanation,
        })),
      })),
    [cases],
  );

  const [selection, setSelection] = useState<Record<string, string | null>>(
    () => Object.fromEntries(normalizedCases.map((item) => [item.id, null])),
  );

  useEffect(() => {
    setSelection(Object.fromEntries(normalizedCases.map((item) => [item.id, null])));
  }, [normalizedCases]);

  if (!normalizedCases.length) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-rose-200 bg-white p-6 shadow-inner">
      <h3 className="text-lg font-semibold text-rose-900">Error clinic</h3>
      <p className="mt-1 text-sm text-rose-700">
        Analyze the work, choose the actual mistake, and explain the fix.
      </p>

      <div className="mt-6 space-y-6">
        {normalizedCases.map((item) => {
          const selectedId = selection[item.id];
          const selectedOption = item.options.find(
            (option) => option.id === selectedId,
          );
          const isCorrect = selectedOption?.correct ?? false;
          const hasSelection = selectedId !== null;

          return (
            <div
              key={item.id}
              className="rounded-2xl border border-rose-100 bg-rose-50 p-5 shadow-sm"
            >
              <p className="font-medium text-rose-900">Student work</p>
              <pre className="mt-2 overflow-x-auto whitespace-pre-wrap rounded-xl bg-white px-4 py-3 font-mono text-sm text-rose-900 shadow-inner">
{item.work}
              </pre>

              <div className="mt-4 space-y-3">
                {item.options.map((option) => {
                  const selected = option.id === selectedId;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() =>
                        setSelection((prev) => ({
                          ...prev,
                          [item.id]: option.id,
                        }))
                      }
                      className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                        selected
                          ? 'border-rose-500 bg-white text-rose-900 shadow'
                          : 'border-rose-200 bg-white/70 text-rose-800 hover:border-rose-400 hover:bg-white'
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>

              {hasSelection && (
                <div
                  className={`mt-4 rounded-lg border px-4 py-3 text-sm ${
                    isCorrect
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                      : 'border-rose-200 bg-rose-50 text-rose-800'
                  }`}
                >
                  {optionFeedback(isCorrect)}
                  <div className="mt-2 text-xs text-rose-700">
                    {selectedOption?.explanation}
                  </div>
                </div>
              )}

              {hasSelection && isCorrect && item.fix && (
                <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3">
                  <p className="text-sm font-semibold text-emerald-800">One correct revision</p>
                  <pre className="mt-2 whitespace-pre-wrap rounded bg-white px-3 py-2 font-mono text-sm text-emerald-900 shadow-inner">{item.fix}</pre>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function optionFeedback(isCorrect: boolean) {
  return isCorrect ? 'You spotted the issue.' : 'Check again - compare each step carefully.';
}
