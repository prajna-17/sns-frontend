"use client";

import { useSearchParams, useRouter, useParams } from "next/navigation";
import { fakeItems } from "@/data/data";
import { useState } from "react";
import Link from "next/link";

const allowedCategories = ["electronics", "furniture"];

export default function CategoryPage() {
	const params = useParams();
	const { name } = params;
	const [showMobileFilters, setShowMobileFilters] = useState(false);

	const router = useRouter();
	const searchParams = useSearchParams();

	// Pagination Logic

	const page = Number(searchParams.get("page")) || 1;
	const perPage = 8;

	if (!allowedCategories.includes(name)) {
		return (
			<div className="p-10 text-red-600 text-3xl">
				Category not found
			</div>
		);
	}

	let items = fakeItems[name];

	const ratingFilter = Number(searchParams.get("rating")) || 0;
	const discountFilter = Number(searchParams.get("discount")) || 0;
	const maxPriceFilter = Number(searchParams.get("price")) || 0;

	items = items.filter((p) => {
		if (ratingFilter && p.rating < ratingFilter) return false;
		if (discountFilter && p.off < discountFilter) return false;
		if (maxPriceFilter && p.price > maxPriceFilter) return false;
		return true;
	});

	// Pagination slice
	const totalPages = Math.ceil(items.length / perPage);
	const paginatedItems = items.slice((page - 1) * perPage, page * perPage);

	const updateParam = (key, value) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set(key, value);
		router.push(`?${params.toString()}`);
	};

	return (
		<div className="category-page">
			{/* ---------------- TOP HEADER ---------------- */}
			<div className="category-header">
				<h1 className="category-title">{name.replace("-", " ")}</h1>
			</div>

			{/* ---------------- MOBILE FILTER BUTTON + BACKDROP ---------------- */}
			<button
				className="mobile-filter-btn"
				onClick={() => setShowMobileFilters(true)}
			>
				Filters
			</button>
			<div
				className={`filters-backdrop ${
					showMobileFilters ? "show" : ""
				}`}
				onClick={() => setShowMobileFilters(false)}
			></div>

			{/* ---------------- WRAPPER: FILTERS + CARDS ---------------- */}
			<div className="category-content-wrapper">
				{/* ---------------- FILTERS SIDEBAR / MOBILE POPUP ---------------- */}
				<div
					className={`filters-wrapper ${
						showMobileFilters ? "show" : ""
					}`}
				>
					<h3 className="filters-title">Filters</h3>

					<div className="filter-group">
						<label>Rating</label>
						<select
							onChange={(e) =>
								updateParam("rating", e.target.value)
							}
							value={ratingFilter}
						>
							<option value="0">Any</option>
							<option value="3">3★ & above</option>
							<option value="4">4★ & above</option>
							<option value="4.5">4.5★ & above</option>
						</select>
					</div>

					<div className="filter-group">
						<label>Max Price</label>
						<select
							onChange={(e) =>
								updateParam("price", e.target.value)
							}
							value={maxPriceFilter}
						>
							<option value="0">Any</option>
							<option value="10000">Under 10,000</option>
							<option value="20000">Under 20,000</option>
							<option value="30000">Under 30,000</option>
						</select>
					</div>

					<div className="filter-group">
						<label>Discount</label>
						<select
							onChange={(e) =>
								updateParam("discount", e.target.value)
							}
							value={discountFilter}
						>
							<option value="0">Any</option>
							<option value="10">10%+</option>
							<option value="20">20%+</option>
							<option value="30">30%+</option>
						</select>
					</div>

					<button
						className="mobile-filter-close mobile-only"
						onClick={() => setShowMobileFilters(false)}
					>
						Close X
					</button>
				</div>

				{/* ---------------- PRODUCT CARDS ---------------- */}
				<div className="category-products">
					{paginatedItems.map((product, index) => (
						<Link
							href={`/category/${name}/${product.id}`}
							className="product-card"
							key={index}
						>
							<div className="product-img">
								<img
									src={product.image}
									alt={product.title}
								/>
							</div>

							<div className="product-title">
								{product.title}
							</div>

							<div className="product-rating">
								⭐ {product.rating}
							</div>

							<div className="product-price-row">
								<span className="product-mrp">
									₹{product.mrp}
								</span>
								<span className="product-price">
									₹{product.price}
								</span>
								<span className="product-offer">
									{product.off}% OFF
								</span>
							</div>
						</Link>
					))}

					{/* ---------------- PAGINATION ---------------- */}
					<div className="pagination-wrapper">
						<button
							disabled={page <= 1}
							onClick={() => updateParam("page", page - 1)}
						>
							Prev
						</button>

						<span>
							{page} / {totalPages}
						</span>

						<button
							disabled={page >= totalPages}
							onClick={() => updateParam("page", page + 1)}
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
