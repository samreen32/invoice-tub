import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InvoiceGenerated from "./components/CreateInvoice/InvoiceGenerated";
import AuthProvider from "./context/AuthContext";
import RP_Home from "./components/RecievePayment/RP_Home";
import ViewInvoice from "./components/RecievePayment/ViewInvoice";
import InvoiceForm from "./components/CreateInvoice/InvoiceForm";

function Stack() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<RP_Home />} />
          <Route exact path="/invoice" element={<InvoiceForm />} />
          <Route exact path="/invoice_generated" element={<InvoiceGenerated />} />
          <Route exact path="/view_invoice" element={<ViewInvoice />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default Stack;