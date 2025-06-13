// Updated Index component
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import VideoCard from '@/components/VideoCard';
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

 useEffect(() => {
  const fetchVideos = async () => {
    const response = await fetch('http://localhost:8000/api/videos/videoss');
    const data = await response.json();
    setVideos(
      data.data.map(video => ({
        ...video,
        id: video._id // Map _id to id
      }))
    );
  };
  fetchVideos();
}, []);


  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8 text-red-500">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to VideoTube</h1>
          <p className="text-muted-foreground">Discover amazing videos from creators worldwide</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
         {videos.map(video => (
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
