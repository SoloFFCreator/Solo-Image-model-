
import React, { useState } from 'react';
import { AspectRatio } from '../types';
import { ASPECT_RATIOS } from '../constants';
import { geminiService } from '../services/geminiService';

interface PromptInputProps {
  onGenerate: (prompt: string, aspectRatio: AspectRatio) => void;
  isGenerating: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ onGenerate, isGenerating }) => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onGenerate(prompt, aspectRatio);
  };

  const handleEnhance = async () => {
    if (!prompt.trim() || isEnhancing) return;
    setIsEnhancing(true);
    try {
      const enhanced = await geminiService.enhancePrompt(prompt);
      setPrompt(enhanced);
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="gradient-border">
          <div className="p-4 md:p-6 bg-neutral-900 rounded-xl flex flex-col gap-4">
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to create..."
                className="w-full min-h-[120px] bg-transparent border-none text-white text-lg placeholder-neutral-500 focus:ring-0 resize-none pr-12"
                disabled={isGenerating || isEnhancing}
              />
              <button
                type="button"
                onClick={handleEnhance}
                disabled={!prompt.trim() || isEnhancing || isGenerating}
                className={`absolute bottom-2 right-2 p-2 rounded-lg transition-all ${
                  isEnhancing 
                    ? 'text-indigo-400 animate-pulse' 
                    : 'text-neutral-500 hover:text-indigo-400 hover:bg-indigo-500/10'
                }`}
                title="Enhance Prompt with AI"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                  <path d="M5 3v4"/><path d="M3 5h4"/><path d="M19 17v4"/><path d="M17 19h4"/>
                </svg>
              </button>
            </div>
            
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-800 pt-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                {ASPECT_RATIOS.map((ratio) => (
                  <button
                    key={ratio.value}
                    type="button"
                    onClick={() => setAspectRatio(ratio.value as AspectRatio)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-all ${
                      aspectRatio === ratio.value 
                        ? 'bg-neutral-100 text-neutral-900 shadow-lg' 
                        : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                      <path d={ratio.icon} />
                    </svg>
                    {ratio.label}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={isGenerating || isEnhancing || !prompt.trim()}
                className={`px-8 py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-xl flex items-center gap-2 ${
                  isGenerating || isEnhancing || !prompt.trim()
                    ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:scale-105 active:scale-95 shadow-indigo-500/20'
                }`}
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.21 0 4-1.79 4-4.04a3.01 3.01 0 0 0-3.01-3.01z"/><path d="m14.5 9.5 5 5"/></svg>
                    Generate Image
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PromptInput;
