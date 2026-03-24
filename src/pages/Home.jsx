import { useEffect, useState } from "react";
import API from "../api/axios";
import { useLocation } from "react-router-dom";
import VideoCard from "../components/VideoCard";

function Home() {

  const [videos, setVideos] = useState([]);
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const search = params.get("search");

  useEffect(() => {

    const url = search ? `/videos/search?keyword=${search}` : "/videos";
    console.log("API URL:", import.meta.env.VITE_API_URL);
    API.get(url)
      .then((res) => setVideos(res.data))
      .catch((err) => console.log(err));
}, [location.search]);

  return (
    <div className="p-6">

      <h1 className="text-black font-large hover:opacity-70">
        {search ? `Results for "${search}"` : "Latest Videos"}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default Home;
