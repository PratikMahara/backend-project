import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Play, Upload, User, LogIn,Search } from 'lucide-react';

const Navbar = ({ search, setSearch }) => {
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
           <div className="flex-1 mx-6 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search videos..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary bg-white text-black shadow-sm"
          />
        </div>
      </div>
          <div className="flex items-center space-x-4">
            {/* Upload button: icon + text on all screen sizes */}
            <Link to="/upload">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
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
