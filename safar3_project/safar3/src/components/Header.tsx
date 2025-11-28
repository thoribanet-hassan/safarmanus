import { Plane, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// تم حذف الدوال من api.ts بعد نقلها للـ Backend
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import './Header.css';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t } = useLanguage();
    const location = useLocation();
    const aiProviders = ['OpenAI', 'Gemini']; // Mock for display
    const flightProviders = ['Amadeus', 'Skyscanner']; // Mock for display

    const isActive = (path: string) => location.pathname === path || location.hash === path;

    return (
        <header className="header">
            <div className="header-content container">
                <Link to="/" className="header-brand">
                    <Plane size={32} className="brand-icon" />
                    <div className="brand-text">
                        <h1>{t('brand')}</h1>
                        <p>{t('slogan')}</p>
                    </div>
                </Link>

                <button
                    className="menu-toggle"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
                    <Link
                        to="/"
                        className={`nav-link ${isActive('/') ? 'active' : ''}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {t('nav_chat')}
                    </Link>
                    <Link
                        to="/flights"
                        className={`nav-link ${isActive('/flights') ? 'active' : ''}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {t('nav_flights')}
                    </Link>
                    <Link
                        to="/hotels"
                        className={`nav-link ${isActive('/hotels') ? 'active' : ''}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {t('nav_hotels')}
                    </Link>
                    <Link
                        to="/trains"
                        className={`nav-link ${isActive('/trains') ? 'active' : ''}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {t('nav_trains')}
                    </Link>
                    <Link
                        to="/monitor"
                        className={`nav-link ${isActive('/monitor') ? 'active' : ''}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {t('nav_monitor')}
                    </Link>
                    <Link
                        to="/about"
                        className={`nav-link ${isActive('/about') ? 'active' : ''}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {t('nav_about')}
                    </Link>
                </nav>

                <div className="header-actions flex items-center gap-4">
                    {/* Language Dropdown */}
                    <LanguageSelector />

                    <div className="header-status hidden lg:flex">
                        {aiProviders.length > 0 && (
                            <div className="status-badge">
                                <span className="status-dot"></span>
                                <span className="status-text">AI: {aiProviders.join(', ')}</span>
                            </div>
                        )}
                        {flightProviders.length > 0 && (
                            <div className="status-badge">
                                <span className="status-dot"></span>
                                <span className="status-text">Flights: {flightProviders.join(', ')}</span>
                            </div>
                        )}
                        {aiProviders.length === 0 && flightProviders.length === 0 && (
                            <div className="status-badge warning">
                                <span className="status-text">⚠️ API not configured</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};