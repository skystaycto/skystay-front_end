import React, { useState, useEffect } from 'react';
import { Terminal, Calendar, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import axios from 'axios';
import API_ENDPOINTS from '../../config/api';

export default function LogsActivity() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filter !== 'all') params.status = filter;
      const res = await axios.get(API_ENDPOINTS.CHANNEL.LOGS, { params });
      setLogs(res.data?.data || []);
    } catch {
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchLogs(); }, [filter]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Logs & Activity</h2>
          <p className="text-gray-500 text-sm">System audit trail of all API requests and sync operations.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            {['all', 'success', 'failed', 'pending'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-2 text-sm font-medium rounded-lg capitalize transition-colors ${filter === f ? 'bg-blue text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                {f}
              </button>
            ))}
          </div>
          <button onClick={fetchLogs} className="p-2 border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50 transition-colors">
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-md border border-white shadow-soft-lift rounded-3xl p-6">
        {loading && (
          <div className="space-y-4">
            {[1,2,3].map(i => <div key={i} className="h-16 bg-gray-100 rounded-2xl animate-pulse" />)}
          </div>
        )}

        {!loading && logs.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Terminal size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-bold">No logs found</p>
            <p className="text-sm mt-1">Sync operations will be recorded here automatically.</p>
          </div>
        )}

        {!loading && logs.length > 0 && (
          <div className="space-y-3">
            {logs.map(log => (
              <div key={log.ID} className="flex items-start gap-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="mt-0.5 shrink-0">
                  {log.status === 'success' ? <CheckCircle2 size={18} className="text-green-500" /> : log.status === 'failed' ? <AlertCircle size={18} className="text-red-500" /> : <RefreshCw size={18} className="text-yellow-500 animate-spin" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="font-bold text-gray-900 text-sm">{log.operation}</span>
                      <span className="ml-2 px-2 py-0.5 bg-gray-200 rounded text-[10px] font-bold text-gray-600 uppercase">{log.channel_slug || 'system'}</span>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap flex items-center gap-1 shrink-0">
                      <Calendar size={12} /> {new Date(log.CreatedAt).toLocaleTimeString()}
                    </span>
                  </div>
                  {log.detail && (
                    <p className="mt-1.5 text-xs text-gray-600 bg-white p-2 rounded-lg border border-gray-100 font-mono flex gap-2 items-start">
                      <Terminal size={12} className="mt-0.5 opacity-40 shrink-0" /> {log.detail}
                    </p>
                  )}
                  {log.error_message && (
                    <p className="mt-1 text-xs text-red-600 font-mono">{log.error_message}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
