import React from 'react';
import MindMap from '../components/MindMap';
import { Term, Relationship } from '../api/models';

interface MindMapPageProps {
    terms: Term[];
    relationships: Relationship[];
}

const MindMapPage: React.FC<MindMapPageProps> = ({ terms, relationships }) => {
    return (
        <div style={{ padding: '1rem' }}>
            <h2>MindMap</h2>
            <MindMap terms={terms} relationships={relationships} />
        </div>
    );
};

export default MindMapPage;
