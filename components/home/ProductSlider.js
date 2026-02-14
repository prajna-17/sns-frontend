"use client";

import { items } from "@/data/data";
import Link from "next/link";
import React, { useRef } from "react";

export default function ProductSlider() {
	const sliderRef = useRef(null);
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
				<Link href="/products">View all</Link>
			</div>

			<div
				className="ps-slider"
				ref={sliderRef}
				onMouseDown={handleMouseDown}
				onMouseLeave={handleMouseLeave}
				onMouseUp={handleMouseUp}
				onMouseMove={handleMouseMove}
			>
				{items
					.filter((p) => p.category === "furniture")
					.map((p, i) => (
						<Link
							href={`/products/${p.id}`}
							className="ps-card"
							key={i}
						>
							<img src={p.image} className="ps-img" />

							<div className="ps-title">{p.title}</div>

							<div className="ps-rating">
								⭐ {p.rating}
							</div>

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
						</Link>
					))}
			</div>
		</div>
	);
}
