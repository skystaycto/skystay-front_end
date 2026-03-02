import React from 'react'
import { NavLink } from 'react-router-dom'
import { CalendarDays } from 'lucide-react'

export default function Articlecard({ blog }) {
  return (
    <NavLink to={`/singleblog/${blog.id}`} className="group block h-full">
      <div className='bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-soft-lift hover:-translate-y-2 transition-all duration-300 flex flex-col h-full'>

        {/* Image Container with Zoom Effect */}
        <div className='relative h-56 overflow-hidden'>
          <div className='absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10'></div>
          <img className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out' src={blog.image} alt={blog.title} />
        </div>

        {/* Content Area */}
        <div className='p-6 flex flex-col flex-grow'>

          <h3 className='text-xl font-bold text-gray-900 mb-3 group-hover:text-blue transition-colors line-clamp-2 leading-tight'>
            {blog.title}
          </h3>

          <article className='text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow' dangerouslySetInnerHTML={{ __html: blog.content }}>
          </article>

          {/* Author & Date Footer */}
          <div className='flex items-center justify-between pt-4 border-t border-gray-100 mt-auto'>
            <div className='flex items-center gap-2'>
              <img className='w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm' src={blog.user_img} alt={blog.user_name} />
              <div className='text-xs font-medium text-gray-700 max-w-[100px] truncate'>{blog.user_name}</div>
            </div>

            <div className='flex items-center gap-1.5 text-xs text-gray-400 font-medium'>
              <CalendarDays size={14} />
              {new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(blog.date))}
            </div>
          </div>

        </div>
      </div>
    </NavLink>
  )
}
