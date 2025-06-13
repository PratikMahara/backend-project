import { Play } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="relative w-24 h-24 mx-auto">
      {/* Outer rotating ring */}
      <div className="absolute inset-0 rounded-full border-4 border-tube-red/20"></div>
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-tube-red animate-spin"></div>
      
      {/* Inner pulsing ring */}
      <div className="absolute inset-2 rounded-full border-2 border-tube-red/30 animate-pulse"></div>
      
      {/* Center play icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 bg-tube-red rounded-full flex items-center justify-center pulse-glow">
          <Play className="w-6 h-6 text-white fill-white ml-0.5" />
        </div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute top-0 right-0 w-2 h-2 bg-tube-red rounded-full animate-ping"></div>
      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-red-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-4 left-0 w-1 h-1 bg-red-300 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

export default LoadingSpinner;
