import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const OrderPage = () => {
  const location = useLocation();
  const orderData = location.state;
  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current && orderData) {
      formRef.current.submit();
    }
  }, [orderData]);

  if (!orderData) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="hidden-2xl font-bold hidden-gray-800 mb-6">
          Order Not Found
        </h1>
        <p>No order data available. Please complete a purchase first.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full hidden-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>

        <form
          ref={formRef}
          action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
          method="POST"
        >
          <input
            type="hidden"
            id="amount"
            name="amount"
            value={orderData.purchasedItem.totalPrice}
          />
          <input
            type="hidden"
            id="total_amount"
            name="total_amount"
            value={orderData.purchasedItem.totalPrice}
          />
          <input
            type="hidden"
            id="transaction_uuid"
            name="transaction_uuid"
            value={orderData.purchasedItem.transactionId}
          />
          <input
            type="hidden"
            id="product_code"
            name="product_code"
            value={orderData.paymentHash.productCode}
          />
          <input type="hidden" id="tax_amount" name="tax_amount" value="0" />
          <input
            type="hidden"
            id="product_service_charge"
            name="product_service_charge"
            value="0"
          />
          <input
            type="hidden"
            id="product_delivery_charge"
            name="product_delivery_charge"
            value="0"
          />
          <input
            type="hidden"
            id="success_url"
            name="success_url"
            value={`${import.meta.env.VITE_MAIN_URL}/thankyou`}
          />
          <input
            type="hidden"
            id="failure_url"
            name="failure_url"
            value={`${import.meta.env.VITE_MAIN_URL}`}
          />
          <input
            type="hidden"
            id="signed_field_names"
            name="signed_field_names"
            value={orderData.paymentHash.signed_field_names}
          />
          <input
            type="hidden"
            id="signature"
            name="signature"
            value={orderData.paymentHash.signature}
          />
        </form>
      </div>
    </div>
  );
};

export default OrderPage;
