import React, { useState } from 'react';
import axios from 'axios';
// import '../Style/CreatePost.css';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    name: '',
    content: '',
    img: '',
    tags: [],
    postedBy: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/posts', formData);
      window.location.href = '/Blog';
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post. Please try again.');
    }
  };

  return (
    <div className="bg-white min-h-screen w-full flex flex-col items-center py-8">
      <h2 className='text-2xl mb-12'>Create Post</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-gray-200 p-8 rounded-lg shadow-md flex flex-col gap-y-4">
        <div className="inputGroup flex flex-col">
          <label className="mb-2">Title:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="inputGroup flex flex-col">
          <label className="mb-2">Content:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            className="input p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="inputGroup flex flex-col">
          <label className="mb-2">Image URL:</label>
          <input
            type="text"
            name="img"
            value={formData.img}
            onChange={handleChange}
            className="input p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="inputGroup flex flex-col">
          <label className="mb-2">Tags:</label>
          <input
            type="text"
            name="tags"
            value={formData.tags.join(',')}
            onChange={(e) =>
              setFormData({
                ...formData,
                tags: e.target.value.split(',')
              })
            }
            className="input p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="inputGroup flex flex-col">
          <label className="mb-2">Posted By:</label>
          <input
            type="text"
            name="postedBy"
            value={formData.postedBy}
            onChange={handleChange}
            required
            className="input p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button type="submit" className="button bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Submit</button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default CreatePost;
