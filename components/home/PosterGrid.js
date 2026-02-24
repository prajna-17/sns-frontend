import Link from "next/link";

export default function PosterGrid() {
  const ELECTRONICS_ID = "699d8b96faa37050c8fbf346";
  const FURNITURE_ID = "699d7db8b47815543edfa29c";

  const posters = [
    {
      src: "/img/poster-1.jpg",
      title: "Electronics",
      superCategory: ELECTRONICS_ID,
    },
    {
      src: "/img/poster-2.jpg",
      title: "Luxury Furniture",
      superCategory: FURNITURE_ID,
    },
    {
      src: "/img/poster-3.jpg",
      title: "Classy Furniture",
      superCategory: FURNITURE_ID,
    },
    {
      src: "/img/poster-4.jpg",
      title: "Devices",
      superCategory: ELECTRONICS_ID,
    },
  ];

  return (
    <div className="poster-grid-container">
      <div className="poster-grid">
        {posters.map((item, i) => (
          <Link
            href={`/products?superCategory=${item.superCategory}`}
            className="poster-card group"
            key={i}
          >
            <div className="poster-img-wrapper overflow-hidden rounded-xl">
              <img
                src={item.src}
                alt={item.title}
                className="transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <p className="poster-title mt-3 text-center font-medium group-hover:text-orange-500 transition">
              {item.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
