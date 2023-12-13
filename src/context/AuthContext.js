import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [invoiceDetails, setInvoiceDetails] = useState(null);
  const [formData, setFormData] = useState({
    bill_to: [""],
    PO_number: "",
    PO_date: "",
    type_of_work: "",
    job_site_num: "",
    job_site_name: "",
    job_location: "",
    lot_no: "",
    items: [
      {
        description: "",
        quantity: "",
        price_each: "",
      },
    ],
    invoice: {
      invoice_num: null,
      date: null,
      total_amount: null,
    },
  });

  /* Estimate Invoice credentials */
  const generateRandomNumber = () => {
    return Math.floor(10000 + Math.random() * 90000);
  };

  const [estimateInvoiceDetails, setEstimateInvoiceDetails] = useState(null);
  const [estimateData, setEstimateData] = useState({
    estimate_no: generateRandomNumber(),
    estimate_address: [""],
    estimate_date: "",
    estimate_project: "",
    items: [
      {
        estimate_item: "",
        estimate_description: "",
        estimate_quantity: "",
        estimate_cost: "",
      },
    ],
    estimate_invoice: {
      estimate_total: null,
    },
  });

  return (
    <AuthContext.Provider
      value={{
        invoiceDetails,
        setInvoiceDetails,
        formData,
        setFormData,
        estimateInvoiceDetails,
        setEstimateInvoiceDetails,
        estimateData,
        setEstimateData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserLogin = () => useContext(AuthContext);

export default AuthProvider;
