import React, { useState, useContext, useEffect } from 'react'
import '../css/Dashboard.css'
import axios from 'axios'
import Editor from '../components/Editor'
import { Button } from '../components/ui/button'
import { useParams } from 'react-router-dom'
import { BlogsContext } from '../context/BlogsContext';

export default function EditBlog() {
  const { id } = useParams();
  const { updateBlog } = useContext(BlogsContext);
  const [singleblog, setSingleBlog] = useState(null);
  const [blogTitle, setBlogTitle] = useState('');
  const [editorHtml, setEditorHtml] = useState('');
  const [date, setDate] = useState(new Date());
  const [blogImage, setBlogImage] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`https://skystayserver-n8xf.onrender.com/blogs/${id}`);
        const blogData = response.data;
        setSingleBlog(blogData);
        setBlogTitle(blogData.title);
        setEditorHtml(blogData.content);
        setBlogImage(blogData.image);
        setDate(new Date(blogData.date));
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlog();
  }, [id]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBlogImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditBlog = async () => {
    let imageUrl = blogImage;
    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);
      try {
        const response = await fetch('https://skystayserver-n8xf.onrender.com/upload', {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          const result = await response.json();
          imageUrl = result.secure_url;
          setBlogImage(imageUrl);
        } else {
          throw new Error('Failed to upload image');
        }
      } catch (error) {
        console.error('Failed to upload image:', error);
        return;
      }
    }

    const formattedDate = date.toISOString().split('T')[0];
    const blogdata = {
      title: blogTitle,
      content: editorHtml,
      date: formattedDate,
      image: imageUrl,
    };

    try {
      await updateBlog(id, blogdata);
      // Optional: Add a toast notification here
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  if (!singleblog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 font-outfit">
        <div className="w-12 h-12 border-4 border-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-slate-50 font-outfit py-[40px] px-4'>
      <div className='max-w-4xl mx-auto'>

        <div className='text-center mb-[40px]'>
          <h1 className='text-3xl lg:text-4xl font-sentientmedium text-gray-900 tracking-tight'>Edit Blog Post</h1>
          <div className='h-1 w-24 bg-blue-gradient rounded-full mx-auto mt-4' />
        </div>

        <div className='bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-3xl p-8 lg:p-12'>
          <div className='space-y-8'>

            {/* Title */}
            <div>
              <label htmlFor='blogTitle' className='block text-sm font-medium text-gray-700 mb-2'>Blog Title</label>
              <input
                id='blogTitle'
                className='w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-base font-light outline-none transition-all focus:border-blue focus:ring-2 focus:ring-blue/20'
                placeholder='Enter an engaging title...'
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
              />
            </div>

            {/* Editor */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Content Editor</label>
              <div className='border-0 rounded-2xl overflow-hidden shadow-sm'>
                {/* The Editor component itself handles its styling, wrapping it cleanly here */}
                <Editor editorHtml={editorHtml} setEditorHtml={setEditorHtml} />
              </div>
            </div>

            {/* Image Upload */}
            <div className='bg-slate-50 border border-gray-200 border-dashed rounded-2xl p-8 text-center transition-colors hover:bg-slate-100'>
              <label htmlFor='imageUpload' className='block text-sm font-medium text-gray-900 mb-2'>
                Cover Image
              </label>
              <p className="text-xs text-gray-500 mb-4 font-light">Upload a high-quality image to represent your story.</p>

              <div className="mt-2 flex justify-center rounded-xl overflow-hidden mb-4">
                {blogImage && (
                  <img src={blogImage} alt='Selected cover' className='max-h-[300px] w-auto rounded-lg shadow-sm object-cover' />
                )}
              </div>

              <input
                type='file'
                id='imageUpload'
                accept='image/*'
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue/10 file:text-blue hover:file:bg-blue/20 transition-colors mx-auto max-w-[300px]"
              />
            </div>

            {/* Actions */}
            <div className='pt-6 flex justify-end'>
              <Button variant='promo' className="rounded-full px-10 py-6 text-base shadow-glow-blue hover:-translate-y-1 transition-transform" onClick={handleEditBlog}>
                Publish Changes
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
