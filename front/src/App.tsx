// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TermsPage from './pages/TermsPage';
import MindMapPage from './pages/MindMapPage';
import Header from "./components/Header.tsx"; // если у вас есть страница с майндкартой

// Пример данных терминов
const termsData = [
    { id: 1, title: 'Термин 1', description: 'Описание термина 1' },
    { id: 2, title: 'Термин 2', description: 'Описание термина 2' },
    { id: 3, title: 'Термин 3', description: 'Описание термина 3' },
];

function App() {
    return (
        <Router>
            <Header/>

            <Routes>
                <Route path="/" element={<MindMapPage />} />
                <Route path="/terms" element={<TermsPage terms={termsData} />} />
            </Routes>
        </Router>
    );
}

export default App;
