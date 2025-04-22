import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPurchase from "./components/ProductPurchase";
import OrderPage from "./components/OrderPage";
import ThankYouPage from "./components/ThankYouPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductPurchase />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/thankyou" element={<ThankYouPage />} />
      </Routes>
    </Router>
  );
};

export default App;
