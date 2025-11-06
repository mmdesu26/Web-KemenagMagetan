const BeritaCard = ({ item }) => {
  return (
    <a
      href={item.link}
      target="_blank"
      className="block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
    >
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg">{item.title}</h3>
        <p className="text-gray-600 text-sm mt-1">{item.category}</p>
        <p className="text-xs text-gray-400 mt-1">{item.pubDate}</p>
      </div>
    </a>
  );
};

export default BeritaCard;
