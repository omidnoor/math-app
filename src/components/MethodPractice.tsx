'use client';

import { useEffect, useMemo, useState } from 'react';

type MethodChoice =
  | 'squareRoot'
  | 'factoring'
  | 'completingSquare'
  | 'quadraticFormula';

interface MethodProblem {
  id?: string;
  prompt: string;
  answer: MethodChoice;
  explanation: string;
  steps: string[];
}

interface NormalizedMethodProblem {
  id: string;
  prompt: string;
  answer: MethodChoice;
  explanation: string;
  steps: string[];
}

interface MethodPracticeProps {
  problems: MethodProblem[];
}

const METHOD_LABELS: Record<MethodChoice, string> = {
  squareRoot: 'Square-root method',
  factoring: 'Factoring',
  completingSquare: 'Completing the square',
  quadraticFormula: 'Quadratic formula',
};

export function MethodPractice({ problems }: MethodPracticeProps) {
  const normalizedProblems = useMemo<NormalizedMethodProblem[]>(
    () =>
      problems.map((problem, index) => ({
        id: problem.id ?? `problem-${index}`,
        prompt: problem.prompt,
        answer: problem.answer,
        explanation: problem.explanation,
        steps: problem.steps,
      })),
    [problems],
  );

  const [selections, setSelections] = useState<Record<string, MethodChoice | null>>(
    () =>
      Object.fromEntries(normalizedProblems.map((p) => [p.id, null])),
  );
  const [revealed, setRevealed] = useState<Record<string, boolean>>(
    () => Object.fromEntries(normalizedProblems.map((p) => [p.id, false])),
  );

  useEffect(() => {
    setSelections(Object.fromEntries(normalizedProblems.map((p) => [p.id, null])));
    setRevealed(Object.fromEntries(normalizedProblems.map((p) => [p.id, false])));
  }, [normalizedProblems]);

  if (!normalizedProblems.length) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-purple-200 bg-white p-6 shadow-inner">
      <h3 className="text-lg font-semibold text-purple-900">
        Choose the most efficient method
      </h3>
      <p className="mt-1 text-sm text-purple-700">
        Look at the structure before selecting a solving tool.
      </p>

      <div className="mt-6 space-y-6">
        {normalizedProblems.map((problem) => {
          const selection = selections[problem.id];
          const isCorrect = selection === problem.answer;
          const showFeedback = selection !== null;
          const stepsVisible = revealed[problem.id];

          return (
            <div
              key={problem.id}
              className="rounded-2xl border border-purple-100 bg-purple-50 p-5 shadow-sm"
            >
              <p className="font-medium text-purple-900">{problem.prompt}</p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {(Object.keys(METHOD_LABELS) as MethodChoice[]).map((choice) => {
                  const selected = selection === choice;
                  return (
                    <button
                      key={choice}
                      type="button"
                      onClick={() =>
                        setSelections((prev) => ({
                          ...prev,
                          [problem.id]: choice,
                        }))
                      }
                      className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                        selected
                          ? 'border-purple-500 bg-white text-purple-900 shadow'
                          : 'border-purple-200 bg-white/70 text-purple-800 hover:border-purple-400 hover:bg-white'
                      }`}
                    >
                      {METHOD_LABELS[choice]}
                    </button>
                  );
                })}
              </div>

              {showFeedback && (
                <div
                  className={`mt-4 rounded-lg border px-4 py-3 text-sm ${
                    isCorrect
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                      : 'border-rose-200 bg-rose-50 text-rose-800'
                  }`}
                >
                  {isCorrect
                    ? 'Great choice—this fits the structure.'
                    : 'That works, but another method is more direct.'}
                  <div className="mt-2 text-xs text-purple-700">
                    {problem.explanation}
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() =>
                  setRevealed((prev) => ({
                    ...prev,
                    [problem.id]: !prev[problem.id],
                  }))
                }
                className="mt-4 inline-flex items-center rounded-lg border border-purple-300 px-4 py-2 text-sm font-semibold text-purple-700 transition hover:bg-purple-100"
              >
                {stepsVisible ? 'Hide solution steps' : 'Show solution steps'}
              </button>

              {stepsVisible && (
                <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-purple-900">
                  {problem.steps.map((step, index) => (
                    <li key={`${problem.id}-step-${index}`}>{step}</li>
                  ))}
                </ol>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
