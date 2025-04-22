import { FaCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ThankYouPage = () => {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const encodedData = params.get("data");

        if (!encodedData) {
          throw new Error("No transaction data found");
        }

        const response = await axios.get(
          `http://localhost:3000/api/create/verify?data=${encodeURIComponent(
            encodedData
          )}`
        );

        if (response.data.success) {
          setOrderData(response.data.data.updatedItem);
        } else {
          throw new Error(
            response.data.message || "Payment verification failed"
          );
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-8 text-center">
        <div className="flex justify-center text-green-500 mb-6">
          <FaCheckCircle className="text-6xl" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Thank You for Your Order!
        </h1>

        {loading ? (
          <div className="space-y-4">
            <div className="animate-pulse flex justify-center">
              <div className="h-4 w-48 bg-gray-200 rounded"></div>
            </div>
            <p className="text-gray-600">Verifying your payment...</p>
          </div>
        ) : error ? (
          <>
            <p className="text-red-500 mb-6 p-3 bg-red-50 rounded-lg">
              {error}
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Go to Home
            </Link>
          </>
        ) : (
          <>
            <p className="text-lg text-gray-600 mb-6">
              Your payment was successful!
            </p>

            {orderData && (
              <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Order Summary
                </h2>
                <div className="space-y-3">
                  <p className="flex justify-between">
                    <span className="text-gray-600 font-medium whitespace-nowrap">
                      Transaction ID: 
                    </span>
                    <span className="text-gray-800 pl-2 whitespace-nowrap "> 
                      {orderData.transactionId}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600 font-medium">Amount:</span>
                    <span className="text-gray-800 ">
                      Rs{" "}
                      {orderData.decodedData?.total_amount ||
                        orderData.totalPrice}
                    </span>
                  </p>

                  <p className="flex justify-between">
                    <span className="text-gray-600 font-medium">Status:</span>
                    <span className="text-green-600  font-medium capitalize">
                      {orderData.status}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600 font-medium">
                      Payment Method:
                    </span>
                    <span className="text-gray-800 capitalize">
                      {orderData.paymentMethod}
                    </span>
                  </p>
                </div>
              </div>
            )}

            <Link
              to="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200 w-full"
            >
              Return to Home
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default ThankYouPage;
