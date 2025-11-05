import BeritaCard from "./BeritaCard";

const BeritaList = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {data.map((item, index) => (
        <BeritaCard key={index} item={item} />
      ))}
    </div>
  );
};

export default BeritaList;
