import Link from "next/link";
import React from "react";

export default function PosterGrid() {
	const posters = [
		{ src: "/img/poster-1.jpg", title: "Electronics" },
		{ src: "/img/poster-2.jpg", title: "Luxury Furniture" },
		{ src: "/img/poster-3.jpg", title: "Classy Furniture" },
		{ src: "/img/poster-4.jpg", title: "Devices" },
	];

	return (
		<div className="poster-grid-container">
			<div className="poster-grid">
				{posters.map((item, i) => (
					<Link href="/products" className="poster-card" key={i}>
						<div className="poster-img-wrapper">
							<img src={item.src} alt={item.title} />
						</div>
						<p className="poster-title">{item.title}</p>
					</Link>
				))}
			</div>
		</div>
	);
}
