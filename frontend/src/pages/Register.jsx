import { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

export default function Register({ setUserId, setUserName }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/register', { name, email, password });
            localStorage.setItem('user_id', res.data.user_id);
            localStorage.setItem('user_name', res.data.name);
            setUserId(res.data.user_id);
            setUserName(res.data.name);
            navigate('/feed');
        } catch (err) {
            alert(err.response?.data?.message || 'Ошибка регистрации');
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
            <div className="card w-full max-w-md p-8 animate-fade-in">
                <div className="text-center mb-8">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Создать аккаунт</h2>
                    <p className="text-gray-400">Получите 100 коинов в подарок! 🎁</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Имя</label>
                        <input 
                            type="text" 
                            className="input-field w-full" 
                            value={name} 
                            onChange={e => setName(e.target.value)}
                            placeholder="Иван Иванов"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <input 
                            type="email" 
                            className="input-field w-full" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Пароль</label>
                        <input 
                            type="password" 
                            className="input-field w-full" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    
                    <button type="submit" className="btn-primary w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                        Зарегистрироваться
                    </button>
                </form>
                
                <p className="mt-6 text-center text-gray-400">
                    Уже есть аккаунт?{' '}
                    <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">
                        Войти
                    </Link>
                </p>
            </div>
        </div>
    );
}