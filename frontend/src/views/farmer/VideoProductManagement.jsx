import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Video, Eye, EyeOff, Edit3, X, AlertCircle } from 'lucide-react';
import { videoAPI } from '../../stores/api';

const VideoProductManagement = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: ''
  });

  // Fetch videos
  const fetchVideos = async () => {
    try {
      setLoading(true);
      setMessage({ type: '', text: '' });
      
      const data = await videoAPI.getMyVideos();
      
      if (data.success) {
        setVideos(Array.isArray(data.data) ? data.data : []);
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to fetch videos' });
        setVideos([]);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
      setMessage({ type: 'error', text: 'Failed to fetch videos' });
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Clear message after 5 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setMessage({ type: 'error', text: 'Please enter a video title' });
      return false;
    }
    if (!formData.url.trim()) {
      setMessage({ type: 'error', text: 'Please enter a video URL' });
      return false;
    }
    
    try {
      new URL(formData.url);
    } catch {
      setMessage({ type: 'error', text: 'Please enter a valid URL' });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setSubmitting(true);
      setMessage({ type: '', text: '' });

      const videoData = {
        title: formData.title.trim(),
        url: formData.url.trim(),
        description: formData.description.trim()
      };

      let data;
      if (editingVideo) {
        data = await videoAPI.updateVideo(editingVideo.id, videoData);
      } else {
        data = await videoAPI.createVideo(videoData);
      }

      if (data.success) {
        if (editingVideo) {
          setVideos(prev => prev.map(video => 
            video.id === editingVideo.id ? data.data : video
          ));
          setMessage({ type: 'success', text: 'Video updated successfully!' });
        } else {
          setVideos(prev => [data.data, ...prev]);
          setMessage({ type: 'success', text: 'Video added successfully!' });
        }
        resetForm();
      } else {
        setMessage({ 
          type: 'error', 
          text: data.message || (editingVideo ? 'Failed to update video' : 'Failed to add video')
        });
      }
    } catch (error) {
      console.error('Error saving video:', error);
      setMessage({ type: 'error', text: 'Failed to save video' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (video) => {
    setEditingVideo(video);
    setFormData({
      title: video.title || '',
      url: video.url || '',
      description: video.description || ''
    });
    setShowForm(true);
    setMessage({ type: '', text: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this video?')) {
      return;
    }

    try {
      const data = await videoAPI.deleteVideo(id);

      if (data.success) {
        setVideos(prev => prev.filter(video => video.id !== id));
        setMessage({ type: 'success', text: 'Video deleted successfully!' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to delete video' });
      }
    } catch (error) {
      console.error('Error deleting video:', error);
      setMessage({ type: 'error', text: 'Failed to delete video' });
    }
  };

  const toggleStatus = async (id) => {
    try {
      const data = await videoAPI.toggleVideoStatus(id);

      if (data.success) {
        setVideos(prev => prev.map(video =>
          video.id === id ? data.data : video
        ));
        setMessage({ type: 'success', text: data.message || 'Video status updated!' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to update video status' });
      }
    } catch (error) {
      console.error('Error toggling video status:', error);
      setMessage({ type: 'error', text: 'Failed to update video status' });
    }
  };

  const resetForm = () => {
    setFormData({ title: '', url: '', description: '' });
    setEditingVideo(null);
    setShowForm(false);
    setMessage({ type: '', text: '' });
  };

  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const getVideoThumbnail = (video) => {
    if (video.thumbnail_url && !video.thumbnail_url.includes('youtube.com')) {
      return video.thumbnail_url;
    }
    
    const videoId = video.video_id || getYouTubeVideoId(video.url);
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    
    return null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Video size={24} className="text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Video Management</h1>
                <p className="text-gray-600">Manage your farm videos and tutorials</p>
              </div>
            </div>
            <button
              onClick={() => {
                setShowForm(true);
                setMessage({ type: '', text: '' });
              }}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
            >
              <Plus size={20} />
              Add Video
            </button>
          </div>
        </div>

        {/* Message Display */}
        {message.text && (
          <div className={`p-4 border-b ${
            message.type === 'error' 
              ? 'bg-red-50 border-red-200 text-red-800' 
              : 'bg-green-50 border-green-200 text-green-800'
          }`}>
            <div className="flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{message.text}</span>
            </div>
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  {editingVideo ? 'Edit Video' : 'Add New Video'}
                </h3>
                <button
                  onClick={resetForm}
                  className="p-1 hover:bg-gray-100 rounded-full"
                  disabled={submitting}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter video title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    disabled={submitting}
                    maxLength={255}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Video URL *
                  </label>
                  <input
                    type="url"
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    disabled={submitting}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Brief description of the video"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    disabled={submitting}
                    maxLength={1000}
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
                    disabled={submitting}
                  >
                    {submitting ? 'Saving...' : (editingVideo ? 'Update' : 'Add')} Video
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video List */}
        <div className="p-6">
          {videos.length === 0 ? (
            <div className="text-center py-12">
              <Video size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No videos added yet</p>
              <p className="text-gray-400">Start by adding your first farm video</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Preview</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Views</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {videos.map((video) => {
                    const thumbnailUrl = getVideoThumbnail(video);
                    
                    return (
                      <tr key={video.id} className="border-b hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-4 py-3">
                          <div className="w-20 h-12 bg-gray-200 rounded overflow-hidden">
                            {thumbnailUrl ? (
                              <img
                                src={thumbnailUrl}
                                alt={video.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            <div className="w-full h-full flex items-center justify-center" style={{display: thumbnailUrl ? 'none' : 'flex'}}>
                              <Video size={16} className="text-gray-400" />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900 max-w-xs truncate">
                            {video.title}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-gray-600 max-w-xs truncate">
                            {video.description || 'No description'}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-gray-600">
                            {video.formatted_views || video.views || 0}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            video.is_active 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {video.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {video.time_ago || (video.created_at ? new Date(video.created_at).toLocaleDateString() : 'N/A')}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => toggleStatus(video.id)}
                              className={`p-1.5 rounded-full transition-colors duration-200 ${
                                video.is_active 
                                  ? 'text-green-600 hover:bg-green-100' 
                                  : 'text-red-600 hover:bg-red-100'
                              }`}
                              title={video.is_active ? 'Deactivate' : 'Activate'}
                            >
                              {video.is_active ? <Eye size={16} /> : <EyeOff size={16} />}
                            </button>
                            <button
                              onClick={() => handleEdit(video)}
                              className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-full transition-colors duration-200"
                              title="Edit"
                            >
                              <Edit3 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(video.id)}
                              className="p-1.5 text-red-600 hover:bg-red-100 rounded-full transition-colors duration-200"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoProductManagement;