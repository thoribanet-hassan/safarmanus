import React from 'react';

const Dashboard: React.FC = () => {
    return (
        <div>
            <h1>لوحة التحكم الرئيسية</h1>
            <p>مرحباً بك أيها المسؤول. هذه نظرة عامة على النظام.</p>

            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <div className="card" style={{ flex: 1, backgroundColor: '#e8f5e9' }}>
                    <h2>إجمالي المستخدمين</h2>
                    <p style={{ fontSize: '2em', color: '#2ecc71' }}>1,245</p>
                </div>
                <div className="card" style={{ flex: 1, backgroundColor: '#e3f2fd' }}>
                    <h2>تنبيهات الأسعار النشطة</h2>
                    <p style={{ fontSize: '2em', color: '#3498db' }}>450</p>
                </div>
                <div className="card" style={{ flex: 1, backgroundColor: '#fff3e0' }}>
                    <h2>الرحلات المحجوزة (شهر)</h2>
                    <p style={{ fontSize: '2em', color: '#f39c12' }}>89</p>
                </div>
            </div>

            <div className="card" style={{ marginTop: '20px' }}>
                <h2>سجل النشاط الأخير</h2>
                <p>سجل وهمي للنشاطات الأخيرة في النظام.</p>
            </div>
        </div>
    );
};

export default Dashboard;
