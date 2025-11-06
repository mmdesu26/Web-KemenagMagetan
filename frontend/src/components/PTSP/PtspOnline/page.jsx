import React, { useState, useRef } from 'react';
import { ChevronDown, Search, LogIn, CheckCircle, Upload, FileText, UserCheck, Printer, Globe, X } from 'lucide-react';

const PTSPOnline = () => {
  const [tokenSearch, setTokenSearch] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedSubService, setSelectedSubService] = useState(null);
  const contentRef = useRef(null);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const services = {
    agama: {
      title: 'Pelayanan Agama',
      icon: '🕌',
      items: [
        {
          name: 'Surat Keterangan Pindah Nikah',
          requirements: ['KTP Asli', 'KK Asli', 'Surat Pengantar RT/RW', 'Pas Foto 4x6 (2 lembar)', 'Surat Keterangan Belum Menikah']
        },
        {
          name: 'Legalisir Buku Nikah',
          requirements: ['Buku Nikah Asli', 'Fotocopy KTP', 'Fotocopy KK']
        },
        {
          name: 'Duplikat Buku Nikah',
          requirements: ['Surat Kehilangan dari Kepolisian', 'KTP Asli', 'KK Asli', 'Pas Foto 4x6 (2 lembar)', 'Surat Keterangan dari Desa']
        }
      ]
    },
    pendidikan: {
      title: 'Pelayanan Pendidikan',
      icon: '📚',
      items: [
        {
          name: 'Legalisir Ijazah',
          requirements: ['Ijazah Asli', 'Fotocopy KTP', 'Surat Pengantar dari Sekolah/Madrasah']
        },
        {
          name: 'Duplikat Ijazah',
          requirements: ['Surat Kehilangan dari Kepolisian', 'KTP Asli', 'Pas Foto 3x4 (3 lembar)', 'Surat Keterangan dari Sekolah Asal']
        },
        {
          name: 'Pindah Sekolah/Madrasah',
          requirements: ['Surat Permohonan Orang Tua', 'KK Asli', 'Ijazah Terakhir', 'Rapor Asli']
        }
      ]
    },
    umum: {
      title: 'Pelayanan Umum',
      icon: '📋',
      items: [
        {
          name: 'Surat Keterangan',
          requirements: ['KTP Asli', 'Surat Pengantar RT/RW', 'Pas Foto 3x4 (2 lembar)']
        },
        {
          name: 'Rekomendasi Organisasi',
          requirements: ['Proposal Kegiatan', 'AD/ART Organisasi', 'Fotocopy KTP Pengurus', 'Surat Pengantar']
        },
        {
          name: 'Izin Kegiatan Keagamaan',
          requirements: ['Surat Permohonan', 'Proposal Kegiatan', 'Fotocopy KTP Penanggung Jawab', 'Surat Rekomendasi dari Desa']
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-white pt-20">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-yellow-500/10 to-transparent"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto"> 
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-slide-up">
            <span className="text-green-700">Selamat Datang di</span>
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold mb-3 text-green-600 animate-slide-up animation-delay-200">
            Pelayanan Terpadu Satu Pintu (PTSP)
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 mb-12 animate-slide-up animation-delay-400">
            Kantor Kementerian Agama Kabupaten Magetan
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-600">
            <button
              onClick={scrollToContent}
              className="group bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-green-600 w-8 h-8" />
        </div>
      </div>

      {/* Content Section */}
      <div ref={contentRef} className="max-w-7xl mx-auto px-4 py-16">
        {/* Search and Login Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-16 transform hover:scale-[1.02] transition-transform duration-300">
          <h3 className="text-2xl font-bold text-green-700 mb-6 text-center">Cek Status Pengajuan Layanan</h3>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                value={tokenSearch}
                onChange={(e) => setTokenSearch(e.target.value)}
                placeholder="Masukkan kode token pengajuan layanan"
                className="w-full px-6 py-4 border-2 border-green-300 rounded-full focus:outline-none focus:border-green-500 transition-colors"
              />
              <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 text-green-600" />
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              Cari
            </button>
          </div>

          <div className="text-center">
            <a
              href="https://ptsp.kemenagmagetan.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <LogIn className="w-5 h-5" />
              Login PTSP Online
            </a>
          </div>
        </div>

        {/* Flow Chart Section */}
        <div className="bg-gradient-to-br from-green-100 to-yellow-100 rounded-3xl shadow-2xl p-8 mb-16">
          <h3 className="text-3xl font-bold text-green-700 mb-8 text-center">Alur Pengajuan Layanan</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <FileText />, title: 'Pemohon Baru', desc: 'Registrasi akun baru' },
              { icon: <LogIn />, title: 'Pemohon Lama', desc: 'Login dengan akun' },
              { icon: <Search />, title: 'Pilih Layanan', desc: 'Pilih jenis layanan' },
              { icon: <Upload />, title: 'Upload Berkas', desc: 'Upload dokumen' },
              { icon: <FileText />, title: 'Upload Ulang', desc: 'Jika ada revisi' },
              { icon: <UserCheck />, title: 'Verifikasi Petugas', desc: 'Proses verifikasi' },
              { icon: <CheckCircle />, title: 'Diterima', desc: 'Berkas diterima' },
              { icon: <Printer />, title: 'Cetak Tanda Terima', desc: 'Cetak bukti' }
            ].map((step, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
                <div className="text-green-600 mb-3">{step.icon}</div>
                <h4 className="font-bold text-gray-800 mb-2">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg">
              <Globe className="text-green-600" />
              <span className="font-semibold text-gray-700">QRCODE → TOKEN → Cek Proses Online</span>
            </div>
          </div>
        </div>

        {/* JEMPOL Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl shadow-2xl p-12 mb-16 text-white text-center">
          <h2 className="text-5xl font-bold mb-4">JEMPOL</h2>
          <p className="text-2xl font-light">Jaringan Pelayanan Online Kabupaten Magetan</p>
        </div>

        {/* Services Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-green-700 mb-8 text-center">Layanan Kami</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {Object.entries(services).map(([key, service]) => (
              <div
                key={key}
                onClick={() => {
                  setSelectedService(key);
                  setSelectedSubService(null);
                }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer border-4 border-transparent hover:border-green-500"
              >
                <div className="text-6xl mb-4 text-center">{service.icon}</div>
                <h4 className="text-xl font-bold text-green-700 text-center">{service.title}</h4>
              </div>
            ))}
          </div>

          {/* Sub Services */}
          {selectedService && (
            <div className="bg-white rounded-3xl shadow-2xl p-8 animate-slide-up">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-2xl font-bold text-green-700">{services[selectedService].title}</h4>
                <button onClick={() => setSelectedService(null)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {services[selectedService].items.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedSubService(index)}
                    className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-xl p-6 shadow hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-green-500"
                  >
                    <h5 className="font-semibold text-gray-800">{item.name}</h5>
                  </div>
                ))}
              </div>

              {/* Requirements */}
              {selectedSubService !== null && (
                <div className="bg-gradient-to-br from-yellow-50 to-green-50 rounded-2xl p-6 animate-slide-up">
                  <h5 className="text-xl font-bold text-green-700 mb-4">
                    Persyaratan: {services[selectedService].items[selectedSubService].name}
                  </h5>
                  <ul className="space-y-2">
                    {services[selectedService].items[selectedSubService].requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-fade-in { animation: fade-in 1s ease-out; }
        .animate-slide-up { animation: slide-up 0.8s ease-out; }
        .animation-delay-200 { animation-delay: 0.2s; animation-fill-mode: both; }
        .animation-delay-400 { animation-delay: 0.4s; animation-fill-mode: both; }
        .animation-delay-600 { animation-delay: 0.6s; animation-fill-mode: both; }
      `}</style>
    </div>
  );
};

export default PTSPOnline;