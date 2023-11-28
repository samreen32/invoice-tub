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

  return (
    <AuthContext.Provider
      value={{
        invoiceDetails,
        setInvoiceDetails,
        formData,
        setFormData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserLogin = () => useContext(AuthContext);

export default AuthProvider;
