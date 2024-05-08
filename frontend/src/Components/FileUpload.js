import React, { useState } from 'react';
import axios from 'axios';
import { FILE_UPLOAD_ENDPOINT } from '../Config/EnvironmentVariables';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './FileUpload.css';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB in bytes
  const MIN_FILE_SIZE = 1 * 1024; // 1MB in bytes

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.log')) {
      toast.error('Only .log files allowed.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error('File size exceeds the limit (20MB).');
      return;
    }

    if (file.size < MIN_FILE_SIZE) {
      toast.error('File size is too small (minimum 1MB).');
      return;
    }

    setSelectedFile(file);
    setErrorMessage('');
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error('Please select a file.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post(FILE_UPLOAD_ENDPOINT, formData,{withCredentials: true});

      if (response.status === 200) {
        setUploadStatus('success');
        toast.success('Successfully uploaded the file');
        setSelectedFile(null)
        navigate('/dashboard');
      } else {
        setUploadStatus('error');
        toast.error('Error uploading file.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('error');
      toast.error('Error uploading file. Please try again.');
    }
  };

  return (
    <div className='fileUploadDiv'>
      <div className="info">
        <p className='fileUploadTitle'>Hey Upload your Log file</p>
      </div>
      <form className='fileForm'>
        <input type="file" onChange={handleFileChange} className='fileInput' />
        <button type='submit' onClick={handleFileUpload} className='submitBtn'>Upload</button>
      </form>
      {uploadStatus === 'success' && <p className="success-message">File uploaded successfully.</p>}
      {uploadStatus === 'error' && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default FileUpload;
