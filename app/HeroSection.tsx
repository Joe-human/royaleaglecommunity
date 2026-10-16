'use client';

import { TradingViewSection } from './components/TradingViewSection';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  whatsappNumber?: string;
}

export function HeroSection({
  title = 'Trade Cerdas dengan komunitas Royaleagle FX',
  subtitle = 'Komunitas berisikan para trader berpengalaman, yang akan menemani dan membimbing Anda untuk menemukan pola serta cara yang tepat sesuai keinginan dan keadaan Anda dalam bertrading untuk tetap terus merasakan profit secara konsisten.',
  whatsappNumber = '6282128052892',
}: HeroSectionProps) {
  return (
    <section className="w-full max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* KOLOM KIRI */}
        <div className="lg:col-span-6 space-y-6 text-left pr-0 lg:pr-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl">
            {subtitle}
          </p>

          {/* TOMBOL DENGAN WARNA KUNING & HIJAU EMERALD */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#signals"
              className="px-6 py-3.5 bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold text-sm rounded-xl transition-all shadow-lg shadow-yellow-500/20"
            >
              Lihat Signal MQL5 
            </a>

            <a
              href="#calculator"
              className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm rounded-xl transition-all shadow-lg shadow-emerald-500/20"
            >
              Gabung Copytrade
            </a>
          </div>
        </div>

        {/* KOLOM KANAN */}
        <div id="chart" className="lg:col-span-6 w-full">
          <TradingViewSection />
        </div>

      </div>
    </section>
  );
}