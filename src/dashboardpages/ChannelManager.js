import React, { useState } from 'react';
import Overview from './channelmanager/Overview';
import Channels from './channelmanager/Channels';
import ListingsMapping from './channelmanager/ListingsMapping';
import CalendarSync from './channelmanager/CalendarSync';
import RatesAvailability from './channelmanager/RatesAvailability';
import ReservationsSync from './channelmanager/ReservationsSync';
import LogsActivity from './channelmanager/LogsActivity';
import Settings from './channelmanager/Settings';
import Messaging from './channelmanager/Messaging';

export default function ChannelManager() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'channels', label: 'Channels' },
    { id: 'listings', label: 'Listings Mapping' },
    { id: 'messaging', label: 'Messaging' },
    { id: 'calendar', label: 'Calendar Sync' },
    { id: 'rates', label: 'Rates & Availability' },
    { id: 'reservations', label: 'Reservations' },
    { id: 'logs', label: 'Logs & Activity' },
    { id: 'settings', label: 'Settings' },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'overview': return <Overview />;
      case 'channels': return <Channels />;
      case 'listings': return <ListingsMapping />;
      case 'messaging': return <Messaging />;
      case 'calendar': return <CalendarSync />;
      case 'rates': return <RatesAvailability />;
      case 'reservations': return <ReservationsSync />;
      case 'logs': return <LogsActivity />;
      case 'settings': return <Settings />;
      default: return <Overview />;
    }
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Channel Manager</h1>
        <p className="text-gray-500 mt-2 font-medium">Sync your property listings across Airbnb, Booking.com, and more.</p>
      </div>

      {/* Tabs Navigation */}
      <div className="overflow-x-auto no-scrollbar mb-8 pb-2 border-b border-gray-200">
        <div className="flex space-x-6 min-w-max">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-bold transition-all relative whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'text-blue' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue rounded-t-full shadow-[0_-2px_10px_rgba(37,99,235,0.5)]"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Active Tab Content */}
      <div className="flex-1">
        {renderContent()}
      </div>

    </div>
  );
}
