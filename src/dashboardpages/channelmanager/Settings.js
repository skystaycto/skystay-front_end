import React from 'react';
import { Save, Key, Globe, Clock, DollarSign } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Channel Manager Settings</h2>
          <p className="text-gray-500 text-sm">Configure global sync preferences and API integrations.</p>
        </div>
        <button className="bg-pink-blue-gradient text-white px-6 py-3 rounded-full font-bold shadow-glow-blue hover:-translate-y-1 transition-transform flex items-center gap-2 border-0">
          <Save size={18} /> Save Settings
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* API Credentials */}
        <div className="bg-white/80 backdrop-blur-md border border-white shadow-soft-lift rounded-3xl p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Key size={20} className="text-blue" />
            Global API Credentials
          </h3>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Airbnb Client ID</label>
              <input type="text" defaultValue="client_id_air_9982x" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue text-sm font-mono" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Booking.com API Key</label>
              <input type="password" defaultValue="****************" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue text-sm font-mono" />
            </div>
            <p className="text-xs text-gray-500 mt-2">These credentials act as the master fallback. Per-property overrides can be configured in Listings Mapping.</p>
          </div>
        </div>

        {/* Sync Preferences */}
        <div className="bg-white/80 backdrop-blur-md border border-white shadow-soft-lift rounded-3xl p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Clock size={20} className="text-pink" />
            Sync Preferences
          </h3>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Auto-Sync Frequency</label>
              <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue text-sm">
                <option>Every 5 minutes (Recommended)</option>
                <option>Every 15 minutes</option>
                <option>Every 1 hour</option>
                <option>Manual only</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl">
              <div>
                <p className="font-bold text-gray-900 text-sm">Sync Reservations Automatically</p>
                <p className="text-xs text-gray-500">Automatically accept and import new bookings.</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500 transition-colors">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Regional & Currency */}
        <div className="bg-white/80 backdrop-blur-md border border-white shadow-soft-lift rounded-3xl p-8 lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Globe size={20} className="text-blue" />
            Localization & Defaults
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Base Currency</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <select className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue text-sm">
                  <option>USD - US Dollar</option>
                  <option>EUR - Euro</option>
                  <option>GBP - British Pound</option>
                  <option>KES - Kenyan Shilling</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Timezone</label>
              <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue text-sm">
                <option>Africa/Nairobi (GMT+3)</option>
                <option>UTC (GMT+0)</option>
                <option>America/New_York (GMT-5)</option>
              </select>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
