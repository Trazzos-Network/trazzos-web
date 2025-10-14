import dagre from "dagre";
import { MarkerType } from "@xyflow/react";
import type {
  FlowEdge,
  FlowNode,
  FlowNodeKind,
  MermaidConversionResult,
} from "../types";

const NODE_DIMENSIONS: Record<FlowNodeKind, { width: number; height: number }> =
  {
    startEnd: { width: 260, height: 140 },
    process: { width: 280, height: 150 },
    decision: { width: 240, height: 240 },
    action: { width: 260, height: 140 },
  };

interface RawEdge {
  source: string;
  target: string;
  label?: string;
}

interface NodeDescriptor {
  id: string;
  label: string;
  description?: string;
  type: FlowNodeKind;
}

function normaliseLabel(label: string): string {
  let cleaned = label.trim();
  if (
    (cleaned.startsWith('"') && cleaned.endsWith('"')) ||
    (cleaned.startsWith("'") && cleaned.endsWith("'"))
  ) {
    cleaned = cleaned.slice(1, -1);
  }
  return cleaned.replace(/\s+/g, " ").trim();
}

function extractLabelAndDescription(id: string, raw: string) {
  const parts = raw
    .split(/<br\s*\/?>/i)
    .map((segment) => normaliseLabel(segment))
    .filter(Boolean);

  return {
    label: parts[0] ?? id,
    description: parts.slice(1).join(" ") || undefined,
  };
}

function upsertDescriptor(
  map: Map<string, NodeDescriptor>,
  descriptor: NodeDescriptor
) {
  const existing = map.get(descriptor.id);
  if (!existing) {
    map.set(descriptor.id, descriptor);
    return;
  }

  const label =
    descriptor.label !== descriptor.id ? descriptor.label : existing.label;
  const description = descriptor.description ?? existing.description;
  const type =
    existing.type === "action" && descriptor.type !== "action"
      ? descriptor.type
      : existing.type;

  map.set(descriptor.id, {
    ...existing,
    ...descriptor,
    label,
    description,
    type,
  });
}

function parseNodeToken(token: string): NodeDescriptor {
  const cleanToken = token.trim();
  const match = cleanToken.match(/^([A-Za-z0-9_]+)(.*)$/);
  if (!match) {
    return {
      id: cleanToken,
      label: cleanToken,
      type: "action",
    };
  }

  const [, id, rawSuffix] = match;
  const suffix = rawSuffix.trim();

  if (!suffix) {
    return { id, label: id, type: "action" };
  }

  const first = suffix[0];
  const last = suffix[suffix.length - 1];

  if (first === "[" && last === "]") {
    const content = extractLabelAndDescription(id, suffix.slice(1, -1));
    return { id, ...content, type: "process" };
  }

  if (first === "{" && last === "}") {
    const content = extractLabelAndDescription(id, suffix.slice(1, -1));
    return { id, ...content, type: "decision" };
  }

  if (suffix.startsWith("([") && suffix.endsWith("])")) {
    const content = extractLabelAndDescription(id, suffix.slice(2, -2));
    return { id, ...content, type: "startEnd" };
  }

  if (first === "(" && last === ")") {
    const content = extractLabelAndDescription(id, suffix.slice(1, -1));
    return { id, ...content, type: "startEnd" };
  }

  const content = extractLabelAndDescription(id, suffix);
  return { id, ...content, type: "action" };
}

function convertToReactFlowNodes(
  graph: dagre.graphlib.Graph,
  nodeDescriptors: Map<string, NodeDescriptor>,
  incomingCounts: Map<string, number>
): FlowNode[] {
  const nodes: FlowNode[] = [];
  let order = 0;

  nodeDescriptors.forEach((descriptor, id) => {
    const { width, height } = NODE_DIMENSIONS[descriptor.type];
    const layout = graph.node(id) as dagre.Node | undefined;
    const position = layout
      ? { x: layout.x - width / 2, y: layout.y - height / 2 }
      : { x: 0, y: 0 };

    const isStart =
      (incomingCounts.get(id) ?? 0) === 0 || descriptor.type === "startEnd";

    nodes.push({
      id,
      type: descriptor.type,
      position,
      data: {
        label: descriptor.label,
        description: descriptor.description,
        isStart,
        isHighlighted: false,
        isSelected: false,
        order: order++,
      },
      draggable: false,
      selectable: true,
    });
  });

  return nodes;
}

