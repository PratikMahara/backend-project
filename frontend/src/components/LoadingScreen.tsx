import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsComplete(true);
          setTimeout(() => {
            onLoadingComplete();
          }, 800);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  const backgroundPattern = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 transition-all duration-800 ${isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div 
        className="absolute inset-0 opacity-50"
        style={{ backgroundImage: `url("${backgroundPattern}")` }}
      ></div>
      
      <div className="relative z-10 text-center space-y-8">
        <div className="space-y-4">
          <div className="animate-fade-in">
            <LoadingSpinner />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white animate-fade-in animation-delay-300">
            Welcome
          </h1>
          
          <p className="text-lg text-purple-200 animate-fade-in animation-delay-500">
            Preparing your experience...
          </p>
        </div>
        
        <div className="w-64 mx-auto space-y-2 animate-fade-in animation-delay-700">
          <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-purple-300 font-medium">
            {Math.round(progress)}%
          </p>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-transparent rounded-full"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;