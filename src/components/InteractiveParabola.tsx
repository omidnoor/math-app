'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface InteractiveParabolaProps {
  initialA?: number;
  initialH?: number;
  initialK?: number;
  lockedParams?: ('a' | 'h' | 'k')[];
  width?: number;
  height?: number;
  onParamsChange?: (params: { a: number; h: number; k: number }) => void;
  showEquation?: boolean;
  showVertex?: boolean;
  showAxis?: boolean;
  showGrid?: boolean;
}

export default function InteractiveParabola({
  initialA = 1,
  initialH = 0,
  initialK = 0,
  lockedParams = [],
  width = 700,
  height = 500,
  onParamsChange,
  showEquation = true,
  showVertex = true,
  showAxis = true,
  showGrid = true
}: InteractiveParabolaProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [params, setParams] = useState({ a: initialA, h: initialH, k: initialK });

  const updateParams = (newParams: { a: number; h: number; k: number }) => {
    setParams(newParams);
    onParamsChange?.(newParams);
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const margin = { top: 40, right: 40, bottom: 60, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Clear previous
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'select-none');

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3.scaleLinear()
      .domain([-8, 8])
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([-8, 8])
      .range([innerHeight, 0]);

    // Grid
    if (showGrid) {
      // Vertical grid lines
      g.selectAll('.grid-vertical')
        .data(d3.range(-8, 9, 1))
        .enter()
        .append('line')
        .attr('class', 'grid-vertical')
        .attr('x1', d => xScale(d))
        .attr('y1', 0)
        .attr('x2', d => xScale(d))
        .attr('y2', innerHeight)
        .attr('stroke', '#e5e7eb')
        .attr('stroke-width', d => d === 0 ? 2 : 1)
        .attr('opacity', d => d === 0 ? 0.8 : 0.3);

      // Horizontal grid lines
      g.selectAll('.grid-horizontal')
        .data(d3.range(-8, 9, 1))
        .enter()
        .append('line')
        .attr('class', 'grid-horizontal')
        .attr('x1', 0)
        .attr('y1', d => yScale(d))
        .attr('x2', innerWidth)
        .attr('y2', d => yScale(d))
        .attr('stroke', '#e5e7eb')
        .attr('stroke-width', d => d === 0 ? 2 : 1)
        .attr('opacity', d => d === 0 ? 0.8 : 0.3);
    }

    // Axes
    const xAxis = d3.axisBottom(xScale).ticks(8);
    const yAxis = d3.axisLeft(yScale).ticks(8);

    g.append('g')
      .attr('transform', `translate(0,${yScale(0)})`)
      .call(xAxis)
      .attr('class', 'text-gray-700')
      .selectAll('text')
      .attr('font-size', '12px');

    g.append('g')
      .attr('transform', `translate(${xScale(0)},0)`)
      .call(yAxis)
      .attr('class', 'text-gray-700')
      .selectAll('text')
      .attr('font-size', '12px');

    // Axis labels
    g.append('text')
      .attr('x', innerWidth)
      .attr('y', yScale(0) - 10)
      .attr('text-anchor', 'end')
      .attr('class', 'text-gray-600 text-sm font-semibold')
      .text('x');

    g.append('text')
      .attr('x', xScale(0) + 10)
      .attr('y', 15)
      .attr('class', 'text-gray-600 text-sm font-semibold')
      .text('y');

    // Parabola function: y = a(x - h)² + k
    const parabola = (x: number) => params.a * Math.pow(x - params.h, 2) + params.k;

    // Generate path data
    const xValues = d3.range(-8, 8.1, 0.05);
    const pathData = xValues
      .map(x => ({ x, y: parabola(x) }))
      .filter(d => d.y >= -8 && d.y <= 8);

    // Draw parabola
    const line = d3.line<{ x: number; y: number }>()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .curve(d3.curveBasis);

    const parabolaPath = g.append('path')
      .datum(pathData)
      .attr('fill', 'none')
      .attr('stroke', 'url(#parabola-gradient)')
      .attr('stroke-width', 4)
      .attr('d', line)
      .attr('stroke-linecap', 'round');

    // Gradient for parabola
    const gradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'parabola-gradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0)
      .attr('y1', yScale(8))
      .attr('x2', 0)
      .attr('y2', yScale(-8));

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', params.a > 0 ? '#8b5cf6' : '#ec4899');

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', params.a > 0 ? '#3b82f6' : '#f59e0b');

    // Axis of symmetry
    if (showAxis) {
      g.append('line')
        .attr('x1', xScale(params.h))
        .attr('y1', 0)
        .attr('x2', xScale(params.h))
        .attr('y2', innerHeight)
        .attr('stroke', '#10b981')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '6,4')
        .attr('opacity', 0.6);

      g.append('text')
        .attr('x', xScale(params.h) + 8)
        .attr('y', 20)
        .attr('class', 'text-xs font-semibold fill-green-600')
        .text(`x = ${params.h.toFixed(1)}`);
    }

    // Vertex
    if (showVertex && params.k >= -8 && params.k <= 8) {
      const vertexGroup = g.append('g')
        .attr('class', 'vertex-group');

      const vertex = vertexGroup.append('circle')
        .attr('cx', xScale(params.h))
        .attr('cy', yScale(params.k))
        .attr('r', 10)
        .attr('fill', '#ef4444')
        .attr('stroke', '#fff')
        .attr('stroke-width', 3)
        .attr('class', 'cursor-move shadow-lg')
        .style('filter', 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))');

      // Vertex label
      const labelBg = vertexGroup.append('rect')
        .attr('x', xScale(params.h) + 15)
        .attr('y', yScale(params.k) - 25)
        .attr('width', 90)
        .attr('height', 24)
        .attr('fill', '#1f2937')
        .attr('rx', 6)
        .attr('opacity', 0.9);

      const label = vertexGroup.append('text')
        .attr('x', xScale(params.h) + 60)
        .attr('y', yScale(params.k) - 8)
        .attr('text-anchor', 'middle')
        .attr('class', 'text-xs font-bold fill-white')
        .text(`(${params.h.toFixed(1)}, ${params.k.toFixed(1)})`);

      // Drag behavior
      const canDragH = !lockedParams.includes('h');
      const canDragK = !lockedParams.includes('k');

      if (canDragH || canDragK) {
        const drag = d3.drag<SVGCircleElement, unknown>()
          .on('drag', (event) => {
            let newH = params.h;
            let newK = params.k;

            if (canDragH) {
              newH = Math.round(xScale.invert(event.x) * 2) / 2; // Snap to 0.5
              newH = Math.max(-7, Math.min(7, newH));
            }

            if (canDragK) {
              newK = Math.round(yScale.invert(event.y) * 2) / 2;
              newK = Math.max(-7, Math.min(7, newK));
            }

            updateParams({ ...params, h: newH, k: newK });
          });

        vertex.call(drag as any);
      }
    }

  }, [params, width, height, lockedParams, showVertex, showAxis, showGrid]);

  return (
    <div className="flex flex-col items-center gap-4">
      <svg
        ref={svgRef}
        className="bg-white rounded-xl shadow-lg border-2 border-gray-200"
      />

      {showEquation && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200 w-full max-w-2xl">
          <div className="text-center">
            <div className="text-sm text-gray-600 font-medium mb-2">Current Equation:</div>
            <div className="font-mono text-2xl font-bold text-gray-900">
              y = {params.a !== 1 && params.a !== -1 ? params.a.toFixed(1) : params.a === -1 ? '-' : ''}
              (x {params.h >= 0 ? '- ' : '+ '}{Math.abs(params.h).toFixed(1)})²
              {params.k >= 0 ? ' + ' : ' - '}{Math.abs(params.k).toFixed(1)}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
              <div className={`p-3 rounded-lg ${lockedParams.includes('a') ? 'bg-gray-100' : 'bg-blue-50'}`}>
                <div className="font-semibold text-gray-700">a = {params.a.toFixed(1)}</div>
                <div className="text-xs text-gray-500">
                  {params.a > 0 ? '↑ Opens up' : '↓ Opens down'}
                </div>
              </div>
              <div className={`p-3 rounded-lg ${lockedParams.includes('h') ? 'bg-gray-100' : 'bg-purple-50'}`}>
                <div className="font-semibold text-gray-700">h = {params.h.toFixed(1)}</div>
                <div className="text-xs text-gray-500">↔ Horizontal</div>
              </div>
              <div className={`p-3 rounded-lg ${lockedParams.includes('k') ? 'bg-gray-100' : 'bg-pink-50'}`}>
                <div className="font-semibold text-gray-700">k = {params.k.toFixed(1)}</div>
                <div className="text-xs text-gray-500">↕ Vertical</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!lockedParams.includes('h') && !lockedParams.includes('k') && (
        <div className="text-sm text-gray-600 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          💡 <span className="font-semibold">Drag the red vertex</span> to move the parabola!
        </div>
      )}
    </div>
  );
}
