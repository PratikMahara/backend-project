
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Play, Upload, User, LogIn } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 font-bold text-xl text-foreground">
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-lg">
              <Play className="h-6 w-6 text-white fill-white" />
            </div>
            <span>VideoTube</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/upload">
              <Button variant="outline" size="sm" className="hidden sm:flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>Upload</span>
              </Button>
            </Link>
            
            <Link to="/login">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Button>
            </Link>
            
            <Link to="/register">
              <Button size="sm" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Register</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
