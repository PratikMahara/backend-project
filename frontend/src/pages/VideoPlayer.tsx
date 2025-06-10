
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { ArrowLeft, ThumbsUp, ThumbsDown, Share2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VideoPlayer = () => {
  const { id } = useParams();
  
  // Mock video data - in real app this would come from your database based on the ID
  const mockVideos = [
    {
      id: '1',
      title: "Amazing Sunset Timelapse in 4K",
      thumbnail: "/placeholder.svg",
      author: "NatureFilmer",
      views: "1.2M",
      duration: "3:45",
      uploadDate: "2 days ago",
      description: "Watch this breathtaking sunset timelapse captured in stunning 4K resolution. This video showcases the beauty of nature as day transitions into night."
    },
    {
      id: '2',
      title: "How to Build a React App from Scratch",
      thumbnail: "/placeholder.svg",
      author: "CodeMaster",
      views: "847K",
      duration: "15:30",
      uploadDate: "1 week ago",
      description: "Learn how to build a complete React application from scratch. This tutorial covers everything from setup to deployment."
    },
    {
      id: '3',
      title: "Street Food Around the World",
      thumbnail: "/placeholder.svg",
      author: "FoodExplorer",
      views: "2.1M",
      duration: "8:22",
      uploadDate: "3 days ago",
      description: "Join us on a culinary journey as we explore the most delicious street food from different countries around the world."
    },
    {
      id: '4',
      title: "Guitar Tutorial for Beginners",
      thumbnail: "/placeholder.svg",
      author: "MusicTeacher",
      views: "567K",
      duration: "12:15",
      uploadDate: "5 days ago",
      description: "Learn the basics of guitar playing with this comprehensive tutorial for beginners. Perfect for those just starting their musical journey."
    },
    {
      id: '5',
      title: "Amazing Wildlife Photography Tips",
      thumbnail: "/placeholder.svg",
      author: "PhotoPro",
      views: "934K",
      duration: "6:48",
      uploadDate: "1 day ago",
      description: "Discover professional tips and techniques for capturing stunning wildlife photography. Learn about equipment, settings, and field techniques."
    },
    {
      id: '6',
      title: "Cooking the Perfect Pasta",
      thumbnail: "/placeholder.svg",
      author: "ChefSpecial",
      views: "1.8M",
      duration: "4:32",
      uploadDate: "4 days ago",
      description: "Master the art of cooking perfect pasta every time. Learn about different pasta types, cooking techniques, and delicious sauce pairings."
    }
  ];

  const video = mockVideos.find(v => v.id === id);

  if (!video) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Video not found</h1>
            <Link to="/" className="text-primary hover:underline">Return to home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4">
          <Link to="/" className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to videos</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="bg-black rounded-lg overflow-hidden mb-6">
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="bg-red-600 rounded-full p-4 mb-4 inline-block">
                    <div className="w-8 h-8 border-l-4 border-white ml-1"></div>
                  </div>
                  <p className="text-lg font-semibold">{video.title}</p>
                  <p className="text-sm opacity-75">Video Player ({video.duration})</p>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-foreground">{video.title}</h1>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {video.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{video.author}</p>
                      <p className="text-sm text-muted-foreground">{video.views} views • {video.uploadDate}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <ThumbsUp className="h-4 w-4" />
                    <span>Like</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <ThumbsDown className="h-4 w-4" />
                    <span>Dislike</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </Button>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <p className="text-foreground">{video.description}</p>
              </div>
            </div>
          </div>

          {/* Sidebar with related videos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Related Videos</h3>
            {mockVideos.filter(v => v.id !== id).slice(0, 4).map((relatedVideo) => (
              <Link
                key={relatedVideo.id}
                to={`/video/${relatedVideo.id}`}
                className="flex space-x-3 group hover:bg-muted/50 p-2 rounded-lg transition-colors"
              >
                <img
                  src={relatedVideo.thumbnail}
                  alt={relatedVideo.title}
                  className="w-24 h-16 object-cover rounded flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {relatedVideo.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">{relatedVideo.author}</p>
                  <p className="text-xs text-muted-foreground">{relatedVideo.views} views</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoPlayer;
