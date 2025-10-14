"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { cn } from "@/lib/utils";
import type { FlowNodeData } from "../types";

export const StartEndNode = memo(function StartEndNode({
  data,
}: NodeProps<FlowNodeData>) {
  const nodeData = data ?? { label: "" };
  const isActive = Boolean(nodeData.isHighlighted || nodeData.isSelected);
  const animationPhases = [
    "fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
  ];
  if (nodeData.isSelected) {
    animationPhases.push("pulse-glow 2s ease-in-out infinite");
  }

  return (
    <div
      className={cn(
        "group relative flex min-w-[240px] max-w-[320px] flex-col items-center justify-center gap-2 overflow-hidden rounded-[24px] border border-primary/30 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent px-8 py-6 text-center text-foreground shadow-lg transition-all duration-300 ease-out opacity-0",
        "hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_20px_45px_rgba(154,255,141,0.2)]",
        isActive &&
          "border-primary/60 shadow-[0_0_35px_rgba(154,255,141,0.45)] hover:-translate-y-0"
      )}
      style={{
        animation: animationPhases.join(", "),
        animationDelay: `${(nodeData.order ?? 0) * 120}ms`,
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

      <p className="relative text-xs uppercase tracking-[0.3em] text-primary/80">
        Inicio / Fin
      </p>
      <h3 className="relative text-xl font-semibold leading-snug text-balance">
        {nodeData.label}
      </h3>
      {nodeData.description ? (
        <p className="relative text-sm text-foreground/70">
          {nodeData.description}
        </p>
      ) : null}

      <Handle
        type="target"
        position={Position.Top}
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
