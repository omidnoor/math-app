'use client';

import { useEffect, useMemo, useState } from 'react';
import type { GraphSpec, Lesson } from '@/types';
import { TranslatableText } from './TranslatableText';
import InteractiveParabola from './InteractiveParabola';
import { HingeQuestion } from './HingeQuestion';
import { safeTranslate } from '@/lib/content/i18n';

interface LessonScreenProps {
  lesson: Lesson;
}

type GraphState = { a: number; h: number; k: number };

function getInitialGraphState(graph?: GraphSpec): GraphState | undefined {
  if (!graph) return undefined;
  return {
    a: Number(graph.params.a ?? 1),
    h: Number(graph.params.h ?? 0),
    k: Number(graph.params.k ?? 0),
  };
}

export function LessonScreen({ lesson }: LessonScreenProps) {
  const initialGraphStates = useMemo(() => {
    const states: Record<string, GraphState> = {};
    lesson.steps.forEach((step) => {
      const state = getInitialGraphState(step.graph);
      if (state) {
        states[step.id] = state;
      }
    });
    return states;
  }, [lesson.steps]);

  const [graphStates, setGraphStates] = useState<Record<string, GraphState>>(initialGraphStates);

  useEffect(() => {
    setGraphStates(initialGraphStates);
  }, [initialGraphStates]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-indigo-50 pb-16">
      <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-16">
          <TranslatableText
            tKey={lesson.titleKey}
            as="h1"
            className="text-4xl font-bold leading-tight"
          />
          <TranslatableText
            tKey={lesson.introKey}
            as="p"
            className="max-w-3xl text-lg text-indigo-100"
          />
          {lesson.goals.length > 0 && (
            <div className="rounded-2xl bg-white/20 p-4 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-wide text-indigo-50">
                Success Criteria
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-base">
                {lesson.goals.map((goalKey) => (
                  <li key={goalKey}>
                    <TranslatableText tKey={goalKey} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto mt-10 flex max-w-5xl flex-col gap-10 px-6">
        {lesson.steps.map((step) => {
          const graphConfig = step.graph;
          const controlledState = graphConfig ? graphStates[step.id] : undefined;
          const hasSliders = Boolean(graphConfig?.sliders?.length);

          return (
            <section
              key={step.id}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg"
            >
              <header className="mb-4 space-y-2">
                <TranslatableText
                  tKey={step.titleKey}
                  as="h2"
                  className="text-2xl font-semibold text-slate-900"
                />
                <TranslatableText
                  tKey={step.bodyKey}
                  as="p"
                  className="text-base text-slate-600"
                />
              </header>

              {graphConfig && (
                <div className="space-y-6">
                  <InteractiveParabola
                    initialA={Number(graphConfig.params.a ?? 1)}
                    initialH={Number(graphConfig.params.h ?? 0)}
                    initialK={Number(graphConfig.params.k ?? 0)}
                    lockedParams={graphConfig.lockedParams}
                    controlledParams={hasSliders ? controlledState : undefined}
                    onParamsChange={
                      hasSliders
                        ? (next) => {
                            setGraphStates((prev) => ({
                              ...prev,
                              [step.id]: next,
                            }));
                          }
                        : undefined
                    }
                  />

                  {hasSliders && controlledState && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {graphConfig.sliders?.map((slider) => (
                        <label
                          key={`${step.id}-${slider.param}`}
                          className="flex flex-col rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-900"
                        >
                          <span className="mb-2">{slider.label}</span>
                          <input
                            type="range"
                            min={slider.min}
                            max={slider.max}
                            step={slider.step}
                            value={controlledState[slider.param]}
                            onChange={(event) => {
                              const value = Number(event.target.value);
                              setGraphStates((prev) => ({
                                ...prev,
                                [step.id]: {
                                  ...prev[step.id],
                                  [slider.param]: value,
                                },
                              }));
                            }}
                            className="accent-indigo-600"
                          />
                          <span className="mt-1 text-xs text-indigo-700">
                            {slider.param} = {controlledState[slider.param].toFixed(1)}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {step.interactive?.type === 'graphAlgebraSync' && (
                <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
                  <p className="font-semibold">
                    Summarize the features you observe in the graph above.
                  </p>
                  <ul className="mt-3 space-y-2">
                    {Array.isArray(step.interactive.config.prompts) &&
                      (step.interactive.config.prompts as string[]).map((prompt) => (
                        <li key={prompt} className="flex items-center gap-2">
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-200 text-xs font-semibold text-amber-900">
                            ✔
                          </span>
                          <span className="font-medium capitalize text-amber-900">
                            {safeTranslate(`prompt.${prompt}`, 'en') ?? prompt}
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </section>
          );
        })}

        {lesson.hingeQuestions.length > 0 && (
          <section className="rounded-3xl border border-indigo-100 bg-indigo-50 p-8 shadow-inner">
            <h2 className="text-2xl font-semibold text-indigo-900">Check for Understanding</h2>
            <p className="mt-2 text-sm text-indigo-700">
              Answer the hinge question to see if the concept clicked.
            </p>
            <div className="mt-6 space-y-6">
              {lesson.hingeQuestions.map((item) => (
                <HingeQuestion key={item.stemKey} item={item} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
