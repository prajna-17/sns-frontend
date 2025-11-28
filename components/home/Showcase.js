import React from "react";

export default function ShowcaseSlider() {
	const promoImage = "/img/dyson-main.jpeg"; // your rounded left image

	const dysonProducts = [
		{
			id: 1,
			img: "/img/dyson-1.jpeg",
			title: "Dyson V15 Detect Slim",
			price: 54990,
			discount: 49990,
			rating: 4.8,
		},
		{
			id: 2,
			img: "/img/dyson-2.jpeg",
			title: "Dyson Airwrap Complete Long",
			price: 59900,
			discount: 54900,
			rating: 4.7,
		},
		{
			id: 3,
			img: "/img/dyson-3.jpeg",
			title: "Dyson Pure Cool Hair Dryer",
			price: 42900,
			discount: 37900,
			rating: 4.6,
		},
		{
			id: 4,
			img: "/img/dyson-4.jpeg",
			title: "Dyson Supersonic Hair Dryer",
			price: 34900,
			discount: 31900,
			rating: 4.5,
		},
	];

	return (
		<div className="pgs-wrapper">
			<div className="pgs-left">
				<img src={promoImage} alt="promo" />
			</div>

			<div className="pgs-right">
				<div className="pgs-grid">
					{dysonProducts.map((p) => (
						<div key={p.id} className="pgs-card">
							<div className="pgs-img-box">
								<img src={p.img} alt={p.title} />
							</div>

							<p className="pgs-title">{p.title}</p>

							<div className="pgs-rating">
								⭐ {p.rating}
							</div>

							<div className="pgs-price-section">
								<span className="pgs-final-price">
									₹{p.discount}
								</span>

								<span className="pgs-original-price">
									₹{p.price}
								</span>

								<span className="pgs-offer-badge">
									{Math.round(
										((p.price - p.discount) /
											p.price) *
											100
									)}
									% OFF
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
