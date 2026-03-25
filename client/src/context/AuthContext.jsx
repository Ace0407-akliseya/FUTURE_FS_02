import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    // Set default axios header
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            axios.defaults.headers.common['x-auth-token'] = token;
            setUser({ id: 'admin' }); // For now just mock user presence if token exists
            setLoading(false);
        } else {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['x-auth-token'];
            setUser(null);
            setLoading(false);
        }
    }, [token]);

    const login = async (username, password) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            setToken(res.data.token);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const register = async (username, password) => { // Temporary for setup
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', { username, password });
            setToken(res.data.token);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
