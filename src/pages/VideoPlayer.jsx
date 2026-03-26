import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

function VideoPlayer() {
  const { id } = useParams();
  console.log("Video ID from URL:", id);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    API.get(`/videos/${id}`)
      .then((res) => {
        console.log("VIDEO DATA:", res.data); // 👈 ADD
        setVideo(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!video) return <p>Loading...</p>;

  // 🔥 Extract YouTube ID safely
  const getYouTubeId = (url) => {
    const regExp = /v=([^&]+)/;
    const match = url.match(regExp);
    return match ? match[1] : "";
  };

  const videoId = getYouTubeId(video.youtubeUrl);

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">{video.title}</h1>

      <iframe
        width="100%"
        height="500"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="video"
        allowFullScreen
      />

      <p className="mt-4 text-gray-400">{video.description}</p>
    </div>
  );
}

export default VideoPlayer;
