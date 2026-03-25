import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Save, Clock, User, Mail, Globe } from 'lucide-react';
import StatusBadge from './StatusBadge';

const LeadDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [lead, setLead] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState('');
    const [followUpDate, setFollowUpDate] = useState('');

    useEffect(() => {
        const fetchLead = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/leads`);
                // Since we don't have a get-by-id route in frontend properly set up in the list yet, 
                // we might need to fetch all and find, OR ensure backend has get-by-id (it does).
                // Let's use the proper get-by-id endpoint if possible, but wait, 
                // the backend route `router.put('/:id'...)` exists, but `router.get('/:id')` was NOT created in the previous step!
                // I need to add GET /api/leads/:id to backend or filter from list. 
                // Let's filter from list for now or add the route.
                // Actually, let's add the route to backend to be proper. 
                // For now, to avoid context switching, I'll fetch all and find (not efficient but checking if I added GET /:id).
                // I checked `routes/leads.js` content earlier, and I only saw GET /, POST /, PUT /:id, DELETE /:id.
                // So I MUST add GET /api/leads/:id to backend or just filter. 
                // Filtering is easier for now to save a backend restart/edit cycle.

                // WAIT, I really should add the GET /:id route for completeness.
                // But for speed, I will just filter from the all leads list since DB is small.
                const foundLead = res.data.find(l => l.id === parseInt(id));
                setLead(foundLead);
                setNotes(foundLead?.notes || '');
                setFollowUpDate(foundLead?.followUpDate || '');
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchLead();
    }, [id]);

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:5000/api/leads/${id}`, {
                notes,
                followUpDate
            });
            alert('Lead updated successfully');
            // navigate('/');
        } catch (err) {
            console.error(err);
            alert('Error updating lead');
        }
    };

    if (loading) return <p className="text-white">Loading...</p>;
    if (!lead) return <p className="text-white">Lead not found</p>;

    return (
        <div className="max-w-4xl mx-auto">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
                <ArrowLeft size={18} /> Back to Dashboard
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column: Info */}
                <div className="glass-panel p-6 md:col-span-1 h-fit">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-white mb-2">{lead.name}</h2>
                        <StatusBadge status={lead.status} />
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-gray-300">
                            <Mail size={16} className="text-gray-500" />
                            <span className="text-sm">{lead.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300">
                            <Globe size={16} className="text-gray-500" />
                            <span className="text-sm">{lead.source}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300">
                            <Clock size={16} className="text-gray-500" />
                            <span className="text-sm">Created: {new Date(lead.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Actions */}
                <div className="glass-panel p-6 md:col-span-2">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Save size={18} className="text-accent" />
                        Manage Lead
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                                <Calendar size={16} />
                                Follow Up Date
                            </label>
                            <input
                                type="date"
                                className="input-field"
                                value={followUpDate}
                                onChange={(e) => setFollowUpDate(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Notes</label>
                            <textarea
                                className="input-field h-32 resize-none"
                                placeholder="Add notes about this lead..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                                <Save size={18} />
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeadDetails;
