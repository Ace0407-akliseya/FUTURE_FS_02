import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, LogOut, Search, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
    const location = useLocation();
    const { logout, user } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');

    const navItems = [
        { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
        { name: 'New Lead', path: '/add', icon: <PlusCircle size={20} /> },
    ];

    return (
        <div className="flex min-h-screen text-white/90 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white/1.5 backdrop-blur-xl border-r border-gray-600/30 p-6 hidden md:flex flex-col fixed h-full z-20 shadow-2xl">
                <div className="flex items-center gap-3 mb-10 px-2">
                    <img src="/crm-logo.svg" alt="CRM Logo" className="w-8 h-8 rounded-full shadow-lg shadow-gray-500/20" />
                    <h1 className="text-xl font-bold tracking-tight text-white">CRM</h1>
                </div>

                <nav className="space-y-2 flex-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${location.pathname === item.path
                                ? 'bg-gradient-to-r from-gray-600 to-gray-500 border border-gray-500/50 text-white shadow-lg shadow-gray-500/10'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <span className={`${location.pathname === item.path ? 'text-white' : 'text-gray-500 group-hover:text-white transition-colors'}`}>
                                {item.icon}
                            </span>
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="mt-auto pt-6 border-t border-gray-600/30">
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-red-400 transition-all duration-300"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Log Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Wrapper */}
            <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
                {/* Top Navbar */}
                <header className="h-20 px-6 md:px-10 flex items-center justify-between sticky top-0 z-10 bg-gray-900/80 backdrop-blur-md border-b border-gray-600/30">
                    {/* Search Bar */}
                    <div className="hidden md:flex items-center bg-white/5 border border-gray-600/30 rounded-full px-4 py-2 w-96 focus-within:bg-white/10 focus-within:border-gray-500/50 transition-all shadow-inner">
                        <Search size={18} className="text-gray-500 mr-3" />
                        <input
                            type="text"
                            placeholder="Global Search..."
                            className="bg-transparent border-none outline-none text-sm text-white w-full placeholder-gray-500 focus:ring-0"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Right Side Icons */}
                    <div className="flex items-center gap-6">
                        <div className="relative cursor-pointer group">
                            {/* Bell Icon SVG */}
                            <div className="text-gray-400 group-hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                            </div>
                            <div className="w-2 h-2 bg-red-500 rounded-full absolute top-0 right-0 animate-pulse border border-gray-900"></div>
                        </div>

                        <div className="flex items-center gap-3 pl-6 border-l border-gray-600/30">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-semibold text-white">{user?.username || 'Admin'}</p>
                                <p className="text-xs text-gray-500">Administrator</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-500 p-[2px] shadow-lg shadow-gray-500/20">
                                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                                    <User size={18} className="text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 md:p-10">
                    <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
