'use client';

import { Award, Shield, CheckCircle, TrendingUp, Users, Wallet } from 'lucide-react';

interface AboutAndCertSectionProps {
  certTitle?: string;
  certSubtitle?: string;
  winRate?: string;
  activeCopiers?: string;
  totalAum?: string;
}

export function AboutAndCertSection({
  certTitle = 'Sertifikat Resmi & Lisensi MQL5',
  winRate = '88.4%',
  activeCopiers = '1,420+',
  totalAum = '$4.8M+',
}: AboutAndCertSectionProps) {
  const reasons = [
    'Sistem trading otomatis untuk menciptakan passive income konsisten bagi investor sibuk.',
    'Tanpa perlu menganalisis market sendiri, semua eksekusi ditangani oleh Master Trader berpengalaman.',
    'Transparansi penuh dengan rekam jejak performa terverifikasi di MQL5.',
    'Manajemen risiko ketat untuk menjaga keamanan modal dalam jangka panjang.',
  ];

  // Daftar path gambar sertifikat di folder public/images/
  const certificates = [
    {
      title: 'Sertifikat Master Trader Internasional (New York)',
      img: '/images/sertifikat1.jpeg',
    },
    {
      title: 'Sertifikat Analis Strategi & Pengujian Trading',
      img: '/images/sertifikat2.jpeg',
    },
    {
      title: 'Sertifikat Kelulusan Master Trader Kontestasi',
      img: '/images/sertifikat3.jpeg',
    },
    {
      title: 'Sertifikasi Perdagangan Internasional (WTC Denver)',
      img: '/images/sertifikat4.jpeg',
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4 space-y-16">
      {/* SEKSI KOMUNITAS COPYTRADE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <TrendingUp className="w-4 h-4" />
            <span>KOMUNITAS COPYTRADE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            Ciptakan <span className="bg-gradient-to-r from-emerald-400 to-yellow-400 bg-clip-text text-transparent">Passive Income</span> Bersama Royaleagle FX
          </h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Copy Trading adalah metode investasi teruji di pasar Forex yang memungkinkan Anda menyalin secara otomatis seluruh strategi dan transaksi dari Master Trader profesional. Solusi ideal bagi Anda yang sibuk atau belum mahir trading namun ingin merasakan hasil maksimal secara berkelanjutan.
          </p>

          <div className="space-y-3 pt-2">
            {reasons.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-gray-300">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CARD MENGAPA MEMILIH ROYALEAGLE */}
        <div className="p-8 rounded-3xl bg-gray-900/60 border border-emerald-500/30 backdrop-blur-xl shadow-2xl relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <Shield className="w-7 h-7 text-emerald-400" />
            <span>Mengapa memilih Royaleagle sebagai invest trader?</span>
          </h3>

          <p className="text-sm text-gray-300 leading-relaxed">
            Komunitas ROYALEAGLE menyediakan sistem copytrade profesional untuk trading bareng dan menghasilkan pasif income bersama investor. Konsepnya sederhana: akun Anda akan terhubung langsung dan secara otomatis menyalin posisi perdagangan yang dibuka oleh master trader kami tanpa perlu senam jantung.
          </p>

          <div className="p-4 rounded-2xl bg-gray-950/80 border border-gray-800 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">Eksekusi Transaksi</p>
              <p className="text-lg font-bold text-emerald-400">100% Otomatis</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Target Profit</p>
              <p className="text-lg font-bold text-yellow-400">60% - 80% / Bulan</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3 KOTAK STATISTIK DARI ADMIN PANEL */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="p-6 rounded-3xl bg-gray-900/60 border border-gray-800 backdrop-blur-xl flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Rata-rata Win Rate</p>
            <p className="text-2xl font-black text-emerald-400">{winRate}</p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-gray-900/60 border border-gray-800 backdrop-blur-xl flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Investor Active Copiers</p>
            <p className="text-2xl font-black text-yellow-400">{activeCopiers}</p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-gray-900/60 border border-gray-800 backdrop-blur-xl flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Total Dana Kelolaan (AUM)</p>
            <p className="text-2xl font-black text-white">{totalAum}</p>
          </div>
        </div>
      </div>

      {/* SEKSI SERTIFIKASI MASTER TRADER (2 BARIS 2 KOLOM) */}
      <div className="space-y-8 pt-4">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-semibold">
            <Award className="w-4 h-4" />
            <span>LISENSI TERVERIFIKASI</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            {certTitle}
          </h2>
        </div>

        {/* GRID GAMBAR: 2 KOLOM 2 BARIS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="group p-5 rounded-3xl bg-gray-900/60 border border-gray-800 hover:border-yellow-500/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
            >
              {/* Gambar Sertifikat Utuh tanpa Terpotong */}
              <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-gray-950/80 mb-4 border border-gray-800/80 group-hover:border-yellow-500/30 transition-colors flex items-center justify-center p-2">
                <img
                  src={cert.img}
                  alt={cert.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              <p className="text-sm sm:text-base font-bold text-white group-hover:text-yellow-400 transition-colors text-center">
                {cert.title}
              </p>

              <span className="mt-2 text-[10px] text-center text-gray-500 font-medium uppercase tracking-wider block">
                Official Verified
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}