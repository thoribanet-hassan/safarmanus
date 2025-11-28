import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Users, Bell, LayoutDashboard, LogOut } from 'lucide-react';

// Pages
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import PriceAlerts from './pages/PriceAlerts';

const Sidebar: React.FC = () => {
    const location = useLocation();

    const NavLink: React.FC<{ to: string, icon: React.ReactNode, label: string }> = ({ to, icon, label }) => (
        <Link to={to} className={location.pathname === to ? 'active' : ''}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {icon}
                <span>{label}</span>
            </div>
        </Link>
    );

    return (
        <div className="sidebar">
            <h2>لوحة المسؤول</h2>
            <nav>
                <NavLink to="/admin" icon={<LayoutDashboard size={20} />} label="الرئيسية" />
                <NavLink to="/admin/users" icon={<Users size={20} />} label="إدارة المستخدمين" />
                <NavLink to="/admin/alerts" icon={<Bell size={20} />} label="تنبيهات الأسعار" />
            </nav>
            <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #34495e' }}>
                <a href="#" onClick={() => alert('Logout functionality goes here')}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <LogOut size={20} />
                        <span>تسجيل الخروج</span>
                    </div>
                </a>
            </div>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <div className="admin-layout">
            <Sidebar />
            <main className="main-content">
                <Routes>
                    <Route path="/admin" element={<Dashboard />} />
                    <Route path="/admin/users" element={<UserManagement />} />
                    <Route path="/admin/alerts" element={<PriceAlerts />} />
                    {/* Redirect to dashboard if path is root */}
                    <Route path="/" element={<Dashboard />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;
