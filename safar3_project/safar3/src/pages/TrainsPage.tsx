import { useState } from 'react';
import { Search, Loader, Sparkles, Target, Bell } from 'lucide-react';
import { useLanguage} from '../contexts/LanguageContext';
import './TrainsPage.css';

interface TrainSearchParams {
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string;
    passengers: number;
}

export const TrainsPage = () => {
    const { t } = useLanguage();
    const [searchParams, setSearchParams] = useState<TrainSearchParams>({
        origin: '',
        destination: '',
        departureDate: '',
        returnDate: '',
        passengers: 1
    });

    const [showSmartSearchModal, setShowSmartSearchModal] = useState(false);
    const [showSniperModal, setShowSniperModal] = useState(false);
    const [showMonitorModal, setShowMonitorModal] = useState(false);
    const [smartQuery, setSmartQuery] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    const handleSearch = async () => {
        if (!searchParams.origin || !searchParams.destination || !searchParams.departureDate) {
            setError(t('please_fill_all_fields'));
            return;
        }

        setIsLoading(true);
        setError('');

        setTimeout(() => {
            setIsLoading(false);
            setError(t('service_suspended'));
        }, 1500);
    };

    const handleSmartSearch = async () => {
        if (!smartQuery.trim()) {
            setError(t('smart_search_placeholder'));
            return;
        }

        setIsLoading(true);
        setError('');

        setTimeout(() => {
            setIsLoading(false);
            setShowSmartSearchModal(false);
            setError(t('service_suspended'));
        }, 1500);
    };

    const handleSniperSubmit = async () => {
        if (!searchParams.origin || !searchParams.destination) {
            setError('يرجى تحديد المحطات');
            return;
        }

        setIsLoading(true);
        setError('');

        setTimeout(() => {
            setIsLoading(false);
            setSuccessMessage('تم تفعيل صائد القطارات بنجاح!');
            setShowSniperModal(false);
        }, 1500);
    };

    const handleMonitorSubmit = async () => {
        if (!searchParams.origin || !searchParams.destination || !searchParams.departureDate) {
            setError('يرجى ملء بيانات البحث الأساسية أولاً');
            return;
        }

        setIsLoading(true);
        setError('');

        setTimeout(() => {
            setIsLoading(false);
            setSuccessMessage(`تم تفعيل مراقبة الأسعار للقطارات من ${searchParams.origin} إلى ${searchParams.destination}`);
            setShowMonitorModal(false);
        }, 1500);
    };

    return (
        <div className="flights-page">
            <div className="flights-hero">
                <h1 className="animate-fade-in">🚄 {t('trains_title')}</h1>
                <p>{t('trains_subtitle')}</p>
            </div>

            <div className="search-container">
                <div className="simple-search-form glass-card">
                    <h3>{t('basic_information')}</h3>

                    <div className="input-row">
                        <div className="input-group">
                            <label>{t('station_origin')}</label>
                            <input
                                type="text"
                                className="simple-input"
                                placeholder={t('origin_placeholder')}
                                value={searchParams.origin}
                                onChange={(e) => setSearchParams({ ...searchParams, origin: e.target.value })}
                            />
                        </div>
                        <div className="input-group">
                            <label>{t('station_dest')}</label>
                            <input
                                type="text"
                                className="simple-input"
                                placeholder={t('destination_placeholder')}
                                value={searchParams.destination}
                                onChange={(e) => setSearchParams({ ...searchParams, destination: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="input-row">
                        <div className="input-group">
                            <label>{t('departure_date')}</label>
                            <input
                                type="date"
                                className="simple-input"
                                value={searchParams.departureDate}
                                onChange={(e) => setSearchParams({ ...searchParams, departureDate: e.target.value })}
                            />
                        </div>
                        <div className="input-group">
                            <label>{t('return_date')} ({t('optional')})</label>
                            <input
                                type="date"
                                className="simple-input"
                                value={searchParams.returnDate}
                                onChange={(e) => setSearchParams({ ...searchParams, returnDate: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="input-row">
                        <div className="input-group">
                            <label>{t('passengers')}</label>
                            <input
                                type="number"
                                className="simple-input"
                                min="1"
                                max="10"
                                value={searchParams.passengers}
                                onChange={(e) => setSearchParams({ ...searchParams, passengers: parseInt(e.target.value) || 1 })}
                            />
                        </div>
                    </div>

                    <button className="btn btn-primary w-full mt-4" onClick={handleSearch} disabled={isLoading}>
                        {isLoading ? <Loader className="animate-spin" /> : <Search size={20} />}
                        {t('search_trains_btn')}
                    </button>
                </div>

                <div className="search-buttons">
                    <button
                        className="search-btn-option smart-btn"
                        onClick={() => setShowSmartSearchModal(true)}
                        disabled={isLoading}
                    >
                        <Sparkles size={24} />
                        <div className="btn-text">
                            <strong>{t('smart_search_btn')}</strong>
                            <span>{t('smart_search_desc')}</span>
                        </div>
                    </button>

                    <button
                        className="search-btn-option sniper-btn"
                        onClick={() => setShowSniperModal(true)}
                        disabled={isLoading}
                    >
                        <Target size={24} />
                        <div className="btn-text">
                            <strong>{t('train_sniper_btn')}</strong>
                            <span>مراقبة مستمرة حتى نجد تذكرتك</span>
                        </div>
                    </button>

                    <button
                        className="search-btn-option monitor-btn"
                        onClick={() => setShowMonitorModal(true)}
                        disabled={isLoading}
                    >
                        <Bell size={24} />
                        <div className="btn-text">
                            <strong>{t('price_monitor_btn')}</strong>
                            <span>{t('price_monitor_desc')}</span>
                        </div>
                    </button>
                </div>
            </div>

            {/* مودال البحث الذكي */}
            {showSmartSearchModal && (
                <div className="modal-overlay" onClick={() => setShowSmartSearchModal(false)}>
                    <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <Sparkles size={24} className="text-purple-400" />
                            <h3>{t('smart_search')}</h3>
                        </div>

                        <div className="filter-section">
                            <label>{t('write_request_detail')}</label>
                            <textarea
                                className="simple-input smart-textarea"
                                placeholder={t('smart_search_placeholder')}
                                value={smartQuery}
                                onChange={(e) => setSmartQuery(e.target.value)}
                                rows={4}
                            />
                        </div>

                        <div className="modal-actions">
                            <button className="btn btn-secondary" onClick={() => setShowSmartSearchModal(false)}>
                                {t('cancel')}
                            </button>
                            <button className="btn btn-primary" onClick={handleSmartSearch}>
                                {t('search_for_me')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* مودال صائد القطارات */}
            {showSniperModal && (
                <div className="modal-overlay" onClick={() => setShowSniperModal(false)}>
                    <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <Target size={24} className="text-red-400" />
                            <h3>{t('train_sniper_btn')}</h3>
                        </div>

                        <p className="modal-desc">{t('sniper_description')}</p>

                        <div className="input-row">
                            <div className="filter-section w-half">
                                <label>{t('from')}</label>
                                <input
                                    type="text"
                                    className="simple-input"
                                    placeholder={t('origin_placeholder')}
                                    value={searchParams.origin}
                                    onChange={(e) => setSearchParams({ ...searchParams, origin: e.target.value })}
                                />
                            </div>
                            <div className="filter-section w-half">
                                <label>{t('to')}</label>
                                <input
                                    type="text"
                                    className="simple-input"
                                    placeholder={t('destination_placeholder')}
                                    value={searchParams.destination}
                                    onChange={(e) => setSearchParams({ ...searchParams, destination: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="filter-section">
                            <label>{t('max_price')}</label>
                            <input
                                type="number"
                                className="simple-input"
                                placeholder="500"
                            />
                        </div>

                        <div className="modal-actions">
                            <button className="btn btn-secondary" onClick={() => setShowSniperModal(false)}>
                                {t('cancel')}
                            </button>
                            <button className="btn btn-primary sniper-action-btn" onClick={handleSniperSubmit}>
                                <Target size={18} />
                                {t('start_hunting')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* مودال مراقبة الأسعار */}
            {showMonitorModal && (
                <div className="modal-overlay" onClick={() => setShowMonitorModal(false)}>
                    <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <Bell size={24} className="text-yellow-400" />
                            <h3>{t('monitor_title')}</h3>
                        </div>

                        <p className="modal-desc">{t('monitor_description')}</p>

                        <div className="filter-section">
                            <label>{t('route')}</label>
                            <div className="p-3 bg-white/10 rounded-lg text-center">
                                {searchParams.origin || '---'} → {searchParams.destination || '---'}
                            </div>
                        </div>

                        <div className="filter-section">
                            <label>{t('target_price')} (ريال)</label>
                            <input
                                type="number"
                                className="simple-input"
                                placeholder="مثال: 300"
                            />
                        </div>

                        <div className="modal-actions">
                            <button className="btn btn-secondary" onClick={() => setShowMonitorModal(false)}>
                                {t('cancel')}
                            </button>
                            <button className="btn btn-primary monitor-action-btn" onClick={handleMonitorSubmit}>
                                <Bell size={16} />
                                {t('create_alert')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <div className="error-message glass-card animate-fade-in">
                    <p>⚠️ {error}</p>
                </div>
            )}

            {successMessage && (
                <div className="success-message glass-card animate-fade-in">
                    <Bell size={20} />
                    <p>{successMessage}</p>
                </div>
            )}
        </div>
    );
};
