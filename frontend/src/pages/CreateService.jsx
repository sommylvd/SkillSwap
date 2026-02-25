import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function CreateService({ userId }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            alert('Нужно войти в систему!');
            return;
        }
        try {
            await api.post('/services', { 
                user_id: userId, 
                title, 
                description, 
                price: parseInt(price), 
                category, 
                is_active: true 
            });
            alert('✅ Услуга создана!');
            navigate('/feed');
        } catch (err) {
            alert('Ошибка создания услуги');
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <div className="card p-8 animate-fade-in">
                <div className="text-center mb-8">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-600 w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Создать услугу</h2>
                    <p className="text-gray-400">Поделитесь своими навыками с другими</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Название услуги</label>
                        <input 
                            type="text" 
                            className="input-field w-full" 
                            value={title} 
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Научу играть на гитаре"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Описание</label>
                        <textarea 
                            className="input-field w-full" 
                            value={description} 
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Расскажите подробно о вашей услуге..."
                            rows="5"
                            required
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Цена (коины)</label>
                            <input 
                                type="number" 
                                className="input-field w-full" 
                                value={price} 
                                onChange={e => setPrice(e.target.value)}
                                placeholder="50"
                                min="1"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Категория</label>
                            <input 
                                type="text" 
                                className="input-field w-full" 
                                value={category} 
                                onChange={e => setCategory(e.target.value)}
                                placeholder="music, math, programming..."
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="flex space-x-4 pt-4">
                        <button type="submit" className="btn-primary flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                            Опубликовать
                        </button>
                        <button 
                            type="button"
                            onClick={() => navigate('/feed')}
                            className="btn-secondary flex-1"
                        >
                            Отмена
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}