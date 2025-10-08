'use client';

import { lessonOrder, lessons } from '@/data/lessons';
import { TranslatableText } from './TranslatableText';
import { safeTranslate } from '@/lib/content/i18n';

const lessonMeta: Record<
  string,
  { duration: string; focus: string; comingSoon?: boolean }
> = {
  l1: {
    duration: '35–45 min',
    focus: 'Vertex form transformations, dragging the vertex, range language.',
  },
  l2: {
    duration: '40–50 min',
    focus: 'Comparing standard, vertex, intercept forms with conversion routines.',
    comingSoon: true,
  },
  l3: {
    duration: '45–55 min',
    focus: 'Tool choice between square root and factoring.',
    comingSoon: true,
  },
  l4: {
    duration: '45–55 min',
    focus: 'Completing the square bridge to the quadratic formula.',
    comingSoon: true,
  },
  l5: {
    duration: '30–40 min',
    focus: 'Discriminant meaning and graph link.',
    comingSoon: true,
  },
  l6: {
    duration: '45–55 min',
    focus: 'Projectile motion modeling and unit analysis.',
    comingSoon: true,
  },
  l7: {
    duration: '45–55 min',
    focus: 'Revenue optimization and fencing constraints.',
    comingSoon: true,
  },
  l8: {
    duration: '40–50 min',
    focus: 'Quadratic inequalities and line-parabola intersections.',
    comingSoon: true,
  },
  l9: {
    duration: '60–75 min',
    focus: 'Data fit synthesis and performance task.',
    comingSoon: true,
  },
};

const downloadableSupports = [
  'Slide skeletons for each lesson (high-contrast, print friendly).',
  'Printable student packets with QR links to interactive graphs.',
  'Analytic rubric with four performance dimensions.',
  'Misconception probes and five-minute reteach mini-lessons.',
];

export function TeacherDashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-white/10 bg-gradient-to-r from-slate-900 via-indigo-900 to-violet-900">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-16">
          <TranslatableText
            tKey="teacher.title"
            as="h1"
            className="text-4xl font-bold"
          />
          <TranslatableText
            tKey="teacher.subtitle"
            as="p"
            className="max-w-3xl text-base text-indigo-100"
          />
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-12">
        <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <TranslatableText
            tKey="teacher.scopeHeadline"
            as="h2"
            className="text-2xl font-semibold text-white"
          />
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="min-w-full divide-y divide-white/10 text-sm">
              <thead className="bg-white/10 text-left text-xs uppercase tracking-wide text-indigo-100">
                <tr>
                  <th className="px-4 py-3">Lesson</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3">Focus</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {lessonOrder.map((lessonId) => {
                  const lesson = lessons[lessonId];
                  const meta = lessonMeta[lessonId];

                  return (
                    <tr key={lessonId} className="bg-white/5 hover:bg-white/10">
                      <td className="px-4 py-4">
                        <div className="font-semibold text-white">
                          {safeTranslate(lesson.titleKey, 'en')}
                        </div>
                        <div className="text-xs text-indigo-200">{lessonId.toUpperCase()}</div>
                      </td>
                      <td className="px-4 py-4 text-indigo-100">{meta.duration}</td>
                      <td className="px-4 py-4 text-indigo-100">{meta.focus}</td>
                      <td className="px-4 py-4 text-center">
                        {meta.comingSoon ? (
                          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-indigo-200">
                            Coming soon
                          </span>
                        ) : (
                          <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-200">
                            Ready
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-amber-200/40 bg-amber-400/10 p-8 text-amber-50 backdrop-blur">
          <TranslatableText
            tKey="teacher.hingeHeadline"
            as="h2"
            className="text-2xl font-semibold"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {lessonOrder
              .map((lessonId) => lessons[lessonId])
              .filter((lesson) => lesson.hingeQuestions.length > 0)
              .map((lesson) => (
                <article
                  key={lesson.id}
                  className="rounded-2xl bg-amber-900/40 p-5 shadow-inner"
                >
                  <h3 className="text-lg font-semibold text-white">
                    {safeTranslate(lesson.titleKey, 'en')}
                  </h3>
                  <ul className="mt-3 space-y-3 text-sm leading-relaxed">
                    {lesson.hingeQuestions.map((hinge) => (
                      <li key={hinge.stemKey}>
                        <span className="font-semibold text-amber-100">
                          {safeTranslate(hinge.stemKey, 'en')}
                        </span>
                        <div className="mt-1 text-amber-200">
                          Correct answer:{' '}
                          {safeTranslate(hinge.options[hinge.answerIndex], 'en')}
                        </div>
                        <div className="mt-1 text-xs text-amber-300">
                          Feedback: {safeTranslate(hinge.rationaleKeys[hinge.answerIndex], 'en')}
                        </div>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-indigo-200/40 bg-indigo-500/10 p-8 text-indigo-50 backdrop-blur">
          <TranslatableText
            tKey="teacher.rubricHeadline"
            as="h2"
            className="text-2xl font-semibold"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {[
              'rubric.concepts.title',
              'rubric.methods.title',
              'rubric.reasoning.title',
              'rubric.communication.title',
            ].map((dimensionKey) => (
              <article key={dimensionKey} className="rounded-2xl bg-white/10 p-5">
                <TranslatableText
                  tKey={dimensionKey}
                  as="h3"
                  className="text-lg font-semibold text-white"
                />
                <ul className="mt-3 space-y-2 text-sm text-indigo-100">
                  {[
                    'rubric.level4',
                    'rubric.level3',
                    'rubric.level2',
                    'rubric.level1',
                  ].map((levelKey) => (
                    <li key={levelKey} className="rounded-xl bg-white/5 p-3">
                      {safeTranslate(levelKey, 'en')}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-4 rounded-3xl border border-slate-200/30 bg-white/10 p-8 text-sm leading-relaxed text-slate-100 backdrop-blur">
          <TranslatableText
            tKey="teacher.resourcesHeadline"
            as="h2"
            className="text-2xl font-semibold text-white"
          />
          <ul className="grid gap-3 sm:grid-cols-2">
            {downloadableSupports.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-semibold text-white">
                  ⬇
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
