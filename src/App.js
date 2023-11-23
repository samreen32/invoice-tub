import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InvoiceGenerated from "./components/InvoiceGenerated";
import AuthProvider from "./context/AuthContext";
import InvoiceForm from "./components/InvoiceForm";
import Invoice from "./components/Invoice";

function Stack() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Invoice />} />
          <Route exact path="/InvoiceGenerated" element={<InvoiceGenerated />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default Stack;