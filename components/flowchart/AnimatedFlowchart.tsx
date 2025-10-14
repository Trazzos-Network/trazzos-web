"use client";

import { memo, useCallback, useEffect, useState } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  type Node,
  type ReactFlowInstance,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { cn } from "@/lib/utils";
import { convertMermaidToReactFlow } from "./utils/mermaidConverter";
import { ProcessNode } from "./nodes/ProcessNode";
import { StartEndNode } from "./nodes/StartEndNode";
import { DecisionNode } from "./nodes/DecisionNode";
import { ActionNode } from "./nodes/ActionNode";
import { AnimatedEdge } from "./edges/AnimatedEdge";
import { useFlowchart } from "./FlowchartContext";

interface AnimatedFlowchartProps {
  mermaidCode: string;
  className?: string;
  showMiniMap?: boolean;
}

const nodeTypes = {
  startEnd: StartEndNode,
  process: ProcessNode,
  decision: DecisionNode,
  action: ActionNode,
};

const edgeTypes = {
  "animated-edge": AnimatedEdge,
};

function FlowchartCanvas({
  mermaidCode,
  showMiniMap = true,
}: Pick<AnimatedFlowchartProps, "mermaidCode" | "showMiniMap">) {
  const { nodes, edges, highlightPath, resetHighlight, setFlowData } =
    useFlowchart();
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  useEffect(() => {
    if (!mermaidCode.trim()) {
      setFlowData([], []);
      return;
    }

    const conversion = convertMermaidToReactFlow(mermaidCode);
    setFlowData(conversion.nodes, conversion.edges);
  }, [mermaidCode, setFlowData]);

  useEffect(() => {
    if (reactFlowInstance && nodes.length) {
      const timeout = window.setTimeout(() => {
        reactFlowInstance.fitView({ padding: 0.2, duration: 800 });
      }, 80);
      return () => window.clearTimeout(timeout);
    }
    return undefined;
  }, [nodes, reactFlowInstance]);

  const handleNodeClick = useCallback(
    (_event: unknown, node: Node) => {
      if (node?.id) {
        highlightPath(node.id);
      }
    },
    [highlightPath]
  );

  const handlePaneClick = useCallback(() => {
    resetHighlight();
  }, [resetHighlight]);

  const handleInit = useCallback((instance: ReactFlowInstance) => {
    setReactFlowInstance(instance);
    instance.fitView({ padding: 0.25, duration: 600 });
  }, []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onNodeClick={handleNodeClick}
      onPaneClick={handlePaneClick}
      onInit={handleInit}
      // panOnScroll
      panOnDrag
      // zoomOnScroll
      zoomOnPinch
      fitView
      fitViewOptions={{ padding: 0.25 }}
      minZoom={0.4}
      maxZoom={1.6}
      className="transition-all duration-300"
      defaultViewport={{ x: 0, y: 0, zoom: 0.9 }}
      proOptions={{ hideAttribution: true }}
    >
      <Background
        id="flowchart-background"
        variant={BackgroundVariant.Dots}
        gap={28}
        size={1.4}
        color="rgba(255,255,255,0.08)"
        style={{ backgroundColor: "#131313" }}
      />
      {/* <Controls
        className="!bg-gray-900/80 !border-white/10 !text-white"
        position="bottom-right"
        showInteractive={false}
      /> */}
      {showMiniMap ? (
        <MiniMap
          className="!bg-gray-900/70 !border-white/10"
          nodeColor={(node) =>
            node.data?.isHighlighted ? "#9AFF8D" : "rgba(255,255,255,0.55)"
          }
          zoomable
          pannable
        />
      ) : null}
    </ReactFlow>
  );
}

export const AnimatedFlowchart = memo(function AnimatedFlowchart({
  mermaidCode,
  className,
  showMiniMap = true,
}: AnimatedFlowchartProps) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-3xl border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.45)]",
        className
      )}
      style={{ backgroundColor: "#131313" }}
    >
      <ReactFlowProvider>
        <FlowchartCanvas mermaidCode={mermaidCode} showMiniMap={showMiniMap} />
      </ReactFlowProvider>
    </div>
  );
});
