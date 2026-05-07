import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw, MoreVertical, AlertCircle } from 'lucide-react';
import axios from 'axios';
import API_ENDPOINTS from '../../config/api';

export default function Channels() {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalChannel, setModalChannel] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [clientId, setClientId] = useState('');
  const [testingId, setTestingId] = useState(null);

  const fetchChannels = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.CHANNEL.CHANNELS);
      setChannels(res.data?.data || []);
    } catch {
      setError('Could not reach channel service. Showing cached state.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchChannels(); }, []);

  const handleConnect = async (ch) => {
    try {
      await axios.post(API_ENDPOINTS.CHANNEL.CHANNEL_CONNECT(ch.ID), {
        api_key: apiKey,
        api_secret: apiSecret,
        client_id: clientId,
      });
      setModalChannel(null);
      setApiKey(''); setApiSecret(''); setClientId('');
      fetchChannels();
    } catch {
      alert('Failed to connect channel. Check credentials.');
    }
  };

  const handleDisconnect = async (id) => {
    try {
      await axios.post(API_ENDPOINTS.CHANNEL.CHANNEL_DISCONNECT(id));
      fetchChannels();
    } catch {
      alert('Failed to disconnect channel.');
    }
  };

  const handleTest = async (id) => {
    setTestingId(id);
    try {
      await axios.post(API_ENDPOINTS.CHANNEL.CHANNEL_TEST(id));
      alert('Connection test passed!');
    } catch {
      alert('Test failed. Ensure the channel is connected with valid credentials.');
    } finally {
      setTestingId(null);
    }
  };

  const getChannelLogo = (slug) => {
    const logos = {
      airbnb: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg',
      booking_com: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Booking.com_Logo.svg',
      vrbo: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Vrbo_logo.svg',
    };
    return logos[slug] || '';
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Connected Channels</h2>
          <p className="text-gray-500 text-sm">Manage your OTA integrations and API connections.</p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-2xl text-yellow-800 text-sm">
          <AlertCircle size={18} /> {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white/80 rounded-3xl p-6 h-48 animate-pulse bg-gray-100" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {channels.map((channel) => (
            <div key={channel.ID} className="bg-white/80 backdrop-blur-md border border-white shadow-soft-lift rounded-3xl p-6 relative group overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <div className="h-12 flex items-center">
                  <img src={channel.logo_url || getChannelLogo(channel.slug)} alt={channel.name}
                    className="max-h-8 max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  {(!channel.logo_url && !getChannelLogo(channel.slug)) && (
                    <span className="font-bold text-gray-900 text-lg">{channel.name}</span>
                  )}
                </div>
                <button className="text-gray-400 hover:text-gray-900"><MoreVertical size={20} /></button>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Connection</span>
                  <span className={`font-bold flex items-center gap-1 ${channel.status === 'connected' ? 'text-green-500' : 'text-gray-400'}`}>
                    {channel.status === 'connected' ? <Wifi size={14} /> : <WifiOff size={14} />}
                    {channel.status?.charAt(0).toUpperCase() + channel.status?.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">API Status</span>
                  <span className={`font-bold ${channel.api_status === 'active' ? 'text-blue' : 'text-red-500'}`}>
                    {channel.api_status?.charAt(0).toUpperCase() + channel.api_status?.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Last Sync</span>
                  <span className="text-gray-700 font-medium">
                    {channel.last_sync_at ? new Date(channel.last_sync_at).toLocaleTimeString() : 'Never'}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                {channel.status === 'connected' ? (
                  <button onClick={() => handleDisconnect(channel.ID)}
                    className="flex-1 py-2.5 rounded-xl font-bold text-sm bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                    Disconnect
                  </button>
                ) : (
                  <button onClick={() => setModalChannel(channel)}
                    className="flex-1 py-2.5 rounded-xl font-bold text-sm bg-green-50 text-green-600 hover:bg-green-100 transition-colors">
                    Connect
                  </button>
                )}
                <button onClick={() => handleTest(channel.ID)}
                  disabled={testingId === channel.ID}
                  className="p-2.5 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-50" title="Test Connection">
                  <RefreshCw size={18} className={testingId === channel.ID ? 'animate-spin' : ''} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Connect Modal */}
      {modalChannel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-floating p-8 w-full max-w-md mx-4 animate-in fade-in zoom-in-95 duration-300">
            <h3 className="font-bold text-xl text-gray-900 mb-2">Connect {modalChannel.name}</h3>
            <p className="text-sm text-gray-500 mb-6">Enter your API credentials from {modalChannel.name}'s developer portal.</p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Client ID</label>
                <input type="text" value={clientId} onChange={e => setClientId(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue text-sm"
                  placeholder="client_id_..." />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">API Key</label>
                <input type="text" value={apiKey} onChange={e => setApiKey(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue text-sm"
                  placeholder="api_key_..." />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">API Secret</label>
                <input type="password" value={apiSecret} onChange={e => setApiSecret(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue text-sm"
                  placeholder="••••••••" />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={() => setModalChannel(null)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button onClick={() => handleConnect(modalChannel)}
                className="flex-1 py-3 rounded-xl bg-pink-blue-gradient text-white font-bold hover:opacity-90 transition-opacity border-0">
                Connect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
