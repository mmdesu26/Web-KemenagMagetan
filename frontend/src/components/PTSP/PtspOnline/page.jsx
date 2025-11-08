"use client";

import React, { useState, useRef } from "react";
import {
  ChevronDown,
  Search,
  LogIn,
  CheckCircle,
  Upload,
  FileText,
  UserCheck,
  Printer,
  X,
  UserPlus,
  RefreshCw,
  QrCode,
  BookOpen,
  Layers,
  ClipboardList,
} from "lucide-react";

const PTSPOnline = () => {
  const [tokenSearch, setTokenSearch] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedSubService, setSelectedSubService] = useState(null);
  const contentRef = useRef(null);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearch = () => {
    if (!tokenSearch.trim()) {
      setShowNotification(true);
    } else {
      alert(`Mencari data untuk token: ${tokenSearch}`);
    }
  };

  const services = {
    agama: {
      title: "Pelayanan Agama",
      icon: <BookOpen className="w-12 h-12 text-green-700 mx-auto mb-3" />,
      items: [
        { name: "Permohonan Rohaniawan Pembaca Doa", requirements: ["Scan Surat Permohonan"] },
        { name: "Surat Keterangan Majelis Ta'lim Terdaftar", requirements: ["Surat Permohonan di sahkan KUA", "Scan Sejarah Singkat Majelis Ta'lim", "Scan Susunan Pengurus & KTP (ttdKades/Ketua yayasan/yang berwenang selain pengurus)", "Scan Surat Keterangan Domisili dari Desa/Kelurahan", "Svan Berita Acara Verivikasi dan Validasi KUA", "Scan KTP Jama'ah Minimal 15 Orang", "Scan Form Data Majelis Ta'lim", "Foto Kegiatan Majelis Ta'lim", "Surat Pernyataan Keaslian Dokumen (Download File Format)"] },
        { name: "Surat Keterangan Terdaftar Masjid/Mushola", requirements: ["Surat Permohonan di sahkan KUA", "Scan Berita Acara Verifikasi dan Validasi KUA Setempat", "Scan Instrumen Data Bases Masjis/Mushola", "Scan Profil dan Sejarah Masjid", "Scan Susunan Takmir/Pengurus Masjid/Mushola", "Scan Sertifikat/Akta Ikrar Wakaf/Surat Keterangan dari Instansi yang Berwenang", "Scan Surat Domisili dari Desa/Kelurahan", "Foto Masjid/Mushola Tampak dari Depan", "Foto Masjid/Mushola Tampak dari Samping", "Foto Masjid/Mushola Tampak dari Dalam", "Surat Pernyataan Keaslian Dokumen (Download File Format)"] },
        { name: "Surat Rekomendasi Bantuan Dana Masjid/Mushola", requirements: ["Scan Surat Permohonan di sahkan KUA", "Scan Berita Acara Verifikasi dan Validasi KUA Setempat", "Scan Surat Keterangan Terdaftar di simas.kemenag.go.id", "Scan Propisal Bantuan", "Foto Tampak Depan Masjid", "Foto Tampak Samping Masjid", "Foto Tampak Dalam Masjid", "Surat Pernyataan Keaslian Dokumen (Download File Format)"] },
        { name: "Surat Rekomendasi Penerbitan Paspor Jamaah Haji", requirements: ["Scan Surat Permohonan Pembuatan Surat Rekomendasi Penerbitan Paspor Haji", "Scan KTP", "Scan KK", "Scan Akta Lahir, Akta/Buku Nikah", "Scan Paspor Lama Bagi yang Memiliki", "Scan BPIH/BIPIH", "Scan SPPH", "Surat Pernyataan Keaslian Dokumen"] },
        { name: "Surat Rekomendasi Penerbitan Paspor Jamaah Haji Penggabungan Suami/Istri", requirements: ["Scan Surat Permohonan Pembuatan Surat Rekomendasi Penerbitan Paspor Haji", "Scan KTP", "Scan KK", "Scan Akta/Buku Nikah", "Scan Paspor Lama Bagi yang Memiliki", "Scan BPIH/BIPIH Jamaah Haji yang Bergabung dan Digabung", "Scan SPPH Jamaah haji yang Bergabung dan Digabung", "Surat Pernyataan Keaslian Dokumen"] },
        { name: "Surat Rekomendasi Penerbitan Paspor Jamaah Haji Penggabungan Anak/Orang Tua", requirements: ["Scan Surat Permohonan Pembuatan Surat Rekomendasi Penerbitan Paspor Haji", "Scan KTP", "Scan KK", "Scan Akta Lahir", "Scan Paspor Lama Bagi yang Memiliki", "Scan BPIH/BIPIH Jamaah Haji yang Bergabung dan Digabung", "Scan SPPH Jamaah Haji yang Bergabung dan Digabung", "Surat Pernyataan Keaslian Dokumen"] },
        { name: "Surat Rekomendasi Penerbitan Paspor Jamaah Haji Lansia", requirements: ["Scan Surat Permohonan Pembuatan Surat Rekomendasi Penerbitan Paspor Haji", "Scan KTP", "Scan Akta Kelahiran, Akta/Buku Nikah, Ijazah", "Scan Paspor Lama Bagi yang Memiliki", "Scan BPIH/BIPIH Jamaah Haji Pendamping dan Lansia", "Scan SPPH Jamaah Haji Pendamping dan Lansia", "Surat Pernyataan Keaslian Dokumen"] },
        { name: "Surat Rekomendasi Penerbitan Paspor Jamaah Haji Khusus", requirements: ["Scan Pengantar/Permohonan dari Biro/Penyelenggara Ibadah Haji Khusus", "Scan SK Menteri Agama tentang Penetapan Izin Operasional PIHK yang masih berlaku (Apabila Izin Operasional PIHK telah habis masa berlakunya dan sedang dalam proses perpanjangan, maka wajib melampirkan Scan Surat Pengantar Akreditasi)", "Scan KTP", "Scan KK", "Scan Akta kelahiran, Akta/Buku Nikah, Ijazah* (pilih salah satu yang data nama dan tanggal lahirnya sesuai dengan KTP/KK)", "Scan Paspor Lama Bagi yang Memiliki", "Surat Pernyataan Keaslian Dokumen"] },
        { name: "Surat Rekomendasi Penerbitan Paspor Ibadah Umroh", requirements: ["Scan Surat Pengantar/Permohonan dari Biro/Penyelenggara Perjalanan Ibadah Umrah (PPIU)", "Scan SK Menteri Agama tentang Penetapan Izin Operasional PPIU yang masih berlaku (Apabila Izin Operasional PPIU telah habis masa berlakunya dan sedang dalam proses perpanjangan, maka wajib melampirkan Scan Surat Pengantar Akreditasi)", "Scan KTP", "Scan KK", "Scan Akta kelahiran, Akta/Buku Nikah, Ijazah* (pilih salah satu yang data nama dan tanggal lahirnya sesuai dengan KTP/KK)", "Surat Pernyataan Keaslian Dokumen"] },
        { name: "Persyaratan Pendaftaran Haji", requirements: ["E-KTP yang masih berlaku (Copy rangkap 1)", "Kartu Keluarg (KK) (Copy rangkap 1)", "Akta Kelahiran/Akta Nikah/Ijazah SLTA ke bawah ( Copy rangkap 1)", "Photo Copy Paspor bagi yang memiliki (rangkap 1)", "Kartu Golongan Darah (PMI) rangkap 1", "Tabungan Haji minimal Rp. 25.000.000,-", "Photo berwarna back ground putih 80% tampak wajah (tidak berkacamata, tidak berkopyah, jilbab tidak putih) ukuran 3 x 4 sebanyak 10 lembar"] },
      ],
    },
    pendidikan: {
      title: "Pelayanan Pendidikan",
      icon: <Layers className="w-12 h-12 text-green-700 mx-auto mb-3" />,
      items: [
        { name: "Surat Rekomendasi Penggunaan Dana BOS/BOP Diatas 30 %", requirements: ["Scan Surat Permohonan Rekomendasi kepada Kepala Kantor Kementerian Agama Kabupaten Magetan yang ditandatangani Kepala Madrasah dan berstempel dengan tembusan kepada Pengawas", "Scan Rencana Kerja dan Anggaran Madrasah (RKAM) Tahun Anggaran berjalan, sesuai Petunjuk Teknis BOS/BOP yang berlaku yang sudah ditandatangani Kepala Madrasah, komite madrasah dan diketahui oleh Ketua Yayasan (bagi madrasah yang dibawah naungan yayasan)", "Surat Pernyataan Keaslian Dokumen (Download File Format)"] },
        { name: "Surat Rekomendasi Melanjutkan Sekolah/Kuliah Ke Luar Negeri", requirements: ["Scan Surat Permohonan dari Kepala Madrasah", "Scan rapor/Ijazah", "Scan SKCK dari Polres", "Scan paspor yang masih berlaku", "Surat Pernyataan Keaslian Dokumen (Download File Format)"] },
        { name: "Surat Rekomendasi Bantuan Sarana/Prasarana Madrasah", requirements: ["Scan Surat Pengantar/ permohonan rekomendasi dari Kepala Madrasah", "Scan Dokumen Proposal yang telah ditandatangani pengawas", "Surat Pernyataan Keaslian Dokumen (Download File Format)"] },
        { name: "Surat Rekomendasi Mutasi Siswa Madrasah Dalam Provinsi", requirements: ["Scan Surat Permohonan Surat Rekomendasi dari Kepala Madrasah", "Scan Surat Keterangan Pindah dari Kepala Madrasah mengetahui Pengawas (terdapat nilai akreditasi)", "Scan Kartu NISN/ hasil pencarian NISN pada aplikasi DAPODIK", "Scan Surat Permohonan Orang Tua untuk mutasi anaknya", "Scan Surat Keterangan Siap Menerima dari Kepala Madrasah / Sekolah tujuan (terdapat nilai akreditasi)", "Scan Raport siswa (Lembar identitas dan raport terakhir) yang sudah dilegalisir", "Scan Surat Pernyataan Kepala Madrasah bahwa siswa tersebut telah masuk pada aplikasi EMIS dan telah dimutasikan pada madrasah tujuan pada aplikasi EMIS", "Surat Pernyataan Keaslian Dokumen (Download File Format)"] },
        { name: "Surat Rekomendasi Penelitian di Madrasah", requirements: ["Scan Surat permohonan ijin penelitian resmi dari institusi yang bersangkutan", "Scan kartu mahasiswa / KTP (identitas)", "Scan Proposal penelitian yang ditandatangani dosen pembimbing", "Surat Pernyataan Keaslian Dokumen"] },
        { name: "Surat Rekomendasi Akreditasi Madrasah", requirements: ["Scan Surat permohonan rekomendasi", "Scan Surat Keputusan Pendirian/Operasional Sekolah/Madrasah", "Scan Nomor Pokok Sekolah Nasional (NPSN) yang diterbitkan oleh Pusat Data Statistik Pendidikan dan Kebudayaan (PDSPK)", "Scan surat pernyataan peserta didik yang ada pada semua tingkatan kelas", "Scan sarana dan prasarana pendidikan", "Scan piagam akkreditasi sebelumnya bagi lembaga yang re-akreditasi", "Surat Pernyataan Keaslian Dokumen (Download File Format)"] },
        { name: "Surat Pengantar Kurikulum MA", requirements: ["Scan Surat Pengantar dari Kepala Madrasah", "Scan Dokumen 1 Kurikulum yang telah ditandatangani pengawas", "Scan Lembar hasil verval pengawas", "Surat Pernyataan Keaslian Dokumen (Download File Format)"] },
        { name: "Surat Rekomendasi PPDB", requirements: ["Scan Surat Permohonan Rekomendasi kepada Kepala Kankemenag Kabupaten Magetan", "Scan Proposal PPDB", "Surat Pernyataan Keaslian Dokumen (Download File Format)"] },
        { name: "Surat Pengesahan EDM, RKM dan RKTM", requirements: ["Scan surat Permohonan kepada Kepala Kantor Kementerian Agama Kabupaten Magetan", "Scan lembar verifikasi pengawas", "Surat Pernyataan Keaslian Dokumen (Download File Format)"] },
        { name: "Surat Rekomendasi Izin Tinggal/Belajar Terbatas Bagi Santri/Guru Asing dari Luar Negeri (ITAS) Baru atau Perpanjangan", requirements: ["Scan Surat Permohonan Rekomendasi ITAS dari Pimpinan/Pengasuh pondok pesantren (Asli)", "Scan Foto Copy Paspor Santri/Guru Asing yang diajukan Rekomendasi ITAS yang masa aktifnya masih berlaku (Yang Ada Identitas Santri/Guru Asing)", "Scan Foto Copy VISA Santri/Guru Asing yang diajukan Rekomendasi ITAS yang masa aktifnya masih berlaku (Yang Ada Identitas Santri/Guru Asing)", "Scan Surat Pernyataan bermaterei 6000 sebagai Penjamin dari Pimpinan Pondok Pesantren (Asli)", "Scan Foto Copy KTP pimpinan pondok pesantren", "Scan Fotokopi Piagam Izin Operasional Pondok Pesantren yang telah terdaftar dan aktif", "Scan Surat keterangan sehat/bebas covid 19 dari instansi terkait (Rumah Sakit / Puskesmas)", "Surat Pernyataan Keaslian Dokumen", "Surat Pernyataan Keaslian Dokumen (Download File Format)"] },
        { name: "Surat Rekomendasi Permohonan Izin Operasional Madrasah Diniyah Takmiliyah Ulya", requirements: ["Scan Surat Permohonan Rekomendasi Permohonan Izin Operasional Madrasah Diniyah Takmiliyah Ulya (Asli)", "Scan Proposal Permohonan Ijin Operasional Madrasah Diniyah Takmiliyah Ulya Lengkap (Asli)", "Scan Fotocopi NPWP Lembaga/Yayasan", "Scan lengkap fotocopy Akta Yayasan/Lembaga dari Notaris atau SK Kemenkuham", "Surat Pernyataan Keaslian Dokumen (Download File Format)"] },
        { name: "Surat Rekomendasi Permohonan Izin Operasional Pendidikan Diniyah Formal", requirements: ["Scan Surat Permohonan Rekomendasi Permohonan Izin Operasional Diniyah Formal (Asli)", "Scan Proposal Permohonan Izin Operasional Diniyah Formal Lengkap (Asli)", "Scan Fotocopi NPWP Lembaga/Yayasan", "Scan lengkap fotocopy Akta Yayasan/Lembaga dari Notaris atau SK Kemenkuham", "Scan Fotokopi Piagam Izin Operasional Pondok Pesantren yang telah terdaftar dan aktif", "Scan Foto/Screensot Data Pondok Pesantren telah aktif pada Aplikasi Data EMIS", "Surat Pernyataan Keaslian Dokumen"] },
        { name: "Surat Rekomendasi Bantuan Untuk Lembaga Pondok Pesantren, Madin, Dan TPQ", requirements: ["Scan Surat Permohonan Rekomendasi Bantuan untuk lembaga Pondok Pesantren, Madin dan TPQ (Asli)", "Scan Proposal Permohonan Bantuan untuk lembaga Pondok Pesantren, Madin dan TPQ Lengkap (Asli)", "Scan Fotocopi NPWP Lembaga/Yayasan", "Scan lengkap fotocopy Akta Yayasan/Lembaga dari Notaris atau SK Kemenkuham", "Scan Fotokopi Piagam Izin Operasional Pondok Pesantren, Madin dan TPQ yang telah terdaftar dan aktif", "Scan Foto/Screensot Data Pondok Pesantren, Madin dan TPQ telah aktif pada Aplikasi Data EMIS", "Surat Pernyataan Keaslian Dokumen (Download File Format)"] },
        { name: "Surat Izin Operasional Madrasah Diniyah Takmiliyah Tingkat Awaliyah/Wustho (BARU)", requirements: ["Scan Surat Permohonan Ijin Operasional Madrasah Diniyah Takmiliyah (Download File Format)", "Scan Hasil Verifikasi Tim Monev Kecamatan (Download File Format)", "Scan Surat Rekomendasi dari KUA Kecamatan Setempat (Download File Format)", "Scan Surat Keterangan Domisili dari Desa/Kelurahan Setempat (Download File Format)", "Scan Profil Lembaga tanda tangan Kepala Madin (Download File Format)", "Scan Daftar nama-nama santri/murid (Minimal 15 (Lima Belas) Santri (Download File Format)", "Scan Jadwal Pembelajaran, Lembaga buat sendiri tanda tangan Kepala Madin", "Scan Sumber pembiayaan, Lembaga buat sendiri tanda tangan Kepala Madin (dari yayasan / wali santri)", "Scan lengkap fotocopy bukti kepemilikan tanah (SHM/Wakaf/Hibah/Surat keterangan terbaru dari kepala Madin/Developer Mengetahui Kepala Desa bahwa tidak ada sengketa dengan pihak manapun)", "Scan dukungan dari masyarakat sekitar Download File Format", "Scan lengkap fotocopy Akta Yayasan/Lembaga dari Notaris atau SK Kemenkuham (bila dilingkungan yayasan)", "Scan Foto-Foto Gedung Madrasah Diniyah Takmiliyah tampak papan nama", "Scan Foto-Foto Ruang dan sarana pembelajaran Madrasah Diniyah Takmiliyah", "Scan Foto-foto Kegiatan Pembelajaran", "Surat Pernyataan Keaslian Dokumen (Download File Format)"] },
        { name: "Surat Keterangan Terdaftar Ponpes/Madin dan TPQ", requirements: ["Scan Surat Permohonan", "Scan Domisili Lembaga", "Scan KTP", "Scan Ijin Operasional"] },
      ],
    },
    umum: {
      title: "Pelayanan Umum",
      icon: <ClipboardList className="w-12 h-12 text-green-700 mx-auto mb-3" />,
      items: [
        { name: "Permohonan Surat Pernyataan Tidak Pernah Dikenakan Hukdis Sedang/Berat", requirements: ["Scan Surat Permohonan", "Scan SK CPNS", "Scan SK PNS", "Scan SK KP Terakhir", "Scan SK Jabatan Terakhir", "Scan SK/PPK Tahun terakhir", "Scan Surat Pernyataan Keaslian Dokumen"] },
        { name: "Pengajuan Tanda Kehormatan Satya Lencana Karya", requirements: ["Scan Surat Permohonan", "Scan SK CPNS, SK Kenaikan Pangkat Terakhir,SK Jabatan Terakhir (dijadikan menjadi 1 file pdf)", "Surat Pernyataan Keaslian Dokumen"] },
        { name: "Surat Rekomendasi Penelitian di Kemenag Kab Magetan", requirements: ["Scan Surat Permohonan Penelitian dari Universitas", "Scan Proposal Sederhana Maksud Penelitian", "Surat Pernyataan Keaslian Dokumen"] },
        { name: "Permohonan Study Banding Study Lapangan Kunjungan Kerja", requirements: ["Scan Surat Permohonan"] },
        { name: "Permohonan Magang PKL Mahasiswa, SMA Sederajat", requirements: ["Scan Surat Permohonan Pelaksanaan Magang", "Scan Proposal Sederhana dilengkapi dengan contact person", "Surat Pernyataan Keaslian Dokumen (Download File Format)"] },
        { name: "Permohonan Narasumber", requirements: ["Scan Surat Permohonan", "Scan Proposal Kegiatan", "Surat Pernyataan Keaslian Dokumen"] },
        { name: "Permohonan Data Informasi", requirements: ["Scan Surat Permohonan", "Scan Tanda Pengenal (KTP / SIM)", "Surat Pernyataan Keaslian Dokumen"] },
        { name: "Surat Rekomendasi Izin Penelitian ke KUA/Madrasah/Pondok Pesantren/Madrasah Diniyah", requirements: ["Scan Surat permohonan ijin penelitian resmi dari lembaga pendidikan/perguruan tinggi, badan usaha, dan/atau organisasi kemasyarakatan yang bersangkutan", "Scan kartu mahasiswa/KTP", "Scan Proposal penelitian yang ditandatangani dosen pembimbing/pimpinan badan usaha/pimpinan organisasi kemasyarakatan", "Surat Pernyataan Keaslian Dokumen (Download File Format)"] },
        { name: "Permohonan Cuti", requirements: ["Scan Surat pengantar usul cuti ( Tandatangan Atasan Langsung)", "Scan Surat Formulir Cuti dari yang bersangkutan (PERKA BKN No.24 Th.2017)", "Scan Foto copy SK KP terakhir", "Scan Foto copy SKP, PSK, PPK terakhir (1 bendel)"] },
        { name: "Permohonan Cuti Sakit", requirements: ["Scan Surat pengantar usul cuti ( Tandatangan Atasan Langsung)", "Scan Surat Formulir Cuti dari yang bersangkutan (PERKA BKN No.24 Th.2017)", "Scan Foto copy SK KP terakhir", "Scan Foto copy SKP, PSK, PPK terakhir (1 bendel)", "Scan Surat keterangan sakit/rawat inap (dari Dokter)"] },
        { name: "Permohonan Cuti Besar", requirements: ["Scan Surat pengantar usul cuti ( Tandatangan Atasan Langsung)", "Scan Surat Formulir Cuti dari yang bersangkutan (PERKA BKN No.24 Th.2017)", "Scan Foto copy SK KP terakhir", "Scan Foto copy SKP, PSK, PPK terakhir (1 bendel)", "Scan Jadwal pemberangkatan Haji"] },
        { name: "Permohonan Cuti Melahirkan", requirements: ["Scan Surat pengantar usul cuti ( Tandatangan Atasan Langsung)", "Scan Surat Formulir Cuti dari yang bersangkutan (PERKA BKN No.24 Th.2017)", "Scan Foto copy SK KP terakhir", "Scan Foto copy SKP, PSK, PPK terakhir (1 bendel)", "Scan Hasil Pemeriksaan Lab dari dokter / rumah sakit / klinik"] },
        { name: "Permohonan Cuti Alasan Penting", requirements: ["Scan Surat pengantar usul cuti ( Tandatangan Atasan Langsung)", "Scan Surat Formulir Cuti dari yang bersangkutan (PERKA BKN No.24 Th.2017)", "Scan Foto copy SK KP terakhir", "Scan Foto copy SKP, PSK, PPK terakhir (1 bendel)", "Scan surat keterangan/bukti lain Ibu/bapak/istri/suami/anak/adik/kakak/mertua/menantu sakit keras/meninggal dunia atau scan surat melangsungkan perkawinan yang pertama"] },
        { name: "Permohonan Izin Belajar", requirements: ["Scan surat permohonan izin belajar", "Scan SK CPNS", "Scan SK PNS", "Scan Surat Keterangan Sehat dari dokter", "Scan SKP Asli dalam 2 tahun terakhir", "Scan Surat Keterangan Kepala Kantor bahwa tidak pernah dikenakan hukuman disiplin sedang/ berat selama 1 tahun terakhir", "Scan tanda bukti/keterangan program studi mempunyai relevansi dengan tugas dan fungsi", "Scan surat pernyataan bahwa studi dilaksanakan diluar jam kerja kantor dan tidak mengganggu tugas kedinasan", "Scan Foto copy legalisir SK KP dan Jabatan terakhir", "Scan Surat Keterangan Jarak Tempuh dari Perguruan Tinggi", "Scan surat Pernyataan dari Perguruan Tinggi yang menyatakan bahwa yang bersangkutan benar diterima sebagai Mahasiswa", "Scan Jadwal perkuliahan (asli) dari perguruan tinggi yang bersangkutan", "Scan tanda bukti/surat keterangan Akreditasi Perguruan Tinggi dan Program Studi", "Scan Profil perguruan tinggi termasuk alamat lengkap dan radius lokasi perguruan tinggi dari tempat tugas yang bersangkutan", "Surat Pernyataan Keaslian Dokumen"] },
        { name: "Usul Penetapan Angka Kredit Guru", requirements: ["Scan Formulir isian Daftar Usul Penetapan Angka Kredit (DUPAK)", "Scan Surat Pernyataan Melaksanakan Tugas Pembelajaran / Bimbingan dan Tugas Tertentu", "Scan Surat Pernyataan Melakukan Kegiatan Pengembangan Keprofesian Berkelanjutan", "Scan Surat Pernyataan Melakukan Kegiatan Penunjang Tugas Guru", "Scan Fotocopy sah Ijazah, Transkrip, dan Ijin Belajar/ Tugas Belajar (bila memasukkan ijazah baru)", "Scan Fotocopy sah surat hasil Penilaian AK lama (apabila pengajuan DUPAK sebelumnya belum memenuhi syarat KP)", "Scan Fotocopy sah PAK Lama yang digunakan KP terakhir", "Scan Fotocopy sah SK KP terakhir", "Scan Fotocopy sah SK Jabatan / SK Mutasi setelah KP terakhir (jika pernah)", "Scan Fotocopy sah Sertifikat Pendidik", "Scan Fotocopy sah NUPTK", "Scan Fotocopy sah SK Inpassing Jabatan Guru", "Scan Fotocopy sah Penilaian Prestasi Kerja 2 tahun terakhir bernilai baik", "Scan Fotocopy sah DRH Simpeg", "Scan Dokumen Penilaian Kinerja Guru (PKG) bukti fisik Pembelajaran/Bimbingan dan Tugas Tertentu", "Scan Dokumen Pengembangan Diri (PD)", "Scan Dokumen Publikasi Ilmiah (PI)", "Scan Dokumen Karya Inovatif (KI)", "Scan Dokumen Penunjang Tugas Guru", "Surat Pernyataan Keaslian Dokumen"] },
        { name: "Usul Penetapan Angka Kredit Pengawas", requirements: ["Scan Formulir isian Daftar Usul Penetapan Angka Kredit (DUPAK)", "Scan Surat Pernyataan Telah Mengikuti Pendidikan", "Scan Surat Pernyataan Melakukan Kegiatan Pengawasan Akademik dan Manajerial", "Scan Surat Pernyataan Melakukan Kegiatan Pengembangan Profesi", "Scan Surat Pernyataan Melakukan Kegiatan Penunjang Tugas Pokok", "Scan Fotocopy sah Ijazah, Transkrip, dan Ijin Belajar/ Tugas Belajar (bila memasukkan ijazah baru)", "Scan Fotocopy sah surat hasil Penilaian AK lama (apabila pengajuan DUPAK sebelumnya belum memenuhi syarat KP)", "Scan Fotocopy sah PAK Lama yang digunakan KP terakhir", "Scan Fotocopy sah SK KP terakhir", "Scan Fotocopy sah SK Jabatan / SK Mutasi setelah KP terakhir (jika pernah)", "Scan Fotocopy sah NUPTK", "Scan Fotocopy sah Penilaian Prestasi Kerja 2 tahun terakhir bernilai baik", "Scan Fotocopy sah DRH Simpeg", "Scan Dokumen Pengawasan Akademik dan Manajerial", "Scan Dokumen Pengembangan Profesi", "Scan Dokumen Penunjang Tugas Pengawas Sekolah", "Surat Pernyataan Keaslian Dokumen"] },
        { name: "Usulan Penetapan Angka Kredit Penghulu", requirements: ["Scan Formulir isian Daftar Usul Penetapan Angka Kredit (DUPAK)", "Scan Fotocopy sah Ijazah, Transkrip, dan Ijin Belajar/ Tugas Belajar (bila memasukkan ijazah baru)", "Scan Fotocopy sah SK Penghulu Terakhir", "Scan Fotocopy sah surat hasil Penilaian AK lama (apabila pengajuan DUPAK sebelumnya belum memenuhi syarat KP)", "Scan Fotocopy sah PAK terakhir", "Scan Fotocopy sah SK KP terakhir", "Scan Fotocopy sah SK JFU/ Jabatan/ Mutasi setelah KP terakhir (jika pernah)", "Scan Fotocopy sah SK CPNS, SK PNS", "Scan SKP dan PPK dalam 2 tahun terakhir minimal bernilai baik", "Scan Fotocopy sah DRH Simpeg", "Scan Surat Keterangan Kepala Kantor Kemenag tidak sedang dalam menjalani hukuman disiplin pegawai dalam 1 tahun terakhir", "Scan Surat Pernyataan pelaksanaan kegiatan pelayanan dan konsultasi NR", "Scan Surat Pernyataan pelaksanaan kegiatan pengembangan kepenghuluan", "Scan Surat Pernyataan pelaksanaan kegiatan pengembangan profesi penghulu", "Scan Surat Pernyataan melakukan kegiatan pendukung tugas penghulu", "Scan Surat Pernyataan telah mengikuti pendidikan dan pelatihan penghulu", "Scan Bukti Fisik [Dijilid dengan cover warna hijau]"] },
        { name: "Usul Penetapan Angka Kredit Penyuluh", requirements: ["Scan Formulir isian Daftar Usul Penetapan Angka Kredit (DUPAK)", "Scan Surat Pernyataan Melakukan Kegiatan Bimbingan atau Penyuluhan Agama dan Pembangunan", "Scan Fotocopy sah Ijazah, Transkrip, dan Ijin Belajar/ Tugas Belajar (bila memasukkan ijazah baru)", "Scan Fotocopy sah surat hasil Penilaian AK lama (apabila pengajuan DUPAK sebelumnya belum memenuhi syarat KP)", "Scan Fotocopy sah PAK Lama yang digunakan KP terakhir", "Scan Fotocopy sah SK KP terakhir", "Scan Fotocopy sah SK JFU/ Jabatan / SK Mutasi setelah KP terakhir (jika pernah)", "Scan Fotocopy sah Penilaian Prestasi Kerja 2 tahun terakhir bernilai baik", "Scan Fotocopy sah DRH Simpeg", "Scan Dokumen Bimbingan dan Penyuluhan Agama dan Pembangunan", "Scan Dokumen Pengembangan Bimbingan atau Penyuluhan", "Scan Dokumen Pengembangan Materi Bimbingan atau Penyuluhan", "Scan Dokumen Pengembangan Profesi", "Scan Dokumen Penunjang Tugas Penyuluhan Agama"] },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-100 pt-10 relative">
      {/* Notifikasi jika token kosong */}
      {showNotification && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center border border-green-200 animate-fadeIn relative">
            <X
              onClick={() => setShowNotification(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
            />
            <div className="text-green-700 mb-4">
              <CheckCircle className="w-12 h-12 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              Data Tidak Ditemukan
            </h2>
            <p className="text-gray-600 mb-6">
              Mohon periksa kembali kode token Anda dan coba lagi.
            </p>
            <button
              onClick={() => setShowNotification(false)}
              className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-green-200/30 via-white/50 to-transparent"></div>

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-green-800 mb-4 leading-tight">
            Pelayanan Terpadu Satu Pintu (PTSP)
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 font-medium">
            Kantor Kementerian Agama Kabupaten Magetan
          </p>

          <button
            onClick={scrollToContent}
            className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            Pelajari Lebih Lanjut
          </button>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-green-700 w-8 h-8" />
        </div>
      </section>

      {/* Content Section */}
      <section ref={contentRef} className="max-w-6xl mx-auto px-6 py-20">
        {/* Cek Token */}
        <div className="bg-white border border-green-200 rounded-3xl shadow-lg p-10 mb-20 text-center">
          <h3 className="text-2xl font-bold text-green-800 mb-6">
            Cek Status Pengajuan Layanan
          </h3>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={tokenSearch}
                onChange={(e) => setTokenSearch(e.target.value)}
                placeholder="Masukkan kode token pengajuan"
                className="w-full px-5 py-3 border-2 border-green-400 rounded-full focus:ring-2 focus:ring-green-600 focus:outline-none"
              />
              <Search className="absolute right-5 top-1/2 transform -translate-y-1/2 text-green-600" />
            </div>
            <button
              onClick={handleSearch}
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" /> Cari
            </button>
          </div>

          <div className="mt-6">
            <a
              href="https://ptsp.kemenagmagetan.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
              <LogIn className="w-5 h-5" />
              Login PTSP Online
            </a>
          </div>
        </div>

        {/* Alur Pengajuan */}
        <div className="bg-gradient-to-b from-green-50 to-green-100 border border-green-200 rounded-3xl shadow-lg p-10 mb-20">
          <h3 className="text-3xl font-bold text-green-800 mb-10 text-center">
            Alur Pengajuan Layanan
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { icon: <UserPlus />, title: "Registrasi (Pemohon Baru)" },
              { icon: <LogIn />, title: "Login Google" },
              { icon: <Search />, title: "Pilih Layanan" },
              { icon: <Upload />, title: "Upload Berkas" },
              { icon: <UserCheck />, title: "Verifikasi Petugas" },
              { icon: <RefreshCw />, title: "Upload Ulang (Jika Ditolak)" },
              { icon: <CheckCircle />, title: "Diterima" },
              { icon: <Printer />, title: "Cetak Tanda Terima" },
              { icon: <QrCode />, title: "Cek Proses Online" },
            ].map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-green-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 text-center"
              >
                <div className="text-green-700 mb-3 mx-auto flex justify-center">
                  {step.icon}
                </div>
                <h4 className="font-semibold text-gray-800 text-sm md:text-base">
                  {step.title}
                </h4>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 mt-8 text-sm md:text-base">
            <strong>Pemohon Lama:</strong> Langsung Login Google dan lanjut ke
            langkah berikutnya.
          </p>
        </div>

        {/* JEMPOL */}
        <div className="bg-green-700 rounded-3xl shadow-lg p-12 mb-20 text-white text-center">
          <h2 className="text-4xl font-bold mb-3">JEMPOL</h2>
          <p className="text-xl font-light">
            Jaringan Pelayanan Online Kabupaten Magetan
          </p>
        </div>

        {/* Layanan Kami */}
        <div>
          <h3 className="text-3xl font-bold text-green-800 mb-8 text-center">
            Layanan Kami
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {Object.entries(services).map(([key, service]) => (
              <div
                key={key}
                onClick={() => {
                  if (selectedService === key) {
                    setSelectedService(null);   // close service jika klik lagi
                    setSelectedSubService(null);
                  } else {
                    setSelectedService(key);
                   setSelectedSubService(null);
            }
                }}
                className="bg-white border border-green-200 rounded-2xl p-8 shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              >
                {service.icon}
                <h4 className="text-lg font-semibold text-green-800 text-center">
                  {service.title}
                </h4>
              </div>
            ))}
          </div>

          {selectedService && (
            <div className="bg-white border border-green-200 rounded-3xl shadow-lg p-8">
              <div className="mb-6">
                <h4 className="text-2xl font-bold text-green-800">
                  {services[selectedService].title}
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {services[selectedService].items.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      if (selectedSubService === index) {
                        setSelectedSubService(null);
                      } else {
                        setSelectedSubService(index);
                      }
                    }}
                    className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-xl p-6 shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-green-400"
                  >
                    <h5 className="font-semibold text-gray-800 text-center">
                      {item.name}
                    </h5>
                  </div>
                ))}
              </div>

              {selectedSubService !== null && (
                <div className="bg-gradient-to-br from-yellow-50 to-green-50 rounded-2xl p-6 border border-green-200">
                  <h5 className="text-xl font-bold text-green-800 mb-4">
                    Persyaratan:{" "}
                    {
                      services[selectedService].items[selectedSubService].name
                    }
                  </h5>
                  <ul className="space-y-2">
                    {services[selectedService].items[
                      selectedSubService
                    ].requirements.map((req, index) => (
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
      </section>
    </div>
  );
};

export default PTSPOnline;
