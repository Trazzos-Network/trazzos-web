import type { Edge, Node } from "@xyflow/react";

export type FlowNodeKind = "startEnd" | "process" | "decision" | "action";

export interface FlowNodeData {
  label?: string;
  description?: string;
  isHighlighted?: boolean;
  isSelected?: boolean;
  isStart?: boolean;
  accentColor?: string;
  badge?: string;
  order?: number;
  [key: string]: unknown;
}

export interface FlowEdgeData {
  label?: string;
  isHighlighted?: boolean;
  animated?: boolean;
  [key: string]: unknown;
}

export type FlowNode = Node<FlowNodeData>;
export type FlowEdge = Edge<FlowEdgeData>;

export interface MermaidConversionResult {
  nodes: FlowNode[];
  edges: FlowEdge[];
}
