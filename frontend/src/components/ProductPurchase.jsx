import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductPurchase = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!productName || !productPrice) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/create", {
        itemName: productName,
        totalPrice: parseFloat(productPrice),
      });

      if (response.data.success) {
        navigate("/order", { state: response.data.data });
      } else {
        setError(response.data.message || "Failed to process purchase");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Network error occurred");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Checkout Now
          </h1>
          <p className="text-gray-600">
            Enter product details to complete your purchase
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition duration-300"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label
              htmlFor="productPrice"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Product Price (Rs)
            </label>
            <input
              type="number"
              id="productPrice"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition duration-300"
              placeholder="Enter price in Nepali Rupees"
              step="0.01"
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 px-6 text-lg font-semibold rounded-lg transition duration-300 ${
              isLoading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white transform hover:scale-101"
            }`}
          >
            {isLoading ? "Processing Purchase..." : "Complete Purchase"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductPurchase;
