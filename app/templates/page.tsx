'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Template {
  id: string;
  name: string;
  category: string;
  content: string;
  createdAt: string;
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/templates');
      const data = await response.json();
      if (data.success) {
        setTemplates(data.templates);
      }
    } catch (error) {
      console.error('Failed to fetch templates');
    } finally {
      setLoading(false);
    }
  };

  const handleUseTemplate = (content: string) => {
    localStorage.setItem('draft_prompt', content);
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Saved Templates</h1>
          <p className="text-slate-400">{templates.length} templates available</p>
        </div>

        {loading ? (
          <div className="text-center text-slate-400">Loading...</div>
        ) : templates.length === 0 ? (
          <div className="text-center text-slate-400 py-12">
            <p className="mb-4">No templates saved yet. Optimize a prompt and save it as a template!</p>
            <Link href="/" className="text-blue-400 hover:text-blue-300">
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {templates.map((template) => (
              <div key={template.id} className="bg-slate-700/50 border border-slate-600 rounded-lg p-6 hover:border-slate-500 transition">
                <h3 className="text-lg font-semibold text-white mb-1">{template.name}</h3>
                <p className="text-sm text-slate-400 mb-3">{template.category}</p>
                <p className="text-slate-300 text-sm mb-4 line-clamp-3">{template.content}</p>
                <button
                  onClick={() => handleUseTemplate(template.content)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition text-sm"
                >
                  Use Template
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}