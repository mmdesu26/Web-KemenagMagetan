import Link from "next/link"
import BeritaList from "@/components/BeritaList"

async function getBerita() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/internal/berita`, {
    cache: "no-store",
  });
  const json = await res.json();
  return json.data.slice(0, 4); // hanya ambil 4 berita terbaru
}

export default async function Home() {
  const berita = await getBerita();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      
      {/* HERO */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-green-800">
            Kementerian Agama
          </h1>
          <h2 className="text-2xl md:text-3xl mb-8 text-green-600">
            Kabupaten Magetan
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Melayani dengan sepenuh hati untuk kemajuan pendidikan agama dan
            kerukunan umat beragama di Kabupaten Magetan
          </p>

          <div className="space-y-4">
            <Link
              href="/profil/sejarah"
              className="inline-block px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-300 font-semibold"
            >
              Lihat Sejarah Instansi
            </Link>
          </div>
        </div>
      </div>


      {/* ============================== */}
      {/* BERITA TERKINI */}
      {/* ============================== */}
      <div className="container mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold mb-6 text-green-800">
          Berita Terkini
        </h2>

        {/* List Berita */}
        <BeritaList data={berita} />

        {/* Button ke halaman semua berita */}
        <div className="text-center mt-8">
          <Link
            href="/berita"
            className="bg-green-700 text-white px-6 py-2 rounded-full hover:bg-green-600 transition"
          >
            Lihat lebih banyak berita
          </Link>
        </div>
      </div>
    </div>
  )
}
