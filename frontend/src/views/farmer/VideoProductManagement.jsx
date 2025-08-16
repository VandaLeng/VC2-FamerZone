import React, { useState } from 'react';
import { Trash2, Video } from 'lucide-react';

const VideoProductManagement = () => {
  const [videos, setVideos] = useState([
    { id: 1, title: 'How to Harvest Organic Rice', url: 'https://www.youtube.com/embed/example1' },
    { id: 2, title: 'Fresh Vegetables from Our Farm', url: 'https://www.youtube.com/embed/example2' },
  ]);
  const [newVideo, setNewVideo] = useState({ title: '', url: '' });

  // Handle input changes for the new video form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVideo({ ...newVideo, [name]: value });
  };

  // Function to add a new video
  const handleCreateVideo = (e) => {
    e.preventDefault();
    if (newVideo.title && newVideo.url) {
      const videoToAdd = {
        id: videos.length > 0 ? Math.max(...videos.map(v => v.id)) + 1 : 1,
        ...newVideo,
      };
      setVideos([...videos, videoToAdd]);
      setNewVideo({ title: '', url: '' }); // Clear form
    }
  };

  // Function to delete a video
  const handleDeleteVideo = (id) => {
    setVideos(videos.filter(video => video.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-6 border-b pb-4">
          <Video size={32} className="text-green-600" />
          <h2 className="text-2xl font-bold text-gray-800">ការគ្រប់គ្រងវីដេអូផលិតផល</h2>
        </div>

        {/* Video Creation Form */}
        <div className="mb-8 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">បន្ថែមវីដេអូថ្មី</h3>
          <form onSubmit={handleCreateVideo} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                ចំណងជើង
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={newVideo.title}
                onChange={handleInputChange}
                placeholder="ឧ. វីដេអូប្រមូលផល"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                តំណភ្ជាប់វីដេអូ (URL)
              </label>
              <input
                type="url"
                id="url"
                name="url"
                value={newVideo.url}
                onChange={handleInputChange}
                placeholder="ឧ. https://www.youtube.com/watch?v=..."
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              បង្កើតវីដេអូ
            </button>
          </form>
        </div>

        {/* Video List */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">បញ្ជីវីដេអូ</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map(video => (
              <div key={video.id} className="relative rounded-lg overflow-hidden shadow-lg bg-gray-50">
                <div className="aspect-w-16 aspect-h-9 w-full">
                  <iframe
                    src={video.url}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <span className="font-medium text-gray-800">{video.title}</span>
                  <button
                    onClick={() => handleDeleteVideo(video.id)}
                    className="p-2 rounded-full text-red-600 hover:bg-red-100"
                    aria-label={`Delete video ${video.title}`}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {videos.length === 0 && (
            <p className="text-center text-gray-500 mt-8">No videos added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoProductManagement;