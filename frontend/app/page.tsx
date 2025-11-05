import BeritaList from "@/components/BeritaList";

async function getBerita() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/internal/berita`, {
    cache: "no-store",
  });
  const json = await res.json();
  return json.data.slice(0, 4); // hanya ambil 4
}

export default async function Home() {
  const berita = await getBerita();

  return (
    <div className="mt-40 container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Berita Terkini</h2>

      <BeritaList data={berita} />

      <div className="text-center mt-8">
        <a
          href="/berita"
          className="bg-green-700 text-white px-6 py-2 rounded-full hover:bg-green-600"
        >
          Lihat lebih banyak berita
        </a>
      </div>
    </div>
  );
}
