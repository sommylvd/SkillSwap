import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login({ setUserId, setUserName }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/login', { email, password });
            localStorage.setItem('user_id', res.data.user_id);
            localStorage.setItem('user_name', res.data.name);
            setUserId(res.data.user_id);
            setUserName(res.data.name);
            navigate('/feed');
        } catch (err) {
            alert(err.response?.data?.message || 'Ошибка входа');
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
            <div className="card w-full max-w-md p-8 animate-fade-in">
                <div className="text-center mb-8">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">С возвращением!</h2>
                    <p className="text-gray-400">Войдите в свой аккаунт</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
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
                    
                    <button type="submit" className="btn-primary w-full">
                        Войти
                    </button>
                </form>
                
                <p className="mt-6 text-center text-gray-400">
                    Нет аккаунта?{' '}
                    <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium">
                        Зарегистрироваться
                    </Link>
                </p>
            </div>
        </div>
    );
}

import { Link } from 'react-router-dom';