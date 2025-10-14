import { createContext, useCallback, useContext, useMemo, useRef, useState, useEffect } from "react"
import type { ReactNode } from "react"
import type { FlowEdge, FlowNode } from "./types"

interface FlowchartContextType {
  nodes: FlowNode[]
  edges: FlowEdge[]
  selectedNode: string | null
  setSelectedNode: (id: string | null) => void
  highlightPath: (nodeId: string) => void
  resetHighlight: () => void
  setFlowData: (nodes: FlowNode[], edges: FlowEdge[]) => void
}

const FlowchartContext = createContext<FlowchartContextType | undefined>(undefined)

interface FlowchartProviderProps {
  children: ReactNode
  initialNodes?: FlowNode[]
  initialEdges?: FlowEdge[]
}

interface PathResult {
  nodeIds: string[]
  edgeIds: string[]
}

function findHighlightedPath(startIds: string[], targetId: string, edges: FlowEdge[]): PathResult {
  if (!targetId) {
    return { nodeIds: [], edgeIds: [] }
  }

  if (!startIds.length) {
    return { nodeIds: [targetId], edgeIds: [] }
  }

  const adjacency = new Map<string, Array<{ target: string; edgeId: string }>>()

  edges.forEach((edge) => {
    const targets = adjacency.get(edge.source) ?? []
    targets.push({ target: edge.target, edgeId: edge.id })
    adjacency.set(edge.source, targets)
  })

  const queue: string[] = [...startIds]
  const visited = new Set<string>(startIds)
  const parent = new Map<
    string,
    {
      nodeId: string
      edgeId: string
    }
  >()

  while (queue.length) {
    const current = queue.shift() as string
    if (current === targetId) {
      break
    }

    const neighbours = adjacency.get(current) ?? []
    for (const next of neighbours) {
      if (!visited.has(next.target)) {
        visited.add(next.target)
        parent.set(next.target, { nodeId: current, edgeId: next.edgeId })
        queue.push(next.target)
      }
    }
  }

  if (!visited.has(targetId)) {
    return { nodeIds: [targetId], edgeIds: [] }
  }

  const nodeIds: string[] = []
  const edgeIds: string[] = []
  let cursor: string | undefined = targetId

  while (cursor && !startIds.includes(cursor)) {
    nodeIds.push(cursor)
    const previous = parent.get(cursor)
    if (!previous) {
      break
    }
    edgeIds.push(previous.edgeId)
    cursor = previous.nodeId
  }

  if (cursor) {
    nodeIds.push(cursor)
  }

  return {
    nodeIds: nodeIds.reverse(),
    edgeIds: edgeIds.reverse(),
  }
}

export function FlowchartProvider({ children, initialNodes = [], initialEdges = [] }: FlowchartProviderProps) {
  const [nodes, setNodes] = useState<FlowNode[]>(initialNodes)
  const [edges, setEdges] = useState<FlowEdge[]>(initialEdges)
  const [selectedNode, setSelectedNodeState] = useState<string | null>(null)

  const nodesRef = useRef<FlowNode[]>(initialNodes)
  const edgesRef = useRef<FlowEdge[]>(initialEdges)

  useEffect(() => {
    nodesRef.current = nodes
  }, [nodes])

  useEffect(() => {
    edgesRef.current = edges
  }, [edges])

  const setFlowData = useCallback((nextNodes: FlowNode[], nextEdges: FlowEdge[]) => {
    setNodes(nextNodes)
    setEdges(nextEdges)
    setSelectedNodeState(null)
  }, [])

  useEffect(() => {
    if (initialNodes.length || initialEdges.length) {
      setFlowData(initialNodes, initialEdges)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // initialize once on mount

  const highlightPath = useCallback(
    (nodeId: string) => {
      if (!nodeId) {
        return
      }

      const currentNodes = nodesRef.current
      const currentEdges = edgesRef.current

      const startIds = currentNodes.filter((node) => node.data?.isStart).map((node) => node.id)
      const { nodeIds, edgeIds } = findHighlightedPath(startIds, nodeId, currentEdges)

      const nodeSet = new Set(nodeIds.length ? nodeIds : [nodeId])
      const edgeSet = new Set(edgeIds)

      setSelectedNodeState(nodeId)

      setNodes((prev) =>
        prev.map((node) => {
          const isHighlighted = nodeSet.has(node.id)
          const isSelected = node.id === nodeId

          return {
            ...node,
            data: {
              ...node.data,
              isHighlighted,
              isSelected,
            },
          }
        }),
      )

      setEdges((prev) =>
        prev.map((edge) => ({
          ...edge,
          data: {
            ...edge.data,
            isHighlighted: edgeSet.has(edge.id),
          },
        })),
      )
    },
    [setNodes, setEdges],
  )

  const resetHighlight = useCallback(() => {
    setSelectedNodeState(null)
    setNodes((prev) =>
      prev.map((node) => ({
        ...node,
        data: {
          ...node.data,
          isHighlighted: false,
          isSelected: false,
        },
      })),
    )
    setEdges((prev) =>
      prev.map((edge) => ({
        ...edge,
        data: {
          ...edge.data,
          isHighlighted: false,
        },
      })),
    )
  }, [])

  const contextValue = useMemo(
    () => ({
      nodes,
      edges,
      selectedNode,
      setSelectedNode: setSelectedNodeState,
      highlightPath,
      resetHighlight,
      setFlowData,
    }),
    [edges, highlightPath, nodes, resetHighlight, selectedNode, setFlowData],
  )

  return <FlowchartContext.Provider value={contextValue}>{children}</FlowchartContext.Provider>
}

export function useFlowchart(): FlowchartContextType {
  const context = useContext(FlowchartContext)
  if (!context) {
    throw new Error("useFlowchart must be used within a FlowchartProvider")
  }
  return context
}
