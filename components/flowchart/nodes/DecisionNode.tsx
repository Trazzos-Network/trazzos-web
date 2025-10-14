"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { cn } from "@/lib/utils";
import type { FlowNodeData } from "../types";

export const DecisionNode = memo(function DecisionNode({ data }: NodeProps) {
  const nodeData = (data as FlowNodeData) ?? { label: "" };
  const isActive = Boolean(nodeData.isHighlighted || nodeData.isSelected);
  const animationPhases = [
    "fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
  ];
  if (nodeData.isSelected) {
    animationPhases.push("pulse-glow 2s ease-in-out infinite");
  }

  return (
    <div
      className="relative flex h-[220px] w-[220px] items-center justify-center opacity-0"
      style={{
        animation: animationPhases.join(", "),
        animationDelay: `${(nodeData.order ?? 0) * 120}ms`,
      }}
    >
      <div
        className={cn(
          "group relative flex h-[180px] w-[180px] -rotate-45 flex-col items-center justify-center rounded-3xl border border-primary/30 bg-card/70 p-8 text-center text-foreground shadow-lg backdrop-blur transition-all duration-300 ease-out",
          "hover:border-primary/50 hover:shadow-[0_20px_45px_rgba(154,255,141,0.15)]",
          isActive &&
            "border-primary/60 shadow-[0_0_35px_rgba(154,255,141,0.35)]"
        )}
      >
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-80" />
        <div className="flex flex-col items-center gap-3 rotate-45">
          <h3 className="text-lg font-semibold leading-snug text-balance">
            {nodeData.label}
          </h3>
          {nodeData.description ? (
            <p className="text-xs text-foreground/60">{nodeData.description}</p>
          ) : null}
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="!h-3 !w-3 !bg-primary/70 !border-primary/80"
        style={{ borderWidth: 1 }}
      />
      <Handle
        type="source"
        position={Position.Left}
        className="!h-3 !w-3 !bg-primary/70 !border-primary/80"
        style={{ borderWidth: 1 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!h-3 !w-3 !bg-primary/70 !border-primary/80"
        style={{ borderWidth: 1 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-3 !w-3 !bg-primary/70 !border-primary/80"
        style={{ borderWidth: 1 }}
      />
    </div>
  );
});
