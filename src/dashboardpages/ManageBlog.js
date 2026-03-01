import React, { useState, useEffect, useContext } from 'react';
import ArticleCardCont from '../components/ArticleCardCont';
import { BlogsContext } from '../context/BlogsContext';

export default function ManageBlog() {

  const { allblogs, getallblogs } = useContext(BlogsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage, setBlogsPerPage] = useState(6);

  useEffect(() => {
    getallblogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateBlogsPerPage = () => {
    const width = window.innerWidth;
    if (width >= 1280) {
      setBlogsPerPage(8);
    } else {
      setBlogsPerPage(6);
    }
  };

  useEffect(() => {
    updateBlogsPerPage();
    window.addEventListener('resize', updateBlogsPerPage);
    return () => window.removeEventListener('resize', updateBlogsPerPage);
  }, []);

  const totalPages = Math.ceil(allblogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = allblogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='font-outfit pb-20 max-w-7xl mx-auto'>
      <div className='mb-10'>
        <h1 className='text-3xl font-sentientmedium text-gray-900 tracking-tight'>Manage Blog</h1>
        <p className='text-gray-500 font-light mt-1'>View, edit, or remove published articles from your platform's blog.</p>
      </div>

      <div className='bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-3xl p-6 lg:p-8 animate-fade-in'>
        {currentBlogs.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {currentBlogs.map((blog) => (
              <ArticleCardCont key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className='py-12 text-center text-gray-400 font-light border border-gray-100 rounded-3xl bg-white/50'>
            No blog articles found.
          </div>
        )}

        {totalPages > 1 && (
          <div className='flex justify-center mt-10 gap-2'>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`w-10 h-10 rounded-full text-sm font-semibold transition-colors ${currentPage === index + 1
                    ? 'bg-blue text-white shadow-md shadow-blue/20'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
