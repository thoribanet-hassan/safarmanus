import React, { useState, useEffect } from 'react';
import { BellOff, CheckCircle, Clock } from 'lucide-react';
import { getPriceAlerts, deactivateAlert } from '../services/backendAPI';

interface PriceAlert {
    _id: string;
    userEmail: string;
    route: string;
    targetPrice: number;
    currentPrice: number;
    status: 'Active' | 'Triggered' | 'Expired';
    type: 'Monitor' | 'Sniper';
}

const PriceAlerts: React.FC = () => {
    const [alerts, setAlerts] = useState<PriceAlert[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAlerts = async () => {
        setIsLoading(true);
        try {
            const fetchedAlerts = await getPriceAlerts();
            setAlerts(fetchedAlerts);
        } catch (error) {
            console.error('Failed to fetch alerts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAlerts();
    }, []);

    const handleDeactivate = async (id: string) => {
        if (window.confirm(`هل أنت متأكد من إلغاء تنبيه الأسعار رقم ${id}؟`)) {
            try {
                await deactivateAlert(id);
                setAlerts(alerts.map(alert => 
                    alert._id === id 
                        ? { ...alert, status: 'Expired' } 
                        : alert
                ));
            } catch (error) {
                alert('فشل إلغاء التنبيه');
            }
        }
    };

    const getStatusIcon = (status: PriceAlert['status']) => {
        switch (status) {
            case 'Active':
                return <Clock size={16} color="#3498db" />;
            case 'Triggered':
                return <CheckCircle size={16} color="#2ecc71" />;
            case 'Expired':
                return <BellOff size={16} color="#e74c3c" />;
            default:
                return null;
        }
    };

    if (isLoading) return <div>جاري تحميل تنبيهات الأسعار...</div>;

    return (
        <div>
            <h1>إدارة تنبيهات الأسعار</h1>
            <div className="card">
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>البريد الإلكتروني للمستخدم</th>
                                <th>المسار</th>
                                <th>السعر المستهدف</th>
                                <th>السعر الحالي</th>
                                <th>النوع</th>
                                <th>الحالة</th>
                                <th>الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alerts.map(alert => (
                                <tr key={alert._id}>
                                    <td>{alert._id.substring(0, 8)}...</td>
                                    <td>{alert.userEmail}</td>
                                    <td>{alert.route}</td>
                                    <td>${alert.targetPrice}</td>
                                    <td>${alert.currentPrice}</td>
                                    <td>{alert.type === 'Monitor' ? 'مراقبة' : 'قناص'}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            {getStatusIcon(alert.status)}
                                            <span>{alert.status === 'Active' ? 'نشط' : alert.status === 'Triggered' ? 'تم التفعيل' : 'منتهي'}</span>
                                        </div>
                                    </td>
                                    <td>
                                        {alert.status === 'Active' && (
                                            <button className="btn btn-danger" onClick={() => handleDeactivate(alert._id)}>
                                                <BellOff size={16} /> إلغاء التفعيل
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PriceAlerts;
