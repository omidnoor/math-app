'use client';

import type { GraphType } from '@/types';
import { TranslatableText } from './TranslatableText';

interface GraphPlaceholderProps {
  type: GraphType;
}

const TYPE_TO_KEY: Record<GraphType, string> = {
  parabola: 'placeholder.graph.generic',
  projectile: 'placeholder.graph.projectile',
  revenue: 'placeholder.graph.revenue',
  inequality: 'placeholder.graph.inequality',
  fencing: 'placeholder.graph.fencing',
};

export function GraphPlaceholder({ type }: GraphPlaceholderProps) {
  const key = TYPE_TO_KEY[type] ?? 'placeholder.graph.generic';

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700 shadow-inner">
      <TranslatableText tKey={key} />
    </div>
  );
}
