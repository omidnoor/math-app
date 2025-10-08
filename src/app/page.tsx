'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { lessonOrder, lessons } from '@/data/lessons';
import { TranslatableText } from '@/components/TranslatableText';
import { safeTranslate } from '@/lib/content/i18n';

const availableLessons = new Set<string>(['l1']);

const lessonMeta = new Map<
  string,
  { duration: string; focus: string; gradient: string }
>([
  [
    'l1',
    {
      duration: '35–45 min',
      focus: 'Drag the vertex, identify the axis of symmetry, reason about range.',
      gradient: 'from-indigo-500 to-purple-500',
    },
  ],
  [
    'l2',
    {
      duration: '40–50 min',
      focus: 'Switch between standard, vertex, and intercept forms.',
      gradient: 'from-purple-500 to-pink-500',
    },
  ],
  [
    'l3',
    {
      duration: '45–55 min',
      focus: 'Choose the solving tool that matches the structure.',
      gradient: 'from-pink-500 to-rose-500',
    },
  ],
  [
    'l4',
    {
      duration: '45–55 min',
      focus: 'Use completing the square to justify the quadratic formula.',
      gradient: 'from-rose-500 to-orange-500',
    },
  ],
  [
    'l5',
    {
      duration: '30–40 min',
      focus: 'Interpret discriminants and connect to graphs.',
      gradient: 'from-orange-500 to-amber-500',
    },
  ],
  [
    'l6',
    {
      duration: '45–55 min',
      focus: 'Model projectile motion with units and constraints.',
      gradient: 'from-amber-500 to-lime-500',
    },
  ],
  [
    'l7',
    {
      duration: '45–55 min',
      focus: 'Optimize revenue and fencing scenarios with constraints.',
      gradient: 'from-lime-500 to-emerald-500',
    },
  ],
  [
    'l8',
    {
      duration: '40–50 min',
      focus: 'Solve quadratic inequalities and intersections via intervals.',
      gradient: 'from-emerald-500 to-cyan-500',
    },
  ],
  [
    'l9',
    {
      duration: '60–75 min',
      focus: 'Fit data with quadratics and complete the performance task.',
      gradient: 'from-cyan-500 to-indigo-500',
    },
  ],
]);

const featureCards = [
  {
    title: 'Start with Real Life',
    description:
      'Launch a projectile, watch a basketball arc, and surface the math once intuition kicks in.',
    icon: (
      <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
        />
      </svg>
    ),
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    title: 'Multiple Representations',
    description:
      'Toggle between algebra, graph, table, and verbal context so every feature connects.',
    icon: (
      <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .843-3 2s1.343 2 3 2 3-.843 3-2-1.343-2-3-2zm0 0V4m0 8v4m-4 4h8"
        />
      </svg>
    ),
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Choose the Right Tool',
    description:
      'Use a decision tree to pick factoring, square root, completing the square, or the quadratic formula with purpose.',
    icon: (
      <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 14l9-5-9-5-9 5 9 5zm0 0v8"
        />
      </svg>
    ),
    gradient: 'from-pink-500 to-red-500',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 h-96 w-96 rounded-full bg-purple-300 opacity-40 blur-3xl"></div>
          <div className="absolute -bottom-36 -left-24 h-96 w-96 rounded-full bg-pink-300 opacity-30 blur-3xl"></div>
          <div className="absolute top-64 left-48 h-96 w-96 rounded-full bg-indigo-300 opacity-30 blur-3xl"></div>
        </div>
        <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-32 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-6xl font-bold text-transparent"
          >
            Master Quadratics
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-2xl font-light text-slate-700"
          >
            <TranslatableText tKey="app.tagline" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-slate-600"
          >
            Interactive lessons help you{' '}
            <span className="font-semibold text-indigo-600">see structure</span>,{' '}
            <span className="font-semibold text-purple-600">model situations</span>, and{' '}
            <span className="font-semibold text-pink-600">reason with confidence</span>.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/lesson/l1"
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl"
            >
              <span className="relative z-10">
                <TranslatableText tKey="nav.startLearning" />
              </span>
              <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-purple-600 to-pink-600 transition group-hover:translate-y-0"></span>
            </Link>
            <Link
              href="/teacher"
              className="rounded-xl border-2 border-indigo-200 bg-white px-8 py-4 text-lg font-semibold text-indigo-600 shadow-lg transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-xl"
            >
              <TranslatableText tKey="nav.teacherResources" />
            </Link>
          </motion.div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center text-4xl font-bold text-slate-900">How You&apos;ll Learn</h2>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {featureCards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div
                className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${card.gradient}`}
              >
                {card.icon}
              </div>
              <h3 className="text-2xl font-semibold text-slate-900">{card.title}</h3>
              <p className="mt-3 text-slate-600">{card.description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-4xl font-bold text-slate-900">Scope & Sequence</h2>
            <p className="mt-3 text-lg text-slate-600">
              Nine short sessions or five extended blocks. Start anywhere and see the learning arc at a glance.
            </p>
          </div>

          <div className="space-y-8">
            {lessonOrder.map((lessonId, index) => {
              const lesson = lessons[lessonId];
              const meta = lessonMeta.get(lessonId);
              const available = availableLessons.has(lessonId);
              const gradient = meta?.gradient ?? 'from-slate-500 to-slate-700';

              return (
                <motion.article
                  key={lessonId}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className={`flex flex-col gap-6 rounded-3xl border border-slate-100 bg-white p-8 shadow-lg transition ${
                    available ? 'hover:-translate-y-1 hover:shadow-2xl' : 'opacity-80'
                  }`}
                >
                  <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start gap-4">
                      <div
                        className={`text-5xl font-bold text-transparent bg-gradient-to-br ${gradient} bg-clip-text`}
                      >
                        {(index + 1).toString().padStart(2, '0')}
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-slate-900">
                          {safeTranslate(lesson.titleKey, 'en')}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-indigo-500">
                          {meta?.duration ?? 'TBD'}
                        </p>
                        <p className="mt-2 text-slate-600">
                          {meta?.focus ?? 'New lesson experience in development.'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-4 py-1 text-sm font-semibold ${
                          available
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {available ? 'Available' : 'Coming soon'}
                      </span>
                      {available && (
                        <Link
                          href={`/lesson/${lessonId}`}
                          className={`inline-flex items-center gap-2 rounded-xl bg-gradient-to-r ${gradient} px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5`}
                        >
                          Start lesson →
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-12 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-lg font-semibold">Built with modern pedagogy principles</p>
          <p className="mt-2 text-sm text-white/80">
            Interactive learning · Immediate feedback · Real-world connections
          </p>
        </div>
      </footer>
    </div>
  );
}
