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
            prompts: ['prompt.vertex', 'prompt.axis', 'prompt.range'],
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
    goals: ['l2.goal1', 'l2.goal2', 'l2.goal3'],
    steps: [
      {
        id: 'compare-forms-gallery',
        titleKey: 'l2.step1.title',
        bodyKey: 'l2.step1.body',
        interactive: {
          type: 'stepRevealer',
          config: {
            steps: [
              'sequence.standardForm',
              'sequence.vertexForm',
              'sequence.interceptForm',
            ],
          },
        },
      },
      {
        id: 'convert-to-vertex',
        titleKey: 'l2.step2.title',
        bodyKey: 'l2.step2.body',
        interactive: {
          type: 'graphAlgebraSync',
          config: {
            prompts: ['prompt.completeSquare', 'prompt.vertexRead', 'prompt.featureExplain'],
          },
        },
      },
      {
        id: 'feature-flash',
        titleKey: 'l2.step3.title',
        bodyKey: 'l2.step3.body',
        interactive: {
          type: 'stepRevealer',
          config: {
            steps: [
              'sequence.yIntercept',
              'sequence.axisConnect',
              'sequence.factoredFeatures',
            ],
          },
        },
      },
    ],
    hingeQuestions: [
      {
        stemKey: 'l2.hinge1.prompt',
        options: [
          'l2.hinge1.a',
          'l2.hinge1.b',
          'l2.hinge1.c',
          'l2.hinge1.d',
        ],
        answerIndex: 2,
        rationaleKeys: [
          'l2.hinge1.rationale.distractorA',
          'l2.hinge1.rationale.distractorB',
          'l2.hinge1.rationale.correct',
          'l2.hinge1.rationale.distractorD',
        ],
      },
    ],
  },
  l3: {
    id: 'l3',
    titleKey: 'l3.title',
    introKey: 'l3.intro',
    goals: ['l3.goal1', 'l3.goal2', 'l3.goal3'],
    steps: [
      {
        id: 'decision-tree-launch',
        titleKey: 'l3.step1.title',
        bodyKey: 'l3.step1.body',
        interactive: {
          type: 'decisionTree',
          config: {
            rootPrompt: 'l3.tree.prompt',
            branches: [
              'tree.structure',
              'tree.coefficients',
              'tree.perfectSquare',
            ],
          },
        },
      },
      {
        id: 'strategy-practice',
        titleKey: 'l3.step2.title',
        bodyKey: 'l3.step2.body',
        interactive: {
          type: 'stepRevealer',
          config: {
            steps: [
              'sequence.squareRoot',
              'sequence.factoring',
              'sequence.checkWork',
            ],
          },
        },
      },
      {
        id: 'error-analysis',
        titleKey: 'l3.step3.title',
        bodyKey: 'l3.step3.body',
        interactive: {
          type: 'stepRevealer',
          config: {
            steps: [
              'sequence.diagnose',
              'sequence.fix',
              'sequence.reflect',
            ],
          },
        },
      },
    ],
    hingeQuestions: [
      {
        stemKey: 'l3.hinge1.prompt',
        options: [
          'l3.hinge1.a',
          'l3.hinge1.b',
          'l3.hinge1.c',
          'l3.hinge1.d',
        ],
        answerIndex: 0,
        rationaleKeys: [
          'l3.hinge1.rationale.correct',
          'l3.hinge1.rationale.distractorB',
          'l3.hinge1.rationale.distractorC',
          'l3.hinge1.rationale.distractorD',
        ],
      },
    ],
  },
  l4: {
    id: 'l4',
    titleKey: 'l4.title',
    introKey: 'l4.intro',
    goals: ['l4.goal1', 'l4.goal2', 'l4.goal3'],
    steps: [
      {
        id: 'derive-formula',
        titleKey: 'l4.step1.title',
        bodyKey: 'l4.step1.body',
        interactive: {
          type: 'stepRevealer',
          config: {
            steps: [
              'sequence.completeSquare',
              'sequence.isolate',
              'sequence.takeRoots',
            ],
          },
        },
      },
      {
        id: 'discriminant-meaning',
        titleKey: 'l4.step2.title',
        bodyKey: 'l4.step2.body',
        interactive: {
          type: 'graphAlgebraSync',
          config: {
            prompts: [
              'prompt.discPositive',
              'prompt.discZero',
              'prompt.discNegative',
            ],
          },
        },
      },
      {
        id: 'choose-tool',
        titleKey: 'l4.step3.title',
        bodyKey: 'l4.step3.body',
        interactive: {
          type: 'decisionTree',
          config: {
            rootPrompt: 'l4.tree.prompt',
            branches: [
              'tree.exact',
              'tree.estimate',
              'tree.structureMatch',
            ],
          },
        },
      },
    ],
    hingeQuestions: [
      {
        stemKey: 'l4.hinge1.prompt',
        options: [
          'l4.hinge1.a',
          'l4.hinge1.b',
          'l4.hinge1.c',
          'l4.hinge1.d',
        ],
        answerIndex: 3,
        rationaleKeys: [
          'l4.hinge1.rationale.distractorA',
          'l4.hinge1.rationale.distractorB',
          'l4.hinge1.rationale.distractorC',
          'l4.hinge1.rationale.correct',
        ],
      },
    ],
  },
  l5: {
    id: 'l5',
    titleKey: 'l5.title',
    introKey: 'l5.intro',
    goals: ['l5.goal1', 'l5.goal2', 'l5.goal3'],
    steps: [
      {
        id: 'discriminant-gallery',
        titleKey: 'l5.step1.title',
        bodyKey: 'l5.step1.body',
        interactive: {
          type: 'stepRevealer',
          config: {
            steps: [
              'sequence.twoRoots',
              'sequence.doubleRoot',
              'sequence.noRealRoots',
            ],
          },
        },
      },
      {
        id: 'graph-match',
        titleKey: 'l5.step2.title',
        bodyKey: 'l5.step2.body',
        graph: {
          type: 'parabola',
          params: { a: 1, h: -1, k: 2 },
          lockedParams: [],
          sliders: [
            { param: 'a', min: -3, max: 3, step: 0.5, label: 'slider.aStretch' },
          ],
        },
      },
      {
        id: 'discriminant-explain',
        titleKey: 'l5.step3.title',
        bodyKey: 'l5.step3.body',
        interactive: {
          type: 'graphAlgebraSync',
          config: {
            prompts: [
              'prompt.discInterpret',
              'prompt.linkGraph',
              'prompt.contextMeaning',
            ],
          },
        },
      },
    ],
    hingeQuestions: [
      {
        stemKey: 'l5.hinge1.prompt',
        options: [
          'l5.hinge1.a',
          'l5.hinge1.b',
          'l5.hinge1.c',
          'l5.hinge1.d',
        ],
        answerIndex: 1,
        rationaleKeys: [
          'l5.hinge1.rationale.distractorA',
          'l5.hinge1.rationale.correct',
          'l5.hinge1.rationale.distractorC',
          'l5.hinge1.rationale.distractorD',
        ],
      },
    ],
  },
  l6: {
    id: 'l6',
    titleKey: 'l6.title',
    introKey: 'l6.intro',
    goals: ['l6.goal1', 'l6.goal2', 'l6.goal3'],
    steps: [
      {
        id: 'launch-phenomenon',
        titleKey: 'l6.step1.title',
        bodyKey: 'l6.step1.body',
        graph: {
          type: 'projectile',
          params: { v0: 20, h0: 5, g: 9.8 },
          draggable: true,
        },
      },
      {
        id: 'model-build',
        titleKey: 'l6.step2.title',
        bodyKey: 'l6.step2.body',
        interactive: {
          type: 'graphAlgebraSync',
          config: {
            prompts: [
              'prompt.defineVariables',
              'prompt.writeEquation',
              'prompt.interpretVertex',
            ],
          },
        },
      },
      {
        id: 'optimize-time',
        titleKey: 'l6.step3.title',
        bodyKey: 'l6.step3.body',
        interactive: {
          type: 'stepRevealer',
          config: {
            steps: [
              'sequence.setDerivative',
              'sequence.solve',
              'sequence.checkUnits',
            ],
          },
        },
      },
    ],
    hingeQuestions: [
      {
        stemKey: 'l6.hinge1.prompt',
        options: [
          'l6.hinge1.a',
          'l6.hinge1.b',
          'l6.hinge1.c',
          'l6.hinge1.d',
        ],
        answerIndex: 2,
        rationaleKeys: [
          'l6.hinge1.rationale.distractorA',
          'l6.hinge1.rationale.distractorB',
          'l6.hinge1.rationale.correct',
          'l6.hinge1.rationale.distractorD',
        ],
      },
    ],
  },
  l7: {
    id: 'l7',
    titleKey: 'l7.title',
    introKey: 'l7.intro',
    goals: ['l7.goal1', 'l7.goal2', 'l7.goal3'],
    steps: [
      {
        id: 'revenue-context',
        titleKey: 'l7.step1.title',
        bodyKey: 'l7.step1.body',
        graph: {
          type: 'revenue',
          params: { a: -1, b: 40, c: 0 },
          draggable: false,
        },
      },
      {
        id: 'fencing-setup',
        titleKey: 'l7.step2.title',
        bodyKey: 'l7.step2.body',
        graph: {
          type: 'fencing',
          params: { perimeter: 60, againstWall: true },
          draggable: false,
        },
      },
      {
        id: 'explain-optimum',
        titleKey: 'l7.step3.title',
        bodyKey: 'l7.step3.body',
        interactive: {
          type: 'graphAlgebraSync',
          config: {
            prompts: [
              'prompt.stateOptimum',
              'prompt.justifyConstraints',
              'prompt.units',
            ],
          },
        },
      },
    ],
    hingeQuestions: [
      {
        stemKey: 'l7.hinge1.prompt',
        options: [
          'l7.hinge1.a',
          'l7.hinge1.b',
          'l7.hinge1.c',
          'l7.hinge1.d',
        ],
        answerIndex: 3,
        rationaleKeys: [
          'l7.hinge1.rationale.distractorA',
          'l7.hinge1.rationale.distractorB',
          'l7.hinge1.rationale.distractorC',
          'l7.hinge1.rationale.correct',
        ],
      },
    ],
  },
  l8: {
    id: 'l8',
    titleKey: 'l8.title',
    introKey: 'l8.intro',
    goals: ['l8.goal1', 'l8.goal2', 'l8.goal3'],
    steps: [
      {
        id: 'number-line-signs',
        titleKey: 'l8.step1.title',
        bodyKey: 'l8.step1.body',
        interactive: {
          type: 'intervalTester',
          config: {
            prompts: [
              'prompt.criticalPoints',
              'prompt.testIntervals',
              'prompt.stateSolution',
            ],
          },
        },
      },
      {
        id: 'graph-vs-symbol',
        titleKey: 'l8.step2.title',
        bodyKey: 'l8.step2.body',
        graph: {
          type: 'inequality',
          params: { a: 1, h: 1, k: -4 },
          draggable: true,
        },
      },
      {
        id: 'system-intersections',
        titleKey: 'l8.step3.title',
        bodyKey: 'l8.step3.body',
        interactive: {
          type: 'graphAlgebraSync',
          config: {
            prompts: [
              'prompt.lineParabola',
              'prompt.explainMultiplicity',
              'prompt.communicateSolution',
            ],
          },
        },
      },
    ],
    hingeQuestions: [
      {
        stemKey: 'l8.hinge1.prompt',
        options: [
          'l8.hinge1.a',
          'l8.hinge1.b',
          'l8.hinge1.c',
          'l8.hinge1.d',
        ],
        answerIndex: 1,
        rationaleKeys: [
          'l8.hinge1.rationale.distractorA',
          'l8.hinge1.rationale.correct',
          'l8.hinge1.rationale.distractorC',
          'l8.hinge1.rationale.distractorD',
        ],
      },
    ],
  },
  l9: {
    id: 'l9',
    titleKey: 'l9.title',
    introKey: 'l9.intro',
    goals: ['l9.goal1', 'l9.goal2', 'l9.goal3'],
    steps: [
      {
        id: 'data-collect',
        titleKey: 'l9.step1.title',
        bodyKey: 'l9.step1.body',
        interactive: {
          type: 'stepRevealer',
          config: {
            steps: [
              'sequence.plotPoints',
              'sequence.guessModel',
              'sequence.checkResiduals',
            ],
          },
        },
      },
      {
        id: 'fit-model',
        titleKey: 'l9.step2.title',
        bodyKey: 'l9.step2.body',
        interactive: {
          type: 'graphAlgebraSync',
          config: {
            prompts: [
              'prompt.writeEquation',
              'prompt.interpretParameters',
              'prompt.assessFit',
            ],
          },
        },
      },
      {
        id: 'performance-brief',
        titleKey: 'l9.step3.title',
        bodyKey: 'l9.step3.body',
        interactive: {
          type: 'stepRevealer',
          config: {
            steps: [
              'sequence.plan',
              'sequence.execute',
              'sequence.reflect',
            ],
          },
        },
      },
    ],
    hingeQuestions: [
      {
        stemKey: 'l9.hinge1.prompt',
        options: [
          'l9.hinge1.a',
          'l9.hinge1.b',
          'l9.hinge1.c',
          'l9.hinge1.d',
        ],
        answerIndex: 0,
        rationaleKeys: [
          'l9.hinge1.rationale.correct',
          'l9.hinge1.rationale.distractorB',
          'l9.hinge1.rationale.distractorC',
          'l9.hinge1.rationale.distractorD',
        ],
      },
    ],
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
