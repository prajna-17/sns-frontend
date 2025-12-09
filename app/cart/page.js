"use client";

function CartPage() {
	const cartItems = [
		{
			id: 109,
			title: "Dining Table (4 Seater)",
			image: "/img/ps-dining-table.jpeg",
			price: 8999,
			mrp: 15999,
			off: 44,
			rating: 4.5,
			features: [
				"Elegant wooden dining table design",
				"Comfortable seating for four people",
				"Strong and stable construction",
				"Smooth and easy-to-clean surface",
				"Perfect for daily meals or gatherings",
			],
			description: {
				heading: "Make Every Meal Special",
				details: "Bring your family together with this beautifully designed 4-seater dining table that adds warmth and charm to your dining space. Crafted with a smooth, polished surface, it offers ample space for meals, conversations, and celebrations. The sturdy wooden construction ensures long-lasting durability, while the neat design blends seamlessly with various interior styles—from modern apartments to traditional homes. Whether it's daily meals, festive dinners, or weekend get-togethers, this dining table creates the perfect setting for memorable moments. Easy to clean and maintain, it is built for everyday use while offering timeless elegance to your home.",
			},
		},
		{
			id: 110,
			title: "Bookshelf Storage Unit",
			image: "/img/ps-bookshelf.jpeg",
			price: 3199,
			mrp: 6499,
			off: 51,
			rating: 4.4,
			features: [
				"Multi-tier open storage",
				"Sturdy wooden construction",
				"Modern minimalist design",
				"Perfect for books and décor",
				"Easy to clean and maintain",
			],
			description: {
				heading: "Organize Smart, Display Beautifully",
				details: "Give your home a functional and stylish upgrade with this versatile bookshelf storage unit designed for modern living. Featuring multiple open tiers, it provides ample space to organize your books, display décor, or store everyday essentials in a neat and elegant manner. Its sturdy wooden build ensures stability and long-lasting use, while the minimalist design enhances the look of any room—study area, living room, or bedroom. The smooth finish makes it easy to clean, and its compact shape helps it fit effortlessly even in smaller spaces. This bookshelf brings together style, function, and convenience to elevate your home décor.",
			},
		},
	];

	const totalMrp = cartItems.reduce((mrp, item) => (mrp += item.mrp), 0);
	const finalAmount = cartItems.reduce(
		(price, item) => (price += item.price),
		0
	);
	const totalDiscount = totalMrp - finalAmount;
	return (
		<div className="cart-page">
			{/* LEFT — PRODUCT LIST */}
			<div className="cart-left">
				{cartItems.map((item) => (
					<div className="cart-card" key={item.id}>
						<img src={item.image} className="cart-img" />

						<div className="cart-details">
							<h3 className="cart-title">{item.title}</h3>

							<p className="cart-stock">
								{/* {item.inStock
									? "In Stock"
									: "Out of Stock"} */}
								In Stock
							</p>

							<p className="cart-free">🚚 Free Shipping</p>

							<div className="cart-price-row">
								<span className="mrp">₹{item.mrp}</span>
								<span className="price">
									₹{item.price}
								</span>
								<span className="off">
									{item.off}% OFF
								</span>
							</div>

							<p className="cart-delivery">
								Delivery by{" "}
								<strong>{item.deliveryDate}</strong>
							</p>

							<div className="cart-actions">
								<div className="qty-box">
									<button>-</button>
									<span>{item.qty || 1}</span>
									<button>+</button>
								</div>

								<button className="delete-btn">
									Delete
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* RIGHT — SUMMARY */}
			<div className="cart-right">
				<div className="summary-box">
					<h2 className="summary-title">Order Summary</h2>

					<div className="summary-row">
						<span>Total MRP</span>
						<span>₹{totalMrp}</span>
					</div>

					<div className="summary-row green">
						<span>Discount</span>
						<span>-₹{totalDiscount}</span>
					</div>

					<div className="summary-row">
						<span>Shipping Charges</span>
						<span className="green">FREE</span>
					</div>

					<hr />

					<div className="summary-total">
						<span>Total Amount</span>
						<span>₹{finalAmount}</span>
					</div>

					<button className="checkout-btn">
						Proceed to Checkout
					</button>
				</div>
			</div>
		</div>
	);
}

export default CartPage;
