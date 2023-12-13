import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InvoiceGenerated from "./components/CreateInvoice/InvoiceGenerated";
import AuthProvider from "./context/AuthContext";
import RP_Home from "./components/RecievePayment/RP_Home";
import ViewInvoice from "./components/RecievePayment/RecievePay_Invoice";
import InvoiceForm from "./components/CreateInvoice/InvoiceForm";
import NonPayment_Report from "./components/Reports/NonPayment_Report";
import InvoiceReport from "./components/Reports/InvoiceReport";
import IncomeReport from "./components/Reports/IncomeReport";
import CustomerReport from "./components/Reports/CustomerReport";
import Main from "./components/main";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        <Route exact path="/" element={<Main />} />
          {/* <Route exact path="/" element={<RP_Home />} /> */}
          <Route exact path="/invoice" element={<InvoiceForm />} />
          <Route exact path="/invoice_generated" element={<InvoiceGenerated />} />
          <Route exact path="/pay_invoice" element={<ViewInvoice />} />
          <Route exact path="/invoice_report" element={<InvoiceReport />} />
          <Route exact path="/unpaid_invoice_report" element={<NonPayment_Report />} />
          <Route exact path="/income_report" element={<IncomeReport />} />
          <Route exact path="/customer_report" element={<CustomerReport />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;