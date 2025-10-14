"use client";

import { memo } from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  type EdgeProps,
} from "@xyflow/react";
import type { FlowEdgeData } from "../types";

export const AnimatedEdge = memo(function AnimatedEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
}: EdgeProps) {
  const edgeData = data as FlowEdgeData | undefined;

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const isHighlighted = Boolean(edgeData?.isHighlighted);
  const strokeColor = isHighlighted
    ? "rgba(154, 255, 141, 0.9)"
    : "rgba(255, 255, 255, 0.45)";
  const strokeWidth = isHighlighted ? 3 : 1.8;

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: strokeColor,
          strokeWidth,
          strokeDasharray: "14 10",
          strokeDashoffset: 24,
          animation: "flow 2s linear infinite",
          filter: isHighlighted
            ? "drop-shadow(0 0 8px rgba(154,255,141,0.45))"
            : undefined,
        }}
      />

      {edgeData?.label ? (
        <EdgeLabelRenderer>
          <div
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            }}
          >
            <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary shadow-lg backdrop-blur">
              {edgeData.label}
            </span>
          </div>
        </EdgeLabelRenderer>
      ) : null}
    </>
  );
});
