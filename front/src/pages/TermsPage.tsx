// src/pages/TermsPage.tsx
import React from 'react';
import TermCard, { Term } from '../components/TermCard';

interface TermsPageProps {
    terms: Term[];
}

const TermsPage: React.FC<TermsPageProps> = ({ terms }) => {
    return (
        <div style={{ padding: '1rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>Список терминов</h2>

            <div
                style={{
                    display: 'flex',
                    gap: '1rem',
                    flexWrap: 'wrap',
                }}
            >
                {terms.map((term) => (
                    <TermCard key={term.id} term={term} />
                ))}
            </div>
        </div>
    );
};

export default TermsPage;
