"use client";

import Link from "next/link";
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
		if (!slider) return;

		// IMPORTANT: allow vertical panning by default
		// CSS equivalent below: .infinite-slider { touch-action: pan-y; }
		slider.style.touchAction = "pan-y";

		let isDown = false;
		let startX = 0;
		let startY = 0;
		let scrollStart = 0;
		let isDragging = false;
		let lastX = 0;
		let lastTime = 0;
		let velocity = 0;
		let rafId = null;
		const THRESHOLD = 8; // pixels to decide direction lock

		const onPointerDown = (e) => {
			// Only left mouse button or touch/pen
			if (e.pointerType === "mouse" && e.button !== 0) return;

			isDown = true;
			isDragging = false;
			startX = e.clientX;
			startY = e.clientY;
			scrollStart = slider.scrollLeft;
			lastX = e.clientX;
			lastTime = performance.now();
			velocity = 0;

			// capture pointer so we reliably get pointerup even if cursor leaves
			try {
				slider.setPointerCapture(e.pointerId);
			} catch (err) {
				// ignore if not supported
			}
		};

		const onPointerMove = (e) => {
			if (!isDown) return;

			const dx = e.clientX - startX;
			const dy = e.clientY - startY;

			// If not decided yet, check threshold and direction
			if (!isDragging) {
				if (Math.abs(dx) < THRESHOLD && Math.abs(dy) < THRESHOLD) {
					// too small to decide
					return;
				}
				// If vertical movement is greater, we cancel the drag and allow page scroll
				if (Math.abs(dy) > Math.abs(dx)) {
					// cancel drag — let page scroll naturally
					isDown = false;
					try {
						slider.releasePointerCapture(e.pointerId);
					} catch (err) {}
					return;
				}
				// Otherwise treat as horizontal drag
				isDragging = true;
				slider.classList.add("active");
			}

			// At this point we are dragging horizontally — prevent default so page doesn't jump
			// (Only prevent when we are confirmed horizontal)
			if (e.cancelable) e.preventDefault();

			const now = performance.now();
			const dt = Math.max(1, now - lastTime);
			// compute instantaneous velocity
			velocity = (e.clientX - lastX) / dt;
			lastX = e.clientX;
			lastTime = now;

			// update scroll
			slider.scrollLeft = scrollStart - dx;
		};

		const startMomentum = () => {
			// convert px/ms velocity to px/frame (rough)
			const multiplier = 16; // approx ms per frame
			let v = velocity * multiplier * -1; // invert to match scroll direction

			const step = () => {
				// apply friction
				v *= 0.95;
				if (Math.abs(v) < 0.1) {
					cancelAnimationFrame(rafId);
					rafId = null;
					return;
				}
				slider.scrollLeft += v;
				rafId = requestAnimationFrame(step);
			};

			if (rafId) cancelAnimationFrame(rafId);
			rafId = requestAnimationFrame(step);
		};

		const onPointerUpOrCancel = (e) => {
			if (!isDown && !isDragging) {
				// nothing to do
				isDown = false;
				isDragging = false;
				return;
			}
			// release pointer capture
			try {
				slider.releasePointerCapture &&
					slider.releasePointerCapture(e.pointerId);
			} catch (err) {}

			isDown = false;
			if (isDragging) {
				// start momentum based on last recorded velocity
				startMomentum();
			}
			isDragging = false;
			slider.classList.remove("active");
		};

		slider.addEventListener("pointerdown", onPointerDown, {
			passive: true,
		});
		slider.addEventListener("pointermove", onPointerMove);
		slider.addEventListener("pointerup", onPointerUpOrCancel);
		slider.addEventListener("pointercancel", onPointerUpOrCancel);
		slider.addEventListener("pointerleave", onPointerUpOrCancel);

		return () => {
			slider.removeEventListener("pointerdown", onPointerDown);
			slider.removeEventListener("pointermove", onPointerMove);
			slider.removeEventListener("pointerup", onPointerUpOrCancel);
			slider.removeEventListener("pointercancel", onPointerUpOrCancel);
			slider.removeEventListener("pointerleave", onPointerUpOrCancel);
			if (rafId) cancelAnimationFrame(rafId);
		};
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
