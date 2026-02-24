export default function StickyActionBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex gap-4">
      <button className="flex-1 bg-[#f4c48f] py-3 rounded-xl font-semibold">
        Add To Cart
      </button>
      <button className="flex-1 bg-gray-700 text-white py-3 rounded-xl font-semibold">
        Buy Now
      </button>
    </div>
  );
}
