
import React from 'react';
import Navbar from '@/components/Navbar';
import VideoCard from '@/components/VideoCard';

const Index = () => {
  // Mock video data - in real app this would come from your database
  const mockVideos = [
    {
      id: '1',
      title: "Amazing Sunset Timelapse in 4K",
      thumbnail: "/placeholder.svg",
      author: "NatureFilmer",
      views: "1.2M",
      duration: "3:45",
      uploadDate: "2 days ago"
    },
    {
      id: '2',
      title: "How to Build a React App from Scratch",
      thumbnail: "/placeholder.svg",
      author: "CodeMaster",
      views: "847K",
      duration: "15:30",
      uploadDate: "1 week ago"
    },
    {
      id: '3',
      title: "Street Food Around the World",
      thumbnail: "/placeholder.svg",
      author: "FoodExplorer",
      views: "2.1M",
      duration: "8:22",
      uploadDate: "3 days ago"
    },
    {
      id: '4',
      title: "Guitar Tutorial for Beginners",
      thumbnail: "/placeholder.svg",
      author: "MusicTeacher",
      views: "567K",
      duration: "12:15",
      uploadDate: "5 days ago"
    },
    {
      id: '5',
      title: "Amazing Wildlife Photography Tips",
      thumbnail: "/placeholder.svg",
      author: "PhotoPro",
      views: "934K",
      duration: "6:48",
      uploadDate: "1 day ago"
    },
    {
      id: '6',
      title: "Cooking the Perfect Pasta",
      thumbnail: "/placeholder.svg",
      author: "ChefSpecial",
      views: "1.8M",
      duration: "4:32",
      uploadDate: "4 days ago"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to VideoTube</h1>
          <p className="text-muted-foreground">Discover amazing videos from creators around the world</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockVideos.map((video) => (
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
