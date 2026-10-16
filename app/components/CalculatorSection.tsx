'use client';

import { useState } from 'react';
import { Calculator, Send, MessageSquareCheck } from 'lucide-react';

interface CalculatorSectionProps {
  whatsappNumber?: string;
  minDeposit?: string;
  targetRoi?: string;
}

export function CalculatorSection({ 
  whatsappNumber = '6282128052892',
  minDeposit,
  targetRoi 
}: CalculatorSectionProps) {
  // Range Modal: Minimal $3,000 sampai Maksimal $500,000
  const [modal, setModal] = useState<number>(3000);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [broker, setBroker] = useState('Cyber Futures (Rekomendasi Utama)');
  const [accountType, setAccountType] = useState('MetaTrader 4 (MT4) - Khusus');
  const [agreed, setAgreed] = useState(false);

  // State untuk Kirim Email Backend
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Fungsi Penentu Persentase Bagi Hasil Berdasarkan Modal
  const getSharePercentage = (val: number) => {
    if (val >= 45000) return 90;
    if (val >= 15000) return 85;
    if (val >= 10000) return 80;
    if (val >= 5000) return 75;
    return 70;
  };

  const userShare = getSharePercentage(modal);

  // Perhitungan Otomatis Berdasarkan Modal
  const minProfit = modal * 0.6; // 60%
  const maxProfit = modal * 0.8; // 80%
  const profit1Year = modal * 582.6; // Proyeksi historis / compounding

  const formatUSD = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert('Harap setujui persetujuan risiko sebelum mengajukan.');
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          modal: formatUSD(modal),
          userShare,
          broker,
          accountType,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatusMessage({
          text: 'Pengajuan pembuatan akun berhasil terkirim! Tim kami akan memprosesnya.',
          isError: false,
        });
        // Reset form input setelah sukses
        setFullName('');
        setEmail('');
        setPhone('');
        setAgreed(false);
      } else {
        setStatusMessage({
          text: 'Gagal mengirim pengajuan. Silakan coba lagi nanti.',
          isError: true,
        });
      }
    } catch (error) {
      console.error(error);
      setStatusMessage({
        text: 'Terjadi kesalahan sistem atau koneksi internet.',
        isError: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const masterWaLink = `https://wa.me/${whatsappNumber}?text=Halo%20Master%20Royal%20Eagle,%20saya%20ingin%20konsultasi%20mengenai%20copytrade%20dengan%20modal%20${formatUSD(modal)}`;

  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4" suppressHydrationWarning>
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
          Daftar Akun Copytrade RoyalEagleFX
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto text-sm sm:text-base">
          Isi form pendaftaran di bawah ini untuk mengonfigurasi pembuatan akun copytrade Anda. Gunakan kalkulator interaktif kami untuk melihat simulasi hasil berdasarkan target modal Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* KIRI: SIMULASI HASIL PERTUMBUHAN MODAL */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gray-900/60 border border-yellow-500/30 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
            <Calculator className="w-6 h-6 text-yellow-400" />
            <h3 className="text-xl font-bold text-white">Simulasi Hasil Pertumbuhan Modal</h3>
          </div>

          {/* SLIDER INPUT */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-300">
                Besar Modal Deposit (USD):
              </label>
              <span className="text-2xl font-black text-yellow-400">
                {formatUSD(modal)}
              </span>
            </div>

            <input
              type="range"
              min={3000}
              max={500000}
              step={1000}
              value={modal}
              suppressHydrationWarning
              onChange={(e) => setModal(Number(e.target.value))}
              className="w-full h-3 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-yellow-400"
            />

            <div className="flex justify-between text-xs text-gray-500 font-semibold">
              <span>Min: $3,000</span>
              <span>Med: $250,000</span>
              <span>Max: $500,000</span>
            </div>
          </div>

          {/* GRID METRIK STATS */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-gray-950/80 border border-gray-800">
              <p className="text-xs text-gray-400 mb-1">Estimasi Profit/Bulan:</p>
              <p className="text-lg sm:text-xl font-bold text-emerald-400">
                {formatUSD(minProfit)} - {formatUSD(maxProfit)}
              </p>
            </div>

            {/* SISTEM BAGI HASIL DINAMIS */}
            <div className="p-4 rounded-2xl bg-gray-950/80 border border-gray-800">
              <p className="text-xs text-gray-400 mb-1">Sistem Bagi Hasil (Kopier):</p>
              <p className="text-lg sm:text-xl font-bold text-yellow-400">
                {userShare}% Anda
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-950/80 border border-gray-800">
              <p className="text-xs text-gray-400 mb-1">Proyeksi Modal 1 Tahun:</p>
              <p className="text-lg sm:text-xl font-bold text-white">
                {formatUSD(profit1Year)}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-950/80 border border-gray-800">
              <p className="text-xs text-gray-400 mb-1">Batas Aman Drawdown:</p>
              <p className="text-lg sm:text-xl font-bold text-emerald-400">&lt; 15%</p>
            </div>
          </div>

          {/* KONSULTASI MASTER TRADER */}
          <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
              <MessageSquareCheck className="w-5 h-5" />
              <span>KONSULTASI MASTER TRADER</span>
            </div>
            <p className="text-xs text-gray-300">
              Punya pertanyaan khusus seputar manajemen risiko modal {formatUSD(modal)}? Diskusikan langsung secara privat via WhatsApp pribadi Master.
            </p>
            <a
              href={masterWaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-sm rounded-xl transition-all"
            >
              CHAT WHATSAPP MASTER ({whatsappNumber})
            </a>
          </div>

          <p className="text-[10px] text-gray-500 italic">
            * Perhitungan simulasi di atas berdasarkan performa historis trading tim RoyalEagle dengan rata-rata return bulanan berkisar 60%-80%. Performa masa lalu tidak menjamin hasil masa depan secara mutlak. Silakan trading dengan bijaksana.
          </p>
        </div>

        {/* KANAN: FORM PENGAJUAN AKUN BARU */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gray-900/60 border border-gray-800 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
            <Send className="w-6 h-6 text-emerald-400" />
            <h3 className="text-xl font-bold text-white">Form Pengajuan Akun Baru</h3>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4" suppressHydrationWarning>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Nama Lengkap Anda *
              </label>
              <input
                type="text"
                required
                suppressHydrationWarning
                placeholder="Contoh: Royal Eagle"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-white focus:outline-none focus:border-emerald-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Alamat Email Aktif *
              </label>
              <input
                type="email"
                required
                suppressHydrationWarning
                placeholder="Contoh: royaleagle@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-white focus:outline-none focus:border-emerald-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Nomor WhatsApp *
              </label>
              <input
                type="text"
                required
                suppressHydrationWarning
                placeholder="Contoh: 08123456789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-white focus:outline-none focus:border-emerald-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Modal Terpilih (Disinkronkan otomatis)
              </label>
              <input
                type="text"
                disabled
                suppressHydrationWarning
                value={formatUSD(modal)}
                className="w-full px-4 py-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-bold text-sm cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Pilihan Broker Mitra
              </label>
              <select
                value={broker}
                suppressHydrationWarning
                onChange={(e) => setBroker(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-white focus:outline-none focus:border-emerald-500 text-sm"
              >
                <option value="Cyber Futures (Rekomendasi Utama)">Cyber Futures (Rekomendasi Utama)</option>
                <option value="Exness Broker">Exness Broker</option>
                <option value="OctaFX Broker">OctaFX Broker</option>
                <option value="OANDA">OANDA</option>
                <option value="HFM Broker">HFM Broker</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Jenis Akun MetaTrader
              </label>
              <select
                value={accountType}
                suppressHydrationWarning
                onChange={(e) => setAccountType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-white focus:outline-none focus:border-emerald-500 text-sm"
              >
                <option value="MetaTrader 4 (MT4) - Khusus">MetaTrader 4 (MT4) - Khusus</option>
              </select>
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                id="agreed"
                checked={agreed}
                suppressHydrationWarning
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-4 h-4 rounded bg-gray-950 border-gray-800 text-emerald-500 focus:ring-0"
              />
              <label htmlFor="agreed" className="text-xs text-gray-400 cursor-pointer">
                Saya menyetujui bahwa dana yang digunakan adalah modal dingin (bukan dana kebutuhan harian) dan sadar sepenuhnya akan risiko trading valuta asing (Forex) & Gold (XAUUSD).
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              suppressHydrationWarning
              className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 disabled:opacity-50 text-black font-extrabold text-base rounded-xl transition-all shadow-lg shadow-yellow-500/20"
            >
              {loading ? 'MENGIRIM PENGAJUAN...' : 'AJUKAN PEMBUATAN AKUN COPYTRADE'}
            </button>

            {statusMessage && (
              <p
                className={`text-xs text-center font-semibold mt-2 ${
                  statusMessage.isError ? 'text-red-400' : 'text-emerald-400'
                }`}
              >
                {statusMessage.text}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}