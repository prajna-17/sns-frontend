"use client";

import { useSearchParams, useRouter } from "next/navigation";
// import { items } from "@/data/data";
import { useState, useMemo } from "react";
import Link from "next/link";
import { API } from "@/utils/api";
import { useEffect } from "react";

export default function ProductsClient() {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [products, setProducts] = useState([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const perPage = 8;

  const ratingFilter = Number(searchParams.get("rating")) || 0;
  const discountFilter = Number(searchParams.get("discount")) || 0;
  const maxPriceFilter = Number(searchParams.get("price")) || 0;

  const filteredItems = useMemo(() => {
    return products.filter((p) => {
      if (ratingFilter && p.rating < ratingFilter) return false;
      if (discountFilter && p.off < discountFilter) return false;
      if (maxPriceFilter && p.price > maxPriceFilter) return false;
      return true;
    });
  }, [products, ratingFilter, discountFilter, maxPriceFilter]);
  const totalPages = Math.ceil(filteredItems.length / perPage);

  const paginatedItems = filteredItems.slice(
    (page - 1) * perPage,
    page * perPage,
  );

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === "0") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    params.set("page", 1);
    router.push(`?${params.toString()}`);
  };

  const changePage = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage);
    router.push(`?${params.toString()}`);
  };
  const categoryFilter = searchParams.get("category") || "";
  const superCategoryFilter = searchParams.get("superCategory") || "";
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `${API}/products`;

        const queryParams = [];

        if (superCategoryFilter) {
          queryParams.push(`superCategory=${superCategoryFilter}`);
        }

        if (categoryFilter) {
          queryParams.push(`category=${categoryFilter}`);
        }

        if (queryParams.length > 0) {
          url += `?${queryParams.join("&")}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    fetchProducts();
  }, [categoryFilter, superCategoryFilter]);
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
        <div className={`filters-wrapper ${showMobileFilters ? "show" : ""}`}>
          <h3 className="filters-title">Filters</h3>

          <div className="filter-group">
            <label>Rating</label>
            <select
              onChange={(e) => updateParam("rating", e.target.value)}
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
              onChange={(e) => updateParam("price", e.target.value)}
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
              onChange={(e) => updateParam("discount", e.target.value)}
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
              href={`/products/${product._id}`}
              className="product-card"
              key={product._id}
            >
              <div className="product-img">
                <img src={product.images?.[0]} alt={product.title} />{" "}
              </div>

              <div className="product-title">{product.title}</div>

              <div className="product-rating">
                ⭐ {(Math.random() * (5 - 3.5) + 3.5).toFixed(1)}
              </div>
              <div className="product-price-row">
                {product.oldPrice && (
                  <span className="product-mrp">₹{product.oldPrice}</span>
                )}

                <span className="product-price">₹{product.price}</span>

                {product.oldPrice && (
                  <span className="product-offer">
                    {Math.round(
                      ((product.oldPrice - product.price) / product.oldPrice) *
                        100,
                    )}
                    % OFF
                  </span>
                )}
              </div>
            </Link>
          ))}

          {/* PAGINATION */}
          <div className="pagination-wrapper">
            <button disabled={page <= 1} onClick={() => changePage(page - 1)}>
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
