import React, { useState, useEffect } from 'react';
import { DollarSign, RefreshCw, AlertCircle, Save } from 'lucide-react';
import axios from 'axios';
import API_ENDPOINTS from '../../config/api';

export default function RatesAvailability() {
  const [rates, setRates] = useState([]);
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null); // ID being saved
  const [error, setError] = useState(null);
  const [edits, setEdits] = useState({});

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [rateRes, chRes] = await Promise.all([
        axios.get(API_ENDPOINTS.CHANNEL.RATES),
        axios.get(API_ENDPOINTS.CHANNEL.CHANNELS),
      ]);
      setRates(rateRes.data?.data || []);
      setChannels(chRes.data?.data || []);
    } catch {
      setError('Could not load rates. Ensure channel-service is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const channelName = (id) => channels.find(c => c.ID === id)?.name || `Channel #${id}`;

  const getEdit = (rateId, field, fallback) => edits[rateId]?.[field] ?? fallback;

  const setEdit = (rateId, field, value) => {
    setEdits(prev => ({
      ...prev,
      [rateId]: { ...(prev[rateId] || {}), [field]: value },
    }));
  };

  const handleSave = async (rate) => {
    setSaving(rate.ID);
    try {
      await axios.put(
        `${API_ENDPOINTS.CHANNEL.RATES}?property_id=${rate.property_id}&channel_id=${rate.channel_id}`,
        {
          base_price:     parseFloat(getEdit(rate.ID, 'base_price', rate.base_price)),
          markup_percent: parseFloat(getEdit(rate.ID, 'markup_percent', rate.markup_percent)),
          min_stay:       parseInt(getEdit(rate.ID, 'min_stay', rate.min_stay)),
          max_stay:       parseInt(getEdit(rate.ID, 'max_stay', rate.max_stay)),
          is_auto_sync:   getEdit(rate.ID, 'is_auto_sync', rate.is_auto_sync),
        }
      );
      setEdits(prev => { const n = { ...prev }; delete n[rate.ID]; return n; });
      fetchAll();
    } catch {
      alert('Failed to save rate.');
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Rates & Availability</h2>
          <p className="text-gray-500 text-sm">Manage channel-specific pricing, markups, and stay rules.</p>
        </div>
        <button onClick={fetchAll} className="p-2.5 border border-gray-200 rounded-xl bg-white text-gray-600 hover:bg-gray-50 transition-colors">
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-2xl text-yellow-800 text-sm">
          <AlertCircle size={18} /> {error}
        </div>
      )}

      <div className="bg-white/80 backdrop-blur-md border border-white shadow-soft-lift rounded-3xl overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {[1,2,3].map(i => <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />)}
          </div>
        ) : rates.length === 0 ? (
          <div className="text-center py-16 px-6 text-gray-400">
            <DollarSign size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-bold text-lg mb-1">No rates configured</p>
            <p className="text-sm">Rates are created automatically when a listing is mapped to a channel.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px]">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Property', 'Channel', 'Base Price', 'Markup %', 'Min Stay', 'Max Stay', 'Auto Sync', ''].map(h => (
                    <th key={h} className="px-5 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {rates.map(rate => {
                  const dirty = !!edits[rate.ID];
                  return (
                    <tr key={rate.ID} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-4 font-bold text-gray-900 text-sm">Property #{rate.property_id}</td>
                      <td className="px-5 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue/10 text-blue">
                          {channelName(rate.channel_id)}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          <span className="text-gray-400 text-sm">$</span>
                          <input type="number" step="0.01"
                            value={getEdit(rate.ID, 'base_price', rate.base_price)}
                            onChange={e => setEdit(rate.ID, 'base_price', e.target.value)}
                            className="w-24 px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue" />
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          <input type="number" step="0.1"
                            value={getEdit(rate.ID, 'markup_percent', rate.markup_percent)}
                            onChange={e => setEdit(rate.ID, 'markup_percent', e.target.value)}
                            className="w-20 px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue" />
                          <span className="text-gray-400 text-sm">%</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <input type="number"
                          value={getEdit(rate.ID, 'min_stay', rate.min_stay)}
                          onChange={e => setEdit(rate.ID, 'min_stay', e.target.value)}
                          className="w-16 px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue" />
                      </td>
                      <td className="px-5 py-4">
                        <input type="number"
                          value={getEdit(rate.ID, 'max_stay', rate.max_stay)}
                          onChange={e => setEdit(rate.ID, 'max_stay', e.target.value)}
                          className="w-16 px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue" />
                      </td>
                      <td className="px-5 py-4">
                        <button onClick={() => setEdit(rate.ID, 'is_auto_sync', !getEdit(rate.ID, 'is_auto_sync', rate.is_auto_sync))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${getEdit(rate.ID, 'is_auto_sync', rate.is_auto_sync) ? 'bg-blue' : 'bg-gray-200'}`}>
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${getEdit(rate.ID, 'is_auto_sync', rate.is_auto_sync) ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                      </td>
                      <td className="px-5 py-4">
                        {dirty && (
                          <button onClick={() => handleSave(rate)} disabled={saving === rate.ID}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue text-white rounded-lg text-xs font-bold hover:bg-blue/90 transition-colors disabled:opacity-50">
                            <Save size={13} /> {saving === rate.ID ? 'Saving…' : 'Save'}
                          </button>
                        )}
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
