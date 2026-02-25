import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Feed({ userId }) {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {
        try {
            const res = await api.get('/services');
            setServices(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleBuy = async (id, price) => {
        if (!userId) {
            alert('Сначала войдите в систему!');
            return;
        }
        if (!confirm(`Купить услугу за ${price} коинов?`)) {
            return;
        }
        try {
            await api.post(`/services/${id}/buy`, { buyer_id: userId });
            alert('✅ Успешно! Коины списаны.');
            loadServices();
        } catch (err) {
            alert(err.response?.data?.message || 'Ошибка покупки');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">📋 Лента услуг</h2>
                <p className="text-gray-400">Найдите навыки, которые вам нужны</p>
            </div>
            
            {services.length === 0 ? (
                <div className="card p-12 text-center">
                    <div className="text-gray-500 text-6xl mb-4">📭</div>
                    <h3 className="text-xl font-semibold text-white mb-2">Пока нет услуг</h3>
                    <p className="text-gray-400 mb-6">Будьте первым, кто создаст услугу!</p>
                    <Link to="/create" className="btn-primary inline-block">
                        Создать услугу
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((s, index) => (
                        <div key={s.id} className="card p-6 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                            <div className="flex items-start justify-between mb-4">
                                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    {s.category}
                                </div>
                                <div className="flex items-center text-yellow-400 font-bold text-lg">
                                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                    </svg>
                                    {s.price}
                                </div>
                            </div>
                            
                            <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-3">{s.description}</p>
                            
                            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                                <div className="flex items-center space-x-2">
                                    <div className="bg-gray-700 rounded-full p-2">
                                        <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-300 text-sm">{s.user?.name}</span>
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => handleBuy(s.id, s.price)} 
                                className="btn-primary w-full mt-4"
                            >
                                Купить услугу
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

import { Link } from 'react-router-dom';