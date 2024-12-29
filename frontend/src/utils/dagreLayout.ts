import { Node, Edge } from 'reactflow';
import dagre from "dagre"

// source: https://codesandbox.io/p/sandbox/reaact-flow-dagre-sznrx9?file=%2Fsrc%2FLayoutFlow.js%3A50%2C1-51%2C47
export function getLayoutedElements(
    nodes: Node[],
    edges: Edge[],
    direction: 'LR' | 'TB' = 'LR'
): { layoutedNodes: Node[]; layoutedEdges: Edge[] } {

    const nodeWidth = 172;  // ширина ноды
    const nodeHeight = 36;  // высота ноды

    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: direction });

    // добавляем ноды в граф
    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    // добавляем рёбра (edges)
    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    // вычисление графов
    dagre.layout(dagreGraph);

    // применяем новые координаты
    const layoutedNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        return {
            ...node,
            position: {
                x: nodeWithPosition.x - nodeWidth / 2 + Math.random() * 100,
                y: nodeWithPosition.y - nodeHeight / 2
            },
        };
    });

    return { layoutedNodes, layoutedEdges: edges };
}

// x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
//     y: nodeWithPosition.y - nodeHeight / 2 + (Math.random() * 700 - 350)