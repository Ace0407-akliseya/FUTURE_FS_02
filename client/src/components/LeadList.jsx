import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, RefreshCw, Trash2, Eye, MoreHorizontal, Filter, Plus } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { Link } from 'react-router-dom';

const LeadList = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchLeads = async () => {
        try {
            setLoading(true);
            const res = await axios.get('http://localhost:5000/api/leads');
            setLeads(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    const updateStatus = async (id, newStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/leads/${id}`, { status: newStatus });
            fetchLeads();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteLead = async (id) => {
        if (!confirm('Are you sure you want to delete this lead?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/leads/${id}`);
            fetchLeads();
        } catch (err) {
            console.error(err);
        }
    }

    const filteredLeads = leads.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.source.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Stats
    const totalLeads = leads.length;
    const newLeads = leads.filter(l => l.status === 'New').length;
    const convertedLeads = leads.filter(l => l.status === 'Converted').length;
    const contactedLeads = leads.filter(l => l.status === 'Contacted').length;

    return (
        <div className="space-y-8">
            {/* Header section with Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Welcome Card */}
                <div className="md:col-span-2 bg-gradient-to-r from-gray-700/20 to-gray-600/20 border border-gray-600/30 rounded-2xl p-6 flex items-center justify-between backdrop-blur-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-white/10"></div>
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold text-white mb-2">Welcome Back!</h2>
                        <p className="text-gray-300 text-sm">You have {newLeads} new leads to follow up on today.</p>
                    </div>
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 backdrop-blur-md shadow-lg">
                        <img src="/crm-logo.svg" alt="Logo" className="w-8 h-8 rounded-full" />
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="bg-white/1.5 border border-gray-600/30 rounded-2xl p-5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">New Leads</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-3xl font-bold text-white">{newLeads}</h3>
                        <span className="text-green-400 text-xs font-medium bg-green-500/10 px-2 py-1 rounded-lg border border-green-500/20">+12%</span>
                    </div>
                </div>
                <div className="bg-white/1.5 border border-gray-600/30 rounded-2xl p-5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Converted</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-3xl font-bold text-white">{convertedLeads}</h3>
                        <span className="text-blue-400 text-xs font-medium bg-blue-500/10 px-2 py-1 rounded-lg border border-blue-500/20">+5%</span>
                    </div>
                </div>
            </div>

            {/* Leads Table Section */}
            <div className="bg-white/1.5 backdrop-blur-xl border border-gray-600/30 rounded-2xl shadow-2xl overflow-hidden">
                {/* Table Header / Toolbar */}
                <div className="p-6 border-b border-gray-600/30 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-white">Leads Management</h2>
                        <p className="text-sm text-gray-400">View and manage your potential clients</p>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                            <input
                                type="text"
                                placeholder="Search leads..."
                                className="w-full bg-black/20 border border-gray-600/30 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-gray-500/50 focus:ring-1 focus:ring-gray-500/50 transition-all placeholder-gray-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-gray-600/30 transition-all">
                            <Filter size={18} />
                        </button>
                        <button onClick={fetchLeads} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-gray-600/30 transition-all">
                            <RefreshCw size={18} />
                        </button>
                        <Link to="/add" className="flex items-center gap-2 bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-500 hover:to-gray-400 text-white px-4 py-2 rounded-xl font-medium shadow-lg shadow-gray-500/20 transition-all active:scale-95">
                            <Plus size={18} />
                            <span className="hidden md:inline">Add Lead</span>
                        </Link>
                    </div>
                </div>

                {loading ? (
                    <div className="p-20 text-center">
                        <div className="w-10 h-10 border-4 border-gray-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-400">Loading your leads...</p>
                    </div>
                ) : leads.length === 0 ? (
                    <div className="p-20 text-center">
                        <div className="p-4 bg-white/5 rounded-full w-fit mx-auto mb-4">
                            <Search size={32} className="text-gray-600" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No leads found</h3>
                        <p className="text-gray-400 mb-6">Get started by creating your first lead.</p>
                        <Link to="/add" className="text-gray-300 hover:text-white font-medium">Create New Lead &rarr;</Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-black/20 text-gray-400 text-xs uppercase tracking-wider font-semibold">
                                    <th className="p-6 rounded-tl-lg">Client Name</th>
                                    <th className="p-6">Email Address</th>
                                    <th className="p-6">Source</th>
                                    <th className="p-6">Status</th>
                                    <th className="p-6 text-right rounded-tr-lg">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-600/30">
                                {filteredLeads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="p-6">
                                            <div className="font-medium text-white">{lead.name}</div>
                                            <div className="text-xs text-gray-500 mt-1">ID: #{lead.id}</div>
                                        </td>
                                        <td className="p-6 text-gray-300">{lead.email}</td>
                                        <td className="p-6">
                                            <span className="px-3 py-1 rounded-full bg-white/5 border border-gray-600/30 text-xs text-gray-300">
                                                {lead.source}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <StatusBadge status={lead.status} />
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-2 text-gray-400">
                                                <select
                                                    className="bg-black/20 text-xs rounded-lg border border-gray-600/30 p-2 outline-none focus:border-gray-500/50 transition-all hover:bg-white/5 cursor-pointer mr-2"
                                                    value={lead.status}
                                                    onChange={(e) => updateStatus(lead.id, e.target.value)}
                                                >
                                                    <option value="New">New</option>
                                                    <option value="Contacted">Contacted</option>
                                                    <option value="Converted">Converted</option>
                                                    <option value="Lost">Lost</option>
                                                </select>

                                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                                                    <Link to={`/leads/${lead.id}`} className="p-2 rounded-lg hover:bg-gray-500/20 hover:text-white transition-colors tooltip" title="View Details">
                                                        <Eye size={18} />
                                                    </Link>
                                                    <button onClick={() => deleteLead(lead.id)} className="p-2 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors" title="Delete">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeadList;
