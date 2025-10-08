import { notFound } from 'next/navigation';
import { getLessonById } from '@/data/lessons';
import type { LessonId } from '@/types';
import { LessonScreen } from '@/components/LessonScreen';

export default function LessonPage({
  params,
}: {
  params: { lessonId: LessonId };
}) {
  const { lessonId } = params;
  const lesson = getLessonById(lessonId);

  if (!lesson || lesson.steps.length === 0) {
    notFound();
  }

  return <LessonScreen lesson={lesson} />;
}
