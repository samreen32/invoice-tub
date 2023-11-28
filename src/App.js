import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InvoiceGenerated from "./components/InvoiceGenerated";
import AuthProvider from "./context/AuthContext";
import Invoice from "./components/Invoice";
import RP_Home from "./components/RecievePayment/RP_Home";
import Invoice_Form from "./components/RecievePayment/Invoice_Form";

function Stack() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* <Route exact path="/" element={<Invoice />} /> */}
          <Route exact path="/InvoiceGenerated" element={<InvoiceGenerated />} />
          <Route exact path="/" element={<RP_Home />} />
          <Route exact path="/invoice_form" element={<Invoice_Form />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default Stack;