'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignup) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      router.push('/');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-white mb-6">
            {isSignup ? 'Sign Up' : 'Login'}
          </h1>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2 rounded transition"
            >
              {loading ? 'Loading...' : isSignup ? 'Sign Up' : 'Login'}
            </button>
          </form>

          <p className="text-slate-400 text-sm mt-4 text-center">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-blue-400 hover:text-blue-300 ml-1"
            >
              {isSignup ? 'Login' : 'Sign up'}
            </button>
          </p>

          <Link href="/" className="text-slate-400 hover:text-slate-300 text-sm mt-4 block text-center">
            Continue as Guest
          </Link>
        </div>
      </div>
    </div>
  );
}