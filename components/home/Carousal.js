"use client";

import { Fragment, useEffect, useRef, useState } from "react";

const images = [
	"/img/banner-1.jpg",
	"/img/banner-3.jpg",
	"/img/banner-2.jpg",
	"/img/banner-4.jpg",
];

export default function Carousel() {
	const [current, setCurrent] = useState(0);
	const items = [
		{ src: "/img/air-conditioner.png", title: "AC" },
		{ src: "/img/armchair.png", title: "Arm Chair" },
		{ src: "/img/home-audio.png", title: "Home Audio" },
		{ src: "/img/dining-table.png", title: "Dining Table" },
		{ src: "/img/mobiles.png", title: "Mobiles" },
		{ src: "/img/sofa-small.png", title: "Sofa Small" },
		{ src: "/img/kitchen-appliance.png", title: "Appliances" },
		{ src: "/img/sofa.png", title: "Sofa" },
		{ src: "/img/television.png", title: "Television" },
		{ src: "/img/watch.png", title: "Watches" },
	];

	const colors = [
		"#FDE68A",
		"#FCA5A5",
		"#A5B4FC",
		"#6EE7B7",
		"#F9A8D4",
		"#FBCFE8",
		"#BAE6FD",
		"#FDE2E2",
		"#C7D2FE",
		"#FFD6A5",
	];

	const scrollRef = useRef(null);

	useEffect(() => {
		const slider = scrollRef.current;
		let scrollAmount = 0;

		const scrollLoop = () => {
			scrollAmount += 1; // speed
			slider.scrollLeft = scrollAmount;

			// reset smoothly
			if (scrollAmount >= slider.scrollWidth / 2) {
				scrollAmount = 0;
			}

			requestAnimationFrame(scrollLoop);
		};

		requestAnimationFrame(scrollLoop);
	}, []);

	useEffect(() => {
		// Duration logic
		const duration = current === 0 ? 8000 : 4000;

		const timer = setTimeout(() => {
			setCurrent((prev) => (prev + 1) % images.length);
		}, duration);

		return () => clearTimeout(timer);
	}, [current]);

	return (
		<>
			<div className="image-carousel-wrapper">
				<img
					src={images[current]}
					alt="carousel"
					className="image-carousel-image"
				/>

				<div className="image-carousel-dots">
					{images.map((_, index) => (
						<div
							key={index}
							className={`dot ${
								current === index ? "active" : ""
							}`}
							onClick={() => setCurrent(index)}
							style={{
								"--fill-time":
									index === 0 ? "8s" : "4s",
							}}
						></div>
					))}
				</div>
			</div>

			<div className="infinite-slider" ref={scrollRef}>
				<div className="slider">
					{/* Duplicate list twice for seamless loop */}
					{[...items, ...items].map((item, i) => (
						<div key={i} className="slide-wrapper">
							<div
								className="slide-item"
								style={{
									backgroundColor:
										colors[i % colors.length],
								}}
							>
								<img src={item.src} alt={item.title} />
							</div>
							<p className="slide-title">{item.title}</p>
						</div>
					))}
				</div>

				<div className="slider mobile-only-slider">
					{[...items, ...items].reverse().map((item, i) => (
						<div key={i} className="slide-wrapper">
							<div
								className="slide-item"
								style={{
									backgroundColor:
										colors[i % colors.length],
								}}
							>
								<img src={item.src} alt={item.title} />
							</div>
							<p className="slide-title">{item.title}</p>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
