import Link from "next/link";

function CardsSection() {
	const furniture = [
		{
			src: "/img/furniture-1.jpg",
			title: "Armchair",
			price: "₹22,999",
		},
		{
			src: "/img/furniture-2.jpg",
			title: "Modern Sofa",
			price: "₹6,499",
		},
		{
			src: "/img/furniture-3.jpg",
			title: "Living Room Furniture",
			price: "₹17,299",
		},
		{
			src: "/img/furniture-4.jpg",
			title: "Wooden Furniture",
			price: "₹25,499",
		},
	];
	return (
		<div className="cards-section-cover">
			<Card
				bg=" #f0fff4"
				title="Products"
				items={furniture}
				route="/furniture"
			/>
		</div>
	);
}

export default CardsSection;

function Card({ bg, title, items }) {
	return (
		<div className="section-wrapper" style={{ backgroundColor: bg }}>
			<div className="section-header">
				<h2>{title}</h2>
				<Link href={`/products`} className="view-all-btn">
					View All
				</Link>
			</div>

			<div className="section-cards">
				{items.map((item, index) => (
					<div key={index} className="section-card">
						<div className="card-img">
							<img src={item.src} alt={item.title} />
						</div>
						<p className="card-title">{item.title}</p>
					</div>
				))}
			</div>
		</div>
	);
}
