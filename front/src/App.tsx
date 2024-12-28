import {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import MindMapPage from './pages/MindMapPage';
import TermsPage from './pages/TermsPage';
import {Term, Relationship} from './api/models';
import Header from "./components/Header.tsx";

function App() {
    const [terms, setTerms] = useState<Term[]>([]);
    const [relationships, setRelationships] = useState<Relationship[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async function fetchData() {
            try {
                // Запрос терминов
                const respTerms = await fetch('http://localhost:8000/terms')
                    .then(res => res?.json());

                // Запрос связей
                const respRels = await fetch('http://localhost:8000/relationships')
                    .then(res => res?.json());

                setTerms(respTerms);
                setRelationships(respRels);
            } catch (error) {
                console.error('Ошибка при загрузке:', error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route
                    path="/"
                    element={
                        <MindMapPage terms={terms} relationships={relationships}/>
                    }
                />
                <Route
                    path="/terms"
                    element={
                        <TermsPage terms={terms}/>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
