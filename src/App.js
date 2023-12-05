import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InvoiceGenerated from "./components/CreateInvoice/InvoiceGenerated";
import AuthProvider from "./context/AuthContext";
import RP_Home from "./components/RecievePayment/RP_Home";
import ViewInvoice from "./components/RecievePayment/ViewInvoice";
import InvoiceForm from "./components/CreateInvoice/InvoiceForm";
import NonPayment_Report from "./components/Reports/NonPayment_Report";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<RP_Home />} />
          <Route exact path="/invoice" element={<InvoiceForm />} />
          <Route exact path="/invoice_generated" element={<InvoiceGenerated />} />
          <Route exact path="/view_invoice" element={<ViewInvoice />} />
          <Route exact path="/unpaid_invoice_report" element={<NonPayment_Report />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;