import { useNavigate } from "react-router-dom";

function VideoCard({ video }) {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Navigating to:", `/videos/${video.id}`); // 👈 ADD HERE
    navigate(`/videos/${video.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-gray-900 rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300"
    >
      {/* Thumbnail */}
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="w-full h-48 object-cover"
        onError={(e) => {
    e.target.src = "https://via.placeholder.com/300x200?text=No+Thumbnail";
  }}
      />

      {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition">
          <span className="text-white text-3xl">▶</span>
        </div>

      {/* Content */}
      <div className="p-3">
        <h2 className="text-sm font-semibold text-white line-clamp-2">
          {video.title}
        </h2>

        <p className="text-xs text-gray-400 mt-1">
          {video.channelName || "MRK Studio"}
        </p>
      </div>
    </div>
  );
}

export default VideoCard;