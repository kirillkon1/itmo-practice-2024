import React from 'react';
import TermCard from '../components/TermCard';
import { Term } from '../api/models';

interface TermsPageProps {
    terms: Term[];
}

const TermsPage: React.FC<TermsPageProps> = ({ terms }) => {
    return (
        <div style={{ padding: '1rem' }}>
            <h2>Список терминов</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {terms.map((term) => (
                    <TermCard key={term.id} term={term} />
                ))}
            </div>
        </div>
    );
};

export default TermsPage;
