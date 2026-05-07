import React, { useState, useEffect } from 'react';
import { Building2, Link2, Activity, AlertTriangle, CheckCircle2, XCircle, Clock } from 'lucide-react';
import axios from 'axios';
import API_ENDPOINTS from '../../config/api';

export default function Overview() {
  const [stats, setStats] = useState(null);
  const [logs, setLogs] = useState([]);
  const [conflicts, setConflicts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [overviewRes, logsRes, conflictsRes] = await Promise.all([
          axios.get(API_ENDPOINTS.CHANNEL.OVERVIEW),
          axios.get(API_ENDPOINTS.CHANNEL.LOGS + '?limit=5'),
          axios.get(API_ENDPOINTS.CHANNEL.CONFLICTS + '?status=pending&limit=3'),
        ]);
        setStats(overviewRes.data?.data || null);
        setLogs(logsRes.data?.data || []);
        setConflicts(conflictsRes.data?.data || []);
      } catch {
        // Backend not yet restarted — show placeholder cards
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const statCards = stats ? [
    { title: 'Total Connected Channels', value: stats.connected_channels ?? '—', icon: Link2, color: 'text-pink' },
    { title: 'Active Listings', value: stats.active_listings ?? '—', icon: Activity, color: 'text-green-500' },
    { title: 'Open Conflicts', value: stats.open_conflicts ?? '—', icon: AlertTriangle, color: 'text-yellow-500' },
  ] : [
    { title: 'Connected Channels', value: '—', icon: Link2, color: 'text-pink' },
    { title: 'Active Listings', value: '—', icon: Activity, color: 'text-green-500' },
    { title: 'Open Conflicts', value: '—', icon: AlertTriangle, color: 'text-yellow-500' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-white/80 backdrop-blur-md border border-white shadow-soft-lift rounded-3xl p-6 flex items-center justify-between hover:-translate-y-1 transition-transform">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">{stat.title}</p>
              <h3 className={`text-3xl font-bold ${loading ? 'text-gray-300 animate-pulse' : 'text-gray-900'}`}>{stat.value}</h3>
            </div>
            <div className={`p-4 bg-gray-50 rounded-2xl ${stat.color}`}>
              <stat.icon size={28} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sync Status Summary */}
        <div className="bg-white/80 backdrop-blur-md border border-white shadow-soft-lift rounded-3xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Activity size={20} className="text-blue" /> Sync Status Summary
          </h3>
          {stats ? (
            <div className="space-y-5">
              {[
                { label: 'Successful', icon: CheckCircle2, color: 'bg-green-500 text-green-500', value: Math.max(0, (stats.active_listings || 0) - (stats.failed_syncs || 0) - (stats.pending_syncs || 0)), total: stats.active_listings || 1 },
                { label: 'Pending', icon: Clock, color: 'bg-yellow-500 text-yellow-500', value: stats.pending_syncs || 0, total: stats.active_listings || 1 },
                { label: 'Failed', icon: XCircle, color: 'bg-red-500 text-red-500', value: stats.failed_syncs || 0, total: stats.active_listings || 1 },
              ].map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <div className={`flex items-center gap-2 ${s.color.split(' ')[1]}`}>
                      <s.icon size={18} /> <span className="text-gray-700 font-medium text-sm">{s.label}</span>
                    </div>
                    <span className="font-bold text-gray-900">{s.value}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full ${s.color.split(' ')[0]}`} style={{ width: `${Math.min(100, (s.value / s.total) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center py-8">Waiting for channel-service to be available…</p>
          )}
        </div>

        {/* Recent Conflicts */}
        <div className="bg-white/80 backdrop-blur-md border border-white shadow-soft-lift rounded-3xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <AlertTriangle size={20} className="text-pink" /> Recent Conflicts
          </h3>
          <div className="space-y-4">
            {conflicts.length === 0 && !loading && (
              <p className="text-sm text-gray-400 text-center py-4">No open conflicts. 🎉</p>
            )}
            {conflicts.map(conflict => (
              <div key={conflict.ID} className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{conflict.type}</h4>
                  <p className="text-xs text-gray-500">{conflict.property_name} • {conflict.channel_slug}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-600">Pending</span>
              </div>
            ))}
            {conflicts.length === 0 && loading && (
              <div className="space-y-3">
                {[1, 2].map(i => <div key={i} className="h-14 bg-gray-100 rounded-2xl animate-pulse" />)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Logs */}
      {logs.length > 0 && (
        <div className="bg-white/80 backdrop-blur-md border border-white shadow-soft-lift rounded-3xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Building2 size={20} className="text-blue" /> Recent Sync Activity
          </h3>
          <div className="space-y-2">
            {logs.map(log => (
              <div key={log.ID} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  {log.status === 'success' ? <CheckCircle2 size={16} className="text-green-500" /> : <XCircle size={16} className="text-red-500" />}
                  <div>
                    <span className="text-sm font-bold text-gray-800">{log.operation}</span>
                    <span className="text-xs text-gray-400 ml-2">via {log.channel_slug}</span>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{new Date(log.CreatedAt).toLocaleTimeString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
