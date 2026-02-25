import { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function Profile({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userId) {
            api.get(`/profile/${userId}`)
                .then(res => {
                    console.log('Полученные данные:', res.data);
                    setUser(res.data);
                })
                .catch(err => {
                    console.error('Ошибка:', err);
                    alert('Ошибка загрузки профиля');
                })
                .finally(() => setLoading(false));
        }
    }, [userId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }
    
    if (!user) return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <div className="card p-8 text-center">
                <p className="text-red-400 text-lg">Ошибка загрузки профиля</p>
            </div>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            {/* Профиль */}
            <div className="card p-8 mb-6 animate-fade-in">
                <div className="flex items-center space-x-6">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-6">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold text-white mb-1">{user.name}</h2>
                        <p className="text-gray-400">{user.email}</p>
                    </div>
                    <div className="text-right">
                        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-4 inline-block">
                            <p className="text-white text-sm font-medium">Баланс</p>
                            <p className="text-white text-2xl font-bold">{user.coins} 💰</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Мои услуги */}
                <div className="card p-6 animate-fade-in" style={{animationDelay: '0.1s'}}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-white flex items-center">
                            <svg className="w-6 h-6 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Мои услуги
                        </h3>
                        <Link to="/create" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                            + Создать
                        </Link>
                    </div>
                    
                    {user.services && user.services.length > 0 ? (
                        <div className="space-y-3">
                            {user.services.map(s => (
                                <div key={s.id} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 hover:border-blue-500 transition-all duration-200">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-semibold text-white mb-1">{s.title}</h4>
                                            <p className="text-gray-400 text-sm">{s.category}</p>
                                        </div>
                                        <span className="text-yellow-400 font-bold">{s.price} 💰</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-500 text-4xl mb-3">📭</p>
                            <p className="text-gray-400 mb-4">У вас пока нет услуг</p>
                            <Link to="/create" className="btn-primary inline-block text-sm">
                                Создать первую услугу
                            </Link>
                        </div>
                    )}
                </div>

                {/* Купленные услуги */}
                <div className="card p-6 animate-fade-in" style={{animationDelay: '0.2s'}}>
                    <h3 className="text-xl font-bold text-white flex items-center mb-6">
                        <svg className="w-6 h-6 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Купленные услуги
                    </h3>
                    
                    {user.purchased_services && user.purchased_services.length > 0 ? (
                        <div className="space-y-3">
                            {user.purchased_services.map(transaction => (
                                <div key={transaction.id} className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-lg p-4 border border-green-700/50 hover:border-green-500 transition-all duration-200">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-semibold text-white mb-1">{transaction.service?.title || 'Услуга удалена'}</h4>
                                            <p className="text-gray-400 text-sm">
                                                От: <span className="text-gray-300">{transaction.service?.user?.name || 'Неизвестно'}</span>
                                            </p>
                                            {transaction.service?.category && (
                                                <span className="inline-block mt-2 bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                                                    {transaction.service.category}
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-yellow-400 font-bold">{transaction.amount} 💰</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-500 text-4xl mb-3">🛒</p>
                            <p className="text-gray-400">Вы пока ничего не купили</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}