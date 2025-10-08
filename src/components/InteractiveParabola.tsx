'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import type { D3DragEvent } from 'd3';

type ParabolaParams = { a: number; h: number; k: number };

interface InteractiveParabolaProps {
  initialA?: number;
  initialH?: number;
  initialK?: number;
  lockedParams?: Array<'a' | 'h' | 'k'>;
  width?: number;
  height?: number;
  showEquation?: boolean;
  showVertex?: boolean;
  showAxis?: boolean;
  showGrid?: boolean;
  onParamsChange?: (params: ParabolaParams) => void;
  controlledParams?: ParabolaParams;
}

export default function InteractiveParabola({
  initialA = 1,
  initialH = 0,
  initialK = 0,
  lockedParams = [],
  width = 640,
  height = 420,
  showEquation = true,
  showVertex = true,
  showAxis = true,
  showGrid = true,
  onParamsChange,
  controlledParams,
}: InteractiveParabolaProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [internalParams, setInternalParams] = useState<ParabolaParams>({
    a: initialA,
    h: initialH,
    k: initialK,
  });

  const params = controlledParams ?? internalParams;
  const { a, h, k } = params;

  const lockedSet = useMemo(() => new Set(lockedParams), [lockedParams]);

  const updateParams = useCallback(
    (next: ParabolaParams) => {
      if (!controlledParams) {
        setInternalParams(next);
      }
      onParamsChange?.(next);
    },
    [controlledParams, onParamsChange],
  );

  useEffect(() => {
    if (!svgRef.current) return;

    const margin = { top: 32, right: 24, bottom: 48, left: 48 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('role', 'img')
      .attr('aria-label', 'Interactive parabola graph');

    svg.selectAll('*').remove();

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleLinear().domain([-8, 8]).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([-8, 8]).range([innerHeight, 0]);

    if (showGrid) {
      const gridValues = d3.range(-8, 9);
      g.append('g')
        .selectAll('line.vertical')
        .data(gridValues)
        .join('line')
        .attr('x1', (value) => xScale(value))
        .attr('x2', (value) => xScale(value))
        .attr('y1', 0)
        .attr('y2', innerHeight)
        .attr('stroke', (value) => (value === 0 ? '#1f2937' : '#e2e8f0'))
        .attr('stroke-width', (value) => (value === 0 ? 1.6 : 0.6))
        .attr('opacity', (value) => (value === 0 ? 0.6 : 0.3));

      g.append('g')
        .selectAll('line.horizontal')
        .data(gridValues)
        .join('line')
        .attr('y1', (value) => yScale(value))
        .attr('y2', (value) => yScale(value))
        .attr('x1', 0)
        .attr('x2', innerWidth)
        .attr('stroke', (value) => (value === 0 ? '#1f2937' : '#e2e8f0'))
        .attr('stroke-width', (value) => (value === 0 ? 1.6 : 0.6))
        .attr('opacity', (value) => (value === 0 ? 0.6 : 0.3));
    }

    const axisBottom = d3.axisBottom(xScale).ticks(8);
    const axisLeft = d3.axisLeft(yScale).ticks(8);

    g.append('g')
      .attr('transform', `translate(0,${yScale(0)})`)
      .call(axisBottom)
      .selectAll('text')
      .attr('font-size', 12);

    g.append('g')
      .attr('transform', `translate(${xScale(0)},0)`)
      .call(axisLeft)
      .selectAll('text')
      .attr('font-size', 12);

    const parabolaPoints = d3.range(-8, 8.05, 0.05).map((xValue) => ({
      x: xValue,
      y: a * (xValue - h) * (xValue - h) + k,
    }));

    const lineGenerator = d3
      .line<{ x: number; y: number }>()
      .x((point) => xScale(point.x))
      .y((point) => yScale(point.y));

    g.append('path')
      .datum(parabolaPoints)
      .attr('d', lineGenerator)
      .attr('fill', 'none')
      .attr('stroke', a >= 0 ? '#2563eb' : '#f97316')
      .attr('stroke-width', 3);

    if (showAxis) {
      g.append('line')
        .attr('x1', xScale(h))
        .attr('x2', xScale(h))
        .attr('y1', 0)
        .attr('y2', innerHeight)
        .attr('stroke', '#10b981')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '6 4')
        .attr('opacity', 0.7);

      g.append('text')
        .attr('x', xScale(h) + 8)
        .attr('y', 18)
        .attr('fill', '#047857')
        .attr('font-size', 12)
        .attr('font-weight', '600')
        .text(`x = ${h.toFixed(1)}`);
    }

    if (showVertex) {
      const canDragH = !lockedSet.has('h');
      const canDragK = !lockedSet.has('k');

      const vertexGroup = g.append('g').attr('class', 'vertex-group');

      const vertex = vertexGroup
        .append('circle')
        .attr('cx', xScale(h))
        .attr('cy', yScale(k))
        .attr('r', 9)
        .attr('fill', '#ef4444')
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 2)
        .style('cursor', canDragH || canDragK ? 'grab' : 'default');

      vertexGroup
        .append('text')
        .attr('x', xScale(h) + 12)
        .attr('y', yScale(k) - 12)
        .attr('fill', '#1e293b')
        .attr('font-size', 12)
        .attr('font-weight', '600')
        .text(`(${h.toFixed(1)}, ${k.toFixed(1)})`);

      if (canDragH || canDragK) {
        const dragBehavior = d3
          .drag<SVGCircleElement, unknown>()
          .on('drag', (event: D3DragEvent<SVGCircleElement, unknown, unknown>) => {
            const next: ParabolaParams = { a, h, k };

            if (canDragH) {
              const newH = Math.round(xScale.invert(event.x) * 2) / 2;
              next.h = clamp(newH, -7, 7);
            }

            if (canDragK) {
              const newK = Math.round(yScale.invert(event.y) * 2) / 2;
              next.k = clamp(newK, -7, 7);
            }

            updateParams(next);
          });

        vertex.call(dragBehavior);
      }
    }
  }, [
    a,
    h,
    k,
    height,
    lockedSet,
    showAxis,
    showGrid,
    showVertex,
    width,
    updateParams,
  ]);

  useEffect(() => {
    if (controlledParams) {
      setInternalParams(controlledParams);
    }
  }, [controlledParams]);

  return (
    <div className="flex flex-col items-center gap-4">
      <svg
        ref={svgRef}
        className="w-full max-w-3xl rounded-xl border border-slate-200 bg-white shadow-md"
      />

      {showEquation && (
        <div className="w-full max-w-2xl rounded-xl border border-indigo-100 bg-indigo-50 px-5 py-4 text-center shadow-sm">
          <p className="text-sm font-medium text-indigo-700">Current Equation</p>
          <p className="mt-2 font-mono text-xl font-semibold text-slate-900">
            y = {formatCoefficient(a)}(x {formatSigned(-h)})² {formatSigned(k)}
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
            <InfoCard label="a" value={a} helper={a > 0 ? 'Opens up' : 'Opens down'} />
            <InfoCard label="h" value={h} helper="Horizontal shift" />
            <InfoCard label="k" value={k} helper="Vertical shift" />
          </div>
        </div>
      )}
    </div>
  );
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function formatSigned(value: number): string {
  if (value === 0) return '+ 0';
  const sign = value >= 0 ? '+ ' : '- ';
  return `${sign}${Math.abs(value).toFixed(1)}`;
}

function formatCoefficient(value: number): string {
  if (value === 1) return '';
  if (value === -1) return '-';
  return value.toFixed(1);
}

function InfoCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: number;
  helper: string;
}) {
  return (
    <div className="rounded-lg bg-white p-3 shadow-inner">
      <div className="font-semibold text-slate-700">
        {label} = {value.toFixed(1)}
      </div>
      <div className="text-xs text-slate-500">{helper}</div>
    </div>
  );
}
