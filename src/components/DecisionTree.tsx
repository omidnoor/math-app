'use client';

import { TranslatableText } from './TranslatableText';

interface DecisionTreeProps {
  rootPrompt: string;
  branches: string[];
}

export function DecisionTree({ rootPrompt, branches }: DecisionTreeProps) {
  if (!branches.length) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 shadow-inner">
      <TranslatableText
        tKey={rootPrompt}
        as="h3"
        className="text-lg font-semibold text-blue-900"
      />
      <TranslatableText
        tKey="lesson.decisionTree.helper"
        as="p"
        className="mt-2 text-sm text-blue-700"
      />
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {branches.map((branchKey) => (
          <div
            key={branchKey}
            className="rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm text-blue-900 shadow-sm"
          >
            <TranslatableText tKey={branchKey} />
          </div>
        ))}
      </div>
    </div>
  );
}
