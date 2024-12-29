import React, {useEffect} from 'react';
import ReactFlow, {
    Node,
    Edge,
    useNodesState,
    useEdgesState, MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

import {Term, Relationship} from '../api/models';
import {getLayoutedElements} from '../utils/dagreLayout';

interface MindMapProps {
    terms: Term[];
    relationships: Relationship[];
}

const MindMap: React.FC<MindMapProps> = ({terms, relationships}) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
        // terms -> Node[]
        const rawNodes: Node[] = terms.map((term) => ({
            id: term.id.toString(),
            data: {label: term.title},
            // Изначально (0,0), Dagre расставит
            position: {x: 0, y: 0},
        }));

        // relationships -> Edge[]
        const rawEdges: Edge[] = relationships.map((rel) => ({
            id: rel.id.toString(),
            source: rel.source_id.toString(),
            target: rel.target_id.toString(),
            label: rel.relation,
            markerEnd: {
                type: MarkerType.ArrowClosed,
            }
        }));

        // расстановка Dagre
        const {layoutedNodes, layoutedEdges} = getLayoutedElements(rawNodes, rawEdges, 'LR');
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
    }, [terms, relationships, setNodes, setEdges]);

    return (
        <div style={{width: '100%', height: 600}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
            />
        </div>
    );
};

export default MindMap;
