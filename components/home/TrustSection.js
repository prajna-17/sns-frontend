"use client";

import React from "react";
import { Truck, CreditCard, ShieldCheck, Headphones } from "lucide-react";

export default function TrustSection() {
  return (
    <div className="px-4 mt-2">
      <div className="grid grid-cols-2 gap-4">
        {/* Free Shipping */}
        <div className="bg-white rounded-3xl p-6 text-center shadow-sm">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <Truck size={28} />
          </div>
          <h4 className="font-semibold text-lg text-gray-800">Free Shipping</h4>
          <p className="text-gray-500 text-sm mt-1">On orders above ₹499</p>
        </div>

        {/* Flexible Payment */}
        <div className="bg-white rounded-3xl p-6 text-center shadow-sm">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500 flex items-center justify-center text-white">
            <CreditCard size={28} />
          </div>
          <h4 className="font-semibold text-lg text-gray-800">
            Flexible Payment
          </h4>
          <p className="text-gray-500 text-sm mt-1">Multiple payment options</p>
        </div>

        {/* Authentic Products */}
        <div className="bg-white rounded-3xl p-6 text-center shadow-sm">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center text-white">
            <ShieldCheck size={28} />
          </div>
          <h4 className="font-semibold text-lg text-gray-800">
            Authentic Products
          </h4>
          <p className="text-gray-500 text-sm mt-1">100% genuine guarantee</p>
        </div>

        {/* Convenient Help */}
        <div className="bg-white rounded-3xl p-6 text-center shadow-sm">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-500 flex items-center justify-center text-white">
            <Headphones size={28} />
          </div>
          <h4 className="font-semibold text-lg text-gray-800">
            Convenient Help
          </h4>
          <p className="text-gray-500 text-sm mt-1">24/7 customer support</p>
        </div>
      </div>
    </div>
  );
}
