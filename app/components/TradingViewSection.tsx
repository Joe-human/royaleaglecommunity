'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';

export function TradingViewSection() {
  const [activeSlide, setActiveSlide] = useState<number>(1);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const taContainerRef = useRef<HTMLDivElement>(null);

  // Widget 1: Advanced Chart TradingView
  useEffect(() => {
    if (activeSlide === 1 && chartContainerRef.current) {
      chartContainerRef.current.innerHTML = '';
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify({
        autosize: true,
        symbol: 'OANDA:XAUUSD',
        interval: 'D',
        timezone: 'Asia/Jakarta',
        theme: 'dark',
        style: '1',
        locale: 'id',
        enable_publishing: false,
        allow_symbol_change: true,
        calendar: false,
        support_host: 'https://www.tradingview.com',
      });
      chartContainerRef.current.appendChild(script);
    }
  }, [activeSlide]);

  // Widget 2: Technical Analysis Multi-Timeframe
  useEffect(() => {
    if (activeSlide === 2 && taContainerRef.current) {
      taContainerRef.current.innerHTML = '';
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify({
        interval: '1m',
        width: '100%',
        isTransparent: true,
        height: '450',
        symbol: 'OANDA:XAUUSD',
        showIntervalTabs: true,
        displayMode: 'single',
        locale: 'id',
        colorTheme: 'dark',
      });
      taContainerRef.current.appendChild(script);
    }
  }, [activeSlide]);

  return (
    <div className="w-full" suppressHydrationWarning>
      {/* Header Slide Controls */}
      <div className="flex justify-between items-center gap-4 mb-3">
        <span className="text-xs font-semibold text-yellow-400 uppercase tracking-widest">
          {activeSlide === 1 ? '01 / 02 Slide' : '02 / 02 Slide'}
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            suppressHydrationWarning
            onClick={() => setActiveSlide(activeSlide === 1 ? 2 : 1)}
            className="p-2 rounded-xl bg-gray-900 border border-gray-800 hover:border-emerald-500 text-gray-300 hover:text-white transition-all"
            title="Slide Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            suppressHydrationWarning
            onClick={() => setActiveSlide(activeSlide === 1 ? 2 : 1)}
            className="p-2 rounded-xl bg-gray-900 border border-gray-800 hover:border-emerald-500 text-gray-300 hover:text-white transition-all"
            title="Slide Selanjutnya"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Container Box Slide */}
      <div className="relative rounded-3xl bg-gray-900/60 border border-gray-800 backdrop-blur-xl p-3 sm:p-4 overflow-hidden shadow-2xl min-h-[480px]">
        {/* SLIDE 1: ADVANCED CHART */}
        {activeSlide === 1 && (
          <div className="w-full h-[470px] rounded-2xl overflow-hidden bg-gray-950" ref={chartContainerRef} />
        )}

        {/* SLIDE 2: TECHNICAL ANALYSIS */}
        {activeSlide === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
            <div className="lg:col-span-2 w-full rounded-2xl bg-gray-950 p-2" ref={taContainerRef} />

            <div className="space-y-3 p-4 rounded-2xl bg-gray-950/80 border border-gray-800">
              <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm border-b border-gray-800 pb-2">
                <Info className="w-4 h-4" />
                <span>Panduan Sinyal</span>
              </div>
              <div className="space-y-2 text-xs text-gray-300">
                <p><span className="font-bold text-emerald-400">BUY / Strong Buy:</span> Momentum naik terbuka.</p>
                <p><span className="font-bold text-red-400">SELL / Strong Sell:</span> Indikator bearish mendominasi.</p>
                <p><span className="font-bold text-yellow-400">NEUTRAL:</span> Fase konsolidasi pasar.</p>
              </div>
              <p className="text-[10px] text-gray-500 italic pt-2 border-t border-gray-800">
                * Sinyal teknikal bersifat panduan, bukan jaminan profit.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}