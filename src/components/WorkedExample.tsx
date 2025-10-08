'use client';

import { MathBlock } from './Math';

interface StepLine { math: string; hint?: string }

interface WorkedExampleProps {
  title: string;
  intro?: string;
  steps: StepLine[];
}

export function WorkedExample({ title, intro, steps }: WorkedExampleProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      {intro && <p className="mt-1 text-sm text-slate-600">{intro}</p>}
      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto]">
        <div>
          {steps.map((s, idx) => (
            <div key={idx} className="mb-3">
              <MathBlock latex={s.math} />
            </div>
          ))}
        </div>
        <div className="hidden md:block border-l border-slate-200 pl-4 text-sm text-emerald-700">
          <p className="font-semibold">Strategy</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Isolate x-terms; complete the square.</li>
            <li>Write the perfect square and take square roots (±).</li>
            <li>Solve the two branches and simplify.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
