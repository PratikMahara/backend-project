import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import VideoCard from '@/components/VideoCard';
import { ArrowLeft, ThumbsUp, ThumbsDown, Share2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  author?: string;
  views?: string;
  duration: string;
  uploadDate?: string;
  description: string;
  createdAt: string;
  videoFile: string;
}

const VideoPlayer = () => {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<Video | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchVideo = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch the main video details
        const resVideo = await fetch(`https://backend-project-1-jt64.onrender.com/api/videos/${id}`);
        if (!resVideo.ok) throw new Error('Failed to fetch video');
        const videoData = await resVideo.json();

        // Map _id to id if necessary
        const mainVideo = {
          ...videoData.data,
          id: videoData.data._id || videoData.data.id,
        };
        setVideo(mainVideo);

        // Fetch all videos for related videos
        const resAll = await fetch('https://backend-project-1-jt64.onrender.com/api/videos/videoss');
        if (!resAll.ok) throw new Error('Failed to fetch related videos');
        const allVideosData = await resAll.json();

        // Filter out the current video and map _id to id
        const related = allVideosData.data
          .filter((v: any) => v._id !== mainVideo.id)
          .slice(0, 4)
          .map((v: any) => ({
            ...v,
            id: v._id,
          }));

        setRelatedVideos(related);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="min-h-screen bg-background p-8 text-center text-red-600">
        <Navbar />
        <p>{error || 'Video not found'}</p>
        <Link to="/" className="text-primary hover:underline">
          Return to home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to videos</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Video Player and Info */}
          <div className="lg:col-span-2">
            <div className="bg-black rounded-lg overflow-hidden mb-6">
              <video
                controls
                poster={video.thumbnail}
                className="w-full aspect-video object-cover"
                src={video.videoFile}
              >
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-foreground">{video.title}</h1>

              {/* Optional author, views, uploadDate if available */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {video.author && (
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {video.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{video.author}</p>
                        <p className="text-sm text-muted-foreground">
                          {video.views} views • {video.uploadDate}
                        </p>
                      </div>
                    </div>
                  )}
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

          {/* Sidebar with Related Videos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Related Videos</h3>
            {relatedVideos.map((relatedVideo) => (
              <VideoCard
                key={relatedVideo.id}
                id={relatedVideo.id}
                title={relatedVideo.title}
                description={relatedVideo.description || ''}
                thumbnail={relatedVideo.thumbnail}
                duration={relatedVideo.duration}
                createdAt={relatedVideo.createdAt}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoPlayer;
