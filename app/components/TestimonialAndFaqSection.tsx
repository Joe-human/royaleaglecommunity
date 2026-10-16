'use client';

import { useState } from 'react';
import { ChevronDown, MessageSquareQuote, Calendar, ShieldAlert, ExternalLink } from 'lucide-react';

interface TestimonialAndFaqSectionProps {
  companyProfileUrl?: string;
  mql5HomeUrl?: string;
  logoUrl?: string;
  testimonials?: Array<{ name: string; role: string; comment: string }>;
  ctaCardTitle?: string;
  ctaCardSubtitle?: string;
  ctaCardNote?: string;
  footerDisclaimer?: string;
}

export function TestimonialAndFaqSection({
  companyProfileUrl = '/company-profile',
  mql5HomeUrl = 'https://www.mql5.com',
  logoUrl = '/images/logoroyaleagle.jpeg',
  testimonials,
  ctaCardTitle = 'Siap Mengubah Cara Anda Berinvestasi?',
  ctaCardSubtitle = 'Ribuan dolar ditransaksikan setiap detik di pasar Forex global. Hubungkan akun Anda hari ini ke jaringan sinyal MQL5 Royal Eagle dan biarkan algoritma canggih bekerja menghasilkan profit untuk Anda.',
  ctaCardNote = '* Jadwal Webinar / Seminar diadakan 1-2x dalam setahun bagi member terdaftar.',
  footerDisclaimer = 'Perdagangan valuta asing (Forex) dan CFD melibatkan risiko kerugian yang signifikan dan mungkin tidak cocok untuk semua investor. Penggunaan leverage dapat melipatgandakan keuntungan maupun kerugian Anda secara signifikan. Performa masa lalu dari sistem atau sinyal trading milik Royal Eagle FX tidak menjamin hasil atau keuntungan yang sama di masa depan.',
}: TestimonialAndFaqSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const defaultTestimonials = [
    {
      comment: '"Awalnya saya ragu karena banyak penyedia sinyal scam di luar sana. Namun, setelah 6 bulan mengopi Royal Eagle Pro Copytrade, akun saya tumbuh melesat dengan DD yang sangat terkendali. Hebat!"',
      name: 'Budi Santoso',
      role: 'Investor dari Surabaya',
    },
    {
      comment: '"Pilihan yang sangat tepat untuk akun tabungan jangka panjang. Strategi Steady Swing sangat stabil dan tidak membuat senam jantung. Penanganan drawdown-nya luar biasa cerdas."',
      name: 'Lina Wijaya',
      role: 'Prop-Trader Mandiri',
    },
    {
      comment: '"Integrasinya ke platform MetaTrader sangat mudah, dan performanya sesuai ekspektasi. Admin Komunitas juga sangat responsif memberikan saran setup terbaik saat dihubungi."',
      name: 'Kevin R.',
      role: 'Algorithmic Trade Enthusiast',
    },
  ];

  const activeTestimonials = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials;

  const faqs = [
    {
      q: 'Bagaimana cara kerja menyalin sinyal di MQL5?',
      a: 'MQL5 adalah infrastruktur trading sosial otomatis terbesar dan teraman besutan MetaQuotes. Saat Anda berlangganan sinyal Royal Eagle FX di situs resmi MQL5, seluruh transaksi (buka/tutup posisi) yang dilakukan algoritma kami akan terduplikasi secara presisi ke akun trading Anda secara real-time dalam hitungan milidetik.',
    },
    {
      q: 'Berapa modal minimum untuk ikut copytrade?',
      a: 'Saran ketahanan modal ideal dimulai dari $3,000 USD. Nominal ini direkomendasikan agar rasio ketahanan margin akun Anda tetap aman dari fluktuasi pasar, sekaligus mengoptimalkan potensi persentase yield bulanan secara konsisten sesuai dengan kalkulasi risk management kami.',
    },
    {
      q: 'Apakah saya perlu membiarkan komputer/laptop menyala terus?',
      a: 'Sama sekali tidak perlu. Seluruh proses penyalinan sinyal dieksekusi secara otomatis melalui Cloud VPS resmi MetaQuotes yang aktif 24 jam sehari, 5 hari seminggu. Anda dapat mematikan komputer maupun HP kapan saja tanpa mengganggu transaksi yang sedang berjalan.',
    },
    {
      q: 'Apakah ada jaminan profit pasti 100%?',
      a: 'Dalam dunia finansial resmi, tidak ada garansi profit 100%. Pasar Forex & Gold selalu dinamis. Namun, keunggulan Royal Eagle FX terletak pada penerapan strict stop-loss, pembatasan risiko per trade, serta manajemen drawdown yang terukur demi menjaga pertumbuhan ekuitas jangka panjang secara aman dan terprediksi.',
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4 space-y-20">
      
      {/* SEKSI TESTIMONI */}
      <div className="space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <MessageSquareQuote className="w-4 h-4" />
            <span>ULASAN PENGGUNA</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Apa Kata Komunitas MQL5
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            Ulasan independen dari para Investor yang mengandalkan keandalan sinyal trading Royal Eagle FX.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeTestimonials.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-gray-900/60 border border-gray-800 backdrop-blur-xl flex flex-col justify-between space-y-6"
            >
              <p className="text-xs sm:text-sm text-gray-300 italic leading-relaxed">
                "{item.comment}"
              </p>
              <div className="border-t border-gray-800/80 pt-4">
                <p className="text-sm font-bold text-white">{item.name}</p>
                <p className="text-xs text-yellow-400 font-medium">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SEKSI FAQ */}
      <div className="space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            BANTUAN & FAQ
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            Menjawab segala keraguan Anda mengenai sistem trading Royal Eagle FX.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-gray-900/60 border border-gray-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4 text-white font-bold text-sm sm:text-base"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-6 h-6 sm:w-7 sm:h-7 shrink-0 text-gray-400 transition-transform ${
                      isOpen ? 'rotate-180 text-emerald-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-gray-800/50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SEKSI CARD CTA WEBINAR */}
      <div id="portfolio" className="p-8 sm:p-12 rounded-3xl bg-gray-900/60 border border-blue-500/30 backdrop-blur-xl text-center space-y-6 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Calendar className="w-4 h-4" />
          <span>JADWAL WEBINAR/SEMINAR & PORTOFOLIO</span>
        </div>

        <h3 className="text-2xl sm:text-4xl font-extrabold text-white max-w-2xl mx-auto">
          {ctaCardTitle}
        </h3>

        <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed">
          {ctaCardSubtitle}
        </p>

        <p className="text-[11px] text-yellow-400 font-semibold italic">
          {ctaCardNote}
        </p>

        <div className="pt-2">
          <a
            href={companyProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm rounded-2xl transition-all shadow-xl shadow-emerald-500/20"
          >
            <span>Akses Portofolio</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-gray-800/80 pt-10 space-y-10">
        
        {/* HSNTRADE STYLE FOOTER LAYOUT (TANPA NAVIGASI LINK) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          
          {/* KOLOM 1: BRAND & DESKRIPSI + SOCIAL MEDIA WHATSAPP */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logoUrl} alt="Logo" className="w-8 h-8 rounded-full border border-yellow-500/40" />
              <span className="font-extrabold text-xl tracking-wider text-white">ROYALEAGLEFX</span>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-md">
              RoyalEagleFX adalah penyedia layanan navigasi portofolio trading & sistem copytrade profesional eksklusif Forex dan Gold (XAUUSD). Kami mendidik dan membantu menumbuhkan konsistensi profit Anda.
            </p>

            {/* Social Media - Hanya WhatsApp */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/6282128052892" // Ganti dengan nomor WhatsApp resmi
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800/80 border border-gray-700/80 flex items-center justify-center text-gray-300 hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition-all"
                title="WhatsApp"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* KOLOM 2: BANTUAN & KONTAK */}
          <div className="md:justify-self-end space-y-3">
            <h4 className="text-white font-bold tracking-wider uppercase text-xs sm:text-sm">
              BANTUAN & KONTAK
            </h4>
            <p className="text-xs sm:text-sm text-gray-400 max-w-sm leading-relaxed">
              Hubungi CS kami kapan saja untuk bantuan setup maupun kendala konektivitas akun Anda.
            </p>
            <a 
              href="mailto:royaleagle.fx1@gmail.com" 
              className="text-xs sm:text-sm text-blue-400 hover:text-blue-300 transition-colors block font-medium underline"
            >
              royaleagle.fx1@gmail.com
            </a>
          </div>

        </div>

        {/* FOOTER DISCLAIMER */}
        <div className="max-w-6xl mx-auto p-6 rounded-2xl bg-gray-950/80 border border-gray-800 text-left space-y-3">
          <div className="flex items-center gap-2 text-yellow-400 font-bold text-xs">
            <ShieldAlert className="w-4 h-4" />
            <span>Peringatan Risiko Penting:</span>
          </div>
          <p className="text-[11px] text-gray-400 leading-relaxed">
            {footerDisclaimer}
          </p>
        </div>

        <p className="text-[11px] text-gray-500 text-center">
          © 2026 Royal Eagle MQL5 Trading Services. All Rights Reserved.
        </p>
      </footer>

    </section>
  );
}