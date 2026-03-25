import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const LeadForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        source: 'Website',
        status: 'New'
    });

    const { name, email, source, status } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/leads', formData);
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
                <ArrowLeft size={18} /> Back to Dashboard
            </button>

            <div className="glass-panel p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Create New Lead</h2>

                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={onChange}
                            className="input-field"
                            placeholder="e.g. Dan Smith"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            className="input-field"
                            placeholder="dan@example.com"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Source</label>
                            <select
                                name="source"
                                value={source}
                                onChange={onChange}
                                className="input-field appearance-none"
                            >
                              
                                <option value="Website" style={{ 
                                    backgroundColor: '#eff6ff', 
                                    color: '#1e40af',
                                    padding: '10px',
                                    fontWeight: '500'
                                }}>
                                    🌐 Website
                                </option>
                                <option value="Referral" style={{ 
                                    backgroundColor: '#ecfdf5', 
                                    color: '#065f46',
                                    padding: '10px',
                                    fontWeight: '500'
                                }}>
                                    👥 Referral
                                </option>
                                <option value="Social Media" style={{ 
                                    backgroundColor: '#f5f3ff', 
                                    color: '#5b21b6',
                                    padding: '10px',
                                    fontWeight: '500'
                                }}>
                                    📱 Social Media
                                </option>
                                <option value="Ad Campaign" style={{ 
                                    backgroundColor: '#fffbeb', 
                                    color: '#92400e',
                                    padding: '10px',
                                    fontWeight: '500'
                                }}>
                                    📢 Ad Campaign
                                </option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Initial Status</label>
                            <input
                                type="text"
                                value={status}
                                disabled
                                className="input-field opacity-50 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button type="submit" className="btn-primary w-full">
                            Create Lead
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LeadForm;
