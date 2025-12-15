"use client";

import { addItem } from "@/app/_store/cartSlice";
import { fakeItems } from "@/data/data";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function ProductPage() {
	//Extra Hooks
	const dispatch = useDispatch();

	const params = useParams();
	const { id, name } = params;
	const product = fakeItems[name].find((obj) => obj.id === +id);

	// State
	const [showShare, setShowShare] = useState(false);
	const [showFullDesc, setShowFullDesc] = useState(false);

	// Product Features
	const productUrl =
		typeof window !== "undefined" ? window.location.href : "";

	const deliveryDate = new Date();
	deliveryDate.setDate(deliveryDate.getDate() + 7);
	const formattedDate = deliveryDate.toDateString();

	const copyLink = () => {
		navigator.clipboard.writeText(productUrl);
		alert("Link copied!");
	};

	return (
		<>
			<div className="product-container">
				{/* ---------------- LEFT SIDE ---------------- */}
				<div className="product-left">
					<div className="product-image-box">
						<img
							src={product.image}
							className="product-image"
						/>

						<button
							className="share-btn"
							onClick={() => setShowShare(true)}
						>
							Share
						</button>

						{/* SHARE POPUP */}
						{showShare && (
							<div className="share-popup">
								<h3>Share this product</h3>
								<input value={productUrl} readOnly />
								<button
									onClick={copyLink}
									className="copy-btn"
								>
									Copy Link
								</button>

								<button
									className="close-share"
									onClick={() => setShowShare(false)}
								>
									Close
								</button>
							</div>
						)}
					</div>

					<div className="product-actions">
						<button className="btn-buy">Buy Now</button>
						<button
							className="btn-cart"
							onClick={() => dispatch(addItem(product))}
						>
							Add to Cart
						</button>
					</div>
				</div>

				{/* ---------------- RIGHT SIDE ---------------- */}
				<div className="product-right">
					<div className="tag-new">New Arrival</div>

					<h1 className="pp-product-title">{product.title}</h1>

					<p className="pp-product-desc">
						{product.description.heading}
					</p>

					<div className="pp-product-price">
						<span className="pp-main-price">
							₹{product.price}
						</span>
						<span className="pp-mrp">₹{product.mrp}</span>
						<span className="pp-off">{product.off}% OFF</span>
					</div>

					<p className="tax-line">Inclusive of all taxes</p>

					{/* DELIVERY BOX */}
					<div className="delivery-box">
						<div>
							<p>
								Delivery by{" "}
								<strong>{formattedDate}</strong>
							</p>
							<p>Cash on Delivery available</p>
						</div>
						<button className="change-btn">Change</button>
					</div>

					{/* FEATURES */}
					<ul className="product-features">
						{product.features.map((f, i) => (
							<li key={i}>{f}</li>
						))}
					</ul>
				</div>
			</div>
			<div className="product-long-description">
				<p className={showFullDesc ? "expanded" : "collapsed"}>
					{product.description.details}
				</p>

				<button
					className="toggle-desc-btn"
					onClick={() => setShowFullDesc(!showFullDesc)}
				>
					{showFullDesc ? "Show Less" : "Show More"}
				</button>
			</div>
		</>
	);
}
