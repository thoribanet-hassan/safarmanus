import React, { useState, useEffect } from 'react';
import { Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { getUsers, updateUserStatus, deleteUser } from '../services/backendAPI';

interface User {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'provider' | 'admin';
    status: 'Active' | 'Suspended';
}

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const fetchedUsers = await getUsers();
            setUsers(fetchedUsers);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm(`هل أنت متأكد من حذف المستخدم رقم ${id}؟`)) {
            try {
                await deleteUser(id);
                setUsers(users.filter(user => user._id !== id));
            } catch (error) {
                alert('فشل حذف المستخدم');
            }
        }
    };

    const handleToggleStatus = async (id: string) => {
        const userToUpdate = users.find(u => u._id === id);
        if (!userToUpdate) return;

        const newStatus = userToUpdate.status === 'Active' ? 'Suspended' : 'Active';
        
        try {
            await updateUserStatus(id, newStatus);
            setUsers(users.map(u => u._id === id ? { ...u, status: newStatus } : u));
        } catch (error) {
            alert('فشل تحديث حالة المستخدم');
        }
    };

    if (isLoading) return <div>جاري تحميل بيانات المستخدمين...</div>;

    return (
        <div>
            <h1>إدارة المستخدمين</h1>
            <div className="card">
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>الاسم</th>
                                <th>البريد الإلكتروني</th>
                                <th>الدور</th>
                                <th>الحالة</th>
                                <th>الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user._id.substring(0, 8)}...</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role === 'admin' ? 'مسؤول' : user.role === 'provider' ? 'مزود سفر' : 'مستخدم عادي'}</td>
                                    <td>
                                        <span style={{ color: user.status === 'Active' ? 'green' : 'red' }}>
                                            {user.status === 'Active' ? 'نشط' : 'موقوف'}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="btn btn-primary" style={{ backgroundColor: '#3498db' }} onClick={() => alert(`تعديل المستخدم ${user.name}`)}>
                                            <Edit size={16} />
                                        </button>
                                        <button 
                                            className="btn" 
                                            style={{ backgroundColor: user.status === 'Active' ? '#f39c12' : '#2ecc71' }}
                                            onClick={() => handleToggleStatus(user._id)}
                                        >
                                            {user.status === 'Active' ? <XCircle size={16} /> : <CheckCircle size={16} />}
                                        </button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>
                                            <Trash2 size={16} />
                                        </button>
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

export default UserManagement;
