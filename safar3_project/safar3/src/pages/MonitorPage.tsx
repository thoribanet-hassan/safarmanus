import { useState } from 'react';
import { Bell, Trash2, TrendingDown, TrendingUp, Plus } from 'lucide-react';
import { useLanguage} from '../contexts/LanguageContext';
import './MonitorPage.css';

type MonitorType = 'flight' | 'hotel' | 'train';

interface PriceAlert {
    id: string;
    type: MonitorType;
    route: string;
    currentPrice: number;
    targetPrice: number;
    currency: string;
    priceChange: number;
    lastChecked: string;
}

export const MonitorPage = () => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<MonitorType>('flight');

    // Mock data
    const [alerts, setAlerts] = useState<PriceAlert[]>([
        {
            id: '1',
            type: 'flight',
            route: 'JED → DXB',
            currentPrice: 1200,
            targetPrice: 1000,
            currency: 'SAR',
            priceChange: 20,
            lastChecked: '2025-11-25'
        },
        {
            id: '2',
            type: 'hotel',
            route: 'Hilton Dubai',
            currentPrice: 850,
            targetPrice: 700,
            currency: 'SAR',
            priceChange: -15,
            lastChecked: '2025-11-25'
        },
        {
            id: '3',
            type: 'train',
            route: 'Riyadh → Jeddah',
            currentPrice: 350,
            targetPrice: 300,
            currency: 'SAR',
            priceChange: 10,
            lastChecked: '2025-11-25'
        }
    ]);

    const handleDelete = (id: string) => {
        setAlerts(alerts.filter(a => a.id !== id));
    };

    const filteredAlerts = alerts.filter(a => a.type === activeTab);
    const activeAlerts = alerts.filter(a => a.currentPrice > a.targetPrice).length;
    const targetReached = alerts.filter(a => a.currentPrice <= a.targetPrice).length;

    return (
        <div className="flights-page">
            <div className="flights-hero">
                <h1 className="animate-fade-in">📊 {t('monitor_title')}</h1>
                <p>{t('monitor_subtitle')}</p>
            </div>

            {/* Stats Dashboard */}
            <div className="search-container">
                <div className="simple-search-form glass-card">
                    <div className="monitor-stats-row mb-6">
                        <div className="stat-card">
                            <span className="stat-value text-blue-400">{alerts.length}</span>
                            <span className="stat-label">{t('active_alerts')}</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-value text-green-400">{targetReached}</span>
                            <span className="stat-label">{t('target_reached')}</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-value text-purple-400">{activeAlerts}</span>
                            <span className="stat-label">{t('monitoring')}</span>
                        </div>
                    </div>

                    {/* Tab Selector */}
                    <div className="trip-type-selector mb-6 flex gap-4 border-b border-white/10 pb-4">
                        <button
                            className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'flight'
                                    ? 'bg-blue-500/20 text-blue-400 border border-blue-400'
                                    : 'text-white/70 hover:text-white'
                                }`}
                            onClick={() => setActiveTab('flight')}
                        >
                            ✈️ {t('nav_flights')}
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'hotel'
                                    ? 'bg-blue-500/20 text-blue-400 border border-blue-400'
                                    : 'text-white/70 hover:text-white'
                                }`}
                            onClick={() => setActiveTab('hotel')}
                        >
                            🏨 {t('nav_hotels')}
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'train'
                                    ? 'bg-blue-500/20 text-blue-400 border border-blue-400'
                                    : 'text-white/70 hover:text-white'
                                }`}
                            onClick={() => setActiveTab('train')}
                        >
                            🚄 {t('nav_trains')}
                        </button>
                    </div>

                    {/* Alerts List */}
                    <div className="alerts-container">
                        {filteredAlerts.length === 0 ? (
                            <div className="empty-state text-center py-12">
                                <Bell size={64} className="mx-auto mb-4 text-white/20" />
                                <h3 className="text-xl text-white/70 mb-2">
                                    {t('active_alerts')} (0)
                                </h3>
                                <p className="text-white/50">
                                    لا توجد تنبيهات نشطة حالياً
                                </p>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {filteredAlerts.map((alert) => {
                                    const priceChangePercent = ((alert.currentPrice - alert.targetPrice) / alert.targetPrice * 100).toFixed(1);
                                    const isAboveTarget = alert.currentPrice > alert.targetPrice;

                                    return (
                                        <div
                                            key={alert.id}
                                            className="glass-panel p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all"
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h3 className="text-white font-bold text-lg mb-1">
                                                        {alert.route}
                                                    </h3>
                                                    <p className="text-white/50 text-sm">
                                                        آخر فحص: {alert.lastChecked}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => handleDelete(alert.id)}
                                                    className="text-red-400 hover:text-red-300 transition-colors p-2"
                                                    title={t('delete')}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 mb-3">
                                                <div>
                                                    <span className="text-xs text-white/50 block mb-1">
                                                        {t('current_price')}
                                                    </span>
                                                    <span className="text-blue-400 font-bold text-xl">
                                                        {alert.currentPrice} {alert.currency}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-xs text-white/50 block mb-1">
                                                        {t('target_price')}
                                                    </span>
                                                    <span className="text-green-400 font-bold text-xl">
                                                        {alert.targetPrice} {alert.currency}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center pt-3 border-t border-white/5">
                                                {isAboveTarget ? (
                                                    <span className="text-xs text-yellow-500 bg-yellow-500/10 px-3 py-1.5 rounded flex items-center gap-1">
                                                        <TrendingUp size={14} />
                                                        {t('price_higher')} {priceChangePercent}%
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-green-500 bg-green-500/10 px-3 py-1.5 rounded flex items-center gap-1">
                                                        <TrendingDown size={14} />
                                                        🎯 {t('target_reached')}!
                                                    </span>
                                                )}
                                                <span className="text-[10px] text-white/30">
                                                    منذ 0 ساعة
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Add New Alert Button */}
                    <button className="btn btn-primary w-full mt-6">
                        <Plus size={20} />
                        {t('add_alert')}
                    </button>
                </div>
            </div>
        </div>
    );
};
