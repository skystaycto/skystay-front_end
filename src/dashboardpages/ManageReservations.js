import React from 'react'

export default function ManageReservations() {
  return (
    <div className='font-outfit min-h-[60vh] flex flex-col items-center justify-center text-center px-4'>
      <div className='bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-3xl p-12 max-w-lg w-full animate-fade-in'>
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue to-pink flex items-center justify-center mx-auto mb-6 shadow-glow-blue relative">
          <div className='absolute inset-1 bg-white rounded-full flex items-center justify-center'>
            <svg className="w-10 h-10 text-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
        </div>
        <h2 className='text-2xl font-sentientmedium text-gray-900 mb-3'>Manage Reservations</h2>
        <p className='text-gray-500 font-light mb-8'>This section is currently under development. Soon you'll be able to manage all incoming and outgoing property reservations from this unified dashboard view.</p>
        <div className='px-6 py-2 bg-gradient-to-r from-blue/10 to-pink/10 border border-blue/20 rounded-full text-sm text-blue font-semibold inline-block uppercase tracking-wider'>
          Coming Soon
        </div>
      </div>
    </div>
  )
}
