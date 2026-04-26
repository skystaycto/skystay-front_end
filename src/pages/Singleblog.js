import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import API_ENDPOINTS from '../config/api';
import { useParams, NavLink } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';

import { BlogsContext } from '../context/BlogsContext';
import { CalendarDays, ChevronLeft, Share2 } from 'lucide-react';

export default function Singleblog() {

  const { id } = useParams();
  const { allblogs } = useContext(BlogsContext);
  const [singleblog, setSingleblog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(API_ENDPOINTS.BLOG.DETAIL(id));
        setSingleblog(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
    window.scrollTo(0, 0); // Reset scroll on load
  }, [id]);

  if (isLoading || !singleblog) {
    return (
      <div className='min-h-screen bg-slate-50 flex items-center justify-center'>
        <div className='animate-float'>
          <div className='w-12 h-12 border-4 border-blue border-t-transparent rounded-full animate-spin'></div>
        </div>
      </div>
    )
  }

  // Related Blogs (exclude current)
  const relatedBlogs = allblogs.filter(b => b.id !== singleblog.id).slice(0, 3);

  return (
    <div className='bg-slate-50 min-h-screen font-outfit pb-24'>

      {/* Hero Header Area */}
      <div className='w-full h-[60vh] min-h-[500px] relative mt-20'>
        <div className='absolute inset-0'>
          <img src={singleblog.image} alt={singleblog.title} className='w-full h-full object-cover' />
          <div className='absolute inset-0 bg-gradient-to-t from-slate-50 via-gray-900/40 to-gray-900/60'></div>
        </div>

        <div className='absolute top-8 left-6 md:left-12 z-20'>
          <NavLink to="/blog" className='flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium'>
            <ChevronLeft size={18} /> Back to Journal
          </NavLink>
        </div>

        {/* Post Title & Meta positioned at bottom of image */}
        <div className='absolute bottom-0 left-0 w-full px-6 md:px-12 pb-16 z-20 translate-y-12'>
          <div className='max-w-[1200px] mx-auto' data-aos="fade-up">
            <div className='bg-white/90 backdrop-blur-xl border border-white/50 shadow-soft-lift rounded-[32px] p-8 md:p-12 max-w-4xl'>
              <h1 className='text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6'>
                {singleblog.title}
              </h1>

              <div className='flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-6'>
                <div className='flex items-center gap-4'>
                  <img className='w-12 h-12 rounded-full object-cover shadow-sm' src={singleblog.user_img} alt={singleblog.user_name} />
                  <div>
                    <p className='font-bold text-gray-900'>{singleblog.user_name}</p>
                    <div className='flex items-center gap-1.5 text-sm text-gray-500'>
                      <CalendarDays size={14} />
                      {new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(singleblog.date))}
                    </div>
                  </div>
                </div>

                <button className='w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:text-blue hover:bg-blue/10 transition-colors'>
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-[1200px] mx-auto px-6 md:px-12 pt-16 md:pt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16'>

        {/* Article Content */}
        <article className='lg:col-span-8 bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-100 prose prose-lg prose-gray max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-blue prose-img:rounded-2xl prose-img:shadow-sm' data-aos="fade-up">
          <div dangerouslySetInnerHTML={{ __html: singleblog.content }}></div>
        </article>

        {/* Sticky Sidebar (Related Articles) */}
        <aside className='lg:col-span-4' data-aos="fade-up" data-aos-delay="200">
          <div className='sticky top-32'>
            <h3 className='text-2xl font-extrabold text-gray-900 mb-6'>Keep Reading</h3>
            <div className='flex flex-col gap-6'>
              {relatedBlogs.length > 0 ? (
                relatedBlogs.map((blog) => (
                  <NavLink to={`/singleblog/${blog.id}`} key={blog.id} className='group bg-white rounded-[24px] p-3 border border-gray-100 shadow-sm hover:shadow-soft-lift hover:-translate-y-1 transition-all duration-300 flex items-center gap-4'>
                    <img className='w-24 h-24 rounded-[16px] object-cover' src={blog.image} alt={blog.title} />
                    <div className='flex-1 pr-2'>
                      <h4 className='font-bold text-gray-900 group-hover:text-blue transition-colors line-clamp-2 text-sm md:text-base leading-tight mb-2'>
                        {blog.title}
                      </h4>
                      <p className='text-xs text-gray-500 font-medium'>{new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(blog.date))}</p>
                    </div>
                  </NavLink>
                ))
              ) : (
                <p className='text-gray-500'>No other articles available.</p>
              )}
            </div>
          </div>
        </aside>

      </div>
    </div>
  )
}
