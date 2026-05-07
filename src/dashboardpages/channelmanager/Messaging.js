import React, { useState, useEffect, useRef } from 'react';
import { Search, Paperclip, Send, Check, CheckCheck, Clock, Zap, FileText, X, AlertCircle } from 'lucide-react';
import axios from 'axios';
import API_ENDPOINTS from '../../config/api';

export default function Messaging() {
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterChannel, setFilterChannel] = useState('All');
  const [inputText, setInputText] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sendingMsg, setSendingMsg] = useState(false);
  const messagesEndRef = useRef(null);

  const fetchConversations = async () => {
    try {
      const params = {};
      if (filterChannel !== 'All') params.channel = filterChannel.toLowerCase().replace('.', '_');
      if (searchTerm) params.search = searchTerm;
      const res = await axios.get(API_ENDPOINTS.MESSAGING.CONVERSATIONS, { params });
      setConversations(res.data?.data || []);
    } catch { /* service not yet up */ }
    finally { setLoading(false); }
  };

  const fetchMessages = async (conv) => {
    setActiveChat(conv);
    setMessages([]);
    try {
      const res = await axios.get(API_ENDPOINTS.MESSAGING.MESSAGES(conv.ID));
      setMessages(res.data?.data || []);
    } catch { /* ignore */ }
  };

  const fetchTemplates = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.MESSAGING.TEMPLATES);
      setTemplates(res.data?.data || []);
    } catch { /* ignore */ }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchConversations(); fetchTemplates(); }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchConversations(); }, [filterChannel, searchTerm]);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || !activeChat) return;
    setSendingMsg(true);
    const optimisticMsg = { ID: Date.now(), sender: 'Host', content: inputText, status: 'sent', sync_status: 'pending', CreatedAt: new Date().toISOString() };
    setMessages(prev => [...prev, optimisticMsg]);
    setInputText('');
    try {
      const res = await axios.post(API_ENDPOINTS.MESSAGING.MESSAGES(activeChat.ID), {
        sender: 'Host',
        content: optimisticMsg.content,
        message_type: 'text',
      });
      const saved = res.data?.data;
      setMessages(prev => prev.map(m => m.ID === optimisticMsg.ID ? { ...saved } : m));
    } catch {
      setMessages(prev => prev.map(m => m.ID === optimisticMsg.ID ? { ...m, sync_status: 'failed' } : m));
    } finally {
      setSendingMsg(false);
    }
  };

  const insertTemplate = (tpl) => {
    if (!activeChat) return;
    let text = tpl.body
      .replace('{{guest_name}}', activeChat.guest_name?.split(' ')[0] || 'Guest')
      .replace('{{property_name}}', activeChat.property_name || 'your property')
      .replace('{{check_in}}', activeChat.check_in ? new Date(activeChat.check_in).toLocaleDateString() : '')
      .replace('{{check_out}}', activeChat.check_out ? new Date(activeChat.check_out).toLocaleDateString() : '');
    setInputText(text);
    setShowTemplates(false);
  };

  const getChannelBadge = (slug) => {
    const map = { airbnb: ['Airbnb', '#FF5A5F'], booking_com: ['Booking.com', '#003580'], direct: ['Direct', '#2563EB'] };
    const [label, color] = map[slug] || ['Unknown', '#888'];
    return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider" style={{ background: color + '18', color }}>{label}</span>;
  };

  return (
    <div className="h-[calc(100vh-16rem)] min-h-[600px] flex gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Left Panel */}
      <div className="w-1/3 bg-white/80 backdrop-blur-md border border-white shadow-soft-lift rounded-3xl flex flex-col overflow-hidden">
        <div className="p-5 border-b border-gray-100 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search messages..." value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue text-sm" />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {['All', 'Airbnb', 'Booking.com', 'Direct'].map(f => (
              <button key={f} onClick={() => setFilterChannel(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${filterChannel === f ? 'bg-blue text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          {loading && [1,2,3].map(i => <div key={i} className="m-4 h-20 bg-gray-100 rounded-2xl animate-pulse" />)}
          {!loading && conversations.length === 0 && (
            <div className="p-8 text-center text-sm text-gray-400">
              <p className="font-bold mb-1">No conversations yet</p>
              <p>Messages from OTAs will appear here once the messaging service is connected.</p>
            </div>
          )}
          {conversations.map(conv => (
            <div key={conv.ID} onClick={() => fetchMessages(conv)}
              className={`p-4 border-b border-gray-50 cursor-pointer transition-colors relative border-l-4 ${activeChat?.ID === conv.ID ? 'bg-blue/5 border-l-blue' : 'hover:bg-gray-50 border-l-transparent'}`}>
              <div className="flex justify-between items-start mb-1">
                <h4 className={`text-sm ${conv.unread_count > 0 ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>{conv.guest_name}</h4>
                <span className="text-xs text-gray-400">{conv.last_message_at ? new Date(conv.last_message_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span>
              </div>
              <div className="flex items-center gap-2 mb-1">{getChannelBadge(conv.channel_slug)} <span className="text-[10px] text-gray-500 truncate">{conv.property_name}</span></div>
              <p className={`text-xs truncate pr-6 ${conv.unread_count > 0 ? 'font-bold text-gray-800' : 'text-gray-500'}`}>{conv.last_message}</p>
              {conv.unread_count > 0 && (
                <div className="absolute right-4 bottom-4 w-5 h-5 bg-pink rounded-full flex items-center justify-center text-[10px] font-bold text-white">{conv.unread_count}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 bg-white/80 backdrop-blur-md border border-white shadow-soft-lift rounded-3xl flex flex-col overflow-hidden relative">
        {!activeChat ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-gray-400">
            <FileText size={48} className="mb-4 opacity-30" />
            <p className="font-bold text-lg mb-1">Select a conversation</p>
            <p className="text-sm">Choose a conversation from the left panel to view the message thread.</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white/50">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold text-gray-900">{activeChat.guest_name}</h3>
                  {getChannelBadge(activeChat.channel_slug)}
                  {activeChat.booking_id && <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-bold font-mono">{activeChat.booking_id}</span>}
                </div>
                <p className="text-xs text-gray-500 flex items-center gap-2">
                  <span className="font-bold text-gray-700">{activeChat.property_name}</span>
                  {activeChat.check_in && <><span>•</span><Clock size={12} /> {new Date(activeChat.check_in).toLocaleDateString()} – {new Date(activeChat.check_out).toLocaleDateString()}</>}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
              {messages.map(msg => (
                <div key={msg.ID} className={`flex flex-col ${msg.sender === 'Host' ? 'items-end' : msg.sender === 'System' ? 'items-center' : 'items-start'}`}>
                  {msg.sender === 'System' ? (
                    <div className="px-4 py-2 bg-gray-100/80 rounded-xl text-xs font-medium text-gray-500 flex items-center gap-2 border border-gray-200/50">
                      <FileText size={14} className="text-gray-400" /> {msg.content} • {new Date(msg.CreatedAt).toLocaleTimeString()}
                    </div>
                  ) : (
                    <div className="max-w-[70%]">
                      <div className={`px-5 py-3 rounded-2xl shadow-sm text-sm ${msg.sender === 'Host' ? 'bg-pink-blue-gradient text-white rounded-br-sm' : 'bg-white border border-gray-100 text-gray-800 rounded-bl-sm'}`}>
                        {msg.content}
                      </div>
                      <div className={`flex items-center gap-1 mt-1 text-[10px] text-gray-400 ${msg.sender === 'Host' ? 'justify-end' : 'justify-start'}`}>
                        <span>{new Date(msg.CreatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        {msg.sender === 'Host' && (
                          <>
                            {msg.sync_status === 'failed' && <AlertCircle size={12} className="text-red-500" />}
                            {msg.status === 'sent' && <Check size={12} />}
                            {msg.status === 'delivered' && <CheckCheck size={12} className="text-gray-400" />}
                            {msg.status === 'read' && <CheckCheck size={12} className="text-blue" />}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {messages.length === 0 && <p className="text-sm text-gray-400 text-center py-8">No messages yet. Start the conversation!</p>}
              <div ref={messagesEndRef} />
            </div>

            {/* Templates popover */}
            {showTemplates && (
              <div className="absolute bottom-24 left-6 right-6 bg-white border border-gray-200 shadow-floating rounded-2xl p-4 z-20 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2"><Zap size={16} className="text-blue" /> Quick Replies</h4>
                  <button onClick={() => setShowTemplates(false)} className="text-gray-400 hover:text-gray-900"><X size={16} /></button>
                </div>
                {templates.length === 0 && <p className="text-xs text-gray-400 py-2">No templates found.</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {templates.map((tpl) => (
                    <button key={tpl.ID} onClick={() => insertTemplate(tpl)}
                      className="text-left p-3 rounded-xl border border-gray-100 hover:border-blue hover:bg-blue/5 transition-colors group">
                      <p className="text-xs font-bold text-gray-800 group-hover:text-blue mb-1">{tpl.title}</p>
                      <p className="text-[10px] text-gray-500 line-clamp-2">{tpl.body}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Composer */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex items-end gap-3">
                <button className="p-3 text-gray-400 hover:text-blue hover:bg-gray-50 rounded-xl transition-colors shrink-0"><Paperclip size={20} /></button>
                <div className="relative flex-1">
                  <textarea value={inputText} onChange={e => setInputText(e.target.value)}
                    placeholder={`Reply to ${activeChat.guest_name?.split(' ')[0]} via ${activeChat.channel_slug}...`}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue text-sm min-h-[50px] max-h-[120px] resize-none pr-12"
                    rows="1"
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                  />
                  <button onClick={() => setShowTemplates(!showTemplates)}
                    className="absolute right-3 bottom-3 p-1.5 text-gray-400 hover:text-blue hover:bg-blue/10 rounded-lg transition-colors" title="Quick Replies">
                    <Zap size={16} />
                  </button>
                </div>
                <button onClick={handleSendMessage} disabled={!inputText.trim() || sendingMsg}
                  className="p-3 bg-blue text-white rounded-xl hover:bg-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0">
                  <Send size={20} className={sendingMsg ? 'animate-pulse' : ''} />
                </button>
              </div>
              <div className="text-center mt-2">
                <span className="text-[10px] text-gray-400">Messages are synced to {activeChat.channel_slug}. Press Enter to send.</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
