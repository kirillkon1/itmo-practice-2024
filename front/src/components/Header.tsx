// src/components/Header.tsx
import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {FaGithub} from 'react-icons/fa';
import {FaBrain, FaBookOpen} from 'react-icons/fa';

const GITHUB_REPO_URL = 'https://github.com/kirillkon1';
// <-- Замените на нужную ссылку или удалите, если не нужно

const Header: React.FC = () => {
    const location = useLocation();

    // Проверяем, какой маршрут сейчас активен
    const isMindmapActive = location.pathname === '/';
    const isTermsActive = location.pathname === '/terms';

    // Базовые стили для «кнопки»
    const baseBtnStyle: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',

        textDecoration: 'none',
        color: '#333',

        backgroundColor: '#eee',
        padding: '0.6rem 1rem',
        borderRadius: '8px',
        marginRight: '1rem',

        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        position: 'relative',
        zIndex: 1,
    };

    function getActiveStyle(isActive: boolean): React.CSSProperties {
        if (isActive) {
            return {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                color: "#fff",
                backgroundColor: '#000',
                zIndex: 2, // чуть выше остальных
            };
        }
        return {};
    }

    return (
        <header
            style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 1rem',
                backgroundColor: '#f5f5f5',
                borderBottom: '1px solid #ccc',
                height: '60px',
                justifyContent: 'space-between',
            }}
        >
            {/* Левая часть: кнопки перехода */}
            <div>
                {/* MindMap Button */}
                <Link
                    to="/"
                    style={{
                        ...baseBtnStyle,
                        ...getActiveStyle(isMindmapActive),
                    }}
                >
                    <FaBrain/>
                    MindMap
                </Link>

                {/* TermsPage Button */}
                <Link
                    to="/terms"
                    style={{
                        ...baseBtnStyle,
                        ...getActiveStyle(isTermsActive),
                    }}
                >
                    <FaBookOpen/>
                    Terms
                </Link>
            </div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                }}
            >
                <a
                    href={GITHUB_REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        color: '#000',
                        fontSize: '2.5rem',
                    }}
                >
                    <FaGithub/>
                </a>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        ...baseBtnStyle,
                        ...getActiveStyle(true),
                    }}
                >
                    Кондрашов К.Ю.
                </a>
            </div>
        </header>
    );
};

export default Header;
