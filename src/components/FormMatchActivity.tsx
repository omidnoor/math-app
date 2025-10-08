'use client';

import { useEffect, useMemo, useState } from 'react';

type FormOption = 'standard' | 'vertex' | 'intercept';

interface ScenarioConfig {
  id?: string;
  prompt: string;
  correct: FormOption;
  rationale: string;
}

interface NormalizedScenarioConfig {
  id: string;
  prompt: string;
  correct: FormOption;
  rationale: string;
}

interface FormMatchActivityProps {
  scenarios: ScenarioConfig[];
}

const FORM_LABELS: Record<FormOption, string> = {
  standard: 'Standard form (ax^2 + bx + c)',
  vertex: 'Vertex form a(x - h)^2 + k',
  intercept: 'Intercept form a(x - r1)(x - r2)',
};

const FORM_TIPS: Array<{ option: FormOption; helper: string }> = [
  {
    option: 'standard',
    helper: 'Coefficients stay visible, so combining equations or finding the y-intercept is straightforward.',
  },
  {
    option: 'vertex',
    helper: 'The vertex (h, k) is explicit, revealing the maximum or minimum value and where it occurs.',
  },
  {
    option: 'intercept',
    helper: 'Zeros are factored, so x-intercepts and break-even points pop out immediately.',
  },
];

export function FormMatchActivity({ scenarios }: FormMatchActivityProps) {
  const normalizedScenarios = useMemo<NormalizedScenarioConfig[]>(
    () =>
      scenarios.map((scenario, index) => ({
        id: scenario.id ?? `scenario-${index}`,
        prompt: scenario.prompt,
        correct: scenario.correct,
        rationale: scenario.rationale,
      })),
    [scenarios],
  );

  const [selections, setSelections] = useState<Record<string, FormOption | null>>(
    () =>
      Object.fromEntries(
        normalizedScenarios.map((scenario) => [scenario.id, null]),
      ),
  );

  useEffect(() => {
    setSelections(
      Object.fromEntries(
        normalizedScenarios.map((scenario) => [scenario.id, null]),
      ),
    );
  }, [normalizedScenarios]);

  if (!normalizedScenarios.length) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-indigo-200 bg-white p-6 shadow-inner">
      <h3 className="text-lg font-semibold text-indigo-900">
        Match each scenario to a quadratic form
      </h3>
      <p className="mt-1 text-sm text-indigo-700">
        Pick the form that makes the requested feature easiest to read.
      </p>

      <div className="mt-4 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 text-sm text-indigo-800">
        <p className="font-semibold text-indigo-900">Remember what each form highlights:</p>
        <ul className="mt-2 space-y-1">
          {FORM_TIPS.map((tip) => (
            <li key={`tip-${tip.option}`}>
              <span className="font-semibold">{FORM_LABELS[tip.option]}:</span> {tip.helper}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 space-y-6">
        {normalizedScenarios.map((scenario) => {
          const selection = selections[scenario.id];
          const isCorrect = selection === scenario.correct;
          const hasSelection = selection !== null;

          return (
            <div
              key={scenario.id}
              className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5 shadow-sm"
            >
              <p className="font-medium text-indigo-900">{scenario.prompt}</p>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {(Object.keys(FORM_LABELS) as FormOption[]).map((option) => {
                  const selected = selection === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        setSelections((prev) => ({
                          ...prev,
                          [scenario.id]: option,
                        }))
                      }
                      className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                        selected
                          ? 'border-indigo-500 bg-white text-indigo-900 shadow'
                          : 'border-indigo-200 bg-white/70 text-indigo-800 hover:border-indigo-400 hover:bg-white'
                      }`}
                    >
                      {FORM_LABELS[option]}
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
                  {isCorrect
                    ? 'Nice! That form spotlights the requested feature.'
                    : 'Not quite. Think about which form makes that feature pop.'}
                  <div className="mt-2 text-xs text-indigo-700">
                    {scenario.rationale}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
