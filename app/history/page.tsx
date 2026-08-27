'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Prompt {
  id: string;
  title: string;
  category: string;
  originalPrompt: string;
  optimizedPrompt: string;
  score: number;
  createdAt: string;
}

export default function HistoryPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrompts();
  }, []);

  const fetchPrompts = async () => {
    try {
      const response = await fetch('/api/prompts');
      const data = await response.json();
      if (data.success) {
        setPrompts(data.prompts);
      }
    } catch (error) {
      console.error('Failed to fetch prompts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this prompt?')) return;

    try {
      await fetch('/api/prompts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      setPrompts(prompts.filter((p) => p.id !== id));
    } catch (error) {
      alert('Failed to delete prompt');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Prompt History</h1>
          <p className="text-slate-400">{prompts.length} prompts saved</p>
        </div>

        {loading ? (
          <div className="text-center text-slate-400">Loading...</div>
        ) : prompts.length === 0 ? (
          <div className="text-center text-slate-400 py-12">
            <p className="mb-4">No prompts yet. Start optimizing!</p>
            <Link href="/" className="text-blue-400 hover:text-blue-300">
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {prompts.map((prompt) => (
              <div key={prompt.id} className="bg-slate-700/50 border border-slate-600 rounded-lg p-6 hover:border-slate-500 transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{prompt.title}</h3>
                    <p className="text-sm text-slate-400">
                      {prompt.category} • Score: {prompt.score}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(prompt.id)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-slate-300 text-sm mb-3 line-clamp-2">{prompt.originalPrompt}</p>
                <Link
                  href={`/analysis/${prompt.id}`}
                  onClick={() => localStorage.setItem(`prompt_${prompt.id}`, JSON.stringify(prompt))}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  View Analysis →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}