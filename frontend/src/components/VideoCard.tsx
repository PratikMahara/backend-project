
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Play, Eye, Clock } from 'lucide-react';

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  author: string;
  views: string;
  duration: string;
  uploadDate: string;
}

const VideoCard = ({ id, title, thumbnail, author, views, duration, uploadDate }: VideoCardProps) => {
  return (
    <Link to={`/video/${id}`}>
      <Card className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="relative">
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{duration}</span>
          </div>
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-red-600 rounded-full p-3">
              <Play className="h-6 w-6 text-white fill-white" />
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm mb-1">{author}</p>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Eye className="h-3 w-3" />
              <span>{views} views</span>
            </div>
            <span>•</span>
            <span>{uploadDate}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default VideoCard;