function convertToReactFlowEdges(rawEdges: RawEdge[]): FlowEdge[] {
  return rawEdges.map((edge, index) => ({
    id: `${edge.source}-${edge.target}-${index}`,
    source: edge.source,
    target: edge.target,
    type: "animated-edge",
    data: {
      label: edge.label,
      isHighlighted: false,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 16,
      height: 16,
      color: "#9AFF8D",
    },
    animated: true,
  }));
}

export function convertMermaidToReactFlow(
  mermaid: string
): MermaidConversionResult {
  const graph = new dagre.graphlib.Graph();
  graph.setDefaultEdgeLabel(() => ({}));
  graph.setGraph({
    rankdir: "TB",
    nodesep: 260,
    ranksep: 180,
    marginx: 80,
    marginy: 40,
  });

  const nodeDescriptors = new Map<string, NodeDescriptor>();
  const rawEdges: RawEdge[] = [];
  const incomingCounts = new Map<string, number>();

  const lines = mermaid
    .split("\n")
    .map((line) => line.trim())
    .filter(
      (line) =>
        line.length > 0 && !line.startsWith("%") && !line.startsWith("graph")
    );

  for (const line of lines) {
    if (!line.includes("-->")) {
      // standalone node declaration
      const descriptor = parseNodeToken(line);
      upsertDescriptor(nodeDescriptors, descriptor);
      continue;
    }

    const [rawSource, rawRest] = line.split("-->");
    if (!rawRest) {
      continue;
    }

    const sourceDescriptor = parseNodeToken(rawSource);
    upsertDescriptor(nodeDescriptors, sourceDescriptor);

    let targetToken = rawRest.trim();
    let edgeLabel: string | undefined;

    const labelMatch = targetToken.match(/^\|([^|]+)\|\s*(.+)$/);
    if (labelMatch) {
      edgeLabel = normaliseLabel(labelMatch[1]);
      targetToken = labelMatch[2];
    }

    const targetDescriptor = parseNodeToken(targetToken);
    upsertDescriptor(nodeDescriptors, targetDescriptor);

    rawEdges.push({
      source: sourceDescriptor.id,
      target: targetDescriptor.id,
      label: edgeLabel,
    });

    incomingCounts.set(
      targetDescriptor.id,
      (incomingCounts.get(targetDescriptor.id) ?? 0) + 1
    );
    if (!incomingCounts.has(sourceDescriptor.id)) {
      incomingCounts.set(
        sourceDescriptor.id,
        incomingCounts.get(sourceDescriptor.id) ?? 0
      );
    }
  }

  rawEdges.forEach((edge) => {
    const sourceDescriptor = nodeDescriptors.get(edge.source);
    const targetDescriptor = nodeDescriptors.get(edge.target);

    if (sourceDescriptor) {
      const { width, height } = NODE_DIMENSIONS[sourceDescriptor.type];
      graph.setNode(edge.source, { width, height });
    }

    if (targetDescriptor) {
      const { width, height } = NODE_DIMENSIONS[targetDescriptor.type];
      graph.setNode(edge.target, { width, height });
    }

    graph.setEdge(edge.source, edge.target);
  });

  // ensure isolated nodes without edges are also registered in the graph
  nodeDescriptors.forEach((descriptor, id) => {
    if (!graph.hasNode(id)) {
      const { width, height } = NODE_DIMENSIONS[descriptor.type];
      graph.setNode(id, { width, height });
    }
    if (!incomingCounts.has(id)) {
      incomingCounts.set(id, 0);
    }
  });

  dagre.layout(graph);

  const nodes = convertToReactFlowNodes(graph, nodeDescriptors, incomingCounts);
  const edges = convertToReactFlowEdges(rawEdges);

  return {
    nodes,
    edges,
  };
}
