import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import CreateService from './pages/CreateService';

function App() {
  const [userId, setUserId] = useState(localStorage.getItem('user_id'));
  const [userName, setUserName] = useState(localStorage.getItem('user_name'));

  useEffect(() => {
    const handleStorage = () => {
      setUserId(localStorage.getItem('user_id'));
      setUserName(localStorage.getItem('user_name'));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const logout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    setUserId(null);
    setUserName(null);
    window.location.reload();
  };

  return (
    <BrowserRouter>
      <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                SkillSwap
              </h1>
            </div>
            
            <div className="flex items-center space-x-2">
              {userId ? (
                <>
                  <span className="hidden md:flex items-center bg-gray-700 px-3 py-1.5 rounded-lg">
                    <svg className="w-4 h-4 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                    <span className="text-gray-200 text-sm">{userName}</span>
                  </span>
                  <Link to="/feed" className="nav-link">Лента</Link>
                  <Link to="/create" className="nav-link">Создать</Link>
                  <Link to="/profile" className="nav-link">Профиль</Link>
                  <button onClick={logout} className="ml-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium">
                    Выход
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link">Вход</Link>
                  <Link to="/register" className="btn-primary ml-2">Регистрация</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <div className="min-h-screen bg-gray-900">
        <Routes>
          <Route path="/login" element={<Login setUserId={setUserId} setUserName={setUserName} />} />
          <Route path="/register" element={<Register setUserId={setUserId} setUserName={setUserName} />} />
          <Route path="/feed" element={<Feed userId={userId} />} />
          <Route path="/profile" element={<Profile userId={userId} />} />
          <Route path="/create" element={<CreateService userId={userId} />} />
          <Route path="/" element={<Feed userId={userId} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;