// src/pages/MindMapPage.tsx
import React from 'react';
import MindMap from '../components/MindMap'; // ваш компонент c React Flow

const MindMapPage: React.FC = () => {
    return (
        <div style={{ padding: '1rem' }}>
            <h2>MindMap</h2>
            <MindMap />
        </div>
    );
};

export default MindMapPage;
