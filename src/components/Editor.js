import React, { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

export default function Editor({ editorHtml,setEditorHtml} ) {

  const quillRef = useRef(null);

  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link','video'],
      ['clean']                                         
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];

  // custom font styles injected directly in JSX; no runtime object required

  useEffect(() => {
    if (quillRef.current) {
      const observer = new MutationObserver((mutationsList, observer) => {
        for (let mutation of mutationsList) {
          if (mutation.type === 'childList') {
            // Handle the mutation event
          }
        }
      });

      const editor = quillRef.current.getEditor();
      const editorElement = editor.root;

      observer.observe(editorElement, { childList: true, subtree: true });

      return () => {
        observer.disconnect();
      };
    }
  }, [quillRef]);

  return (
    <div className='font-outfit w-full'>
      <style>{`
        .ql-snow .ql-picker.ql-font .ql-picker-label {
          font-family: "font-outfit above", sans-serif;
        }
        .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="font outfit above"] {
          font-family: "font-outfit above", sans-serif;
        }
      `}</style>
      <ReactQuill 
        ref={quillRef}
        value={editorHtml}
        onChange={setEditorHtml}
        modules={modules}
        formats={formats}
        placeholder="Write something..."
      />
    </div>
  );
}
