import React, { useState, useEffect } from 'react';
import { RefreshCw, Calendar, AlertCircle, CheckCircle2, Clock, XCircle } from 'lucide-react';
import axios from 'axios';
import API_ENDPOINTS from '../../config/api';

const STATUS_STYLES = {
  confirmed: { bg: 'bg-green-100 text-green-700', icon: CheckCircle2 },
  pending:   { bg: 'bg-yellow-100 text-yellow-700', icon: Clock },
  cancelled: { bg: 'bg-red-100 text-red-600', icon: XCircle },
};

const SYNC_STYLES = {
  success: 'text-green-500',
  pending: 'text-yellow-500',
  failed:  'text-red-500',
};

const CHANNEL_COLORS = {
  airbnb:      { bg: '#FF5A5F18', color: '#FF5A5F' },
  booking_com: { bg: '#00358018', color: '#003580' },
  direct:      { bg: '#2563EB18', color: '#2563EB' },
};

export default function ReservationsSync() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [filterChannel, setFilterChannel] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [error, setError] = useState(null);

  const fetchReservations = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (filterChannel !== 'all') params.channel = filterChannel;
      if (filterStatus !== 'all')  params.status  = filterStatus;
      const res = await axios.get(API_ENDPOINTS.CHANNEL.RESERVATIONS, { params });
      setReservations(res.data?.data || []);
    } catch {
      setError('Could not load reservations. Ensure channel-service is running.');
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchReservations(); }, [filterChannel, filterStatus]);

  const handleSyncAll = async () => {
    setSyncing(true);
    // Simulate a "trigger sync" call — real OTA webhooks would push here
    await new Promise(r => setTimeout(r, 1500));
    setSyncing(false);
    fetchReservations();
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Reservations Sync</h2>
          <p className="text-gray-500 text-sm">Incoming bookings synchronized from connected OTA channels.</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex gap-2">
            {['all', 'airbnb', 'booking_com'].map(ch => (
              <button key={ch} onClick={() => setFilterChannel(ch)}
                className={`px-3 py-2 text-xs font-bold rounded-lg capitalize transition-colors ${filterChannel === ch ? 'bg-blue text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                {ch === 'all' ? 'All Channels' : ch.replace('_', '.')}
              </button>
            ))}
          </div>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            className="px-3 py-2 text-xs font-bold bg-white border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:border-blue">
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button onClick={handleSyncAll} disabled={syncing}
            className="flex items-center gap-2 px-4 py-2 bg-pink-blue-gradient text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity border-0 disabled:opacity-60">
            <RefreshCw size={16} className={syncing ? 'animate-spin' : ''} />
            {syncing ? 'Syncing...' : 'Sync Now'}
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-2xl text-yellow-800 text-sm">
          <AlertCircle size={18} /> {error}
        </div>
      )}

      <div className="bg-white/80 backdrop-blur-md border border-white shadow-soft-lift rounded-3xl overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {[1,2,3,4].map(i => <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />)}
          </div>
        ) : reservations.length === 0 ? (
          <div className="text-center py-16 px-6 text-gray-400">
            <Calendar size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-bold text-lg mb-1">No reservations found</p>
            <p className="text-sm">Bookings from connected OTAs will appear here after the first sync.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Guest', 'Channel', 'Property', 'Dates', 'Amount', 'Status', 'Sync', 'Last Synced'].map(h => (
                    <th key={h} className="px-5 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {reservations.map(res => {
                  const statusStyle = STATUS_STYLES[res.status] || STATUS_STYLES.pending;
                  const StatusIcon = statusStyle.icon;
                  const chColor = CHANNEL_COLORS[res.channel_slug] || { bg: '#88888818', color: '#888' };
                  return (
                    <tr key={res.ID} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-bold text-gray-900 text-sm">{res.guest_name}</p>
                        <p className="text-xs text-gray-400">{res.guest_email}</p>
                      </td>
                      <td className="px-5 py-4">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase"
                          style={{ background: chColor.bg, color: chColor.color }}>
                          {res.channel_slug?.replace('_', '.')}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-700">Property #{res.property_id}</td>
                      <td className="px-5 py-4 text-xs text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-gray-400" />
                          {res.check_in ? new Date(res.check_in).toLocaleDateString('en-GB', { day:'2-digit', month:'short' }) : '—'}
                          {' – '}
                          {res.check_out ? new Date(res.check_out).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }) : '—'}
                        </div>
                      </td>
                      <td className="px-5 py-4 font-bold text-gray-900 text-sm">
                        {res.currency} {res.total_amount?.toLocaleString()}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${statusStyle.bg}`}>
                          <StatusIcon size={12} /> {res.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-xs font-bold ${SYNC_STYLES[res.sync_status] || 'text-gray-400'}`}>
                          {res.sync_status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs text-gray-400">
                        {res.last_synced_at ? new Date(res.last_synced_at).toLocaleString() : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
