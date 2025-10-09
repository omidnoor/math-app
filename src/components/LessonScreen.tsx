'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { GraphSpec, Lesson } from '@/types';
import { TranslatableText } from './TranslatableText';
import InteractiveParabola from './InteractiveParabola';
import { HingeQuestion } from './HingeQuestion';
import { safeTranslate, loadLessonTranslations } from '@/lib/content/i18n';
import { lessonOrder, lessons } from '@/data/lessons';
import { StepRevealer } from './StepRevealer';
import { DecisionTree } from './DecisionTree';
import { IntervalTester } from './IntervalTester';
import { GraphPlaceholder } from './GraphPlaceholder';
import { GraphPromptResponder } from './GraphPromptResponder';
import { FormMatchActivity } from './FormMatchActivity';
import { MethodPractice } from './MethodPractice';
import { ErrorClinic } from './ErrorClinic';

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
  useEffect(() => { loadLessonTranslations(lesson.id); }, [lesson.id]);
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

  const previousLessonId = useMemo(() => {
    const index = lessonOrder.indexOf(lesson.id);
    if (index === -1 || index === 0) {
      return null;
    }
    return lessonOrder[index - 1];
  }, [lesson.id]);

  const nextLessonId = useMemo(() => {
    const index = lessonOrder.indexOf(lesson.id);
    if (index === -1 || index === lessonOrder.length - 1) {
      return null;
    }
    return lessonOrder[index + 1];
  }, [lesson.id]);

  const previousLesson = previousLessonId ? lessons[previousLessonId] : undefined;
  const nextLesson = nextLessonId ? lessons[nextLessonId] : undefined;

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
                  {graphConfig.type === 'parabola' ? (
                    <>
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
                              <TranslatableText tKey={slider.label} className="mb-2" />
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
                    </>
                  ) : (
                    <GraphPlaceholder type={graphConfig.type} />
                  )}
                </div>
              )}

              {step.interactive?.type === 'graphAlgebraSync' && (
                <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
                  <TranslatableText
                    tKey="lesson.graphSync.helper"
                    as="p"
                    className="font-semibold"
                  />
                  <ul className="mt-3 space-y-2">
                    {Array.isArray(step.interactive.config.prompts) &&
                      (step.interactive.config.prompts as string[]).map((promptKey) => (
                        <li key={promptKey} className="flex items-center gap-2">
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-200 text-xs font-semibold text-amber-900">
                            âœ”
                          </span>
                          <span className="font-medium text-amber-900">
                            {safeTranslate(promptKey)}
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
              {step.interactive?.type === 'graphPromptResponder' && (
                <div className="mt-6">
                  <GraphPromptResponder
                    prompts={
                      Array.isArray(step.interactive.config.prompts)
                        ? (step.interactive.config.prompts as Array<{
                            id?: string;
                            prompt: string;
                            sampleKey?: string;
                          }>)
                        : []
                    }
                  />
                </div>
              )}
              {step.interactive?.type === 'formMatch' && (
                <div className="mt-6">
                  <FormMatchActivity
                    scenarios={
                      Array.isArray(step.interactive.config.scenarios)
                        ? (step.interactive.config.scenarios as Array<{
                            id?: string;
                            prompt: string;
                            correct: 'standard' | 'vertex' | 'intercept';
                            rationale: string;
                          }>)
                        : []
                    }
                  />
                </div>
              )}
              {step.interactive?.type === 'methodPractice' && (
                <div className="mt-6">
                  <MethodPractice
                    problems={
                      Array.isArray(step.interactive.config.problems)
                        ? (step.interactive.config.problems as Array<{
                            id?: string;
                            prompt: string;
                            answer:
                              | 'squareRoot'
                              | 'factoring'
                              | 'completingSquare'
                              | 'quadraticFormula';
                            explanation: string;
                            steps: string[];
                          }>)
                        : []
                    }
                  />
                </div>
              )}
              {step.interactive?.type === 'errorClinic' && (
                <div className="mt-6">
                  <ErrorClinic
                    cases={
                      Array.isArray(step.interactive.config.cases)
                        ? (step.interactive.config.cases as Array<{
                            id?: string;
                            work: string;
                            options: Array<{
                              id?: string;
                              label: string;
                              correct: boolean;
                              explanation: string;
                            }>;
                          }>)
                        : []
                    }
                  />
                </div>
              )}
              {step.interactive?.type === 'stepRevealer' && (
                <div className="mt-6">
                  <StepRevealer
                    steps={(step.interactive.config.steps as string[]) ?? []}
                  />
                </div>
              )}
              {step.interactive?.type === 'decisionTree' && (
                <div className="mt-6">
                  <DecisionTree
                    rootPrompt={(step.interactive.config.rootPrompt as string) ?? ''}
                    branches={(step.interactive.config.branches as string[]) ?? []}
                  />
                </div>
              )}
              {step.interactive?.type === 'intervalTester' && (
                <div className="mt-6">
                  <IntervalTester
                    prompts={(step.interactive.config.prompts as string[]) ?? []}
                  />
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

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
          <TranslatableText
            tKey="lesson.summary.title"
            as="h2"
            className="text-2xl font-semibold text-slate-900"
          />
          <TranslatableText
            tKey="lesson.summary.reflectionPrompt"
            as="p"
            className="mt-2 text-sm text-slate-600"
          />

          {lesson.goals.length > 0 && (
            <div className="mt-6">
              <TranslatableText
                tKey="lesson.summary.successHeadline"
                as="h3"
                className="text-sm font-semibold uppercase tracking-wide text-indigo-500"
              />
              <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-slate-700">
                {lesson.goals.map((goalKey) => (
                  <li key={`summary-${goalKey}`}>
                    <TranslatableText tKey={goalKey} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              {previousLesson && (
                <Link
                  href={`/lesson/${previousLesson.id}`}
                  className="inline-flex items-center justify-center rounded-xl border-2 border-indigo-300 bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow-md transition hover:-translate-y-0.5 hover:border-indigo-400 hover:shadow-lg"
                >
                  ← Previous Lesson
                </Link>
              )}
            </div>

            {nextLesson ? (
              <>
                <div>
                  <TranslatableText
                    tKey="lesson.summary.nextLabel"
                    as="p"
                    className="text-sm font-semibold uppercase tracking-wide text-indigo-500"
                  />
                  <p className="text-lg font-semibold text-indigo-900">
                    {safeTranslate(nextLesson.titleKey)}
                  </p>
                </div>
                <Link
                  href={`/lesson/${nextLesson.id}`}
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-2xl"
                >
                  Next Lesson →
                </Link>
              </>
            ) : (
              <>
                <TranslatableText
                  tKey="lesson.summary.complete"
                  as="p"
                  className="text-lg font-semibold text-emerald-600"
                />
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-emerald-300 bg-white px-6 py-3 text-sm font-semibold text-emerald-700 shadow-md transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-lg"
                >
                  Back to Home
                </Link>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

