'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';

export function GallerySection() {
  const [mounted, setMounted] = useState(false);
  const [galleryTitle, setGalleryTitle] = useState('Galeri Komunitas Royal Eagle FX');
  
  // Default foto cadangan online (agar tidak tergantung folder public/images yang dihapus)
  const defaultImages = [
    { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop', title: 'Seminar & Edukasi Trading Member' },
    { src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop', title: 'Live Mentoring & Workshop' },
    { src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop', title: 'Kegiatan Edukasi Trading Forex' },
    { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop', title: 'Gathering Komunitas Royal Eagle' },
  ];

  const [images, setImages] = useState<Array<{ src: string; title: string }>>(defaultImages);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setMounted(true);

    async function fetchGalleryData() {
      const { data } = await supabase
        .from('landing_config')
        .select('gallery_title, gallery_images')
        .maybeSingle();

      if (data) {
        if (data.gallery_title) {
          setGalleryTitle(data.gallery_title);
        }

        // Jika ada foto dari DB / Admin Panel, gunakan foto tersebut
        if (data.gallery_images && Array.isArray(data.gallery_images) && data.gallery_images.length > 0) {
          const formatted = data.gallery_images.map((item: any, idx: number) => {
            if (typeof item === 'string') {
              return { src: item, title: `Dokumentasi Kegiatan #${idx + 1}` };
            }
            return { src: item.src || '', title: item.title || `Dokumentasi Kegiatan #${idx + 1}` };
          });
          setImages(formatted);
        }
      }
    }

    fetchGalleryData();
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!mounted || images.length === 0) return null;

  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4" suppressHydrationWarning>
      <div className="text-center space-y-4 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-semibold">
          <Camera className="w-4 h-4" />
          <span>DOKUMENTASI DARI KEGIATAN</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
          {galleryTitle}
        </h2>
      </div>

      <div className="relative rounded-3xl overflow-hidden border border-gray-800 bg-gray-900/60 backdrop-blur-xl shadow-2xl">
        {/* Container Image */}
        <div className="relative h-[300px] sm:h-[480px] w-full bg-gray-950 flex items-center justify-center overflow-hidden">
          <img
            src={images[currentIndex]?.src}
            alt={images[currentIndex]?.title || 'Galeri Royal Eagle'}
            className="w-full h-full object-cover transition-all duration-500"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          <p className="absolute bottom-6 left-6 text-lg sm:text-xl font-bold text-white backdrop-blur-md px-4 py-2 rounded-xl bg-black/40 border border-white/10">
            {images[currentIndex]?.title}
          </p>
        </div>

        {/* Tombol Panah Kiri & Kanan */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevSlide}
              suppressHydrationWarning
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 border border-white/20 text-white hover:bg-emerald-500 hover:text-black transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              suppressHydrationWarning
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 border border-white/20 text-white hover:bg-emerald-500 hover:text-black transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>
    </section>
  );
}