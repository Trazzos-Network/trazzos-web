"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FlowNodeData } from "../types";

export const ActionNode = memo(function ActionNode({ data }: NodeProps) {
  const nodeData = data as FlowNodeData;
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
        "group relative flex min-w-[230px] max-w-[320px] flex-col gap-3 rounded-3xl border border-white/10 bg-gradient-to-br from-card/80 to-card/40 px-7 py-6 text-left text-foreground shadow-lg backdrop-blur transition-all duration-300 ease-out opacity-0",
        "hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_45px_rgba(154,255,141,0.12)]",
        isActive && "border-primary/50 shadow-[0_0_30px_rgba(154,255,141,0.3)]"
      )}
      style={{
        animation: animationPhases.join(", "),
        animationDelay: `${(nodeData.order ?? 0) * 120}ms`,
      }}
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/15 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-80" />

      <div className="relative flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary">
          <Rocket className="h-5 w-5" />
        </div>
        <span className="text-sm font-semibold uppercase tracking-wide text-foreground/60">
          Acción
        </span>
      </div>

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
