import React from 'react';
import {Term} from "../api/models.ts";

interface TermCardProps {
    term: Term;
}

const TermCard: React.FC<TermCardProps> = ({term}) => {
    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        target.style.transform = 'scale(1.02)';
        target.style.boxShadow = '0 4px 10px rgba(0,0,0,0.15)';
        target.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)}, 
                          ${Math.floor(Math.random() * 255)}, 
                          ${Math.floor(Math.random() * 255)},
                          0.3)`;
        target.style.color = `#000`;
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        target.style.transform = 'scale(1)';
        target.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        // target.style.backgroundColor = '#fff';
        target.style.color = 'rgba(0,0,0)';

    };

    return (
        <div
            style={{
                width: '220px',
                padding: '1rem',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
                backgroundColor: '#fff',
                color: '#000',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div>
                <h3 style={{margin: '0 0 0.5rem 0', fontSize: '1.2rem', fontWeight: '600'}}>
                    {term.title}
                </h3>
                <p style={{margin: '0 0 1rem 0', lineHeight: '1.4', color: '#333'}}>
                    {term.description}
                </p>
            </div>
            <p style={{margin: 0, fontSize: '0.85rem', color: '#666', textAlign: 'right'}}>
                {term.source}
            </p>
        </div>

    );
};

export default TermCard;
