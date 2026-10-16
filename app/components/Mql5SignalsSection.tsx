'use client';

import { CheckCircle2, ExternalLink, Zap, ShieldCheck, Clock } from 'lucide-react';

interface Mql5SignalsSectionProps {
  signalUrl?: string;
}

export function Mql5SignalsSection({
  signalUrl = 'https://www.mql5.com',
}: Mql5SignalsSectionProps) {
  const signals = [
    {
      badge: 'Rekomendasi Populer',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      title: 'ROYALEAGLE PRO COPYTRADE',
      description: 'Sistem trading fully-automated berbasis momentum & scalping pada komoditas Gold (XAUUSD).',
      monthlyProfit: '+60% - 80%',
      drawdown: '11.8%',
      minDeposit: '$3,000',
      leverage: '1:200',
      features: [
        '100% Menggunakan Robot Terprogram',
        'Perlindungan Stop-Loss Ketat',
        'Setup Instan via MQL5 Platform',
      ],
      price: '$300/bulan',
      mql5Url: signalUrl,
      borderColor: 'border-amber-500/40 hover:border-amber-500',
      buttonBg: 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black',
      icon: Zap,
    },
    {
      badge: 'Aman & Stabil',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      title: 'ROYALEAGLE STEADY SWING',
      description: 'Sistem swing trading multi-pair berisiko rendah yang memprioritaskan keamanan modal jangka panjang.',
      monthlyProfit: '+60% - 80%',
      drawdown: '4.9%',
      minDeposit: '$3,000',
      leverage: '1:200',
      features: [
        'Tanpa Strategi Martingale / Grid',
        'Sangat Aman untuk Akun Besar',
        'Sesuai untuk Prop Firm Account',
      ],
      price: '$450/bulan',
      mql5Url: signalUrl,
      borderColor: 'border-emerald-500/40 hover:border-emerald-500',
      buttonBg: 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black',
      icon: ShieldCheck,
    },
    {
      badge: 'Pasar Tenang',
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      title: 'ROYALEAGLE ASIA SCALPER',
      description: 'Mengeksploitasi volatilitas rendah pada sesi Asia menggunakan spread ketat untuk hasil konsisten harian.',
      monthlyProfit: '+60% - 80%',
      drawdown: '8.5%',
      minDeposit: '$3,000',
      leverage: '1:200',
      features: [
        'Entry Akurat pada Sesi Malam / Fajar',
        'Penutupan Order Cepat Otomatis',
        'Khusus Pair Mayor (EURUSD, GBPUSD)',
      ],
      price: '$350/bulan',
      mql5Url: signalUrl,
      borderColor: 'border-blue-500/40 hover:border-blue-500',
      buttonBg: 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-black',
      icon: Clock,
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
          Pilih Signal MQL5 Royal Eagle
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
          Kami menyediakan beberapa jenis strategi trading otomatis yang dapat disesuaikan dengan profil risiko dan preferensi modal Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {signals.map((item, index) => {
          const IconComp = item.icon;
          return (
            <div
              key={index}
              className={`group relative p-6 sm:p-8 rounded-3xl bg-gray-900/60 border ${item.borderColor} backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between`}
            >
              <div className="space-y-6">
                {/* Header Badge */}
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Aktif</span>
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <IconComp className="w-5 h-5 text-white" />
                    <h3 className="text-xl font-bold text-white tracking-wide">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Grid Metrics */}
                <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-gray-950/80 border border-gray-800">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">MONTHLY PROFIT</p>
                    <p className="text-sm sm:text-base font-extrabold text-emerald-400">{item.monthlyProfit}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">DRAWDOWN MAKS</p>
                    <p className="text-sm sm:text-base font-extrabold text-yellow-400">{item.drawdown}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">MIN DEPOSIT</p>
                    <p className="text-sm sm:text-base font-bold text-white">{item.minDeposit}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">LEVERAGE</p>
                    <p className="text-sm sm:text-base font-bold text-white">{item.leverage}</p>
                  </div>
                </div>

                {/* Features Checklist */}
                <ul className="space-y-2.5 pt-1">
                  {item.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-xs text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price & CTA Button */}
              <div className="pt-6 border-t border-gray-800/80 mt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">MQL5 Price:</span>
                  <span className="text-lg font-black text-white">{item.price}</span>
                </div>

                <a
                  href={item.mql5Url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3.5 px-4 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 ${item.buttonBg} transition-all shadow-lg`}
                >
                  <span>Langganan di MQL5</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}