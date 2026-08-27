'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function AnalysisPage() {
  const params = useParams();
  const id = params.id as string;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the prompt from localStorage or API
    const stored = localStorage.getItem(`prompt_${id}`);
    if (stored) {
      setData(JSON.parse(stored));
      setLoading(false);
    }
  }, [id]);

  // Store the optimization result when the page loads for the first time
  useEffect(() => {
    if (!loading && !data) {
      // Data will be passed via state or localStorage
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-8">
        <div className="text-white text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p>Loading analysis...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Prompt not found</h1>
          <Link href="/" className="text-blue-400 hover:text-blue-300">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">{data.analysis?.title || 'Analysis'}</h1>
          <p className="text-slate-400">Category: {data.category}</p>
        </div>

        {/* Scores Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-700/50 border border-slate-600 rounded p-4">
            <p className="text-slate-400 text-sm mb-1">Clarity</p>
            <p className="text-3xl font-bold text-white">{data.analysis?.clarity}</p>
          </div>
          <div className="bg-slate-700/50 border border-slate-600 rounded p-4">
            <p className="text-slate-400 text-sm mb-1">Specificity</p>
            <p className="text-3xl font-bold text-white">{data.analysis?.specificity}</p>
          </div>
          <div className="bg-slate-700/50 border border-slate-600 rounded p-4">
            <p className="text-slate-400 text-sm mb-1">Context</p>
            <p className="text-3xl font-bold text-white">{data.analysis?.context}</p>
          </div>
          <div className="bg-slate-700/50 border border-slate-600 rounded p-4">
            <p className="text-slate-400 text-sm mb-1">Overall Score</p>
            <p className="text-3xl font-bold text-blue-400">{data.evaluation?.score}</p>
          </div>
        </div>

        {/* Before & After */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Original Prompt</h3>
            <p className="text-slate-300 bg-slate-800 p-4 rounded">{data.originalPrompt}</p>
          </div>
          <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Optimized Prompt</h3>
            <p className="text-slate-300 bg-slate-800 p-4 rounded">{data.optimizedPrompt}</p>
          </div>
        </div>

        {/* Improvements */}
        <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Improvements Made</h3>
          <div className="space-y-4">
            {data.improvements?.map((imp: any, idx: number) => (
              <div key={idx} className="bg-slate-800 p-4 rounded">
                <p className="font-semibold text-blue-400">{imp.type}</p>
                <p className="text-slate-300 text-sm mt-1">{imp.description}</p>
                <p className="text-slate-400 text-xs mt-2">Why: {imp.reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Variations */}
        <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Prompt Variations</h3>
          <div className="space-y-4">
            {data.variations?.map((var_: any, idx: number) => (
              <div key={idx} className="bg-slate-800 p-4 rounded">
                <p className="font-semibold text-slate-200 mb-2">{var_.type}</p>
                <p className="text-slate-300 text-sm">{var_.prompt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}