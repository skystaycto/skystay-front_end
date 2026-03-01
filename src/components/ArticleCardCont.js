import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import editicon from '../assets/edit.svg'
import deleteicon from '../assets/delete.svg'
import { BlogsContext } from '../context/BlogsContext'

export default function ArticleCardCont({ blog }) {

  const { deleteBlog } = useContext(BlogsContext);
  const navigate = useNavigate();

  const handleEditBlog = () => {
    navigate(`/editblog/${blog.id}`);
  };

  return (
    <div className='w-full h-full flex flex-col bg-white/70 backdrop-blur-xl border border-white/60 shadow-soft-lift rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-blue group'>

      {/* Image Area */}
      <div className='w-full h-40 overflow-hidden relative bg-slate-100'>
        {blog.image ? (
          <img className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105' src={blog.image} alt={blog.title} />
        ) : (
          <div className='w-full h-full flex items-center justify-center'>
            <span className='text-xs text-gray-400 font-semibold uppercase tracking-wider'>No Image</span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className='p-5 flex flex-col flex-1 relative bg-white/50'>
        <h3 className='text-base font-sentientmedium text-gray-900 mb-2 line-clamp-2 leading-snug'>{blog.title}</h3>

        <div className='text-xs text-gray-500 font-light mb-6 line-clamp-3 leading-relaxed' dangerouslySetInnerHTML={{ __html: blog.content }}></div>

        {/* Actions Footer */}
        <div className='mt-auto flex gap-2 pt-4 border-t border-gray-100/80'>
          <button
            onClick={handleEditBlog}
            className='flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-blue/10 text-blue font-semibold text-xs tracking-wide uppercase hover:bg-blue hover:text-white transition-colors'
          >
            <img className='h-3.5 opacity-80' src={editicon} alt='edit' style={{ filter: 'brightness(0) saturate(100%) invert(32%) sepia(91%) saturate(2891%) hue-rotate(204deg) brightness(96%) contrast(101%)' }} />
            Edit
          </button>
          <button
            onClick={() => deleteBlog(blog.id)}
            className='flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-red-50 text-red-600 font-semibold text-xs tracking-wide uppercase hover:bg-red-500 hover:text-white transition-colors'
          >
            <img className='h-3.5' src={deleteicon} alt='delete' style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)' }} />
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
