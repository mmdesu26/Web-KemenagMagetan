import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronDown,
  FaSearch,
  FaQuestionCircle,
  FaFileAlt,
  FaUsers,
  FaGraduationCap,
} from "react-icons/fa";

const categories = [
  { key: "all", label: "Semua", color: "bg-green-700", icon: FaQuestionCircle },
  { key: "bimas", label: "Bimas Islam", color: "bg-green-600", icon: FaUsers },
  { key: "haji", label: "Haji & Umrah", color: "bg-amber-500", icon: FaGraduationCap },
  { key: "nikah", label: "Nikah", color: "bg-green-500", icon: FaFileAlt },
  { key: "pendidikan", label: "Pendidikan", color: "bg-amber-600", icon: FaGraduationCap },
];

const faqData = [
  {
    category: "bimas",
    question: "Bagaimana cara mengajukan permohonan Pembaca Doa?",
    answer:
      "Datang ke PTSP Kementerian Agama Kab. Magetan dengan membawa:\n\n1. Surat Permohonan ditujukan kepada Kepala Kantor Kementerian Agama Kab. Magetan",
  },
  {
    category: "bimas",
    question: "Bagaimana Permohonan Rohaniwan?",
    answer:
      "Datang ke PTSP Kementerian Agama Kab. Magetan dengan membawa:\n\n1. Surat Permohonan ditujukan kepada Kepala Kantor Kementerian Agama Kab. Magetan",
  },
  {
    category: "bimas",
    question: "Bagaimana cara mengajukan permohonan Pengukuran Arah Kiblat?",
    answer:
      "Datang ke PTSP Kementerian Agama Kab. Magetan dengan membawa:\n\n1. Surat Permohonan Pengukuran Arah Kiblat\n2. Surat pernyataan Persetujuan dan Belum Pernah Mendapatkan Pengukuran Arah kiblat dari pihak lain\n3. Denah Lokasi masjid atau makam yang akan diukur Arah Kiblatnya",
  },
  {
    category: "bimas",
    question: "Bagaimana cara mengajukan permohonan data tempat ibadah?",
    answer:
      "Datang ke PTSP Kementerian Agama Kab. Magetan dengan membawa:\n\n1. Surat Permohonan ditujukan kepada Kepala Kantor Kementerian Agama Kab. Magetan",
  },
  {
    category: "bimas",
    question: "Bagaimana cara mengajukan permohonan Rekomendasi Izin Pendirian Tempat Ibadah?",
    answer:
      "Datang ke PTSP (Pelayanan Terpadu Satu Pintu) Kementerian Agama Kab. Magetan, dengan membawa:\n\n1. Fotokopi KTP Pemohon\n2. Surat Kuasa dan FC KTP penerima kuasa, apabila pengurusan diwakilkan\n3. Fotokopi Sertifikat Tanah\n4. Surat pernyataan kerelaan tanah, apabila rumah ibadah berdiri di atas tanah milik orang lain\n5. Surat pernyataan sanggup membuat peresapan air hujan\n6. Gambar teknis (tampak bangunan, potongan, pondasi, atap, sanitasi) atau foto bangunan (tampak depan, samping kanan, samping kiri, belakang)\n7. Surat pernyataan sanggup mengurus perubahan peruntukan tanah, apabila rumah ibadah berdiri diatas tanah yang berstatus tanah sawah atau tegalan",
  },
  {
    category: "haji",
    question: "Bagaimana cara mengajukan permohonan Rekomendasi Pembatalan Pemberangkatan Ibadah Haji?",
    answer:
      "Datang ke PTSP Kementerian Agama Kab. Magetan dengan membawa:\n\n1. Surat Permohonan Pembatalan Haji ditujukan kepada kepala kankemenag Kab. Magetan cq Seksi PHU\n2. Surat Kematian yang dikeluarkan oleh lurah/kepala desa/rumah sakit setempat\n3. Surat keterangan waris bermaterai Rp 6000 yang dikeluarkan oleh Lurah/Kepala desa dan diketahui oleh camat\n4. Surat Keterangan Kuasa Waris yang ditunjuk ahli waris untuk melakukan pembatalan pendaftaran jamaah haji bermaterai Rp.6000\n5. Fotokopi KTP Ahli Waris/Kuasa Waris jamaah haji yang mengajukan pembatalan pendaftaran jemaah haji dan memperlihat aslinya\n6. Surat Pernyataan Tanggung Jawab Mutlak dari ahli waris/kuasa waris jemaah haji, bermaterai Rp.6000\n7. Bukti asli setoran awal Biaya Perjalanan Ibadah Haji (BPIH) yang dikeluarkan Bank Penerima Setoran Biaya Perjalanan Ibadah Haji (BPS BPIH)\n8. Asli Aplikasi transfer setoran awal Biaya Perjalanan ibadah Haji (BPIH) ke rekening Menteri Agama\n9. SPPH (Surat Pendaftaran Pergi Haji)\n10. Fotokopi buku tabungan yang masih aktif atas nama jemaah haji yang bersangkutan dan memperlihatkan aslinya\n11. Fotokopi buku tabungan ahli waris/pemohon di bank yang sama dan memperlihatkan aslinya\n12. Semua persyaratan difotokopi rangkap 2 dan dikumpul beserta yang asli",
  },
  {
    category: "haji",
    question: "Bagaimana cara mengajukan permohonan rekomendasi perpanjangan izin operasional PPIU?",
    answer:
      "Datang ke PTSP Kementerian Agama Kab. Magetan dengan membawa:\n\n1. Surat Permohonan Rekomendasi ditujukan kepada Kepala Kantor Kementerian Agama Kab. Magetan yang ditandatangani oleh direktur utama dan stempel perusahaan dengan dilampiri persyaratan\n2. Fotokopi Akta Notaris Pendirian perseroan terbatas (Bagi akta pendirian yang lebih dari 5 Tahun belum ada perubahan harus ada perubahan dan pemilik akta PT adalah WNI beragama Islam agar dilampirkan KTP\n3. Fotokopi Surat Pengesahan Akta Notaris dari Kementerian Hukum dan HAM\n4. Fotokopi Izin Usaha biro perjalanan wisata dari Dinas Pariwisata setempat sudah beroperasi paling singkat 2 Tahun dibuktikan dengan Tanda Daftar Usaha Pariwisata (TUDP)\n5. Fotokopi Surat Keterangan Domisili usaha (SKDU) dari Pemda setempat (desa/kelurahan/kecamatan) yang masih berlaku\n6. Fotokopi Surat keterangan terdaftar sebagai wajib pajak dari Direktorat Jenderal Pajak\n7. Surat Rekomendasi dari Kantor Kementerian Agama Kab. Magetan\n8. Fotokopi Surat Rekomendasi dari Instansi Pemda Provinsi dan atau/ kabupaten/kota setempat yang membidangi pariwisata yang masih berlaku\n9. Fotokopi Laporan keuangan perusahaan 1 tahun terakhir dan telah diaudit akuntan publik yang terdaftar di kementerian keuangan dengan WDP\n10. Susunan dan struktur pengurus perusahaan ditandatangani oleh direktur uatama dan stempel perusahaan (asli)\n11. Fotokopi Kartu Tanda Penduduk (KTP dan Biodata pemegang saham dan anggota direksi dan komisaris (semua WNI beragama islam)\n12. Fotokopi NPWP atas nama perusahaan dan pimpinan perusahaan\n13. Memiliki sumber daya manusia berpengalaman di bidang Biro Perjalanan Wisata/BPW (minimal 3 orang)\n14. Memiliki kantor domisili tetap dan atau sewa minimal 3 tahun dan dilengkapi sarana prasarana yang mendukung manajemen operasional (ruang minimal 60 m2)\n15. Memiliki Mitra biro penyelenggaraan ibadah umrah di arab saudi yang mempunyai izin resmi dari pemerintah kerajaan arab saudi\n16. Fotokopi sertifikat keangggotaan ASITA\n17. Foto Foto kondisi muka kantor dan ruang pelayanan serta kegiatan bimbingan umrah\n18. Laporan Pelaksanaan Penyelenggaraan Ibadah Umrah 2 Tahun terakhir yang dibuktikan dengan daftar jemaah yang telah mengikutinya (terdaftar di Penyelenggara Perjalanan Ibadah Umrah/PPIUnya)\n19. Bukti telah memberangkatan jemaah umrah minimal 200 orang selama 3 tahun\n20. Hasil Akreditasi Penyelenggara Perjalanan Ibadah Umroh (PPIU) minimal B\n21. Surat Keputusan Penetapan sebagai Penyelenggara Perjalanan Ibadah Umrah (PPIU)/izin operasional Penyelenggara Perjalanan Ibadah Umroh (PPIU) yang masih berlaku",
  },
  {
    category: "haji",
    question: "Bagaimana cara mengajukan permohonan rekomendasi Izin Pendirian Operasional Penyelenggara Perjalanan Ibadah Umrah (PPIU)?",
    answer:
      "Datang ke PTSP Kementerian Agama Kab. Magetan dengan membawa:\n\n1. Surat Permohonan Rekomendasi ditujukan kepada Kepala Kantor Kementerian Agama Kab. Magetan yang ditandatangani oleh direktur utama dan stempel\n2. Fotokopi Akta Notaris Pendirian perseroan terbatas (Bagi akta pendirian yang lebih dari 5 Tahun belum ada perubahan harus ada perubahan dan pemilik akta PT adalah WNI beragama Islam agar dilampirkan KTP\n3. Fotokopi Surat Pengesahan akta Notaris dari Kementerian Hukum dan HAM\n4. Fotokopi Izin Usaha biro perjalanan wisata dari Dinas Pariwisata setempat sudah beroperasi paling singkat 2 Tahun dibuktikan dengan Tanda Daftar Usaha Pariwisata (TUDP)\n5. Fotokopi Surat Keterangan Domisili Usaha (SKDU) dari Pemda setempat (desa/kelurahan/kecamatan) yang masih berlaku\n6. Fotokopi Surat keterngan terdaftar sebagai wajib pajak dari Direktorat Jenderal Pajak\n7. Surat Rekomendasi dari Kantor Kementerian Agama Kab. Magetan\n8. Fotokopi Surat Rekomendasi dari Instansi Pemda Provinsi dan atau/ kabupaten/kota setempat yang membidangi pariwisata yang masih berlaku\n9. Fotokopi Laporan keuangan perusahaan 1 tahun terakhir dan telah diaudit akuntan publik yang terdaftar di kementerian keuangan dengan WDP\n10. Susunan dan struktur pengurus perusahaan ditandatangani oleh direktur utama dan stempel perusahaan (asli)\n11. Fotokopi Kartu Tanda Penduduk (KTP dan Biodata pemegang saham dan anggota direksi dan komisaris (semua WNI beragama islam)\n12. Fotokopi NPWP atas nama perusahaan dan pimpinan perusahaan\n13. Memiliki sumber daya manusia berpengalaman di bidang BPW (minimal 3 orang)\n14. Memiliki kantor domisili tetap dan atau sewa minimal 3 tahun dan dilengkapi sarana prasarana yang mendukung manajemen operasional (ruang minimal 60 m2)\n15. Memiliki Mitra biro penyelenggaraan ibadah umrah di arab saudi yang mempunyai izin resmi dari pemerintah kerajaan arab saudi\n16. Fotokopi sertifikat keanggotaan ASITA\n17. Foto Foto kondisi muka kantor dan ruang pelayanan serta kegiatan bimbingan umrah",
  },
  {
    category: "nikah",
    question: "Bagaimana cara mengajukan permohonan data pernikahan?",
    answer:
      "Datang ke PTSP Kementerian Agama Kab. Magetan dengan membawa:\n\n1. Surat Permohonan ditujukan kepada Kepala Kantor Kementerian Agama Kab. Magetan",
  },
  {
    category: "nikah",
    question: "Bagaimana cara mengajukan Surat Permohonan Wali Hakim?",
    answer:
      "Datang ke PTSP Kementerian Agama Kab. Magetan dengan membawa:\n\n1. Surat Permohonan Wali Hakim ditujukan kepada Kepala Kantor Kementerian Agama Kab. Magetan",
  },
  {
    category: "pendidikan",
    question: "Bagaimana cara mengajukan permohonan izin pendirian TPA/TQA?",
    answer:
     "Datang ke PTSP Kementerian Agama Kab. Magetan dengan membawa:\n\n1. Mengajukan Proposal Pendirian TPA/TQA sebagai berikut : Surat Permohonan yang diketahui oleh RT/Kepala dusun, Kepala Desa, Kepala KUA, Camat Setempat\n2. Visi dan Misi\n3. Susunan Pengurus\n4. Kurikulum Pelajaran\n5. Jadwal Pelajaran\n6. Daftar guru pengajar\n7. Daftar Santri\n8. Sarana prasarana yang dimiliki\n9. Foto gedung dan kegiatan (Jika memungkinkan)\n10. Memiliki Guru Minimal 2 Orang\n11. Santri minimal 10 anak aktif\n12. Tempat atau ruang belajar yang memadai\n13. Ada mata pelajaran Alquran dan Hadist, Kisah Islami (Para nabi dan sahabat), Hafalan surat, Hafalan Doa‐doa,Hafalan Ayat‐Ayat, Menulis Arab, Aqidah, Akhlaq, Praktek Ibadah\n14. Pembelajaran sebanyak 10 dalam setiap minggu"
  },
  {
    category: "pendidikan",
    question: "Bagaimana cara mengajukan Izin Pendirian Pondok Pesantren?",
    answer: 
      "Datang ke PTSP Kementerian Agama Kab. Magetan dengan membawa:\n\n1. Memiliki Kelengkapan 5 unsur yakni memiliki : Kyai, Tuan Guru, Gurutta/anre gurutta, inyiak, syekh, ustad atau sebutan lain sesuai kekhasan wilayah masing-masing sebagai figur teladan/atau sekaligus pengasuh yang dipersyaratan wajib berpendidikan pondok pesantren\n2. Santri yang mukim di pesantren minimal 15 orang\n3. Pondok atau asrama\n4. Masjid, musholla\n5. Kajian kitab kuning yang berkelanjutan (kurikulum pondok)\n6. Mengembangkan Jiwa atau Karasteristik pesantren terutama aspek jiwa NKRI dan nasionalisme, menjujung tinggi niliai‐nilai keindonesiaan, kebangsaan, kenegaraan dan persatuan yang didasarkan atas NKRI, Pancasila, UUD 1945\n7. Memiliki Legalitas hukum yang sah baik berupa yayasan atau lainnya yang dibuktikan dengan akta notaris dan NPWP yang masih berlaku\n8. Memiliki bukti kepemilikan tanah milik atau wakaf yang sah atas nama yayasan atau lembaga yang mengusulkan izin operasional\n9. Memiliki susunan pengurus yayasan/lembaga yang cukup\n10. Memiliki surat keterangan domisili dari kantor kelurahan/desa setempat\n11. Mendapat surat rekomendasi izin operasional dari kantor urusan agama (KUA) setempat\n12. Mengisi formulir yang telah disediakan\n13. Mengajukan surat permohonan izin operasional kepada kepala Kemenag Kab. Magetan\n14. Surat Permohonan (Proposal) dibuat rangkap 2 (dua) ditujukan Kepada Kepala Kantor Kementerian Agama Kan.Kemenag Kab. Magetan dan Kepada Ketua FKPP (Forum Komunikasi Pondok Pesantren)",
  },
  {
      category: "pendidikan",
      question: "Bagaimana cara mengajukan permohonan izin pendirian madrasah diniyah?",
      answer: 
        "Datang ke PTSP Kementerian Agama Kab. Magetan dengan membawa:\n\n1. Proposal, yang memuat :\n a. Surat Permohonan yang diketahui oleh RT/Kepala dusun, Kepala Desa, Kepala KUA, Camat setempat\n b. Visi dan Misi\n c. Susunan Pengurus\n d. Kurikulum Pelajaran\n e. Jadwal Pelajaran\n f. Data guru pengajar\n g. Daftar Santri\n h. Sarana Prasarana yang dimiliki\n i. Foto Gedung dan Kegiatan (Jika Memungkinkan)\n2. Memiliki Guru minimal 2 orang\n3. Memiliki Santri minimal 10 anak aktif\n4. Memiliki Tempat atau ruang belajar yang memadai\n5. Ada Mata Pelajaran : Al quran dan Hadist, Sejarah Kebudayaan Islam, Ibadah, Figh, Bahasa Arab, Aqidah, akhlaq Praktek ibadah\n6. Pembelajaran sebanyak 18 jam dalam setiap minggu\n7. Surat Permohonan yang ditujukan kepada Kepala Kantor Kementerian Agama Kab. Magetan."
  },
  {
      category: "pendidikan",
      question: "Bagaimana cara mengajukan rekomendasi santri pondok pesantren belajar/mondok Keluar Negeri (Paspor Pendidikan)?",
      answer: 
        "Datang ke PTSP Kementerian Agama Kab. Magetan dengan membawa:\n\n1. Surat Permohonan dari Pondok pesantren yang bersangkutan\n2. Fotokopi KTP Santri\n3. Fotokopi Ijazah PPS",
  },
  {
      category: "pendidikan",
      question: "Bagaimana cara mengajukan permohonan rekomendasi santri luar negeri?",
      answer: 
        "Datang ke PTSP Kementerian Agama Kab. Magetan dengan membawa:\n\n1. Fotokopi paspor\n2. Fotokopi KTP\n3. Surat Permohonan dari Pondok Pesantren Penerima\n4. Surat Pernyataan Penjamin Santri Luar Negeri Bermaterai Rp 10000",
  },
  {
      category: "pendidikan",
      question: "Bagaimana cara mengajukan permohonan rekomendasi pindah sekolah santri Wajardiknas?",
      answer: 
        "Datang ke PTSP Kementerian Agama Kab. Magetan dengan membawa:\n\n1. Surat Permohonan dari Pondok Pesantren\n2. Fotokopi Rapor PPS Terakhir",
  },
  {
      category: "pendidikan",
      question: "Bagaimana cara mengajukan permohonan rekomendasi pindah madrasah?",
      answer: 
        "Datang ke PTSP Kementerian Agama Kab. Magetan dengan membawa:\n\n1. Surat Permohonan Rekomendasi dari Madrasah Asal (difotokopi 1 Lembar)\n2. Surat Penerimaan/ Kuota dari sekolah yang akan dituju ( difotokopi 1 Lembar)\n3. Raport Terakhir (difotokopi 1 Lembar )\n4. Hasil Rekomendasi dibuat Rangkap 2 (1 lembar untuk ybs dan 1 lembar untuk arsip)",
  },
  {
      category: "pendidikan",
      question: "Bagaimana cara mengajukan permohonan rekomendasi izin operasional RA/Madrasah?",
      answer: 
        "Datang ke PTSP Kementerian Agama Kab. Magetan dengan membawa:\n\n1. Proposal Izin Operasional Pendirian Madrasah Baru\n2. Daftar Isi\n3. Surat Pengantar Proposal Izin Operasional Pendirian Madrasah (Format PM ‐02)\n4. Formulir Izin Operasional Pendirian Madrasah (Format PM 02)\n5. Surat Pernyataan Kesanggupan Pembiayaan Penyelenggaraan Pendidikan Madrasah (Format PM‐03)\n6. Proposal Izin Operasional Pendirian Madrasah Baru: Data Umum, Organisasi Pengelola Madrasah, Pendidik dan tenaga pendidik, Sarana dan Prasaran, Penutup\n7. Fotokopi sah Akte Notaris Yayasan Berbadan Hukum\n8. Fotokopi Sah Pengesahan yayasan dari Kemenkumham\n9. Bagan dan struktur Yayasan\n10. Fotokopi sah AD/RT Yayasan\n11. SK Susunan Pengurus Yayasan\n12. Fotokopi Sah KTP pengurus Yayasan\n13. SK Pendirian Madrasah yang dibuat dari yayasan\n14. Piagam Pendirian Madrasah yang dibuat dari yayasan\n15. SK Pengurus/Pengelola Madarsah yang dibuat dari Yayasan\n16. Fotokopi Struktur Manajemen, Personalia Madrasah dan Daftar Riwayat Hidup\n17. SK Pengangkatan Guru dan Tenaga Kependidikan Madrasah dari Yayasan\n18. Surat Rekomendasi dari Kepala Kantor Kemenag Kabupaten\n19. Surat Persetujuan dari Pemerintah Setempat (RT/RW dan Camat)\n20. Surat Pernyataan Kesanggupan Pembiayaan Madrasah (Persyaratan Administrasi)\n21. Dokumen Kurikulum (Buku Rujukan Kurikulum Madrasah dari Kemenag, SKL, SI, SP, SPP, Kerangka Dasar Kurikulum, Silabus, RPP, KTSP)\n22. Rencana Pengembangan Madrasah\n23. Jumlah dan Prosentase kualifikasi PTK\n24. Dokumen Sarana dan Prasarana Madrasah\n25. Pernyataan Kelayakan/Study Kelayakan (Format PM‐04)\n22. AD/RT Calon Madrasah\n23. Tata tertib guru dan siswa\n24. Daftar Buku Koleksi Perpustakaan Madrasah\n25. Daftar koleksi Media Pembelajaran\n26. Daftar koleksi Peralatan Penunjang Administrasi Madrasah\n27. Foto Dokumentasi Kegiatan Madrasah\n28. Data Sarana dan Prasarana yang dimiliki",
  },
  {
      category: "pendidikan",
      question: "Bagaimana cara mengajukan permohonan rekomendasi izin/tugas belajar?",
      answer: 
        "Datang ke PTSP (Pelayanan Terpadu Satu Pintu) Kementerian Agama Kab. Magetan, dengan membawa:\n\n1. Fotokopi SK CPNS yang Legalisir\n2. Fotokopi Sah SK PNS yang Legalisir\n3. Fotokopi SK Kenaikan Pangkat Terakhir yang dilegalisir\n4. Fotokopi KARPEG/KPE yang dilegalisir\n5. Fotokopi Ijazah terakhir yang dilegalisir\n6. Fotokopi Kartu Mahasiswa\n7. SKP lengkap asli 2 Tahun terakhir (Rangkap 2)\n8. Surat Pernyataan tidak akan mutasi bermaterai Rp. 10.000 ( Rangkap 2)\n9. Surat Pernyataan tidak mengganggu kegiatan di tempat kerja bermaterai Rp. 10.000 (Rangkap 2)\n10. Surat Pernyataan tidak akan menuntut penyesuaian ijazah bermaterai Rp. 10.000 (Rangkap 2)\n11. Surat Rekomendasi dari atasan langsung\n12. Surat keterangan dari Perguruan Tinggi/ Kampus\n13. Surat Keterangan Akreditasi Perguruan Tinggi (A atau B)\n14. Jadwal Kuliah terbaru\n15. Surat Keterangan radius PT (jarak ke kampus dengan tempat kerja yang membuat Perguruan Tinggi)\n16. Surat Keterangan Hukuman Disiplin (dibuatkan oleh Kantor)",
  }
];

