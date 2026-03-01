import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Latestarticle({ blog }) {
    if (!blog) {
        return null;
    }

    return (
        <NavLink to={`/singleblog/${blog.id}`} className="group block w-full h-full">
            <div className='relative w-full h-[50vh] min-h-[400px] rounded-[32px] overflow-hidden flex flex-col justify-end shadow-sm hover:shadow-floating hover:-translate-y-1 transition-all duration-500'>

                {/* Background Image & Scrim */}
                <div className='absolute inset-0'>
                    <img src={blog.image} alt={blog.title} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out' />
                    <div className='absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent'></div>
                </div>

                {/* Content Area */}
                <div className='relative z-10 p-8 md:p-10 w-full md:w-3/4 lg:w-2/3'>
                    <div className='flex items-center gap-3 mb-4'>
                        <span className='px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded-lg'>
                            Latest
                        </span>
                        <span className='text-white/80 text-sm font-medium'>
                            {new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(blog.date))}
                        </span>
                    </div>

                    <h2 className='text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight group-hover:text-blue-100 transition-colors'>
                        {blog.title}
                    </h2>

                    <article className='text-white/80 text-base md:text-lg line-clamp-2 md:line-clamp-3 mb-6 font-light leading-relaxed' dangerouslySetInnerHTML={{ __html: blog.content }}>
                    </article>

                    {/* Author Info */}
                    <div className='flex items-center gap-3'>
                        <img className='w-10 h-10 rounded-full border-2 border-white/50 object-cover' src={blog.user_img} alt={blog.user_name} />
                        <div>
                            <p className='text-sm font-bold text-white'>{blog.user_name}</p>
                            <p className='text-xs text-white/60'>Author</p>
                        </div>
                    </div>
                </div>
            </div>
        </NavLink>
    )
}
