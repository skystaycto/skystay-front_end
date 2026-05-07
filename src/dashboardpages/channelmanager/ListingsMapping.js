import React, { useState, useEffect } from 'react';
import { Plus, Trash2, RefreshCw, Link2, AlertCircle, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import API_ENDPOINTS from '../../config/api';

export default function ListingsMapping() {
  const [mappings, setMappings] = useState([]);
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ property_id: '', property_name: '', channel_id: '', channel_slug: '', ota_listing_id: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [mapRes, chRes] = await Promise.all([
        axios.get(API_ENDPOINTS.CHANNEL.MAPPINGS),
        axios.get(API_ENDPOINTS.CHANNEL.CHANNELS),
      ]);
      setMappings(mapRes.data?.data || []);
      setChannels(chRes.data?.data || []);
    } catch {
      setError('Could not load mappings. Check that channel-service is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleChannelChange = (e) => {
    const ch = channels.find(c => String(c.ID) === e.target.value);
    setForm(f => ({ ...f, channel_id: e.target.value, channel_slug: ch?.slug || '' }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.post(API_ENDPOINTS.CHANNEL.MAPPINGS, {
        property_id: parseInt(form.property_id),
        property_name: form.property_name,
        channel_id: parseInt(form.channel_id),
        channel_slug: form.channel_slug,
        ota_listing_id: form.ota_listing_id,
      });
      setShowForm(false);
      setForm({ property_id: '', property_name: '', channel_id: '', channel_slug: '', ota_listing_id: '' });
      fetchAll();
    } catch {
      alert('Failed to create mapping. Check all fields.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this mapping?')) return;
    try {
      await axios.delete(API_ENDPOINTS.CHANNEL.MAPPING_DELETE(id));
      fetchAll();
    } catch {
      alert('Failed to delete mapping.');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Listings Mapping</h2>
          <p className="text-gray-500 text-sm">Link your internal properties to their OTA listing IDs.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchAll} className="p-2.5 border border-gray-200 rounded-xl bg-white text-gray-600 hover:bg-gray-50 transition-colors">
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
          <button onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-pink-blue-gradient text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity border-0">
            <Plus size={18} /> Add Mapping
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-2xl text-yellow-800 text-sm">
          <AlertCircle size={18} /> {error}
        </div>
      )}

      {/* Add Mapping Form */}
      {showForm && (
        <div className="bg-white/90 backdrop-blur border border-white shadow-soft-lift rounded-3xl p-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <h3 className="font-bold text-gray-900 mb-4">New Listing Mapping</h3>
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Property ID</label>
              <input type="number" required value={form.property_id} onChange={e => setForm(f => ({ ...f, property_id: e.target.value }))}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue text-sm" placeholder="1" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Property Name</label>
              <input type="text" value={form.property_name} onChange={e => setForm(f => ({ ...f, property_name: e.target.value }))}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue text-sm" placeholder="Ocean View Villa" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Channel</label>
              <select required value={form.channel_id} onChange={handleChannelChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue text-sm">
                <option value="">Select channel...</option>
                {channels.map(ch => <option key={ch.ID} value={ch.ID}>{ch.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">OTA Listing ID</label>
              <input type="text" required value={form.ota_listing_id} onChange={e => setForm(f => ({ ...f, ota_listing_id: e.target.value }))}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue text-sm" placeholder="airbnb-12345678" />
            </div>
            <div className="md:col-span-2 flex gap-3 justify-end">
              <button type="button" onClick={() => setShowForm(false)}
                className="px-5 py-2.5 border border-gray-200 rounded-xl text-gray-700 font-bold hover:bg-gray-50 transition-colors text-sm">Cancel</button>
              <button type="submit" disabled={saving}
                className="px-5 py-2.5 bg-pink-blue-gradient text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity border-0 disabled:opacity-50">
                {saving ? 'Saving...' : 'Save Mapping'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mappings Table */}
      <div className="bg-white/80 backdrop-blur-md border border-white shadow-soft-lift rounded-3xl overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">{[1,2,3].map(i => <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse" />)}</div>
        ) : mappings.length === 0 ? (
          <div className="text-center py-16 px-6 text-gray-400">
            <Link2 size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-bold text-lg mb-1">No mappings yet</p>
            <p className="text-sm">Add your first mapping to link a property to an OTA listing.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {['Property', 'Channel', 'OTA Listing ID', 'Status', 'Last Synced', ''].map(h => (
                  <th key={h} className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mappings.map(m => (
                <tr key={m.ID} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900 text-sm">{m.property_name || `Property #${m.property_id}`}</p>
                    <p className="text-xs text-gray-400">ID: {m.property_id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue/10 text-blue capitalize">{m.channel_slug?.replace('_', '.')}</span>
                  </td>
                  <td className="px-6 py-4 font-mono text-sm text-gray-700">{m.ota_listing_id}</td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 text-xs font-bold ${m.sync_status === 'mapped' ? 'text-green-500' : 'text-gray-400'}`}>
                      {m.sync_status === 'mapped' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                      {m.sync_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500">
                    {m.last_synced_at ? new Date(m.last_synced_at).toLocaleString() : '—'}
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleDelete(m.ID)} className="text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
