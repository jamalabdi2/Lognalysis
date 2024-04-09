import React, { useState } from 'react';
import axios from 'axios';
import { FILE_UPLOAD_ENDPOINT } from '../Config/EnvironmentVariables';
import './FileUpload.css'
function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB in bytes
  const MIN_FILE_SIZE = 1 * 1024; // 1MB in bytes

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if the file is a .log file
    if (!file.name.toLowerCase().endsWith('.log')) {
      setErrorMessage('Only .log files allowed.');
      setSelectedFile(null);
      return;
    }

    // Check file size (limit to 20MB)
    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage('File size exceeds the limit (20MB).');
      setSelectedFile(null);
      return;
    }

    if (file.size < MIN_FILE_SIZE) {
      setErrorMessage('File size is too small (minimum 1MB).');
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setErrorMessage('');
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setErrorMessage('Please select a file.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post(FILE_UPLOAD_ENDPOINT, formData);
    

      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        setUploadStatus('success');
        setErrorMessage('');
      } else {
        setUploadStatus('error');
        setErrorMessage('Error uploading file.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('error');
      setErrorMessage('Error uploading file. Please try again.');
    }
  };

  return (
    <div className='fileUploadDiv'>
      <form className='fileForm'>
          <label htmlFor="fileInput" className='label'>Upload Log file</label>
          <input type="file" onChange={handleFileChange} className='fileInput' />
          <button type='submit' onClick={handleFileUpload} className='submitBtn'>Upload</button>
      </form>
      {uploadStatus === 'success' && <p className="success-message">File uploaded successfully.</p>}
      {uploadStatus === 'error' && <p className="error-message">{errorMessage}</p>}

    </div>
  );
}

export default FileUpload;
