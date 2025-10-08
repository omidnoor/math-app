import type { Lesson, LessonId } from '@/types';

export const lessons: Record<LessonId, Lesson> = {
  l1: {
    id: 'l1',
    titleKey: 'l1.title',
    introKey: 'l1.intro',
    goals: ['l1.goal1', 'l1.goal2', 'l1.goal3'],
    steps: [
      {
        id: 'engage-vertex-play',
        titleKey: 'l1.step1.title',
        bodyKey: 'l1.step1.body',
        graph: {
          type: 'parabola',
          params: { a: 1, h: 0, k: 2 },
          draggable: true,
          lockedParams: [],
        },
      },
      {
        id: 'explore-parameter-a',
        titleKey: 'l1.step2.title',
        bodyKey: 'l1.step2.body',
        graph: {
          type: 'parabola',
          params: { a: 1, h: 2, k: 3 },
          sliders: [
            { param: 'a', min: -3, max: 3, step: 0.5, label: 'Stretch (a)' },
          ],
          lockedParams: ['h', 'k'],
        },
      },
      {
        id: 'explain-feature-summary',
        titleKey: 'l1.step3.title',
        bodyKey: 'l1.step3.body',
        interactive: {
          type: 'graphAlgebraSync',
          config: {
            prompts: ['vertex', 'axis', 'range'],
          },
        },
      },
    ],
    hingeQuestions: [
      {
        stemKey: 'l1.hinge1.prompt',
        options: [
          'l1.hinge1.a',
          'l1.hinge1.b',
          'l1.hinge1.c',
          'l1.hinge1.d',
        ],
        answerIndex: 1,
        rationaleKeys: [
          'l1.hinge1.rationale.distractorA',
          'l1.hinge1.rationale.correct',
          'l1.hinge1.rationale.distractorC',
          'l1.hinge1.rationale.distractorD',
        ],
      },
    ],
  },
  l2: {
    id: 'l2',
    titleKey: 'l2.title',
    introKey: 'l2.intro',
    goals: [],
    steps: [],
    hingeQuestions: [],
  },
  l3: {
    id: 'l3',
    titleKey: 'l3.title',
    introKey: 'l3.intro',
    goals: [],
    steps: [],
    hingeQuestions: [],
  },
  l4: {
    id: 'l4',
    titleKey: 'l4.title',
    introKey: 'l4.intro',
    goals: [],
    steps: [],
    hingeQuestions: [],
  },
  l5: {
    id: 'l5',
    titleKey: 'l5.title',
    introKey: 'l5.intro',
    goals: [],
    steps: [],
    hingeQuestions: [],
  },
  l6: {
    id: 'l6',
    titleKey: 'l6.title',
    introKey: 'l6.intro',
    goals: [],
    steps: [],
    hingeQuestions: [],
  },
  l7: {
    id: 'l7',
    titleKey: 'l7.title',
    introKey: 'l7.intro',
    goals: [],
    steps: [],
    hingeQuestions: [],
  },
  l8: {
    id: 'l8',
    titleKey: 'l8.title',
    introKey: 'l8.intro',
    goals: [],
    steps: [],
    hingeQuestions: [],
  },
  l9: {
    id: 'l9',
    titleKey: 'l9.title',
    introKey: 'l9.intro',
    goals: [],
    steps: [],
    hingeQuestions: [],
  },
};

export const lessonOrder: LessonId[] = [
  'l1',
  'l2',
  'l3',
  'l4',
  'l5',
  'l6',
  'l7',
  'l8',
  'l9',
];

export function getLessonById(id: LessonId): Lesson | undefined {
  return lessons[id];
}
