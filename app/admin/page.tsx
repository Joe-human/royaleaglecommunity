'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { 
  Save, 
  LogOut, 
  LayoutDashboard, 
  MessageSquare, 
  Link as LinkIcon, 
  CheckCircle2, 
  BarChart3, 
  Image as ImageIcon,
  Users,
  ShieldAlert,
  Calendar,
  Upload,
  Trash2,
  Plus
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // 1. Hero & Logo
  const [heroTitle, setHeroTitle] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [ctaText, setCtaText] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  
  // 2. Links External
  const [companyProfileUrl, setCompanyProfileUrl] = useState('');
  const [mql5HomeUrl, setMql5HomeUrl] = useState('');
  const [mql5SignalUrl, setMql5SignalUrl] = useState('');

  // 3. Stats & Certifications
  const [statWinRate, setStatWinRate] = useState('');
  const [statActiveCopiers, setStatActiveCopiers] = useState('');
  const [statTotalAum, setStatTotalAum] = useState('');
  const [certTitle, setCertTitle] = useState('');

  // 4. Galeri Foto
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState('');

  // 5. Testimoni
  const [testi1Name, setTesti1Name] = useState('');
  const [testi1Role, setTesti1Role] = useState('');
  const [testi1Comment, setTesti1Comment] = useState('');

  const [testi2Name, setTesti2Name] = useState('');
  const [testi2Role, setTesti2Role] = useState('');
  const [testi2Comment, setTesti2Comment] = useState('');

  const [testi3Name, setTesti3Name] = useState('');
  const [testi3Role, setTesti3Role] = useState('');
  const [testi3Comment, setTesti3Comment] = useState('');

  // 6. Seksi CTA Webinar & Footer Disclaimer
  const [ctaCardTitle, setCtaCardTitle] = useState('');
  const [ctaCardSubtitle, setCtaCardSubtitle] = useState('');
  const [ctaCardNote, setCtaCardNote] = useState('');
  const [footerDisclaimer, setFooterDisclaimer] = useState('');

  useEffect(() => {
    checkUserAndLoadData();
  }, []);

  const checkUserAndLoadData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/admin/login');
      return;
    }

    const { data } = await supabase
      .from('landing_config')
      .select('*')
      .maybeSingle();

    if (data) {
      setHeroTitle(data.hero_title || '');
      setHeroSubtitle(data.hero_subtitle || '');
      setWhatsappNumber(data.whatsapp_number || '');
      setCtaText(data.cta_text || 'Gabung VIP Sekarang');
      setLogoUrl(data.logo_url || '/images/logoroyaleagle.jpeg');
      
      setCompanyProfileUrl(data.company_profile_url || '/company-profile');
      setMql5HomeUrl(data.mql5_home_url || 'https://www.mql5.com');
      setMql5SignalUrl(data.mql5_signal_url || 'https://www.mql5.com');

      setStatWinRate(data.stat_win_rate || '88.4%');
      setStatActiveCopiers(data.stat_active_copiers || '1,420+');
      setStatTotalAum(data.stat_total_aum || '$4.8M+');

      setCertTitle(data.cert_title || 'Sertifikat Resmi & Lisensi MQL5');
      setGalleryTitle(data.gallery_title || 'Galeri Komunitas Royal Eagle FX');

      // Load Array Galeri Foto dari DB
      if (data.gallery_images && Array.isArray(data.gallery_images) && data.gallery_images.length > 0) {
        setGalleryImages(data.gallery_images);
      } else {
        setGalleryImages([
          '/images/gallery1.jpeg',
          '/images/gallery2.png',
          '/images/gallery3.jpeg',
          '/images/gallery4.png'
        ]);
      }

      setCtaCardTitle(data.cta_card_title || 'Siap Mengubah Cara Anda Berinvestasi?');
      setCtaCardSubtitle(data.cta_card_subtitle || 'Ribuan dolar ditransaksikan setiap detik di pasar Forex global...');
      setCtaCardNote(data.cta_card_note || '* Jadwal Webinar / Seminar diadakan 1-2x dalam setahun bagi member terdaftar.');
      setFooterDisclaimer(data.footer_disclaimer || 'Perdagangan valuta asing (Forex) dan CFD melibatkan risiko kerugian...');

      if (data.testimonials_data && Array.isArray(data.testimonials_data)) {
        if (data.testimonials_data[0]) {
          setTesti1Name(data.testimonials_data[0].name || '');
          setTesti1Role(data.testimonials_data[0].role || '');
          setTesti1Comment(data.testimonials_data[0].comment || '');
        }
        if (data.testimonials_data[1]) {
          setTesti2Name(data.testimonials_data[1].name || '');
          setTesti2Role(data.testimonials_data[1].role || '');
          setTesti2Comment(data.testimonials_data[1].comment || '');
        }
        if (data.testimonials_data[2]) {
          setTesti3Name(data.testimonials_data[2].name || '');
          setTesti3Role(data.testimonials_data[2].role || '');
          setTesti3Comment(data.testimonials_data[2].comment || '');
        }
      }
    }

    setLoading(false);
  };

  // Fungsi Upload Logo Baru ke Supabase Storage
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingLogo(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `logo-${Date.now()}.${fileExt}`;
      const filePath = `brand/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('landing-assets')
        .upload(filePath, file);

      if (uploadError) {
        alert('Gagal upload logo: ' + uploadError.message);
        setUploadingLogo(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('landing-assets')
        .getPublicUrl(filePath);

      setLogoUrl(publicUrl);
      alert('Logo baru berhasil diupload! Klik "SIMPAN SELURUH PERUBAHAN" di bawah agar tersimpan.');
    } catch (err: any) {
      alert('Terjadi kesalahan upload logo: ' + err.message);
    } finally {
      setUploadingLogo(false);
    }
  };

  // Fungsi Upload Foto Baru ke Supabase Storage (Galeri)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingGallery(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('landing-assets')
        .upload(filePath, file);

      if (uploadError) {
        alert('Gagal upload gambar: ' + uploadError.message);
        setUploadingGallery(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('landing-assets')
        .getPublicUrl(filePath);

      setGalleryImages([...galleryImages, publicUrl]);
      alert('Foto berhasil diupload! Tekan "SIMPAN SELURUH PERUBAHAN" agar tersimpan permanen.');
    } catch (err: any) {
      alert('Terjadi kesalahan upload: ' + err.message);
    } finally {
      setUploadingGallery(false);
    }
  };

  // Fungsi Tambah Foto via Input URL
  const handleAddUrlImage = () => {
    if (!newImageUrl.trim()) return;
    setGalleryImages([...galleryImages, newImageUrl.trim()]);
    setNewImageUrl('');
  };

  // Fungsi Hapus Foto dari Galeri
  const handleRemoveImage = (indexToRemove: number) => {
    if (confirm('Yakin ingin menghapus foto ini dari galeri?')) {
      setGalleryImages(galleryImages.filter((_, index) => index !== indexToRemove));
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');

    const testimonialsData = [
      { name: testi1Name, role: testi1Role, comment: testi1Comment },
      { name: testi2Name, role: testi2Role, comment: testi2Comment },
      { name: testi3Name, role: testi3Role, comment: testi3Comment },
    ];

    const { error } = await supabase
      .from('landing_config')
      .upsert({
        id: 1,
        hero_title: heroTitle,
        hero_subtitle: heroSubtitle,
        whatsapp_number: whatsappNumber,
        cta_text: ctaText,
        logo_url: logoUrl,
        company_profile_url: companyProfileUrl,
        mql5_home_url: mql5HomeUrl,
        mql5_signal_url: mql5SignalUrl,
        stat_win_rate: statWinRate,
        stat_active_copiers: statActiveCopiers,
        stat_total_aum: statTotalAum,
        cert_title: certTitle,
        gallery_title: galleryTitle,
        gallery_images: galleryImages,
        testimonials_data: testimonialsData,
        cta_card_title: ctaCardTitle,
        cta_card_subtitle: ctaCardSubtitle,
        cta_card_note: ctaCardNote,
        footer_disclaimer: footerDisclaimer,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      alert('Gagal menyimpan: ' + error.message);
    } else {
      setSuccessMsg('Seluruh konfigurasi landing page, logo, & galeri foto berhasil diperbarui dan sudah tayang!');
    }
    setSaving(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-400">
        <p className="animate-pulse">Memuat data Admin Panel...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white selection:bg-yellow-500 selection:text-black">
      {/* Header Admin */}
      <header className="border-b border-gray-800 bg-gray-900/60 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-5 h-5 text-yellow-400" />
            <h1 className="font-extrabold text-lg text-white">ROYALEAGLE FX - FULL ADMIN CONTROL</h1>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-950/60 border border-red-500/30 hover:bg-red-900/80 text-red-400 text-xs font-bold rounded-xl transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Kelola 100% Konten Landing Page</h2>
          <p className="text-xs text-gray-400">Ubah teks hero, logo, galeri foto, kontak WA, statistik, testimoni, hingga footer disclaimer.</p>
        </div>

        {/* BOX PEMBERITAHUAN BERHASIL DISIMPAN */}
        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-sm flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSaveConfig} className="space-y-8">
          
          {/* SEKSI 1: HERO & LOGO */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gray-900/60 border border-gray-800 backdrop-blur-xl space-y-5 shadow-xl">
            <h3 className="text-lg font-bold text-yellow-400 border-b border-gray-800 pb-3 flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              <span>Seksi Utama (Hero) & Logo</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Judul Utama Hero Section</label>
              <input
                type="text"
                required
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-white text-sm focus:outline-none focus:border-yellow-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Deskripsi Subtitle Hero</label>
              <textarea
                rows={3}
                required
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-white text-sm focus:outline-none focus:border-yellow-500"
              />
            </div>

            {/* SEKSI MANAJEMEN LOGO BRAND */}
            <div className="p-4 rounded-2xl bg-gray-950 border border-gray-800 space-y-3">
              <label className="block text-xs font-bold text-yellow-400 uppercase tracking-wider">
                Logo Brand Website
              </label>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Preview Logo Saat Ini */}
                <div className="w-20 h-20 rounded-2xl bg-gray-900 border border-gray-800 p-2 flex items-center justify-center shrink-0 overflow-hidden">
                  {logoUrl ? (
                    <img src={logoUrl} alt="Logo Preview" className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-xs text-gray-500">No Logo</span>
                  )}
                </div>

                <div className="flex-1 space-y-2 w-full">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      placeholder="URL Logo..."
                      className="flex-1 px-4 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white text-xs focus:outline-none focus:border-yellow-500"
                    />
                    
                    {/* Tombol Upload Logo Baru */}
                    <label className="cursor-pointer px-4 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold rounded-xl flex items-center gap-1.5 shrink-0 transition-all">
                      <Upload className="w-4 h-4" />
                      <span>{uploadingLogo ? 'Uploading...' : 'Upload Logo Baru'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        disabled={uploadingLogo}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-[11px] text-gray-500">Upload logo baru dari perangkat atau masukkan URL gambar secara manual.</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Nomor WA Admin / Master (Format: 628xxx)</span>
              </label>
              <input
                type="text"
                required
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-white text-sm focus:outline-none focus:border-yellow-500"
              />
            </div>
          </div>

          {/* SEKSI 2: TAUTAN EXTERNAL & MQL5 */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gray-900/60 border border-gray-800 backdrop-blur-xl space-y-5 shadow-xl">
            <h3 className="text-lg font-bold text-blue-400 border-b border-gray-800 pb-3 flex items-center gap-2">
              <LinkIcon className="w-5 h-5" />
              <span>Kelola Tautan & URL Luar</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Link Portofolio / Company Profile</label>
              <input
                type="text"
                required
                value={companyProfileUrl}
                onChange={(e) => setCompanyProfileUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-white text-sm focus:outline-none focus:border-yellow-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Link Beranda MQL5 Resmi</label>
                <input
                  type="text"
                  required
                  value={mql5HomeUrl}
                  onChange={(e) => setMql5HomeUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-white text-sm focus:outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Link Langsung Sinyal MQL5</label>
                <input
                  type="text"
                  required
                  value={mql5SignalUrl}
                  onChange={(e) => setMql5SignalUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-white text-sm focus:outline-none focus:border-yellow-500"
                />
              </div>
            </div>
          </div>

          {/* SEKSI 3: STATISTIK & SERTIFIKAT */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gray-900/60 border border-gray-800 backdrop-blur-xl space-y-5 shadow-xl">
            <h3 className="text-lg font-bold text-emerald-400 border-b border-gray-800 pb-3 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              <span>Statistik & Informasi Sertifikat</span>
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Win Rate</label>
                <input
                  type="text"
                  required
                  value={statWinRate}
                  onChange={(e) => setStatWinRate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Active Copiers</label>
                <input
                  type="text"
                  required
                  value={statActiveCopiers}
                  onChange={(e) => setStatActiveCopiers(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Total AUM</label>
                <input
                  type="text"
                  required
                  value={statTotalAum}
                  onChange={(e) => setStatTotalAum(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-white text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Judul Sertifikasi / Lisensi</label>
              <input
                type="text"
                required
                value={certTitle}
                onChange={(e) => setCertTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-white text-sm focus:outline-none focus:border-yellow-500"
              />
            </div>
          </div>

          {/* SEKSI 4: GALERI KOMUNITAS */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gray-900/60 border border-gray-800 backdrop-blur-xl space-y-6 shadow-xl">
            <h3 className="text-lg font-bold text-purple-400 border-b border-gray-800 pb-3 flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              <span>Kelola Galeri Komunitas</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Judul Seksi Galeri</label>
              <input
                type="text"
                required
                value={galleryTitle}
                onChange={(e) => setGalleryTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-white text-sm focus:outline-none focus:border-yellow-500"
              />
            </div>

            {/* SEKSI KELOLA FOTO GALERI */}
            <div className="space-y-4 border-t border-gray-800 pt-4">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold text-yellow-400 uppercase tracking-wider">
                  Daftar Foto Galeri ({galleryImages.length} Foto)
                </label>
                
                {/* Button Upload File */}
                <label className="cursor-pointer px-3 py-1.5 bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploadingGallery ? 'Uploading...' : '+ Upload Foto Baru'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={uploadingGallery}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Grid Thumbnail Foto Galeri */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {galleryImages.map((imgUrl, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden border border-gray-800 bg-gray-950 aspect-square">
                    <img src={imgUrl} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
                    
                    {/* Overlay & Button Hapus */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="p-2 bg-red-600 hover:bg-red-500 text-white rounded-full shadow-lg transition-transform hover:scale-110"
                        title="Hapus Foto Ini"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input URL Gambar Manual */}
              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Atau masukkan URL foto langsung (https://...)"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-gray-950 border border-gray-800 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={handleAddUrlImage}
                  className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold rounded-xl flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah URL</span>
                </button>
              </div>
            </div>
          </div>

          {/* SEKSI 5: TESTIMONI INVESTOR */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gray-900/60 border border-gray-800 backdrop-blur-xl space-y-6 shadow-xl">
            <h3 className="text-lg font-bold text-amber-400 border-b border-gray-800 pb-3 flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>Kelola Testimoni Komunitas (3 Ulasan)</span>
            </h3>

            {/* Testimoni 1 */}
            <div className="p-4 rounded-2xl bg-gray-950/80 border border-gray-800 space-y-3">
              <p className="text-xs font-bold text-yellow-400">Testimoni #1</p>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Nama"
                  value={testi1Name}
                  onChange={(e) => setTesti1Name(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-gray-900 border border-gray-800 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="Role / Jabatan"
                  value={testi1Role}
                  onChange={(e) => setTesti1Role(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-gray-900 border border-gray-800 text-xs text-white"
                />
              </div>
              <textarea
                rows={2}
                placeholder="Isi Ulasan Testimoni..."
                value={testi1Comment}
                onChange={(e) => setTesti1Comment(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-gray-900 border border-gray-800 text-xs text-white"
              />
            </div>

            {/* Testimoni 2 */}
            <div className="p-4 rounded-2xl bg-gray-950/80 border border-gray-800 space-y-3">
              <p className="text-xs font-bold text-emerald-400">Testimoni #2</p>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Nama"
                  value={testi2Name}
                  onChange={(e) => setTesti2Name(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-gray-900 border border-gray-800 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="Role / Jabatan"
                  value={testi2Role}
                  onChange={(e) => setTesti2Role(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-gray-900 border border-gray-800 text-xs text-white"
                />
              </div>
              <textarea
                rows={2}
                placeholder="Isi Ulasan Testimoni..."
                value={testi2Comment}
                onChange={(e) => setTesti2Comment(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-gray-900 border border-gray-800 text-xs text-white"
              />
            </div>

            {/* Testimoni 3 */}
            <div className="p-4 rounded-2xl bg-gray-950/80 border border-gray-800 space-y-3">
              <p className="text-xs font-bold text-blue-400">Testimoni #3</p>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Nama"
                  value={testi3Name}
                  onChange={(e) => setTesti3Name(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-gray-900 border border-gray-800 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="Role / Jabatan"
                  value={testi3Role}
                  onChange={(e) => setTesti3Role(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-gray-900 border border-gray-800 text-xs text-white"
                />
              </div>
              <textarea
                rows={2}
                placeholder="Isi Ulasan Testimoni..."
                value={testi3Comment}
                onChange={(e) => setTesti3Comment(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-gray-900 border border-gray-800 text-xs text-white"
              />
            </div>
          </div>

          {/* SEKSI 6: CTA WEBINAR & FOOTER DISCLAIMER */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gray-900/60 border border-gray-800 backdrop-blur-xl space-y-5 shadow-xl">
            <h3 className="text-lg font-bold text-cyan-400 border-b border-gray-800 pb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>Card CTA Webinar & Disclaimer Footer</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Judul Card CTA Webinar</label>
              <input
                type="text"
                required
                value={ctaCardTitle}
                onChange={(e) => setCtaCardTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-white text-sm focus:outline-none focus:border-yellow-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Deskripsi Card CTA Webinar</label>
              <textarea
                rows={2}
                required
                value={ctaCardSubtitle}
                onChange={(e) => setCtaCardSubtitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-white text-sm focus:outline-none focus:border-yellow-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Catatan Jadwal Webinar (*Kuning)</label>
              <input
                type="text"
                required
                value={ctaCardNote}
                onChange={(e) => setCtaCardNote(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-white text-sm focus:outline-none focus:border-yellow-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-yellow-400" />
                <span>Teks Peringatan Risiko Footer (Risk Warning)</span>
              </label>
              <textarea
                rows={4}
                required
                value={footerDisclaimer}
                onChange={(e) => setFooterDisclaimer(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-white text-sm focus:outline-none focus:border-yellow-500"
              />
            </div>
          </div>

          {/* TOMBOL UTAMA SIMPAN */}
          <button
            type="submit"
            disabled={saving}
            className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-extrabold text-base rounded-2xl transition-all shadow-xl shadow-yellow-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            <span>{saving ? 'Menyimpan Seluruh Perubahan...' : 'SIMPAN SELURUH PERUBAHAN'}</span>
          </button>

        </form>
      </div>
    </main>
  );
}