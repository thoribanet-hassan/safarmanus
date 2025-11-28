import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage} from '../contexts/LanguageContext';
import { Mail, Lock, User, ArrowRight, Loader } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './AuthPage.css';

export const AuthPage = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            const userData = {
                id: '1',
                name: isLogin ? 'Test User' : formData.name,
                email: formData.email,
                avatar: 'https://ui-avatars.com/api/?name=' + (isLogin ? 'Test User' : formData.name)
            };

            login(userData);
            setIsLoading(false);
            navigate('/dashboard');
        }, 1500);
    };

    return (
        <div className="auth-page">
            <div className="auth-card animate-fade-in">
                <div className="auth-header">
                    <div className="auth-logo">✈️</div>
                    <h1 className="auth-title">{t('brand')}</h1>
                    <p className="auth-subtitle">{isLogin ? t('welcome_back') : t('create_account')}</p>
                </div>

                <div className="auth-tabs">
                    <div
                        className={`auth-tab ${isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(true)}
                    >
                        {t('login')}
                    </div>
                    <div
                        className={`auth-tab ${!isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(false)}
                    >
                        {t('register')}
                    </div>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group animate-fade-in">
                            <label className="form-label">{t('full_name')}</label>
                            <div className="form-input-wrapper">
                                <User size={18} className="input-icon" />
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder={t('name_placeholder')}
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required={!isLogin}
                                />
                            </div>
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label">{t('email')}</label>
                        <div className="form-input-wrapper">
                            <Mail size={18} className="input-icon" />
                            <input
                                type="email"
                                className="form-input"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">{t('password')}</label>
                        <div className="form-input-wrapper">
                            <Lock size={18} className="input-icon" />
                            <input
                                type="password"
                                className="form-input"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="submit-btn" disabled={isLoading}>
                        {isLoading ? <Loader className="animate-spin" /> : (
                            <>
                                {isLogin ? t('login_btn') : t('register_btn')}
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        {isLogin ? t('no_account') : t('have_account')}
                        <span
                            className="auth-link cursor-pointer"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? t('register_now') : t('login_now')}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};
