import { useState } from 'react';
import API from '../api/axios';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Container from '../components/ui/Container';

function AdminDashboard() {
  const [videos, setVideos] = useState([]);

  const [video, setVideo] = useState({
    title: '',
    description: '',
    category: '',
    youtubeUrl: '',
  });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [videoCount, setVideoCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);

  // upload form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');

  const [editingVideo, setEditingVideo] = useState(null);

  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editYoutubeUrl, setEditYoutubeUrl] = useState('');

  const [contacts, setContacts] = useState([]);

  const handleChange = (e) => {
    setVideo({ ...video, [e.target.name]: e.target.value });
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();

    try {
      await API.post('/videos', video);

      toast.success('Video added successfully 🎬');

      setVideo({
        title: '',
        description: '',
        category: '',
        youtubeUrl: '',
      });

      fetchVideos(); // refresh list
    } catch (err) {
      toast.error('Failed to add video ❌');
    }
  };

  // 🔥 ADD VIDEO
  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      await API.post('/videos', {
        title,
        description,
        category,
        youtubeUrl,
      });

      toast.success('Video uploaded successfully 🎬');

      setTitle('');
      setDescription('');
      setCategory('');
      setYoutubeUrl('');
    } catch (err) {
      console.log(err);
      toast.error('Failed to upload Video');
    }
  };

  const fetchDashboardData = async () => {
    try {
      const videosRes = await API.get('/videos');
      setVideoCount(videosRes.data.length);

      const msgRes = await API.get('/contacts');
      setMessageCount(msgRes.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await API.get('/contacts');
      setContacts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await API.get('/videos'); // adjust if your endpoint differs
      setVideos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this video?'
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/videos/${id}`);

      // 🔥 remove from UI instantly
      setVideos((prev) => prev.filter((video) => video.id !== id));

      toast.success('Video Deleted Successfully!');
    } catch (err) {
      console.log(err);
      toast.error('Video deletion request failed');
    }
  };

  const handleEditClick = (video) => {
    setEditingVideo(video);

    setEditTitle(video.title);
    setEditDescription(video.description);
    setEditCategory(video.category);
    setEditYoutubeUrl(video.youtubeUrl);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/videos/${editingVideo.id}`, {
        title: editTitle,
        description: editDescription,
        category: editCategory,
        youtubeUrl: editYoutubeUrl,
      });

      toast.success('Video updated successfully ✏️');

      // refresh UI
      fetchVideos();

      setEditingVideo(null);
    } catch (err) {
      console.log(err);
      toast.error('Update failed ❌');
    }
  };

  return (
    <Container>
      <div className="min-h-screen py-6 text-black">
        {/* HEADER */}
        <h1 className="mb-6 text-3xl font-bold text-orange-500">
          Admin Dashboard
        </h1>

        {/* MENU */}
        <div className="mb-6 flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => setActiveTab('dashboard')}>
            Dashboard
          </Button>

          <Button variant="secondary" onClick={() => setActiveTab('upload')}>
            Add Video
          </Button>

          <Button
            variant="secondary"
            onClick={() => {
              setActiveTab('manage');
              fetchVideos();
            }}
          >
            Manage Videos
          </Button>

          <Button variant="secondary" onClick={() => setActiveTab('contacts')}>
            Contacts
          </Button>
        </div>

        {activeTab === 'upload' && (
          <div className="rounded p-6">
            <h2 className="mb-4 text-xl text-orange-400">Add New Video</h2>

            <form onSubmit={handleAddVideo} className="space-y-4">
              {/* TITLE */}
              <Input
                name="title"
                placeholder="Video Title"
                value={video.title}
                onChange={handleChange}
              />

              {/* DESCRIPTION */}
              <textarea
                name="description"
                placeholder="Video Description"
                value={video.description}
                onChange={handleChange}
                className="w-full rounded-lg border border-black px-3 py-2"
                required
              />

              {/* CATEGORY */}
              <Input
                name="category"
                placeholder="Category (e.g. Corporate, Wedding)"
                value={video.category}
                onChange={handleChange}
              />

              {/* YOUTUBE URL */}
              <Input
                name="youtubeUrl"
                placeholder="YouTube Video URL"
                value={video.youtubeUrl}
                onChange={handleChange}
              />

              <Button className="w-full">Upload Video</Button>
            </form>
          </div>
        )}

        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-orange-400">
              Overview Dashboard
            </h2>

            {/* STATS CARDS */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card>
                <h3 className="ml-2 font-bold text-orange-400">Total Videos</h3>
                <p className="ml-2 mt-2 text-3xl font-bold text-amber-50">
                  {videoCount}
                </p>
              </Card>

              <Card>
                <h3 className="ml-2 font-bold text-orange-400">
                  Messages Received
                </h3>
                <p className="ml-2 mt-2 text-3xl font-bold text-amber-50">
                  {messageCount}
                </p>
              </Card>
            </div>
          </div>
        )}

        {/* MANAGE TAB */}
        {activeTab === 'manage' && (
          <div className="rounded p-6">
            <h2 className="mb-6 text-xl text-orange-400">Manage Videos</h2>

            {videos.length === 0 ? (
              <p className="text-gray-400">No videos found</p>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {videos.map((video) => (
                  <Card key={video.id} className="overflow-hidden">
                    <div className="relative">
                      <img
                        src={
                          video.thumbnailUrl ||
                          'https://via.placeholder.com/300'
                        }
                        alt={video.title}
                        className="h-40 w-full object-cover"
                      />

                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition hover:opacity-100">
                        ▶
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="truncate font-semibold">{video.title}</h3>
                      <p className="text-sm opacity-70">{video.category}</p>

                      <div className="mt-4 flex justify-between">
                        <Button
                          variant="secondary"
                          onClick={() => handleEditClick(video)}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="danger"
                          onClick={() => handleDelete(video.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="mb-4 rounded p-6 text-xl text-gray-200">
            <h2 className="mb-4 text-xl text-orange-400">Contact Requests</h2>

            {contacts.length === 0 ? (
              <p className="text-gray-400">No contacts found</p>
            ) : (
              <div className="space-y-4">
                {contacts.map((c) => (
                  <Card key={c.id}>
                    <h3 className="font-bold">
                      {c.name} ({c.email})
                    </h3>

                    <p className="mt-2">{c.message}</p>

                    <div className="mt-2 text-sm opacity-70">
                      <p>Project: {c.projectType}</p>
                      <p>Budget: {c.budget}</p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {editingVideo && (
          <div className="fixed inset-0 flex items-center justify-center rounded-lg border-black bg-opacity-70">
            <div className="w-[800px] rounded bg-gray-900 p-6">
              <h2 className="mb-4 text-xl text-orange-400">Edit Video</h2>

              <form onSubmit={handleUpdate} className="space-y-3">
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />

                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full rounded-lg border border-black px-3 py-2"
                />

                <Input
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                />

                <Input
                  value={editYoutubeUrl}
                  onChange={(e) => setEditYoutubeUrl(e.target.value)}
                />

                <div className="flex justify-between">
                  <Button
                    onClick={() => setEditingVideo(null)}
                    variant="primary"
                  >
                    Cancel
                  </Button>

                  <Button type="submit" variant="danger">
                    Update
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}

export default AdminDashboard;
