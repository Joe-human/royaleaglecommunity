'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Lock, Mail, ShieldAlert } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message || 'Email atau password salah.');
        setLoading(false);
      } else if (data?.session) {
        // Menggunakan window.location.href agar halaman ter-refresh penuh dan sesi terbaca
        window.location.href = '/admin';
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi kesalahan saat mencoba masuk.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 bg-gray-950 text-white selection:bg-yellow-500 selection:text-black">
      <div className="w-full max-w-md p-8 rounded-3xl bg-gray-900/80 border border-gray-800 backdrop-blur-2xl shadow-2xl space-y-6">
        
        {/* Header Logo & Title */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-full bg-yellow-500/10 border-2 border-yellow-500/40 flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(234,179,8,0.2)]">
            <img
              src="/images/logoroyaleagle.jpeg"
              alt="Royal Eagle Logo"
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <h1 className="text-2xl font-black tracking-wider text-white">
            ADMIN PANEL
          </h1>
          <p className="text-xs text-gray-400">
            Masuk untuk mengelola konten Royal Eagle FX
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-red-400 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Login */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Email Admin
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="admin@royaleagle.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-white text-sm focus:outline-none focus:border-yellow-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-white text-sm focus:outline-none focus:border-yellow-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-extrabold text-sm rounded-xl transition-all shadow-lg shadow-yellow-500/20 disabled:opacity-50"
          >
            {loading ? 'Memproses...' : 'MASUK KE DASHBOARD'}
          </button>
        </form>

      </div>
    </main>
  );
}