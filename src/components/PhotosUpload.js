import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import cloud from '../assets/cloud.svg';

const PhotosUpload = ({ setDocumentPhotos}) => {

    const [previews, setPreviews] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
      const newPreviews = [];
  
      acceptedFiles.forEach((file) => {
        // Set preview
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result);
          if (newPreviews.length === acceptedFiles.length) {
            setPreviews((prev) => [...prev, ...newPreviews]);
          }
        };
        reader.readAsDataURL(file);
      });
    
      // Upload to backend
      const formData = new FormData();
      acceptedFiles.forEach((file) => {
        formData.append('files', file);
      });
  
      axios.post('https://skystayserver-n8xf.onrender.com/uploads', formData)
        .then((response) => {
          console.log('Upload success:', response.data);
          // Debugging response structure
          console.log('Full Response:', response);
          // Set photos using the secure URLs
          const secureUrls = response.data
          console.log('Secure URLs:', secureUrls);
          if (Array.isArray(secureUrls) && secureUrls.every(url => typeof url === 'string')) {
            setDocumentPhotos(prev => [...prev, ...secureUrls]);
          } else {
            console.error('Secure URLs extraction failed:', secureUrls);
          }
        })
        .catch((error) => {
          console.error('Upload error:', error);
        });
    }, [setDocumentPhotos]);
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`} style={styles.dropzone}>
          <img src={cloud} style={styles.cloudImage} />
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop some files here, or click to select files</p>
          }
          <div style={styles.previewContainer}>
            {previews.map((preview, index) => (
              <img key={index} src={preview} alt="Preview" style={styles.previewImage} />
            ))}
          </div>
        </div>
    );
}

const styles = {
    dropzone: {
      border: '2px dashed #cccccc',
      borderRadius: '5px',
      padding: '20px',
      textAlign: 'center',
      cursor: 'pointer',
      marginBottom: '20px',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    cloudImage: {
      maxWidth: '100px',
      marginBottom: '10px',
    },
    previewContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: '10px',
    },
    previewImage: {
      width: '120px',
      height: '100px',
      objectFit: 'cover',
      margin: '5px',
    }
  };

export default PhotosUpload
