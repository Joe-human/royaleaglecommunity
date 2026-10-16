'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  logoUrl?: string;
}

export function Navbar({ logoUrl = '/images/logoroyaleagle.jpeg' }: NavbarProps) {
  const [imgError, setImgError] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-gray-950/80 border-b border-gray-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* LOGO BULAT + BRAND */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-full bg-yellow-500/10 border-2 border-yellow-500/40 flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(234,179,8,0.2)] group-hover:border-yellow-400 transition-all shrink-0">
            {!imgError ? (
              <img
                src={logoUrl}
                alt="Royal Eagle Logo"
                className="w-full h-full object-cover rounded-full"
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="text-yellow-400 font-black text-xs">RE</span>
            )}
          </div>
          <span className="text-lg sm:text-xl font-black tracking-wider text-white group-hover:text-yellow-400 transition-colors">
            ROYALEAGLEFX
          </span>
        </Link>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex items-center gap-6 sm:gap-8">
          <nav className="flex items-center gap-6 text-sm font-semibold text-gray-300">
            <a href="#chart" className="hover:text-yellow-400 transition-colors">
              Live Chart XAUUSD
            </a>
            <a href="#portfolio" className="hover:text-yellow-400 transition-colors">
              Portofolio
            </a>
            <a href="#signals" className="hover:text-yellow-400 transition-colors">
              Sinyal MQL5
            </a>
          </nav>

          <a
            href="#calculator"
            className="px-5 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-yellow-500/20"
          >
            Daftar
          </a>
        </div>

        {/* TOMBOL HAMBURGER (3 BAR) UNTUK HP */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-yellow-400" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* DRAWER MENU DESAKAN HP (MOBILE DROPDOWN) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-950/95 border-b border-gray-800 px-4 pt-2 pb-6 space-y-4 backdrop-blur-2xl">
          <nav className="flex flex-col space-y-3 font-semibold text-sm text-gray-300 pt-2">
            <a
              href="#chart"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 border-b border-gray-900 hover:text-yellow-400"
            >
              Live Chart XAUUSD
            </a>
            <a
              href="#portfolio"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 border-b border-gray-900 hover:text-yellow-400"
            >
              Portofolio
            </a>
            <a
              href="#signals"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 border-b border-gray-900 hover:text-yellow-400"
            >
              Sinyal MQL5
            </a>

            {/* TOMBOL DAFTAR VERSI MOBILE DI DALAM HAMBURGER MENU */}
            <a
              href="#calculator"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center py-3 mt-2 bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold text-sm rounded-xl transition-all shadow-lg shadow-yellow-500/20"
            >
              Daftar
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}