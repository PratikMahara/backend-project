import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload as UploadIcon, Play, Film, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Upload = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'video' | 'thumbnail'
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'video') setVideoFile(file);
      else setThumbnailFile(file);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('duration', formData.duration);
      if (videoFile) data.append('video', videoFile);
      if (thumbnailFile) data.append('thumbnail', thumbnailFile);
     const token = localStorage.getItem('accessToken');
       if (!token) {
  alert("You need to log in to upload a video.");
setLoading(false); // stop loading state
navigate('/login');
  return; // stop executionS
}

      const response = await axios.post('https://backend-project-1-jt64.onrender.com/api/videos/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
          // Add auth header if needed
        },withCredentials: true,
      });
    

      if (response.data.success) {
        alert("Video Uploaded Successfully");
      }
    } catch (err: any) {
      
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 font-bold text-xl text-foreground">
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-lg">
                <Play className="h-6 w-6 text-white fill-white" />
              </div>
              <span>VideoTube</span>
            </Link>
            <Link to="/">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Button>
            </Link>
             <Link to="/login">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <ArrowLeft className="h-1 w-1" />
                <span>login</span>
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Upload Video</h1>
          <p className="text-muted-foreground">Share your amazing content with the world</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Video File Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UploadIcon className="h-5 w-5" />
                <span>Video File</span>
              </CardTitle>
              <CardDescription>Select your video file to upload</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <Film className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <div className="space-y-2">
                  <Label htmlFor="video-upload" className="cursor-pointer">
                    <span className="text-primary hover:underline font-medium">
                      Click to upload video
                    </span>
                    <span className="text-muted-foreground"> or drag and drop</span>
                  </Label>
                  <p className="text-sm text-muted-foreground">MP4, AVI, MOV up to 100MB</p>
                </div>
                <Input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={e => handleFileChange(e, 'video')}
                  required
                />
              </div>
              {videoFile && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="font-medium text-sm">Selected file:</p>
                  <p className="text-sm text-muted-foreground">{videoFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Video Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>Video Details</CardTitle>
              <CardDescription>Add information about your video</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter video title"
                    value={formData.title}
                    onChange={e => handleInputChange('title', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your video..."
                    rows={4}
                    value={formData.description}
                    onChange={e => handleInputChange('description', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    placeholder="Enter duration in minutes"
                    value={formData.duration}
                    onChange={e => handleInputChange('duration', e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    e.g., 10, 25, 60
                  </p>
                </div>

                {/* Thumbnail upload */}
                <div className="space-y-2">
                  <Label htmlFor="thumbnail-upload" className="flex items-center space-x-2">
                    <ImageIcon className="h-4 w-4 mr-1" />
                    <span>Thumbnail</span>
                  </Label>
                  <Input
                    id="thumbnail-upload"
                    type="file"
                    accept="image/*"
                    onChange={e => handleFileChange(e, 'thumbnail')}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG up to 5MB
                  </p>
                  {thumbnailFile && (
                    <div className="mt-2 p-2 bg-muted rounded-lg flex items-center space-x-2">
                      <ImageIcon className="h-4 w-4" />
                      <span className="text-sm text-muted-foreground">{thumbnailFile.name}</span>
                    </div>
                  )}
                </div>

                {error && (
                  <div className="text-red-600 text-sm">{error}</div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={!videoFile || !thumbnailFile || loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <UploadIcon className="h-4 w-4 mr-2 animate-spin" />
                      Uploading...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <UploadIcon className="h-4 w-4 mr-2" />
                      Upload Video
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Upload;
