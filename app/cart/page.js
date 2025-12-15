"use client";

import { useDispatch, useSelector } from "react-redux";
import {
	decreaseQuantity,
	increaseQuantity,
	removeItem,
} from "../_store/cartSlice";

function CartPage() {
	const cartItems = useSelector((state) => state.cart.items);
	const dispatch = useDispatch();
	const totalMrp = cartItems.reduce((mrp, item) => (mrp += item.mrp), 0);
	const finalAmount = cartItems.reduce(
		(price, item) => (price += item.price * item.quantity),
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
									<button
										onClick={() =>
											dispatch(
												decreaseQuantity(
													item.id
												)
											)
										}
									>
										-
									</button>
									<span>{item.quantity || 1}</span>
									<button
										onClick={() =>
											dispatch(
												increaseQuantity(
													item.id
												)
											)
										}
									>
										+
									</button>
								</div>

								<button
									className="delete-btn"
									onClick={() =>
										dispatch(removeItem(item.id))
									}
								>
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
