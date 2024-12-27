// MindMap.tsx
import React from 'react';
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    Edge,
    Node, MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
    {
        id: '1',
        data: { label: 'Термин 1' },
        position: { x: 100, y: 100 },
    },
    {
        id: '2',
        data: { label: 'Термин 2' },
        position: { x: 400, y: 100 },
    },
];

const initialEdges: Edge[] = [
    {
        id: 'e1-2',
        source: '1',
        target: '2',
        label: 'принадлежит',
        type: 'smoothstep',
        labelStyle: { fill: 'black', fontWeight: 300 },
        markerEnd: {
            type: MarkerType.ArrowClosed,
            color: 'black',      // цвет стрелки
            strokeWidth: 2,     // толщина границы стрелки
        }
    },
];

const MindMap: React.FC = () => {
    const [nodes,  , onNodesChange] = useNodesState(initialNodes);
    const [edges, , onEdgesChange] = useEdgesState(initialEdges);

    return (
        <div style={{ width: '100%', height: 600 }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                nodesConnectable={false}
                onEdgesChange={onEdgesChange}
                fitView
            >
                <MiniMap />
                <Controls />
                <Background color="#aaa" gap={16} />
            </ReactFlow>
        </div>
    );
};

export default MindMap;
