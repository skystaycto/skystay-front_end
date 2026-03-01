import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import {
  LayoutDashboard,
  User,
  CalendarDays,
  Building2,
  Megaphone,
  PlusCircle,
  ClipboardList,
  CheckSquare,
  Upload,
  Settings as SettingsIcon,
  Users,
  FileText,
  Menu,
  X,
  LogOut,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import MyProfile from '../dashboardpages/MyProfile'
import MyBookings from '../dashboardpages/MyBookings'
import MyListings from '../dashboardpages/MyListings'
import ListProperty from '../dashboardpages/ListProperty'
import ManageReservations from '../dashboardpages/ManageReservations'
import DashboardOverview from '../dashboardpages/DashboardOverview'
import ApproveListing from '../dashboardpages/ApproveListing'
import PublishListing from '../dashboardpages/PublishListing'
import ManageListing from '../dashboardpages/ManageListing'
import PublishBlog from '../dashboardpages/PublishBlog'
import ManageBlog from '../dashboardpages/ManageBlog'
import UserManagement from '../dashboardpages/UserManagement'
import Settings from '../dashboardpages/Settings'
import Marketing from '../dashboardpages/Marketing'

export default function Dashboard() {

  const { user, logoutUser } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState('profile');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // navigate('/'); 
    }
  }, [user, navigate]);


  const renderContent = () => {
    switch (currentPage) {
      case 'overview': return <DashboardOverview />;
      case 'profile': return <MyProfile />;
      case 'bookings': return <MyBookings />;
      case 'listings': return <MyListings />;
      case 'marketing': return <Marketing />;
      case 'listProperty': return <ListProperty />;
      case 'manage': return <ManageReservations />;
      case 'approveListing': return <ApproveListing />;
      case 'publishListing': return <PublishListing />;
      case 'manageListing': return <ManageListing />;
      case 'publishBlog': return <PublishBlog />;
      case 'manageBlog': return <ManageBlog />;
      case 'userManagement': return <UserManagement />;
      case 'settings': return <Settings />;
      default: return <MyProfile />;
    }
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, roles: ['Admin'] },
    { id: 'profile', label: 'My Profile', icon: User, roles: ['Admin', 'User', 'Blogger'] },
    { id: 'bookings', label: 'My Bookings', icon: CalendarDays, roles: ['Admin', 'User', 'Blogger'] },
    { id: 'listings', label: 'Services', icon: Sparkles, roles: ['Admin'] },
    { id: 'marketing', label: 'Marketing', icon: Megaphone, roles: ['Admin'] },
    { id: 'listProperty', label: 'List Property', icon: PlusCircle, roles: ['Admin', 'User', 'Blogger'] },
    { id: 'manage', label: 'Reservations', icon: ClipboardList, roles: ['Admin', 'User', 'Blogger'] },
    { id: 'approveListing', label: 'Approve Requests', icon: CheckSquare, roles: ['Admin'] },
    { id: 'publishListing', label: 'Publish Listing', icon: Upload, roles: ['Admin'] },
    { id: 'manageListing', label: 'Manage Listings', icon: Building2, roles: ['Admin'] },
    { id: 'publishBlog', label: 'Publish Blog', icon: FileText, roles: ['Admin', 'Blogger'] },
    { id: 'manageBlog', label: 'Manage Blog', icon: FileText, roles: ['Admin', 'Blogger'] },
    { id: 'userManagement', label: 'Users', icon: Users, roles: ['Admin'] },
    { id: 'settings', label: 'Settings', icon: SettingsIcon, roles: ['Admin'] },
  ];

  const filteredMenuItems = menuItems.filter(item =>
    user && item.roles.includes(user.role || 'User')
  );

  return (
    <div className='min-h-screen bg-slate-50 flex font-outfit pt-24 pb-8 transition-all duration-300 relative overflow-hidden'>

      {/* Decorative Background Glows */}
      <div className='absolute top-0 left-0 w-[500px] h-[500px] bg-blue/5 rounded-full blur-[100px] pointer-events-none'></div>
      <div className='absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink/5 rounded-full blur-[100px] pointer-events-none'></div>

      <button
        className='fixed bottom-6 right-6 z-50 bg-pink-blue-gradient text-white p-3.5 rounded-full shadow-glow-blue md:hidden hover:scale-105 transition-transform'
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Floating Sidebar */}
      <aside className={`
        fixed inset-y-0 left-4 z-40 w-64 transform transition-all duration-500 ease-in-out pt-24 pb-8
        ${isSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-[120%] opacity-0 md:opacity-100'}
        md:translate-x-0 md:static md:h-auto md:min-h-[calc(100vh-8rem)] ml-4 md:ml-8
      `}>
        <div className='bg-white/80 backdrop-blur-xl border border-white shadow-soft-lift rounded-3xl p-4 h-full flex flex-col relative overflow-hidden'>

          <div className='space-y-1.5 flex-1 overflow-y-auto no-scrollbar relative z-10'>
            {filteredMenuItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-300 relative overflow-hidden group
                                  ${isActive
                      ? 'text-blue bg-blue/5 shadow-sm scale-100'
                      : 'text-gray-500 hover:bg-gray-50/80 hover:text-gray-900 hover:scale-[1.02]'
                    }
                              `}
                >
                  {isActive && (
                    <div className='absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue to-pink rounded-r-full'></div>
                  )}
                  <item.icon size={18} className={`transition-colors duration-300 ${isActive ? 'text-blue' : 'group-hover:text-pink'}`} />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className='pt-4 mt-4 border-t border-gray-100 relative z-10'>
            <button onClick={() => { logoutUser(); navigate('/'); }} className='w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-500 hover:text-pink hover:bg-pink/5 rounded-2xl transition-all duration-300'>
              <LogOut size={18} />
              Log out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className='flex-1 px-6 md:px-8 overflow-x-hidden relative z-10'>
        <div className='max-w-6xl mx-auto bg-white/60 backdrop-blur-lg border border-white/50 shadow-sm rounded-[32px] min-h-[calc(100vh-8rem)] p-6 md:p-10'>
          {renderContent()}
        </div>
      </main>

    </div>
  )
}
