'use client';

import { InlineMath, BlockMath } from 'react-katex';

interface MathInlineProps { latex: string }
interface MathBlockProps { latex: string }

export function MathInline({ latex }: MathInlineProps) {
  return <InlineMath math={latex} />;
}

export function MathBlock({ latex }: MathBlockProps) {
  return <BlockMath math={latex} />;
}
