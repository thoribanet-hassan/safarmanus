import { useState } from 'react';
import { useLanguage} from '../contexts/LanguageContext';
import { User, Calendar, Settings, LogOut, CreditCard, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';

export const UserDashboard = () => {
    const { t } = useLanguage();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('bookings');

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) {
        navigate('/auth');
        return null;
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'bookings':
                return (
                    <div className="bookings-section animate-fade-in">
                        <div className="content-header">
                            <h2>{t('my_bookings')}</h2>
                            <p className="text-white/60">{t('bookings_desc')}</p>
                        </div>

                        {/* Mock Bookings */}
                        <div className="booking-card">
                            <div className="booking-info">
                                <h3>Riyadh (RUH) ✈️ Dubai (DXB)</h3>
                                <div className="booking-meta">
                                    <span>📅 15 Dec 2025</span>
                                    <span>🕐 14:30</span>
                                    <span>🎫 Business</span>
                                </div>
                            </div>
                            <div className="booking-status status-confirmed">
                                {t('confirmed')}
                            </div>
                        </div>

                        <div className="booking-card">
                            <div className="booking-info">
                                <h3>Jeddah (JED) 🏨 Hilton Hotel</h3>
                                <div className="booking-meta">
                                    <span>📅 20 Jan 2026</span>
                                    <span>🌙 3 Nights</span>
                                    <span>🛏️ Deluxe Room</span>
                                </div>
                            </div>
                            <div className="booking-status status-pending">
                                {t('pending')}
                            </div>
                        </div>
                    </div>
                );
            case 'profile':
                return (
                    <div className="profile-section animate-fade-in">
                        <div className="content-header">
                            <h2>{t('profile_settings')}</h2>
                            <p className="text-white/60">{t('profile_desc')}</p>
                        </div>

                        <div className="glass-panel p-6 rounded-xl border border-white/10 max-w-md">
                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`}
                                    alt={user.name}
                                    className="w-20 h-20 rounded-full border-2 border-blue-500"
                                />
                                <div>
                                    <h3 className="text-xl font-bold">{user.name}</h3>
                                    <p className="text-white/60">{user.email}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="form-group">
                                    <label className="form-label">{t('full_name')}</label>
                                    <input type="text" className="form-input" value={user.name} readOnly />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">{t('email')}</label>
                                    <input type="email" className="form-input" value={user.email} readOnly />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">{t('phone')}</label>
                                    <input type="tel" className="form-input" placeholder="+966 5X XXX XXXX" />
                                </div>
                                <button className="btn btn-primary w-full mt-4">
                                    {t('save_changes')}
                                </button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return <div>Coming Soon</div>;
        }
    };

    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <div className="user-welcome">
                    <h1>{t('hello')}, {user.name} 👋</h1>
                    <p>{t('dashboard_welcome')}</p>
                </div>
                <button className="btn btn-secondary text-red-400 hover:bg-red-500/10" onClick={handleLogout}>
                    <LogOut size={18} />
                    {t('logout')}
                </button>
            </div>

            <div className="dashboard-grid">
                <div className="dashboard-sidebar">
                    <div
                        className={`sidebar-item ${activeTab === 'bookings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('bookings')}
                    >
                        <Calendar size={20} />
                        <span>{t('my_bookings')}</span>
                    </div>
                    <div
                        className={`sidebar-item ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        <User size={20} />
                        <span>{t('profile')}</span>
                    </div>
                    <div className="sidebar-item">
                        <CreditCard size={20} />
                        <span>{t('payments')}</span>
                    </div>
                    <div className="sidebar-item">
                        <Bell size={20} />
                        <span>{t('notifications')}</span>
                    </div>
                    <div className="sidebar-item">
                        <Settings size={20} />
                        <span>{t('settings')}</span>
                    </div>
                </div>

                <div className="dashboard-content">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};
