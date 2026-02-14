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

	const totalMrp = cartItems.reduce((mrp, item) => mrp + item.mrp, 0);
	const finalAmount = cartItems.reduce(
		(price, item) => price + item.price * item.quantity,
		0,
	);
	const totalDiscount = totalMrp - finalAmount;

	return (
		<div className="min-h-screen bg-slate-50 py-10 px-6">
			<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* LEFT SIDE */}
				<div className="lg:col-span-2 space-y-6">
					{cartItems.map((item) => (
						<div
							key={item.id}
							className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex gap-6"
						>
							{/* Image */}
							<div className="w-28 h-28 bg-slate-100 rounded-xl flex items-center justify-center overflow-hidden">
								<img
									src={item.image}
									className="object-contain h-full"
								/>
							</div>

							{/* Details */}
							<div className="flex-1 flex flex-col justify-between">
								<div>
									<h3 className="text-lg font-semibold text-slate-800 leading-snug">
										{item.title}
									</h3>

									<p className="text-sm text-green-600 font-medium mt-1">
										In Stock
									</p>

									<p className="text-xs text-slate-500 mt-1">
										🚚 Free Shipping
									</p>

									<p className="text-xs text-slate-500">
										Delivery by{" "}
										<span className="font-medium text-slate-700">
											{item.deliveryDate}
										</span>
									</p>
								</div>

								{/* Bottom Section */}
								<div className="flex items-center justify-between mt-5">
									{/* Price */}
									<div className="flex items-center gap-3">
										<span className="text-slate-400 line-through text-sm">
											₹{item.mrp}
										</span>
										<span className="text-xl font-bold text-slate-900">
											₹{item.price}
										</span>
										<span className="text-xs font-semibold bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
											{item.off}% OFF
										</span>
									</div>

									{/* Quantity */}
									<div className="flex items-center gap-6">
										<div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
											<button
												className="px-3 py-1 text-lg hover:bg-slate-100"
												onClick={() =>
													dispatch(
														decreaseQuantity(
															item.id,
														),
													)
												}
											>
												−
											</button>

											<span className="px-4 text-sm font-medium">
												{item.quantity || 1}
											</span>

											<button
												className="px-3 py-1 text-lg hover:bg-slate-100"
												onClick={() =>
													dispatch(
														increaseQuantity(
															item.id,
														),
													)
												}
											>
												+
											</button>
										</div>

										<button
											onClick={() =>
												dispatch(
													removeItem(
														item.id,
													),
												)
											}
											className="text-sm text-red-500 hover:underline"
										>
											Remove
										</button>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* RIGHT SIDE - SUMMARY */}
				<div className="lg:col-span-1">
					<div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8 sticky top-24">
						<h2 className="text-2xl font-bold text-slate-800 mb-6">
							Order Summary
						</h2>

						<div className="space-y-4 text-sm">
							<div className="flex justify-between text-slate-600">
								<span>Total MRP</span>
								<span>₹{totalMrp}</span>
							</div>

							<div className="flex justify-between text-green-600 font-medium">
								<span>Discount</span>
								<span>-₹{totalDiscount}</span>
							</div>

							<div className="flex justify-between text-slate-600">
								<span>Shipping</span>
								<span className="text-green-600 font-medium">
									FREE
								</span>
							</div>

							<hr className="my-4" />

							<div className="flex justify-between text-lg font-semibold text-slate-900">
								<span>Total Amount</span>
								<span>₹{finalAmount}</span>
							</div>
						</div>

						<button className="w-full mt-8 bg-orange-500 hover:bg-orange-600 transition text-white py-3 rounded-xl font-semibold text-sm shadow-sm">
							Proceed to Checkout
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CartPage;
