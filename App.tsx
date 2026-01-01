
import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import PromptInput from './components/PromptInput';
import ImageCard from './components/ImageCard';
import SkeletonCard from './components/SkeletonCard';
import { geminiService } from './services/geminiService';
import { GeneratedImage, AppState, AspectRatio } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    images: [],
    isGenerating: false,
    error: null
  });

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('lumina_history');
    if (saved) {
      try {
        setState(prev => ({ ...prev, images: JSON.parse(saved) }));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  // Save to local storage when images update
  useEffect(() => {
    localStorage.setItem('lumina_history', JSON.stringify(state.images));
  }, [state.images]);

  const handleGenerate = async (prompt: string, aspectRatio: AspectRatio) => {
    setState(prev => ({ ...prev, isGenerating: true, error: null }));
    
    try {
      const url = await geminiService.generateImage(prompt, aspectRatio);
      
      const newImage: GeneratedImage = {
        id: crypto.randomUUID(),
        url,
        prompt,
        aspectRatio,
        timestamp: Date.now()
      };

      setState(prev => ({
        ...prev,
        images: [newImage, ...prev.images],
        isGenerating: false
      }));
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        isGenerating: false,
        error: err.message || "Failed to generate image. Please try again later."
      }));
    }
  };

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* Intro Section */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
            Imagine it. <br/>Lumina builds it.
          </h2>
          <p className="text-neutral-400 text-lg">
            Harness the power of Google's most advanced vision models to generate high-fidelity artwork from text in seconds.
          </p>
        </div>

        {/* Input Controls */}
        <section className="relative">
          <div className="absolute -inset-24 bg-indigo-500/5 blur-[120px] pointer-events-none -z-10 rounded-full"></div>
          <PromptInput onGenerate={handleGenerate} isGenerating={state.isGenerating} />
          
          {state.error && (
            <div className="max-w-4xl mx-auto mt-4 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
              {state.error}
            </div>
          )}
        </section>

        {/* Results Gallery */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
              Creation History
            </h3>
            <span className="text-sm text-neutral-500 font-mono">{state.images.length} images generated</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {state.isGenerating && (
              <SkeletonCard />
            )}
            
            {state.images.length === 0 && !state.isGenerating ? (
              <div className="col-span-full py-20 text-center glass-card rounded-3xl border-dashed border-2 border-neutral-800">
                <div className="mb-4 inline-flex p-4 rounded-2xl bg-neutral-900 text-neutral-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                </div>
                <h4 className="text-white font-semibold">No images generated yet</h4>
                <p className="text-neutral-500 text-sm mt-1">Start by entering a prompt above to see magic happen.</p>
              </div>
            ) : (
              state.images.map(img => (
                <ImageCard 
                  key={img.id} 
                  image={img} 
                  onDownload={handleDownload} 
                />
              ))
            )}
          </div>
        </section>
      </main>

      <footer className="w-full py-12 px-6 border-t border-neutral-800 text-center text-neutral-500 text-xs">
        <p>&copy; {new Date().getFullYear()} Lumina AI Systems. Powered by Google Gemini 2.5.</p>
        <div className="mt-4 flex justify-center gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
