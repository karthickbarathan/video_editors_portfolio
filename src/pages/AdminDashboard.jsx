import { useState } from "react";
import API from "../api/axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

function AdminDashboard() {

    const [videos, setVideos] = useState([]);

    const [video, setVideo] = useState({
  title: "",
  description: "",
  category: "",
  youtubeUrl: ""
});
    const [activeTab, setActiveTab] = useState("dashboard");
    const [videoCount, setVideoCount] = useState(0);
    const [messageCount, setMessageCount] = useState(0);

  // upload form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const [editingVideo, setEditingVideo] = useState(null);

    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editCategory, setEditCategory] = useState("");
    const [editYoutubeUrl, setEditYoutubeUrl] = useState("");

    const [contacts, setContacts] = useState([]);

    const handleChange = (e) => {
  setVideo({ ...video, [e.target.name]: e.target.value });
};

const handleAddVideo = async (e) => {
  e.preventDefault();

  try {
    await API.post("/videos", video);

    toast.success("Video added successfully 🎬");

    setVideo({
      title: "",
      description: "",
      category: "",
      youtubeUrl: ""
    });

    fetchVideos(); // refresh list

  } catch (err) {
    toast.error("Failed to add video ❌");
  }
};

  // 🔥 ADD VIDEO
  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      await API.post("/videos", {
        title,
        description,
        category,
        youtubeUrl,
      });

      toast.success("Video uploaded successfully 🎬");

      setTitle("");
      setDescription("");
      setCategory("");
      setYoutubeUrl("");
    } catch (err) {
      console.log(err);
      toast.error("Failed to upload Video")
    }
  };

        const fetchDashboardData = async () => {
        try {
            const videosRes = await API.get("/videos");
            setVideoCount(videosRes.data.length);

            const msgRes = await API.get("/contacts");
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
            const res = await API.get("/contacts");
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
    const res = await API.get("/videos"); // adjust if your endpoint differs
    setVideos(res.data);
  } catch (err) {
    console.log(err);
  }
};


    const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this video?");

        if (!confirmDelete) return;

        try {
            await API.delete(`/videos/${id}`);

            // 🔥 remove from UI instantly
            setVideos((prev) => prev.filter((video) => video.id !== id));

            toast.success("Video Deleted Successfully!")
        } catch (err) {
            console.log(err);
            toast.error("Video deletion request failed")
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

                toast.success("Video updated successfully ✏️");

                // refresh UI
                fetchVideos();

                setEditingVideo(null);
            } catch (err) {
                console.log(err);
                toast.error("Update failed ❌");
            }
        };

  return (
    <div className="min-h-screen bg-[#ffffff] text-black p-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-orange-500 mb-6">
        Admin Dashboard
      </h1>

      {/* MENU */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("dashboard")}
          className="px-5 py-2
                    rounded-full
                    text-black font-semibold

                    bg-white/20 backdrop-blur-xl
                    border border-white/30

                    shadow-[0_6px_0px_rgba(0,0,0,0.15)]
                    transition-all duration-300 ease-out

                    hover:-translate-y-1
                    hover:bg-white/30
                    hover:shadow-[0_15px_35px_rgba(0,0,0,0.25)]
                    hover:border-white/50

                    active:translate-y-0
                    active:shadow-[0_5px_15px_rgba(0,0,0,0.2)]
                    "
        >
          Dashboard
        </button>

        <button
          onClick={() => setActiveTab("upload")}
          className="px-5 py-2
                    rounded-full
                    text-black font-semibold

                    bg-white/20 backdrop-blur-xl
                    border border-white/30

                    shadow-[0_6px_0px_rgba(0,0,0,0.15)]
                    transition-all duration-300 ease-out

                    hover:-translate-y-1
                    hover:bg-white/30
                    hover:shadow-[0_15px_35px_rgba(0,0,0,0.25)]
                    hover:border-white/50

                    active:translate-y-0
                    active:shadow-[0_5px_15px_rgba(0,0,0,0.2)]
                    "
        >
          Add Video
        </button>

        <button
            onClick={() => {
                setActiveTab("manage");
                fetchVideos();   // 🔥 load videos when clicked
            }}
            className="px-5 py-2
                    rounded-full
                    text-black font-semibold

                    bg-white/20 backdrop-blur-xl
                    border border-white/30

                    shadow-[0_6px_0px_rgba(0,0,0,0.15)]
                    transition-all duration-300 ease-out

                    hover:-translate-y-1
                    hover:bg-white/30
                    hover:shadow-[0_15px_35px_rgba(0,0,0,0.25)]
                    hover:border-white/50

                    active:translate-y-0
                    active:shadow-[0_5px_15px_rgba(0,0,0,0.2)]
                    "
            >
            Manage Videos
        </button>

        <button onClick={() => setActiveTab("contacts")} className="px-5 py-2
                    rounded-full
                    text-black font-semibold

                    bg-white/20 backdrop-blur-xl
                    border border-white/30

                    shadow-[0_6px_0px_rgba(0,0,0,0.15)]
                    transition-all duration-300 ease-out

                    hover:-translate-y-1
                    hover:bg-white/30
                    hover:shadow-[0_15px_35px_rgba(0,0,0,0.25)]
                    hover:border-white/50

                    active:translate-y-0
                    active:shadow-[0_5px_15px_rgba(0,0,0,0.2)]
                    ">
            Contacts
        </button>
      </div>

       {activeTab === "upload" && (
  <div className="p-6 rounded">

    <h2 className="text-xl text-orange-400 mb-4">
      Add New Video
    </h2>

    <form onSubmit={handleAddVideo} className="space-y-4">

      {/* TITLE */}
      <input
        name="title"
        placeholder="Video Title"
        value={video.title}
        onChange={handleChange}
        className="w-full p-2 rounded text-black"
        required
      />

      {/* DESCRIPTION */}
      <textarea
        name="description"
        placeholder="Video Description"
        value={video.description}
        onChange={handleChange}
        className="w-full p-2 rounded text-black"
        required
      />

      {/* CATEGORY */}
      <input
        name="category"
        placeholder="Category (e.g. Corporate, Wedding)"
        value={video.category}
        onChange={handleChange}
        className="w-full p-2 rounded text-black"
        required
      />

      {/* YOUTUBE URL */}
      <input
        name="youtubeUrl"
        placeholder="YouTube Video URL"
        value={video.youtubeUrl}
        onChange={handleChange}
        className="w-full p-2 rounded text-black"
        required
      />

      <button
        type="submit"
        className="bg-orange-500 px-4 py-2 rounded hover:bg-orange-600 w-full"
      >
        Upload Video
      </button>

    </form>

  </div>
)}     
      

      {/* DASHBOARD TAB */}
      {activeTab === "dashboard" && (
  <div className="space-y-6">

    <h2 className="text-2xl text-orange-400 font-bold">
      Overview Dashboard
    </h2>

    {/* STATS CARDS */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      {/* VIDEOS */}
      <div className="px-5 py-2
                    rounded-full
                    text-black font-semibold

                    bg-white/20 backdrop-blur-xl
                    border border-white/30

                    shadow-[0_6px_0px_rgba(0,0,0,0.15)]
                    transition-all duration-300 ease-out

                    hover:-translate-y-1
                    hover:bg-white/30
                    hover:shadow-[0_15px_35px_rgba(0,0,0,0.25)]
                    hover:border-white/50

                    active:translate-y-0
                    active:shadow-[0_5px_15px_rgba(0,0,0,0.2)]
                    ">
        <h3 className="text-grey-800">Total Videos</h3>
        <p className="text-3xl text-black font-bold mt-2">
          {videoCount}
        </p>
      </div>

      {/* MESSAGES */}
      <div className="px-5 py-2
                    rounded-full
                    text-black font-semibold

                    bg-white/20 backdrop-blur-xl
                    border border-white/30

                    shadow-[0_6px_0px_rgba(0,0,0,0.15)]
                    transition-all duration-300 ease-out

                    hover:-translate-y-1
                    hover:bg-white/30
                    hover:shadow-[0_15px_35px_rgba(0,0,0,0.25)]
                    hover:border-white/50

                    active:translate-y-0
                    active:shadow-[0_5px_15px_rgba(0,0,0,0.2)]
                    ">
        <h3 className="text-gray-800">Messages Received</h3>
        <p className="text-3xl text-blue font-bold mt-2">
          {messageCount}
        </p>
      </div>

    </div>

    {/* QUICK ACTIONS */}
    {/* <div cclassName="px-5 py-2
                    rounded-full
                    text-black font-semibold

                    bg-white/20 backdrop-blur-xl
                    border border-white/30

                    shadow-[0_6px_0px_rgba(0,0,0,0.15)]
                    transition-all duration-300 ease-out

                    hover:-translate-y-1
                    hover:bg-white/30
                    hover:shadow-[0_15px_35px_rgba(0,0,0,0.25)]
                    hover:border-white/50

                    active:translate-y-0
                    active:shadow-[0_5px_15px_rgba(0,0,0,0.2)]
                    ">
      <h3 className="text-orange-400 mb-2 text-lg">
        Quick Actions
      </h3>

      <p className="text-gray-400">
        Use tabs above to upload, manage, or edit videos.
      </p>
    </div> */}

  </div>
)}

      {/* MANAGE TAB */}
      {activeTab === "manage" && (
  <div className=" p-6 rounded">

    <h2 className="text-xl text-orange-400 mb-6">
      Manage Videos
    </h2>

    {videos.length === 0 ? (
      <p className="text-gray-400">No videos found</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {videos.map((video) => (

          <div
            key={video.id}
            className="bg-black border border-gray-800 rounded-xl overflow-hidden hover:scale-105 transition duration-300"
          >

            {/* THUMBNAIL */}
            <div className="relative">

              <img
                src={video.thumbnailUrl || "https://via.placeholder.com/300"}
                alt={video.title}
                className="w-full h-40 object-cover"
              />

              {/* PLAY ICON OVERLAY */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition">
                <span className="text-white text-3xl">▶</span>
              </div>

            </div>

            {/* CONTENT */}
            <div className="p-4">

              <h3 className="text-white font-semibold truncate">
                {video.title}
              </h3>

              <p className="text-gray-400 text-sm mt-1">
                {video.category}
              </p>

              {/* ACTIONS */}
              <div className="flex justify-between mt-4">

                <button
                  onClick={() => handleEditClick(video)}
                  className="bg-blue-500 px-3 py-1 text-sm rounded hover:bg-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(video.id)}
                  className="bg-red-500 px-3 py-1 text-sm rounded hover:bg-red-600"
                >
                  Delete
                </button>

              </div>

            </div>
          </div>

        ))}

      </div>
    )}
  </div>
)}

{activeTab === "contacts" && (
  <div className="p-6 rounded">

    <h2 className="text-xl text-orange-400 mb-4">
      Contact Requests
    </h2>

    {contacts.length === 0 ? (
      <p className="text-gray-400">No contacts found</p>
    ) : (
      <div className="space-y-4">

        {contacts.map((c) => (
          <div
            key={c.id}
            className="p-4 rounded border border-gray-800"
          >

            <h3 className="text-black font-bold">
              {c.name} ({c.email})
            </h3>

            <p className="text-black-300 mt-1">
              {c.message}
            </p>

            <div className="text-sm text-black-400 mt-2">
              <p>Project: {c.projectType}</p>
              <p>Budget: {c.budget}</p>
            </div>

          </div>
        ))}

      </div>
    )}

  </div>
)}

            {editingVideo && (
                <div className="fixed inset-0  bg-opacity-70 flex justify-center items-center">

                    <div className="bg-gray-900 p-6 rounded w-[800px]">

                <h2 className="text-orange-400 text-xl mb-4">
                    Edit Video
                </h2>

                <form onSubmit={handleUpdate} className="space-y-3">

                    <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full p-2 text-black rounded"
                    placeholder="Title"
                    />

                    <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full p-2 text-black rounded"
                    placeholder="Description"
                    />

                    <input
                    type="text"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full p-2 text-black rounded"
                    placeholder="Category"
                    />

                    <input
                    type="text"
                    value={editYoutubeUrl}
                    onChange={(e) => setEditYoutubeUrl(e.target.value)}
                    className="w-full p-2 text-black rounded"
                    placeholder="YouTube URL"
                    />

                    <div className="flex justify-between">

                    <button
                        type="button"
                        onClick={() => setEditingVideo(null)}
                        className="bg-gray-600 px-3 py-1 rounded"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="bg-green-500 px-3 py-1 rounded"
                    >
                        Update
                    </button>

                    </div>

                </form>
            </div>
        </div>
        )}

    </div>
  );
}

export default AdminDashboard;