import { useEffect, useState } from "react";
import BeritaList from "../../components/Berita/BeritaList";

export default function BeritaPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/public/news");
        const json = await res.json();

        const items = Array.isArray(json.data) ? json.data : [];

        // Sort berita terbaru → terlama
        const sorted = items.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setData(sorted);
      } catch (error) {
        console.error("Gagal memuat berita:", error);
        setData([]);
      }
    };

    loadNews();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Berita Kemenag</h1>
      <BeritaList data={data} />
    </div>
  );
}
