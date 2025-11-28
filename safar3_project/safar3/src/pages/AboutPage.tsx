import { Plane, Shield, Zap, Globe, Heart, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './AboutPage.css';

export const AboutPage = () => {
    const { t } = useLanguage();

    const features = [
        {
            icon: <Plane size={32} />,
            title: t('feature_search'),
            description: t('feature_search_desc'),
        },
        {
            icon: <Zap size={32} />,
            title: t('feature_ai'),
            description: t('feature_ai_desc'),
        },
        {
            icon: <Shield size={32} />,
            title: t('feature_secure'),
            description: t('feature_secure_desc'),
        },
        {
            icon: <Globe size={32} />,
            title: t('feature_global'),
            description: t('feature_global_desc'),
        },
        {
            icon: <Heart size={32} />,
            title: t('feature_love'),
            description: t('feature_love_desc'),
        },
        {
            icon: <Award size={32} />,
            title: t('feature_price'),
            description: t('feature_price_desc'),
        },
    ];

    const stats = [
        { value: '1M+', label: t('stat_users') },
        { value: '500K+', label: t('stat_bookings') },
        { value: '150+', label: t('stat_destinations') },
        { value: '99%', label: t('stat_satisfaction') },
    ];

    return (
        <div className="about-page">
            <div className="about-hero">
                <div className="hero-content">
                    <h1 className="animate-fade-in">{t('about_title')}</h1>
                    <p className="hero-subtitle">
                        {t('about_subtitle')}
                    </p>
                    <p className="hero-description">
                        {t('about_desc')}
                    </p>
                </div>
            </div>

            <div className="stats-section">
                <div className="stats-grid">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="stat-card glass-card animate-fade-in">
                            <h3>{stat.value}</h3>
                            <p>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="features-section">
                <h2 className="section-title">{t('why_safar')}</h2>
                <div className="features-grid">
                    {features.map((feature, idx) => (
                        <div key={idx} className="feature-card glass-card animate-fade-in">
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mission-section glass-card">
                <h2>{t('mission_title')}</h2>
                <p>
                    {t('mission_desc')}
                </p>
            </div>

            <div className="tech-section">
                <h2 className="section-title">{t('tech_title')}</h2>
                <div className="tech-grid">
                    <div className="tech-card glass-card">
                        <h3>🤖 AI</h3>
                        <p>OpenAI GPT-4, Google Gemini</p>
                    </div>
                    <div className="tech-card glass-card">
                        <h3>✈️ Providers</h3>
                        <p>Amadeus, Skyscanner, Duffel</p>
                    </div>
                    <div className="tech-card glass-card">
                        <h3>⚡ Tech Stack</h3>
                        <p>React, TypeScript, Vite</p>
                    </div>
                    <div className="tech-card glass-card">
                        <h3>🔒 Security</h3>
                        <p>End-to-end Encryption</p>
                    </div>
                </div>
            </div>

            <div className="cta-section glass-card">
                <h2>{t('cta_title')}</h2>
                <p>{t('cta_desc')}</p>
                <div className="cta-buttons">
                    <a href="#flights" className="btn btn-primary">
                        {t('cta_btn_search')}
                    </a>
                    <a href="#chat" className="btn btn-secondary">
                        {t('cta_btn_chat')}
                    </a>
                </div>
            </div>

            <footer className="about-footer">
                <p>{t('footer_rights')}</p>
                <p className="footer-tagline">{t('footer_made')}</p>
            </footer>
        </div>
    );
};
