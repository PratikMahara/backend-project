import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import VideoCard from '@/components/VideoCard';
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("https://backend-project-1-jt64.onrender.com/api/videos/videoss");
        const data = await response.json();
        setVideos(
          data.data.map((video) => ({
            ...video,
            id: video._id, // Map _id to id
            title: video.title || "Untitled", // Safe defaults
            author: video.author || "Unknown Author"
          }))
        );
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // Filter videos safely
  const filteredVideos = videos.filter(video => {
    const title = (video.title || "").toLowerCase();
    const author = (video.author || "").toLowerCase();
    const searchTerm = search.toLowerCase();
    return title.includes(searchTerm) || author.includes(searchTerm);
  });

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar search={search} setSearch={setSearch} />
        <div className="max-w-7xl mx-auto px-4 py-8 text-red-500">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
  {/* Marquee Banner at the very top */}
  <div className="relative w-full overflow-hidden py-3 mb-8 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-lg">
    <div 
      className="animate-marquee whitespace-nowrap text-white font-semibold text-lg tracking-wide"
      style={{ animation: 'marquee 18s linear infinite' }}
    >
      The Server is Slow to load the Video Until then Register and Login 🚀 Stay tuned for updates! 🌟
    </div>
    <style jsx>{`
      @keyframes marquee {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }
      .animate-marquee {
        display: inline-block;
        min-width: 100%;
      }
    `}</style>
  </div>

  {/* Navbar below Marquee */}
  <Navbar search={search} setSearch={setSearch} />

  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to VideoTube</h1>
      <p className="text-muted-foreground">Discover amazing videos from creators worldwide</p>
    </div>
    
    {/* Video Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredVideos.map(video => (
        <VideoCard
          key={video.id}
          id={video.id}
          title={video.title}
          thumbnail={video.thumbnail}
          author={video.author}
          views={video.views}
          duration={video.duration}
          uploadDate={video.uploadDate}
        />
      ))}
    </div>
  </main>
</div>
  );
};

export default Index;
