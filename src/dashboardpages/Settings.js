import React, { useState, useContext } from 'react'
import search2 from '../assets/search2.svg';
import client from '../assets/client.svg'
import quill from '../assets/quill.svg'
import admin from '../assets/Admin.svg'
import { UserContext } from '../context/UserContext';
import { Button } from '../components/ui/button';
import UserRoles from '../components/UserRoles';

export default function Settings() {

  const { updateUserRole } = useContext(UserContext)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleAdmin = () => {
    selectedUsers.forEach(userId => updateUserRole(userId, 'Admin'));
  };

  const handleClient = () => {
    selectedUsers.forEach(userId => updateUserRole(userId, 'Client'));
  };

  const handleBlogger = () => {
    selectedUsers.forEach(userId => updateUserRole(userId, 'Blogger'));
  };

  return (
    <div className='font-outfit pb-20 max-w-7xl mx-auto'>
      <div className='mb-8'>
        <h1 className='text-3xl font-sentientmedium text-gray-900 tracking-tight'>Roles & Permissions</h1>
        <p className='text-gray-500 font-light mt-1'>Assign operational roles to users across the platform.</p>
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
            <Button variant='outline' className='rounded-full flex items-center gap-2 border-gray-200 hover:border-blue hover:text-blue shadow-sm' onClick={handleAdmin}>
              <img className='w-4 h-4 opacity-70' src={admin} alt="Admin" />MAKE ADMIN
            </Button>
            <Button variant='outline' className='rounded-full flex items-center gap-2 border-gray-200 hover:border-pink hover:text-pink shadow-sm' onClick={handleBlogger}>
              <img className='w-4 h-4 opacity-70' src={quill} alt="Blogger" />MAKE BLOGGER
            </Button>
            <Button variant='outline' className='rounded-full flex items-center gap-2 border-gray-200 hover:border-gray-900 hover:text-gray-900 shadow-sm' onClick={handleClient}>
              <img className='w-4 h-4 opacity-70' src={client} alt="Client" />MAKE CLIENT
            </Button>
          </div>
        </div>

        <div className='border border-gray-100 rounded-2xl overflow-hidden bg-white/50 shadow-sm'>
          <UserRoles searchTerm={searchTerm} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
        </div>
      </div>
    </div>
  )
}
