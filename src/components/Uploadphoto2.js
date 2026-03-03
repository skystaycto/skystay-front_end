import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';import API_ENDPOINTS from '../config/api';import cloud from '../assets/cloud.svg';

const UploadPhotos2 = ({ photos, setPhotos, setUploadPromise }) => {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    // Set initial previews
    if (Array.isArray(photos)) {
      setPreviews(photos);
    } else {
      try {
        const initialPhotos = JSON.parse(photos);
        if (Array.isArray(initialPhotos)) {
          setPreviews(initialPhotos);
        }
      } catch (error) {
        console.error('Failed to parse initial photos:', error);
        setPreviews([]);  // Set to empty array if parsing fails
      }
    }
  }, [photos]);

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

    // Return a promise that resolves when the upload is complete
    const uploadPromise = new Promise((resolve, reject) => {
      const formData = new FormData();
      acceptedFiles.forEach((file) => {
        formData.append('files', file);
      });

      axios.post(API_ENDPOINTS.UPLOAD.UPLOAD, formData)
        .then((response) => {
          console.log('Upload success:', response.data);
          const secureUrls = response.data;
          console.log('Secure URLs:', secureUrls);
          if (Array.isArray(secureUrls) && secureUrls.every(url => typeof url === 'string')) {
            setPhotos((prev) => {
              let currentPhotos;
              if (Array.isArray(prev)) {
                currentPhotos = prev;
              } else {
                try {
                  currentPhotos = JSON.parse(prev);
                  if (!Array.isArray(currentPhotos)) throw new Error('Invalid JSON structure');
                } catch (error) {
                  currentPhotos = [];
                }
              }
              return [...currentPhotos, ...secureUrls];
            });
            resolve();
          } else {
            console.error('Secure URLs extraction failed:', secureUrls);
            reject(new Error('Invalid secure URLs format'));
          }
        })
        .catch((error) => {
          console.error('Upload error:', error);
          reject(error);
        });
    });
    
    setUploadPromise(uploadPromise);
  }, [setPhotos, setUploadPromise]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`} style={styles.dropzone}>
      <img src={cloud} style={styles.cloudImage} alt="Cloud Upload Icon" />
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
};

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

export default UploadPhotos2;
