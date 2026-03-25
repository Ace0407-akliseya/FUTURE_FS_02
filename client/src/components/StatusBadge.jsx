import React from 'react';

const StatusBadge = ({ status }) => {
    let colors = "";
    switch (status) {
        case 'New': colors = "bg-green-400/15 text-green-400 border-green-400/30"; break;
        case 'Contacted': colors = "bg-blue-400/15 text-blue-400 border-blue-400/30"; break;
        case 'Converted': colors = "bg-emerald-400/15 text-emerald-400 border-emerald-400/30"; break;
        case 'Lost': colors = "bg-red-400/15 text-red-400 border-red-400/30"; break;
        default: colors = "bg-gray-400/15 text-gray-400 border-gray-400/30";
    }

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colors}`}>
            {status}
        </span>
    );
}

export default StatusBadge;
