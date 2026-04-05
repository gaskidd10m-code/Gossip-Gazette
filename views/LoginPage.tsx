'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../services/api';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const success = await api.login(username, password);
    setLoading(false);

    if (success) {
      router.push('/admin');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-full max-w-md bg-white p-8 border border-gray-200 shadow-lg">
        <h2 className="text-2xl font-black uppercase text-center mb-6 font-serif">Staff Login</h2>
        
        {error && (
          <div className="bg-red-50 text-red-700 text-sm p-3 mb-4 text-center font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase mb-1">Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border p-2 text-sm outline-none focus:border-black"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase mb-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 text-sm outline-none focus:border-black"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-black text-white font-bold uppercase text-sm py-3 hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Login to Dashboard'}
          </button>
        </form>
        
        <p className="text-center text-xs text-gray-400 mt-6">
          Authorized personnel only. <br/>Access is monitored.
        </p>
      </div>
    </div>
  );
};