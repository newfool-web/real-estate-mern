import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState('');
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
    try {
      // Check file size before upload
      if (file.size > 2 * 1024 * 1024) {
        setFileUploadError('File size must be less than 2MB');
        return;
      }

      // Create form data
      const formData = new FormData();
      formData.append('file', file);

      // Upload to backend using fetch
      const response = await fetch('/api/user/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Upload response:', data); // Debug log
      
      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }
      
      if (data.url) {
        console.log('Setting avatar URL:', data.url); // Debug log
        setFormData((prev) => ({ ...prev, avatar: data.url }));
        setFileUploadError('');
      }
    } catch (error) {
      setFileUploadError(error.message || 'Error uploading file');
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>{fileUploadError}</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input
          type='text'
          placeholder='username'
          id='username'
          className='border p-3 rounded-lg'
        />
        <input
          type='email'
          placeholder='email'
          id='email'
          className='border p-3 rounded-lg'
        />
        <input
          type='text'
          placeholder='password'
          id='password'
          className='border p-3 rounded-lg'
        />
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
          update
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  );
}