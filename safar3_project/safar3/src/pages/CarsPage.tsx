import { useState } from 'react';
import { Search, Loader, Sparkles, Target, Bell } from 'lucide-react';
import { useLanguage} from '../contexts/LanguageContext';
import './CarsPage.css';

interface CarSearchParams {
    pickupLocation: string;
    dropoffLocation: string;
    pickupDate: string;
    pickupTime: string;
    dropoffDate: string;
    dropoffTime: string;
    driverAge: number;
    carType: string;
    sameLocation: boolean;
}

export const CarsPage = () => {
    const { t } = useLanguage();
    const [searchParams, setSearchParams] = useState<CarSearchParams>({
        pickupLocation: '',
        dropoffLocation: '',
        pickupDate: '',
        pickupTime: '10:00',
        dropoffDate: '',
        dropoffTime: '10:00',
        driverAge: 25,
        carType: 'any',
        sameLocation: true
    });

    const [showSmartSearchModal, setShowSmartSearchModal] = useState(false);
    const [showSniperModal, setShowSniperModal] = useState(false);
    const [showMonitorModal, setShowMonitorModal] = useState(false);
    const [smartQuery, setSmartQuery] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    const handleSearch = async () => {
        if (!searchParams.pickupLocation || !searchParams.pickupDate || !searchParams.dropoffDate) {
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
        if (!searchParams.pickupLocation) {
            setError('يرجى تحديد موقع الاستلام');
            return;
        }

        setIsLoading(true);
        setError('');

        setTimeout(() => {
            setIsLoading(false);
            setSuccessMessage('تم تفعيل صائد السيارات بنجاح!');
            setShowSniperModal(false);
        }, 1500);
    };

    const handleMonitorSubmit = async () => {
        if (!searchParams.pickupLocation || !searchParams.pickupDate || !searchParams.dropoffDate) {
            setError('يرجى ملء بيانات البحث الأساسية أولاً');
            return;
        }

        setIsLoading(true);
        setError('');

        setTimeout(() => {
            setIsLoading(false);
            setSuccessMessage(`تم تفعيل مراقبة الأسعار في ${searchParams.pickupLocation}`);
            setShowMonitorModal(false);
        }, 1500);
    };

    return (
        <div className="flights-page">
            <div className="flights-hero">
                <h1 className="animate-fade-in">🚗 {t('cars_title')}</h1>
                <p>{t('cars_subtitle')}</p>
                <p className="text-sm text-white/60 mt-2">{t('car_rental_companies')}</p>
            </div>

            <div className="search-container">
                <div className="simple-search-form glass-card">
                    <h3>{t('basic_information')}</h3>

                    {/* Location */}
                    <div className="input-row">
                        <div className="input-group">
                            <label>{t('pickup_location')}</label>
                            <input
                                type="text"
                                className="simple-input"
                                placeholder={t('location_placeholder')}
                                value={searchParams.pickupLocation}
                                onChange={(e) => setSearchParams({ ...searchParams, pickupLocation: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Same location checkbox */}
                    <div className="mb-4">
                        <label className="flex items-center gap-2 text-white/80 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={searchParams.sameLocation}
                                onChange={(e) => setSearchParams({
                                    ...searchParams,
                                    sameLocation: e.target.checked,
                                    dropoffLocation: e.target.checked ? searchParams.pickupLocation : ''
                                })}
                                className="accent-blue-500"
                            />
                            {t('same_as_pickup')}
                        </label>
                    </div>

                    {!searchParams.sameLocation && (
                        <div className="input-row">
                            <div className="input-group">
                                <label>{t('dropoff_location')}</label>
                                <input
                                    type="text"
                                    className="simple-input"
                                    placeholder={t('location_placeholder')}
                                    value={searchParams.dropoffLocation}
                                    onChange={(e) => setSearchParams({ ...searchParams, dropoffLocation: e.target.value })}
                                />
                            </div>
                        </div>
                    )}

                    {/* Pickup Date & Time */}
                    <div className="input-row">
                        <div className="input-group">
                            <label>{t('pickup_date')}</label>
                            <input
                                type="date"
                                className="simple-input"
                                value={searchParams.pickupDate}
                                onChange={(e) => setSearchParams({ ...searchParams, pickupDate: e.target.value })}
                            />
                        </div>
                        <div className="input-group">
                            <label>{t('pickup_time')}</label>
                            <input
                                type="time"
                                className="simple-input"
                                value={searchParams.pickupTime}
                                onChange={(e) => setSearchParams({ ...searchParams, pickupTime: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Dropoff Date & Time */}
                    <div className="input-row">
                        <div className="input-group">
                            <label>{t('dropoff_date')}</label>
                            <input
                                type="date"
                                className="simple-input"
                                value={searchParams.dropoffDate}
                                onChange={(e) => setSearchParams({ ...searchParams, dropoffDate: e.target.value })}
                            />
                        </div>
                        <div className="input-group">
                            <label>{t('dropoff_time')}</label>
                            <input
                                type="time"
                                className="simple-input"
                                value={searchParams.dropoffTime}
                                onChange={(e) => setSearchParams({ ...searchParams, dropoffTime: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Driver Age & Car Type */}
                    <div className="input-row">
                        <div className="input-group">
                            <label>{t('driver_age')}</label>
                            <input
                                type="number"
                                className="simple-input"
                                min="18"
                                max="99"
                                value={searchParams.driverAge}
                                onChange={(e) => setSearchParams({ ...searchParams, driverAge: parseInt(e.target.value) || 25 })}
                            />
                        </div>
                        <div className="input-group">
                            <label>{t('car_type')}</label>
                            <select
                                className="simple-input"
                                value={searchParams.carType}
                                onChange={(e) => setSearchParams({ ...searchParams, carType: e.target.value })}
                            >
                                <option value="any">{t('any_type')}</option>
                                <option value="compact">{t('compact')}</option>
                                <option value="sedan">{t('sedan')}</option>
                                <option value="suv">{t('suv')}</option>
                                <option value="luxury">{t('luxury')}</option>
                                <option value="van">{t('van')}</option>
                            </select>
                        </div>
                    </div>

                    <button className="btn btn-primary w-full mt-4" onClick={handleSearch} disabled={isLoading}>
                        {isLoading ? <Loader className="animate-spin" /> : <Search size={20} />}
                        {t('search_cars_btn')}
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
                            <strong>{t('car_sniper_btn')}</strong>
                            <span>{t('car_sniper_desc')}</span>
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
                                placeholder={t('smart_search_placeholder_cars')}
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

            {/* مودال صائد السيارات */}
            {showSniperModal && (
                <div className="modal-overlay" onClick={() => setShowSniperModal(false)}>
                    <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <Target size={24} className="text-red-400" />
                            <h3>{t('car_sniper_btn')}</h3>
                        </div>

                        <p className="modal-desc">{t('sniper_description')}</p>

                        <div className="filter-section">
                            <label>{t('pickup_location')}</label>
                            <input
                                type="text"
                                className="simple-input"
                                placeholder={t('location_placeholder')}
                                value={searchParams.pickupLocation}
                                onChange={(e) => setSearchParams({ ...searchParams, pickupLocation: e.target.value })}
                            />
                        </div>

                        <div className="filter-section">
                            <label>{t('max_price_daily')}</label>
                            <input
                                type="number"
                                className="simple-input"
                                placeholder="200"
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
                            <label>{t('pickup_location')}</label>
                            <div className="p-3 bg-white/10 rounded-lg text-center">
                                {searchParams.pickupLocation || '---'}
                            </div>
                        </div>

                        <div className="filter-section">
                            <label>{t('target_price_daily')}</label>
                            <input
                                type="number"
                                className="simple-input"
                                placeholder="مثال: 150"
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
