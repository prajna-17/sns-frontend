"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { API } from "@/utils/api";

import ProductGallery from "@/components/details/ProductGallery";
import ProductInfo from "@/components/details/ProductInfo";
import ProductTabs from "@/components/details/ProductTabs";
import SimilarProducts from "@/components/details/SimilarProducts";
import StickyActionBar from "@/components/details/StickyActionBar";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`${API}/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="bg-[#f6f6f6] min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Responsive Wrapper */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT - Gallery */}
          <div className="lg:w-1/2">
            <ProductGallery images={product.images} />
          </div>

          {/* RIGHT - Info */}
          <div className="lg:w-1/2">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Below Section */}
        <ProductTabs product={product} />
        <SimilarProducts />
      </div>

      <StickyActionBar product={product} />
    </div>
  );
}
