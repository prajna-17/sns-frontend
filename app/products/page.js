"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { items } from "@/data/data";
import { useState, useMemo } from "react";
import Link from "next/link";

export default function ProductsPage() {
	const [showMobileFilters, setShowMobileFilters] = useState(false);

	const router = useRouter();
	const searchParams = useSearchParams();

	// Pagination
	const page = Number(searchParams.get("page")) || 1;
	const perPage = 8;

	// Filters
	const ratingFilter = Number(searchParams.get("rating")) || 0;
	const discountFilter = Number(searchParams.get("discount")) || 0;
	const maxPriceFilter = Number(searchParams.get("price")) || 0;

	// ✅ Filter logic
	const filteredItems = useMemo(() => {
		return items.filter((p) => {
			if (ratingFilter && p.rating < ratingFilter) return false;
			if (discountFilter && p.off < discountFilter) return false;
			if (maxPriceFilter && p.price > maxPriceFilter) return false;
			return true;
		});
	}, [ratingFilter, discountFilter, maxPriceFilter]);

	const totalPages = Math.ceil(filteredItems.length / perPage);
	const paginatedItems = filteredItems.slice(
		(page - 1) * perPage,
		page * perPage,
	);

	const updateParam = (key, value) => {
		const params = new URLSearchParams(searchParams.toString());

		if (value === "0" || value === 0) {
			params.delete(key);
		} else {
			params.set(key, value);
		}

		params.set("page", 1); // reset page on filter change
		router.push(`?${params.toString()}`);
	};

	const changePage = (newPage) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", newPage);
		router.push(`?${params.toString()}`);
	};

	return (
		<div className="products-page">
			{/* HEADER */}
			<div className="category-header">
				<h1 className="category-title">All Products</h1>
			</div>

			{/* MOBILE FILTER BUTTON */}
			<button
				className="mobile-filter-btn"
				onClick={() => setShowMobileFilters(true)}
			>
				Filters
			</button>

			<div
				className={`filters-backdrop ${showMobileFilters ? "show" : ""}`}
				onClick={() => setShowMobileFilters(false)}
			></div>

			<div className="category-content-wrapper">
				{/* FILTER SIDEBAR */}
				<div
					className={`filters-wrapper ${showMobileFilters ? "show" : ""}`}
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

				{/* PRODUCTS GRID */}
				<div className="category-products">
					{paginatedItems.map((product) => (
						<Link
							href={`/products/${product.id}`}
							className="product-card"
							key={product.id}
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

					{/* PAGINATION */}
					<div className="pagination-wrapper">
						<button
							disabled={page <= 1}
							onClick={() => changePage(page - 1)}
						>
							Prev
						</button>

						<span>
							{page} / {totalPages || 1}
						</span>

						<button
							disabled={page >= totalPages}
							onClick={() => changePage(page + 1)}
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