export default function FAQSejarahKemenag() {
  const [activeCat, setActiveCat] = useState("all");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaq = faqData.filter((item) => {
    const byCategory = activeCat === "all" || item.category === activeCat;
    const bySearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return byCategory && bySearch;
  });

  // small animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500/10 via-white to-green-500/20 pt-20">
      {/* Header (Sejarah-style colors) */}
      <header className="relative bg-gradient-to-br from-green-700 to-green-800 text-white py-20">
        <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-block mb-4 p-4 rounded-full bg-white/10">
              <FaQuestionCircle className="text-5xl mx-auto" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Frequently Asked Questions</h1>
            <h2>Kementerian Agama Kabupaten Magetan</h2>
          </motion.div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Search */}
        <motion.div initial="hidden" animate="show" variants={containerVariants} className="mb-8">
          <div className="relative max-w-md mx-auto">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-600" />
            <input
              type="search"
              placeholder="Cari pertanyaan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-green-100 rounded-full shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-200 outline-none"
            />
          </div>
        </motion.div>

        {/* Categories (toggle on click: click again returns to 'all') */}
        <motion.div initial="hidden" animate="show" variants={containerVariants} className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCat === cat.key;
            return (
              <motion.button
                key={cat.key}
                onClick={() => setActiveCat(isActive ? "all" : cat.key)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-white transition-all duration-200 shadow-sm
                  ${isActive ? "scale-105 ring-4 ring-green-200" : "opacity-90 hover:opacity-100 hover:-translate-y-1"}`}
              >
                <span className={`inline-flex items-center justify-center w-9 h-9 rounded-full ${cat.color} shadow-inner`}>
                  <Icon className="w-4 h-4 text-white" />
                </span>
                <span className="text-sm font-medium text-green-900">{cat.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredFaq.length > 0 ? (
              filteredFaq.map((item, idx) => {
                const isOpen = expandedIndex === idx;
                const cat = categories.find((c) => c.key === item.category) || categories[0];

                return (
                  <motion.div
                    key={`${item.question}-${idx}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, delay: idx * 0.03 }}
                    className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedIndex(isOpen ? null : idx)}
                      className="w-full text-left p-6 flex items-start gap-4 hover:bg-green-50 transition-colors"
                    >
                      <span className={`text-xs text-white px-3 py-1 rounded-full font-medium ${cat.color} flex-shrink-0 mt-1`}>
                        {cat.label}
                      </span>
                      <div className="flex-1">
                        <p className="text-gray-800 font-semibold text-lg leading-tight">{item.question}</p>
                        {/* subtitle area left intentionally for clarity */}
                      </div>

                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.28 }}
                        className="flex-shrink-0 ml-4 text-green-700"
                      >
                        <FaChevronDown />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.36, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-6 pt-2">
                            <div className="bg-gradient-to-r from-emerald-50 to-amber-50 rounded-xl p-5 border-l-4 border-emerald-700">
                              <div className="text-gray-700 leading-relaxed text-base space-y-2">
                                {item.answer.split("\n").map((line, index) => {
                                  if (/^\d+\.\s/.test(line)) {
                                    return (
                                      <div key={index} className="flex">
                                        <span className="font-semibold mr-2">{line.match(/^\d+\./)[0]}</span>
                                        <span className="flex-1">{line.replace(/^\d+\.\s/, "")}</span>
                                      </div>
                                    );
                                  }
                                  return <p key={index}>{line}</p>;
                                })}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <FaQuestionCircle className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Tidak ada pertanyaan yang ditemukan</h3>
                <p className="text-gray-500">Coba ubah kata kunci pencarian atau pilih kategori lain.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
