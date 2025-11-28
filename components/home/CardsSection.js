function CardsSection() {
	const home = [
		{
			src: "/img/phone-poster.jpg",
			title: "Mobile Phones",
			price: "₹28,999",
		},
		{
			src: "/img/headphones-poster.jpg",
			title: "Headphones",
			price: "₹19,499",
		},
		{
			src: "/img/pc-poster.jpg",
			title: "Computer Parts",
			price: "₹15,299",
		},
		{
			src: "/img/sound-system-poster.jpg",
			title: "Sound System",
			price: "₹7,499",
		},
	];

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
			<Card bg="#E0F7FA" title="Home Appliances" items={home} />
			<Card bg=" #f0fff4" title="Furniture" items={furniture} />
		</div>
	);
}

export default CardsSection;

function Card({ bg, title, items }) {
	return (
		<div className="section-wrapper" style={{ backgroundColor: bg }}>
			<div className="section-header">
				<h2>{title}</h2>
				<button className="view-all-btn">View All</button>
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
