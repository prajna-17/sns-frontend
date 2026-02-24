import ProductsClient from "@/components/products/ProductsClient";
import { Suspense } from "react";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-10">Loading products...</div>}>
      <ProductsClient />
    </Suspense>
  );
}
