import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FILE_DELETE_ENDPOINT } from '../Config/EnvironmentVariables';

const DeleteUploadedFile = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const deleteFile = async () => {
    try {
      // Get the folder name from the cookie
      const cookie = document.cookie.split('; ').find(row => row.startsWith('folder_name='));
      if (!cookie) {
        throw new Error('Cookie containing folder name not found.');
      }
      const folderName = cookie.split('=')[1];

      // Show confirmation dialog
      const confirmDelete = window.confirm('Are you sure you want to delete the uploaded file?');
      if (!confirmDelete) return;

      // Send a DELETE request to the backend endpoint
      const endpoint = `${FILE_DELETE_ENDPOINT}/${folderName}`;
      console.log('Delete endpoint: ', endpoint);
      const response = await axios.delete(endpoint);

      // Delete folder_name from the cookie
      document.cookie = 'folder_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      // Show success toast notification
      toast.success(response.data.message);

      // Redirect to homepage after successful deletion
      navigate('/'); // Navigate to homepage
    } catch (error) {
      // Show error toast notification
      toast.error(error.response ? error.response.data.detail : error.message);
    }
  };

  return (
    <div>
      <button onClick={deleteFile} style={buttonStyle}>Delete Uploaded File</button>
    </div>
  );
};

const buttonStyle = {
  backgroundColor: '#f44336',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
};

export default DeleteUploadedFile;
