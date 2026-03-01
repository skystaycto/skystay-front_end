import React, { useState, useContext } from 'react'
import search2 from '../assets/search2.svg';
import onicon from '../assets/on.svg'
import flash from '../assets/flash.svg'
import delete6 from '../assets/delete6.svg'
import { UserContext } from '../context/UserContext';
import { Button } from '../components/ui/button';
import UserData from '../components/UserData';

export default function UserManagement() {

  const { updateUserStatus } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleActivate = () => {
    selectedUsers.forEach(userId => updateUserStatus(userId, 'active'));
  };

  const handleDeactivate = () => {
    selectedUsers.forEach(userId => updateUserStatus(userId, 'inactive'));
  };

  return (
    <div className='font-outfit pb-20 max-w-7xl mx-auto'>
      <div className='mb-8'>
        <h1 className='text-3xl font-sentientmedium text-gray-900 tracking-tight'>User Management</h1>
        <p className='text-gray-500 font-light mt-1'>Manage user accounts, statuses, and permissions.</p>
      </div>

      <div className='bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-3xl p-6 lg:p-8 animate-fade-in'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8'>
          {/* Search Bar */}
          <div className='relative w-full md:w-96'>
            <input
              className='w-full rounded-full border border-gray-200 bg-white/50 pl-12 pr-4 py-3 text-sm outline-none focus:border-blue focus:ring-2 focus:ring-blue/20 transition-all'
              placeholder='Search Username, Id or Email'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <img className='w-5 h-5 opacity-40' src={search2} alt='search' />
            </div>
          </div>

          <div className='flex flex-wrap gap-3'>
            <Button variant='outline' className='rounded-full flex items-center gap-2 border-gray-200 hover:border-green-500 hover:text-green-600 shadow-sm' onClick={handleActivate}>
              <img className='w-4 h-4' src={flash} alt='activate' />ACTIVATE
            </Button>
            <Button variant='outline' className='rounded-full flex items-center gap-2 border-gray-200 hover:border-yellow-500 hover:text-yellow-600 shadow-sm' onClick={handleDeactivate}>
              <img className='w-4 h-4' src={onicon} alt='deactivate' />DEACTIVATE
            </Button>
            <Button variant='outline' className='rounded-full flex items-center gap-2 border-gray-200 hover:border-pink hover:text-pink shadow-sm'>
              <img className='w-4 h-4 opacity-70' src={delete6} alt='delete' />DELETE
            </Button>
          </div>
        </div>

        <div className='border border-gray-100 rounded-2xl overflow-hidden bg-white/50 shadow-sm'>
          <UserData searchTerm={searchTerm} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
        </div>
      </div>
    </div>
  )
}
