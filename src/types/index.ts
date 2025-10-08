// Core data structures for the quadratics micro-app

export type LessonId = 'l1' | 'l2' | 'l3' | 'l4' | 'l5' | 'l6' | 'l7' | 'l8' | 'l9';

export type GraphType = 'parabola' | 'projectile' | 'revenue' | 'inequality' | 'fencing';

export interface Lesson {
  id: LessonId;
  titleKey: string;
  introKey: string;
  goals: string[];
  steps: Step[];
  hingeQuestions: HingeItem[];
}

export interface Step {
  id: string;
  titleKey: string;
  bodyKey: string;
  graph?: GraphSpec;
  checks?: HingeItem[];
  interactive?: InteractiveSpec;
}

export interface GraphSpec {
  type: GraphType;
  params: Record<string, number | string>;
  draggable?: boolean;
  sliders?: SliderSpec[];
  lockedParams?: Array<'a' | 'h' | 'k'>;
}

export interface SliderSpec {
  param: 'a' | 'h' | 'k';
  min: number;
  max: number;
  step: number;
  label: string;
}

export interface HingeItem {
  stemKey: string;
  options: string[];
  answerIndex: number;
  rationaleKeys: string[];
}

export interface InteractiveSpec {
  type: 'decisionTree' | 'stepRevealer' | 'intervalTester' | 'graphAlgebraSync';
  config: Record<string, unknown>;
}

export interface TranslationData {
  en: Record<string, string>;
  zh: Record<string, string>;
}

export interface AssessmentRubric {
  concepts: RubricLevel[];
  methods: RubricLevel[];
  reasoning: RubricLevel[];
  communication: RubricLevel[];
}

export interface RubricLevel {
  level: number;
  description: string;
}

export type UserMode = 'student' | 'teacher';

export interface UserProgress {
  lessonId: LessonId;
  stepId: string;
  completed: boolean;
  attempts: number;
  score?: number;
}
