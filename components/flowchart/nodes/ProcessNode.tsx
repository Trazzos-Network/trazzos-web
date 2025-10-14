"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { cn } from "@/lib/utils";
import type { FlowNodeData } from "../types";

export const ProcessNode = memo(function ProcessNode({ data }: NodeProps) {
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
      className={cn(
        "group relative flex min-w-[260px] max-w-[340px] flex-col gap-4 rounded-2xl border border-white/10 bg-card/70 px-7 py-6 text-left text-foreground shadow-lg backdrop-blur transition-all duration-300 ease-out opacity-0",
        "hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_45px_rgba(154,255,141,0.15)]",
        isActive && "border-primary/50 shadow-[0_0_35px_rgba(154,255,141,0.35)]"
      )}
      style={{
        animation: animationPhases.join(", "),
        animationDelay: `${(nodeData.order ?? 0) * 120}ms`,
      }}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative space-y-2">
        <h3 className="text-xl font-semibold leading-snug text-balance">
          {nodeData.label}
        </h3>
        {nodeData.description ? (
          <p className="text-sm text-foreground/60">{nodeData.description}</p>
        ) : null}
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="!h-2.5 !w-2.5 !bg-primary/70 !border-primary/80"
        style={{ borderWidth: 1 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-2.5 !w-2.5 !bg-primary/70 !border-primary/80"
        style={{ borderWidth: 1 }}
      />
    </div>
  );
});
