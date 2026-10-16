'use client';

import { useEffect, useState, Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import { Navbar } from './components/Navbar';
import { HeroSection } from './HeroSection';
import { Background } from './components/Background';
import { AboutAndCertSection } from './components/AboutAndCertSection';
import { GallerySection } from './components/GallerySection';
import { Mql5SignalsSection } from './components/Mql5SignalsSection';
import { CalculatorSection } from './components/CalculatorSection';
import { TestimonialAndFaqSection } from './components/TestimonialAndFaqSection';

export default function HomePage() {
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    async function loadConfig() {
      const { data } = await supabase
        .from('landing_config')
        .select('*')
        .maybeSingle();

      if (data) {
        setConfig(data);
      }
    }
    loadConfig();
  }, []);

  return (
    <main className="relative min-h-screen text-white flex flex-col selection:bg-emerald-500 selection:text-black">
      <Background />

      {/* NAVBAR STICKY DI ATAS */}
      <Navbar logoUrl={config?.logo_url} />

      {/* HERO SECTION (2 KOLOM: TEKS & CHART) */}
      <Suspense fallback={<p className="text-gray-400 p-8 text-center animate-pulse">Memuat visual...</p>}>
        <HeroSection
          title={config?.hero_title}
          subtitle={config?.hero_subtitle}
          whatsappNumber={config?.whatsapp_number}
        />
      </Suspense>

      {/* SEKSI LAINNYA */}
      <AboutAndCertSection
        certTitle={config?.cert_title}
        certSubtitle={config?.cert_subtitle}
        winRate={config?.stat_win_rate}
        activeCopiers={config?.stat_active_copiers}
        totalAum={config?.stat_total_aum}
      />

      <GallerySection />

      <div id="signals">
        <Mql5SignalsSection signalUrl={config?.mql5_signal_url} />
      </div>

      <div id="calculator">
        <CalculatorSection whatsappNumber={config?.whatsapp_number} />
      </div>

      <TestimonialAndFaqSection
        companyProfileUrl={config?.company_profile_url}
        mql5HomeUrl={config?.mql5_home_url}
        logoUrl={config?.logo_url}
        testimonials={config?.testimonials_data}
        ctaCardTitle={config?.cta_card_title}
        ctaCardSubtitle={config?.cta_card_subtitle}
        ctaCardNote={config?.cta_card_note}
        footerDisclaimer={config?.footer_disclaimer}
      />
    </main>
  );
}