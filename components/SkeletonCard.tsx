
import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-neutral-800 animate-pulse">
      <div className="aspect-square bg-neutral-800/50 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-700">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
        </svg>
      </div>
      <div className="p-4 space-y-3">
        <div className="h-3 bg-neutral-800 rounded w-full"></div>
        <div className="h-3 bg-neutral-800 rounded w-2/3"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
