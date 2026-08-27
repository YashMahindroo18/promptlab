'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [prompt, setPrompt] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      alert('Please enter a prompt');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, title: title || 'Untitled Prompt' }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem(`prompt_${data.id}`, JSON.stringify(data));
        router.push(`/analysis/${data.id}`);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Failed to optimize prompt');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-2">PromptLab</h1>
          <p className="text-slate-300 text-lg">Transform your prompts into masterpieces with AI optimization</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-700/50 backdrop-blur border border-slate-600 rounded-lg p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Prompt Title (optional)</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Python Script Generator"
              className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Your Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Paste your prompt here..."
              rows={8}
              className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded transition">
            {loading ? 'Optimizing...' : 'Optimize Prompt'}
          </button>
        </form>

        <div className="mt-12 grid grid-cols-2 gap-4">
          <a href="/history" className="bg-slate-700/50 border border-slate-600 rounded p-4 text-slate-200 hover:text-white transition text-center">
            📋 View History
          </a>
          <a href="/templates" className="bg-slate-700/50 border border-slate-600 rounded p-4 text-slate-200 hover:text-white transition text-center">
            ⭐ Templates
          </a>
        </div>
      </div>
    </div>
  );
}