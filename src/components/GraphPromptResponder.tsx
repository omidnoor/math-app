'use client';

import { useEffect, useMemo, useState } from 'react';
import { safeTranslate } from '@/lib/content/i18n';

interface PromptConfig {
  id: string;
  prompt: string;
  sampleKey?: string;
}

interface GraphPromptResponderProps {
  prompts: PromptConfig[];
}

export function GraphPromptResponder({ prompts }: GraphPromptResponderProps) {
  const normalizedPrompts = useMemo<PromptConfig[]>(
    () =>
      prompts.map((prompt, index) => ({
        id: prompt.id ?? `prompt-${index}`,
        prompt: prompt.prompt,
        sampleKey: prompt.sampleKey,
      })),
    [prompts],
  );

  const [responses, setResponses] = useState<string[]>(
    () => normalizedPrompts.map(() => ''),
  );

  useEffect(() => {
    setResponses(normalizedPrompts.map(() => ''));
  }, [normalizedPrompts]);

  if (!normalizedPrompts.length) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-amber-200 bg-white p-6 shadow-inner">
      <h3 className="text-lg font-semibold text-amber-900">
        Record your observations
      </h3>
      <p className="mt-1 text-sm text-amber-700">
        Use the graph above to respond. You can clear your notes at any time.
      </p>
      <div className="mt-5 space-y-5">
        {normalizedPrompts.map((prompt, index) => (
          <div key={prompt.id} className="space-y-2">
            <p className="font-medium text-amber-900">{prompt.prompt}</p>
            <textarea
              value={responses[index]}
              onChange={(event) => {
                const value = event.target.value;
                setResponses((prev) => {
                  const next = [...prev];
                  next[index] = value;
                  return next;
                });
              }}
              rows={3}
              className="w-full rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900 shadow-inner focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
              placeholder="Type your response here..."
            />
            {prompt.sampleKey && (
              <p className="text-xs text-amber-600">
                Example approach: {safeTranslate(prompt.sampleKey, 'en')}
              </p>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setResponses(normalizedPrompts.map(() => ''))}
        className="mt-6 inline-flex items-center rounded-lg border border-amber-300 px-4 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-100"
      >
        Clear responses
      </button>
    </div>
  );
}
