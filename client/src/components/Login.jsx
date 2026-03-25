import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const { login, register } = useAuth(); // Exposed register for first-time setup
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isRegister, setIsRegister] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        let success;
        if (isRegister) {
            success = await register(formData.username, formData.password);
        } else {
            success = await login(formData.username, formData.password);
        }

        if (success) {
            navigate('/');
        } else {
            setError('Invalid Credentials or Server Error');
        }
    };

    return (
<div 
    className="min-h-screen flex items-center justify-center p-4"
    style={{
        backgroundImage: 'linear-gradient(to bottom right, #262764, #211a31, #29172c)'
    }}
>
                <div className="glass-panel p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                    {isRegister ? 'Admin Setup' : 'Admin Login'}
                </h2>
                {error && <p className="text-red-400 text-center mb-4">{error}</p>}

                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Username</label>
                        <input
                            type="text"
                            className="input-field"
                            value={formData.username}
                            onChange={e => setFormData({ ...formData, username: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                        <input
                            type="password"
                            className="input-field"
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary w-full">
                        {isRegister ? 'Create Admin Account' : 'Login'}
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-500 text-sm cursor-pointer hover:text-white" onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? 'Already have an account? Login' : 'Need to setup admin? Register'}
                </p>
            </div>
        </div>
    );
};

export default Login;
