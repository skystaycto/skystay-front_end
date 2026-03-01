import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext';

export default function UserRoles({ searchTerm, selectedUsers, setSelectedUsers }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { allusers, getallusers } = useContext(UserContext)

  useEffect(() => {
    getallusers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(allusers.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredUsers = allusers.filter(user => {
    const fn = user.first_name || '';
    const ln = user.last_name || '';
    const uid = user.userid || '';
    const em = user.email || '';
    return fn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ln.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uid.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      em.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className='w-full overflow-x-auto'>
      <table className='w-full text-left border-collapse'>
        <thead>
          <tr className='border-b border-gray-100 bg-gray-50/50 text-xs uppercase tracking-wider text-gray-500 font-semibold'>
            <th className='p-4 pl-6 w-12'>
              <input className='cursor-pointer accent-blue w-4 h-4 rounded border-gray-300' type="checkbox" onChange={handleSelectAll} checked={selectedUsers.length === allusers.length && allusers.length > 0} />
            </th>
            <th className='p-4 whitespace-nowrap text-gray-500'>Acc. Id</th>
            <th className='p-4 whitespace-nowrap text-gray-500'>User Name</th>
            <th className='p-4 text-gray-500'>Email</th>
            <th className='p-4 whitespace-nowrap text-gray-500'>Contact Info</th>
            <th className='p-4 whitespace-nowrap text-center text-gray-500'>Role</th>
            <th className='p-4 pr-6 whitespace-nowrap text-gray-500'>Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm">
          {currentItems.map(user => (
            <tr key={user.id} className='hover:bg-slate-50/50 transition-colors bg-white/40'>
              <td className='p-4 pl-6'>
                <input className='cursor-pointer accent-blue w-4 h-4 rounded border-gray-300' type="checkbox" checked={selectedUsers.includes(user.id)} onChange={() => handleSelectUser(user.id)} />
              </td>
              <td className='p-4 font-mono text-gray-400 text-xs'>{user.userid}</td>
              <td className='p-4 font-medium text-gray-900'>{user.first_name} {user.last_name}</td>
              <td className='p-4 text-gray-500'>{user.email}</td>
              <td className='p-4 text-gray-500'>{user.phone_no || '-'}</td>
              <td className='p-4 text-center'>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${user.role === 'Admin' ? 'bg-blue/10 text-blue border border-blue/20' :
                    user.role === 'Blogger' ? 'bg-pink/10 text-pink border border-pink/20' : 'bg-gray-100 text-gray-600 border border-gray-200'
                  }`}>
                  {user.role || 'Client'}
                </span>
              </td>
              <td className='p-4 pr-6'>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.account_status === 'active' || user.account_status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                  {user.account_status || 'Inactive'}
                </span>
              </td>
            </tr>
          ))}
          {currentItems.length === 0 && (
            <tr>
              <td colSpan="7" className="p-8 text-center text-gray-400 font-light">No users found matching your search.</td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex items-center justify-center p-4 border-t border-gray-100 bg-white/50 gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`w-8 h-8 rounded-full text-xs font-semibold transition-colors ${currentPage === index + 1 ? 'bg-blue text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
