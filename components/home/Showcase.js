"use client";

import { items } from "@/data/data";
import React from "react";
import Link from "next/link";

export default function ShowcaseSlider() {
	const promoImage = "/img/dyson-main.jpeg";

	return (
		<div className="pgs-wrapper">
			<div className="pgs-left">
				<img src={promoImage} alt="promo" />
			</div>

			<div className="pgs-right">
				<div className="pgs-grid">
					{items.slice(0, 4).map((p) => (
						<Link
							key={p.id}
							href={`/products/${p.id}`}
							className="pgs-card"
						>
							<div className="pgs-img-box">
								<img src={p.image} alt={p.title} />
							</div>

							<p className="pgs-title">{p.title}</p>

							<div className="pgs-rating">
								⭐ {p.rating}
							</div>

							<div className="pgs-price-section">
								<span className="pgs-final-price">
									₹{p.price}
								</span>

								<span className="pgs-original-price">
									₹{p.mrp}
								</span>

								<span className="pgs-offer-badge">
									{p.off}% OFF
								</span>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
