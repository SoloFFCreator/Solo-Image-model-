
import React from 'react';
import { GeneratedImage } from '../types';

interface ImageCardProps {
  image: GeneratedImage;
  onDownload: (url: string, filename: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onDownload }) => {
  const getAspectRatioClass = (ratio: string) => {
    switch (ratio) {
      case '1:1': return 'aspect-square';
      case '3:4': return 'aspect-[3/4]';
      case '4:3': return 'aspect-[4/3]';
      case '9:16': return 'aspect-[9/16]';
      case '16:9': return 'aspect-[16/9]';
      default: return 'aspect-square';
    }
  };

  return (
    <div className="group relative glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/10">
      <div className={`${getAspectRatioClass(image.aspectRatio)} relative overflow-hidden bg-neutral-900`}>
        <img 
          src={image.url} 
          alt={image.prompt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay Controls */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-neutral-200 line-clamp-2 flex-1 font-medium">
              {image.prompt}
            </p>
            <button 
              onClick={() => onDownload(image.url, `lumina-ai-${Date.now()}.png`)}
              className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white transition-all shadow-lg"
              title="Download Image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4 flex items-center justify-between bg-neutral-900/40 backdrop-blur-sm border-t border-neutral-800">
        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-tighter">
          {new Date(image.timestamp).toLocaleTimeString()} • {image.aspectRatio}
        </span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[10px] font-bold text-neutral-400 uppercase">Ready</span>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
