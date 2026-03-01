import React, { useState, useEffect, useContext } from 'react'
import { Helmet } from 'react-helmet-async';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Articlecard from '../components/Articlecard'
import Latestarticle from '../components/Latestarticle'
import { BlogsContext } from '../context/BlogsContext';

export default function Blog() {

  const { allblogs, getallblogs } = useContext(BlogsContext);

  useEffect(() => {
    getallblogs();
    AOS.init({ duration: 800, once: true });
  }, [getallblogs]);

  useEffect(() => {
    updateBlogsPerPage();
    window.addEventListener('resize', updateBlogsPerPage);
    return () => window.removeEventListener('resize', updateBlogsPerPage);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage, setBlogsPerPage] = useState(6);

  const updateBlogsPerPage = () => {
    const width = window.innerWidth;
    if (width >= 1280 && width < 1920) {
      setBlogsPerPage(8);
    } else {
      setBlogsPerPage(6);
    }
  };

  const latestBlogs = allblogs.slice(0, 2);
  const remainingBlogs = allblogs.slice(2);

  const totalPages = Math.ceil(remainingBlogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = remainingBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 500, behavior: 'smooth' });
  };

  return (
    <div className='bg-slate-50 min-h-screen font-outfit pb-24 pt-32'>
      <Helmet>
        <title>Journal & Stories | SkyStay.Homes</title>
        <link rel="canonical" href="/blog" />
      </Helmet>

      <div className='max-w-[1400px] mx-auto px-6 md:px-8'>

        {/* Header */}
        <div className='mb-12 text-center md:text-left' data-aos="fade-up">
          <span className='text-pink font-bold text-sm tracking-widest uppercase mb-2 block'>Journal</span>
          <h1 className='text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight'>
            Travel stories & inspiration
          </h1>
        </div>

        {/* Featured / Latest Articles */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20' data-aos="fade-up" data-aos-delay="100">
          {latestBlogs.length > 0 ? (
            latestBlogs.map((blog) => (
              <Latestarticle key={blog.id} blog={blog} />
            ))
          ) : (
            <div className='col-span-full py-20 text-center bg-white rounded-3xl border border-gray-100'>
              <p className='text-gray-500 font-medium text-lg'>Stay tuned! Exciting stories are coming soon.</p>
            </div>
          )}
        </div>

        {/* All Articles Grid */}
        {remainingBlogs.length > 0 && (
          <>
            <div className='mb-8' data-aos="fade-up">
              <h2 className='text-3xl font-extrabold text-gray-900'>All Articles</h2>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16'>
              {currentBlogs.map((blog, idx) => (
                <div key={blog.id} data-aos="fade-up" data-aos-delay={(idx % 4) * 100}>
                  <Articlecard blog={blog} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className='flex justify-center items-center gap-2 mt-12' data-aos="fade-up">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-all ${currentPage === index + 1
                        ? 'bg-pink-blue-gradient text-white shadow-glow-blue scale-110'
                        : 'bg-white text-gray-500 border border-gray-200 hover:border-blue hover:text-blue'
                      }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </div>
  )
}
