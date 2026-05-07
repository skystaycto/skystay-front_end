import React from 'react';
import { Calendar as CalendarIcon, AlertCircle } from 'lucide-react';

export default function CalendarSync() {
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  const properties = [
    { name: 'Sunset Villa', blocks: [{ start: 2, end: 5, source: 'airbnb' }, { start: 8, end: 10, source: 'booking' }] },
    { name: 'Oceanview Apt', blocks: [{ start: 0, end: 3, source: 'direct' }, { start: 3, end: 4, source: 'conflict' }] },
    { name: 'Downtown Loft', blocks: [{ start: 5, end: 12, source: 'airbnb' }] },
  ];

  const getSourceColor = (source) => {
    switch(source) {
      case 'airbnb': return 'bg-[#FF5A5F]'; // Airbnb red
      case 'booking': return 'bg-[#003580]'; // Booking blue
      case 'direct': return 'bg-blue'; // SkyStay direct
      case 'conflict': return 'bg-red-600 animate-pulse'; // Conflict
      default: return 'bg-gray-200';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Unified Calendar Sync</h2>
          <p className="text-gray-500 text-sm">Monitor availability and detect conflicts across all channels.</p>
        </div>
        
        <div className="flex gap-4 text-xs font-bold text-gray-600">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue"></div> Direct</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#FF5A5F]"></div> Airbnb</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#003580]"></div> Booking.com</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-600"></div> Conflict</div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-md border border-white shadow-soft-lift rounded-3xl p-6 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header Dates */}
            <div className="flex mb-4">
              <div className="w-48 flex-shrink-0"></div>
              {dates.map((d, i) => (
                <div key={i} className="flex-1 text-center">
                  <div className="text-xs text-gray-500">{d.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                  <div className={`font-bold ${i === 0 ? 'text-blue' : 'text-gray-900'}`}>{d.getDate()}</div>
                </div>
              ))}
            </div>

            {/* Properties Grid */}
            <div className="space-y-4">
              {properties.map((prop, idx) => (
                <div key={idx} className="flex group">
                  <div className="w-48 flex-shrink-0 flex items-center pr-4 border-r border-gray-100 font-bold text-gray-700">
                    {prop.name}
                  </div>
                  <div className="flex-1 flex relative bg-gray-50/50 rounded-r-xl h-12">
                    {dates.map((_, i) => (
                      <div key={i} className="flex-1 border-r border-gray-100 last:border-0 h-full"></div>
                    ))}
                    
                    {/* Render Blocks */}
                    {prop.blocks.map((block, bIdx) => (
                      <div 
                        key={bIdx}
                        className={`absolute top-1 bottom-1 rounded-lg shadow-sm border border-black/10 flex items-center justify-center text-white text-xs font-bold overflow-hidden cursor-pointer hover:opacity-90 transition-opacity ${getSourceColor(block.source)}`}
                        style={{ 
                          left: `${(block.start / 14) * 100}%`, 
                          width: `${((block.end - block.start) / 14) * 100}%` 
                        }}
                      >
                        {block.source === 'conflict' && <AlertCircle size={14} />}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
