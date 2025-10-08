'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';

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

const DOMAIN_MIN = -8;
const DOMAIN_MAX = 8;
const DOMAIN_SIZE = DOMAIN_MAX - DOMAIN_MIN;
const PARAM_BOUNDS = { min: -7, max: 7 };

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
  const [internalParams, setInternalParams] = useState<ParabolaParams>({
    a: initialA,
    h: initialH,
    k: initialK,
  });
  const [activePointer, setActivePointer] = useState<number | null>(null);

  const params = controlledParams ?? internalParams;
  const { a, h, k } = params;

  const svgRef = useRef<SVGSVGElement | null>(null);
  const vertexRef = useRef<SVGCircleElement | null>(null);

  const lockedSet = useMemo(() => new Set(lockedParams), [lockedParams]);
  const ticks = useMemo(() => {
    const values: number[] = [];
    for (let value = DOMAIN_MIN; value <= DOMAIN_MAX; value += 1) {
      values.push(value);
    }
    return values;
  }, []);

  const margin = { top: 32, right: 24, bottom: 48, left: 48 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const toSvgX = useCallback(
    (value: number) => ((value - DOMAIN_MIN) / DOMAIN_SIZE) * innerWidth,
    [innerWidth],
  );
  const toSvgY = useCallback(
    (value: number) => innerHeight - ((value - DOMAIN_MIN) / DOMAIN_SIZE) * innerHeight,
    [innerHeight],
  );
  const fromSvgX = useCallback(
    (pixel: number) => DOMAIN_MIN + (pixel / innerWidth) * DOMAIN_SIZE,
    [innerWidth],
  );
  const fromSvgY = useCallback(
    (pixel: number) =>
      DOMAIN_MIN + ((innerHeight - pixel) / innerHeight) * DOMAIN_SIZE,
    [innerHeight],
  );

  const points = useMemo(() => {
    const data: Array<{ x: number; y: number }> = [];
    for (let xValue = DOMAIN_MIN; xValue <= DOMAIN_MAX; xValue += 0.1) {
      data.push({ x: xValue, y: a * (xValue - h) ** 2 + k });
    }
    return data;
  }, [a, h, k]);

  const pathData = useMemo(() => buildPathData(points, toSvgX, toSvgY), [points, toSvgX, toSvgY]);

  const updateParams = useCallback(
    (next: ParabolaParams) => {
      if (!controlledParams) {
        setInternalParams(next);
      }
      onParamsChange?.(next);
    },
    [controlledParams, onParamsChange],
  );

  const applyDragPosition = useCallback(
    (xPixel: number, yPixel: number) => {
      const canDragH = !lockedSet.has('h');
      const canDragK = !lockedSet.has('k');
      if (!canDragH && !canDragK) return;

      const clampedX = clamp(xPixel, 0, innerWidth);
      const clampedY = clamp(yPixel, 0, innerHeight);

      const next: ParabolaParams = { a, h, k };

      if (canDragH) {
        const newH = clamp(roundToHalf(fromSvgX(clampedX)), PARAM_BOUNDS.min, PARAM_BOUNDS.max);
        next.h = newH;
      }

      if (canDragK) {
        const newK = clamp(roundToHalf(fromSvgY(clampedY)), PARAM_BOUNDS.min, PARAM_BOUNDS.max);
        next.k = newK;
      }

      updateParams(next);
    },
    [a, h, k, fromSvgX, fromSvgY, innerHeight, innerWidth, lockedSet, updateParams],
  );

  const startDrag = useCallback(
    (event: ReactPointerEvent<SVGCircleElement>) => {
      if (!showVertex) return;
      if (lockedSet.has('h') && lockedSet.has('k')) return;
      event.preventDefault();
      setActivePointer(event.pointerId);
      vertexRef.current = event.currentTarget;
      event.currentTarget.setPointerCapture(event.pointerId);
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left - margin.left;
        const y = event.clientY - rect.top - margin.top;
        applyDragPosition(x, y);
      }
    },
    [applyDragPosition, lockedSet, margin.left, margin.top, showVertex],
  );

  useEffect(() => {
    if (activePointer === null) return;

    const handleMove = (event: PointerEvent) => {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left - margin.left;
      const y = event.clientY - rect.top - margin.top;
      applyDragPosition(x, y);
    };

    const handleEnd = (event: PointerEvent) => {
      if (event.pointerId !== activePointer) return;
      if (vertexRef.current?.hasPointerCapture(event.pointerId)) {
        vertexRef.current.releasePointerCapture(event.pointerId);
      }
      setActivePointer(null);
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleEnd);
    window.addEventListener('pointercancel', handleEnd);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleEnd);
      window.removeEventListener('pointercancel', handleEnd);
    };
  }, [activePointer, applyDragPosition, margin.left, margin.top]);

  return (
    <div className="flex flex-col items-center gap-4">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        role="img"
        aria-label="Interactive parabola graph"
        className="w-full max-w-3xl select-none rounded-xl border border-slate-200 bg-white shadow-md"
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {showGrid &&
            ticks.map((tick) => (
              <g key={`grid-${tick}`}>
                <line
                  x1={toSvgX(tick)}
                  x2={toSvgX(tick)}
                  y1={0}
                  y2={innerHeight}
                  stroke={tick === 0 ? '#1e293b' : '#e2e8f0'}
                  strokeWidth={tick === 0 ? 1.6 : 0.8}
                  opacity={tick === 0 ? 0.6 : 0.3}
                />
                <line
                  x1={0}
                  x2={innerWidth}
                  y1={toSvgY(tick)}
                  y2={toSvgY(tick)}
                  stroke={tick === 0 ? '#1e293b' : '#e2e8f0'}
                  strokeWidth={tick === 0 ? 1.6 : 0.8}
                  opacity={tick === 0 ? 0.6 : 0.3}
                />
              </g>
            ))}

          {showAxis && (
            <>
              <line
                x1={toSvgX(h)}
                x2={toSvgX(h)}
                y1={0}
                y2={innerHeight}
                stroke="#10b981"
                strokeWidth={2}
                strokeDasharray="6 4"
                opacity={0.75}
              />
              <text x={toSvgX(h) + 8} y={16} fill="#047857" fontSize={12} fontWeight={600}>
                x = {h.toFixed(1)}
              </text>
            </>
          )}

          <path
            d={pathData}
            fill="none"
            stroke={a >= 0 ? '#2563eb' : '#f97316'}
            strokeWidth={3}
          />

          <line
            x1={0}
            x2={innerWidth}
            y1={toSvgY(0)}
            y2={toSvgY(0)}
            stroke="#1e293b"
            strokeWidth={1.2}
          />
          <line
            x1={toSvgX(0)}
            x2={toSvgX(0)}
            y1={0}
            y2={innerHeight}
            stroke="#1e293b"
            strokeWidth={1.2}
          />

          {ticks.map((tick) => (
            <text
              key={`tick-x-${tick}`}
              x={toSvgX(tick)}
              y={toSvgY(0) + 20}
              fontSize={12}
              textAnchor="middle"
              fill="#1e293b"
            >
              {tick}
            </text>
          ))}
          {ticks.map((tick) => (
            <text
              key={`tick-y-${tick}`}
              x={toSvgX(0) - 10}
              y={toSvgY(tick) + 4}
              fontSize={12}
              textAnchor="end"
              fill="#1e293b"
            >
              {tick}
            </text>
          ))}

          {showVertex && (
            <g>
              <circle
                ref={vertexRef}
                cx={toSvgX(h)}
                cy={toSvgY(k)}
                r={10}
                fill="#ef4444"
                stroke="#ffffff"
                strokeWidth={3}
                onPointerDown={startDrag}
                style={{
                  cursor: !lockedSet.has('h') || !lockedSet.has('k') ? 'grab' : 'default',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.25))',
                }}
              />
              <text
                x={toSvgX(h) + 14}
                y={toSvgY(k) - 14}
                fill="#1e293b"
                fontSize={12}
                fontWeight={600}
              >
                ({h.toFixed(1)}, {k.toFixed(1)})
              </text>
            </g>
          )}
        </g>
      </svg>

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

function buildPathData(
  points: Array<{ x: number; y: number }>,
  toX: (value: number) => number,
  toY: (value: number) => number,
) {
  if (points.length === 0) return '';
  let path = `M ${toX(points[0].x)} ${toY(points[0].y)}`;
  for (let index = 1; index < points.length; index += 1) {
    const point = points[index];
    path += ` L ${toX(point.x)} ${toY(point.y)}`;
  }
  return path;
}

function roundToHalf(value: number) {
  return Math.round(value * 2) / 2;
}

function clamp(value: number, min: number, max: number) {
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
