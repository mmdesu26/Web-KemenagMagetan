import BeritaCard from "./BeritaCard";

const BeritaList = ({ data }) => {
  const list = Array.isArray(data) ? data : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {list.length === 0 && <p>Tidak ada berita.</p>}

      {list.map((item, index) => (
        <BeritaCard key={item.id || index} item={item} />
      ))}
    </div>
  );
};

export default BeritaList;
