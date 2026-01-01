
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full glass-card border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current">
            <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">Lumina AI</h1>
          <p className="text-xs text-neutral-400 font-medium uppercase tracking-widest">Image Generation Engine</p>
        </div>
      </div>
      
      <nav className="hidden md:flex items-center gap-6">
        <a href="#" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">Documentation</a>
        <a href="#" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">Pricing</a>
        <button className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-sm font-medium transition-all">
          Account
        </button>
      </nav>
    </header>
  );
};

export default Header;
