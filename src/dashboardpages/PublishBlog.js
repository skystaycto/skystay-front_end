import React, { useState, useContext } from 'react';
import Editor from '../components/Editor';
import { Button } from '../components/ui/button';
import API_ENDPOINTS from '../config/api';
import { UserContext } from '../context/UserContext';
import { BlogsContext } from '../context/BlogsContext';

export default function PublishBlog() {

  const { user } = useContext(UserContext);
  const { addBlog } = useContext(BlogsContext);
  const [blogTitle, setBlogTitle] = useState('');
  const [editorHtml, setEditorHtml] = useState('');
  const [date] = useState(new Date());
  const [blogImage, setBlogImage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleAddBlog = async () => {
    if (!blogTitle || !editorHtml) return;
    setIsSubmitting(true);
    let imageUrl = blogImage;

    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);

      try {
        const response = await fetch(API_ENDPOINTS.UPLOAD.UPLOAD_SINGLE, {
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
        setIsSubmitting(false);
        return;
      }
    }

    const formattedDate = date.toISOString().split('T')[0];

    const blogdata = {
      user_id: user?.id,
      title: blogTitle,
      content: editorHtml,
      date: formattedDate,
      image: imageUrl,
      visible: true,
      user_name: `${user?.first_name} ${user?.last_name}`,
      user_img: user?.prof_img
    };

    try {
      await addBlog(blogdata);
      setBlogTitle('');
      setEditorHtml('');
      setBlogImage('');
      setImageFile(null);
    } catch (error) {
      console.error('Error adding blog:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='font-outfit pb-20 max-w-4xl mx-auto'>
      <div className='mb-10 text-center'>
        <h1 className='text-3xl font-sentientmedium text-gray-900 tracking-tight'>Publish New Article</h1>
        <p className='text-gray-500 font-light mt-2'>Share insights, news, and guides with the SkyStay community.</p>
      </div>

      <div className='bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-3xl p-6 lg:p-10'>
        <div className='space-y-8'>

          {/* Title Section */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Article Title</label>
            <input
              id='blogTitle'
              value={blogTitle}
              className='w-full rounded-2xl bg-white border border-gray-200 px-5 py-4 text-base outline-none focus:border-blue focus:ring-4 focus:ring-blue/10 transition-all shadow-sm'
              placeholder='Enter a captivating title...'
              onChange={(e) => setBlogTitle(e.target.value)}
            />
          </div>

          {/* Cover Image Section */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Cover Image</label>
            <div className='w-full border-2 border-dashed border-gray-200 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors p-1 flex flex-col items-center justify-center relative overflow-hidden group min-h-[200px]'>
              <input
                type='file'
                id='imageUpload'
                accept='image/*'
                onChange={handleImageChange}
                className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10'
              />

              {blogImage ? (
                <img src={blogImage} alt='Cover Preview' className='w-full h-full object-cover rounded-xl absolute inset-0 mb-0' />
              ) : (
                <div className='flex flex-col items-center text-center p-6'>
                  <div className='w-12 h-12 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center mb-3 text-gray-400 group-hover:text-blue transition-colors group-hover:scale-110'>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </div>
                  <p className='text-sm font-medium text-gray-700'>Click to upload</p>
                  <p className='text-xs text-gray-500 font-light mt-1'>PNG, JPG, GIF up to 5MB</p>
                </div>
              )}

              {blogImage && (
                <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                  <span className='bg-white/90 backdrop-blur text-gray-900 text-sm font-medium px-4 py-2 rounded-full'>Change Image</span>
                </div>
              )}
            </div>
          </div>

          {/* Editor Section */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Content</label>
            <div className='rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-white'>
              <Editor editorHtml={editorHtml} setEditorHtml={setEditorHtml} />
            </div>
            <p className='text-xs text-gray-400 mt-2 font-light'>Support rich media formatting, inline styling, and external links.</p>
          </div>

          <div className='pt-6 flex justify-end gap-4 border-t border-gray-100'>
            <Button variant='outline' className='rounded-xl border-gray-200'>Save Draft</Button>
            <Button
              variant='promo'
              onClick={handleAddBlog}
              className='rounded-xl px-10 shadow-glow-blue hover:scale-105 transition-transform disabled:opacity-70 disabled:hover:scale-100 bg-blue'
              disabled={isSubmitting || !blogTitle || !editorHtml}
            >
              {isSubmitting ? 'Publishing...' : 'Publish Article'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
