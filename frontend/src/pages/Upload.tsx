
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload as UploadIcon, Play, Film, ArrowLeft } from 'lucide-react';

const Upload = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration :''
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Upload logic will be implemented with Supabase
    console.log('Upload attempt:', { videoFile, formData });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Upload Video</h1>
          <p className="text-muted-foreground">Share your amazing content with the world</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
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
                  onChange={handleFileChange}
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
                    onChange={(e) => handleInputChange('title', e.target.value)}
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
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">duration</Label>
                  <Input
                    id="duration"
                    placeholder="Add duration separated by commas"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    e.g., tutorial, music, gaming, vlog
                  </p>
                </div>

                <Button type="submit" className="w-full" disabled={!videoFile}>
                  <UploadIcon className="h-4 w-4 mr-2" />
                  Upload Video
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
