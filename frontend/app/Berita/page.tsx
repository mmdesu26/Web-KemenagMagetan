import BeritaList from "@/components/Berita/BeritaList";

async function getBeritaFull() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/internal/berita`, {
    cache: "no-store",
  });
  const json = await res.json();
  return json.data; // semua berita
}

export default async function BeritaPage() {
  const berita = await getBeritaFull();

  return (
    <div className="mt-40 container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Semua Berita</h1>
      <BeritaList data={berita} />
    </div>
  );
}
