"use client";

import React, { useRef } from "react";

export default function ProductSlider() {
	const sliderRef = useRef(null);

	const products = [
		{
			id: 1,
			title: "Modern Wooden Study Table",
			image: "/img/ps-study-table.jpeg",
			price: 4999,
			mrp: 8999,
			off: 44,
			rating: 4.3,
		},
		{
			id: 2,
			title: "Fabric Lounge Chair",
			image: "/img/ps-lounge-chair.jpeg",
			price: 3499,
			mrp: 6999,
			off: 50,
			rating: 4.5,
		},
		{
			id: 3,
			title: "Solid Wood Coffee Table",
			image: "/img/ps-coffee-table.jpeg",
			price: 2599,
			mrp: 4999,
			off: 48,
			rating: 4.2,
		},
		{
			id: 4,
			title: "Queen Size Bed Frame",
			image: "/img/ps-bed-frame.jpeg",
			price: 11999,
			mrp: 19999,
			off: 40,
			rating: 4.4,
		},
		{
			id: 5,
			title: "Ergonomic Office Chair",
			image: "/img/ps-office-chair.jpeg",
			price: 5999,
			mrp: 10999,
			off: 45,
			rating: 4.6,
		},
		{
			id: 6,
			title: "4-Door Wardrobe",
			image: "/img/ps-wardrobe.jpeg",
			price: 15499,
			mrp: 27999,
			off: 44,
			rating: 4.1,
		},
		{
			id: 7,
			title: "Minimalist TV Unit",
			image: "/img/ps-tv-unit.jpeg",
			price: 3999,
			mrp: 7999,
			off: 50,
			rating: 4.3,
		},
		{
			id: 8,
			title: "Wooden Shoe Rack",
			image: "/img/ps-shoe-rack.jpeg",
			price: 2499,
			mrp: 4999,
			off: 50,
			rating: 4.2,
		},
		{
			id: 9,
			title: "Dining Table (4 Seater)",
			image: "/img/ps-dining-table.jpeg",
			price: 8999,
			mrp: 15999,
			off: 44,
			rating: 4.5,
		},
		{
			id: 10,
			title: "Bookshelf Storage Unit",
			image: "/img/ps-bookshelf.jpeg",
			price: 3199,
			mrp: 6499,
			off: 51,
			rating: 4.4,
		},
	];

	const isDown = useRef(false);
	const startX = useRef(0);
	const scrollLeft = useRef(0);

	const handleMouseDown = (e) => {
		isDown.current = true;
		startX.current = e.pageX - sliderRef.current.offsetLeft;
		scrollLeft.current = sliderRef.current.scrollLeft;
	};

	const handleMouseLeave = () => {
		isDown.current = false;
	};

	const handleMouseUp = () => {
		isDown.current = false;
	};

	const handleMouseMove = (e) => {
		if (!isDown.current) return;

		e.preventDefault();
		const x = e.pageX - sliderRef.current.offsetLeft;
		const walk = (x - startX.current) * 1.2;
		sliderRef.current.scrollLeft = scrollLeft.current - walk;
	};

	return (
		<div className="product-slider-container">
			<div className="ps-heading-container">
				<h2 className="ps-heading">Latest Launches</h2>
				<p>View all</p>
			</div>

			<div
				className="ps-slider"
				ref={sliderRef}
				onMouseDown={handleMouseDown}
				onMouseLeave={handleMouseLeave}
				onMouseUp={handleMouseUp}
				onMouseMove={handleMouseMove}
			>
				{products.map((p, i) => (
					<div className="ps-card" key={i}>
						<img src={p.image} className="ps-img" />

						<div className="ps-title">{p.title}</div>

						<div className="ps-rating">⭐ {p.rating}</div>

						<div className="ps-price-row">
							<span className="ps-price-main">
								₹{p.mrp}
							</span>
							<span className="ps-price-discount">
								₹{p.price}
							</span>
							<span className="ps-offer">
								{p.off}% OFF
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
