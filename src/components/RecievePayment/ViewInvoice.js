import React, { useState } from "react";
import logo from "../../assets/img/logo.png";
import { UserLogin } from "../../context/AuthContext";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { RECIEVE_PAYMENT } from "../../Auth_API";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export default function ViewInvoice() {
  let navigate = useNavigate();
  const { invoiceDetails } = UserLogin();
  const [paymentDetails, setPaymentDetails] = useState({
    installer: "",
    payment_date: "",
    payment_amount: "",
    check_num: "",
    payment_type: "",
  });

  const payment_type_select = [
    {
      value: "Check",
      label: "Check",
    },
    {
      value: "Cash",
      label: "Cash",
    },
  ];

  /* Endpoint integration */
  const handlePaymentSubmit = async () => {
    try {
      const response = await axios.put(
        `${RECIEVE_PAYMENT}/${invoiceDetails?.invoice_num}`,
        paymentDetails
      );
      console.log(response.data);
      navigate(`/invoice_generated`);
      {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Payment Recieved",
        });
        return;
      }
    } catch (error) {
      console.error(error.response.data);
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: "Failed to recieve payment. Please try again later.",
      });
    }
  };

  /* Input field onChange */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div style={{ marginTop: "2%" }}>
      <h2 style={{ display: "flex", margin: "auto", justifyContent: "center" }}>
        Recieve Payment Invoice
      </h2>
      <div id="invoice-generated">
        <div className="container px-5 py-5" style={{ width: "100%" }}>
          <>
            <div className="row">
              <div className="invoice-first-div col-8 px-5">
                <img src={logo} alt="logo tub" />
                <address className="mt-3 px-3">
                  Tub Pro's, Inc. <br />
                  P.O. Box 752524 <br />
                  Las Vegas, NV 89136 <br />
                  Office: (702)445-6232 <br />
                  Fax: (702) 445-6241
                </address>
              </div>
              <div className="col-4">
                <p className="invoice-details">
                  <em>
                    <b>Invoice</b>
                  </em>
                </p>
                <p>
                  Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {invoiceDetails && invoiceDetails?.invoice_num
                    ? invoiceDetails?.invoice_num
                    : ""}
                </p>

                <p>
                  Date
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {invoiceDetails && invoiceDetails?.date
                    ? new Date(invoiceDetails?.date).toLocaleDateString()
                    : ""}
                </p>
              </div>
            </div>
            <div className="installer-container">
              <h4>Installer</h4>
              <TextField
                id="installer"
                variant="standard"
                type="text"
                name="installer"
                value={paymentDetails.installer}
                onChange={handleChange}
              />
            </div>
            <div className="payment-recieve-container">
              <h4>Enter a payment</h4>
              <div className="row py-4">
                <div className="col">
                  Date
                  <TextField
                    id="payment_date"
                    variant="standard"
                    type="text"
                    name="payment_date"
                    value={paymentDetails.payment_date}
                    onChange={handleChange}
                  />
                </div>
                <div className="col">
                  Payment
                  <TextField
                    id="payment_amount"
                    variant="standard"
                    type="text"
                    name="payment_amount"
                    value={paymentDetails.payment_amount}
                    onChange={handleChange}
                  />
                </div>
                <div className="col">
                  Check/Card #
                  <TextField
                    id="check_num"
                    variant="standard"
                    type="text"
                    name="check_num"
                    value={paymentDetails.check_num}
                    onChange={handleChange}
                  />
                </div>
                <div className="col">
                  Payment Type
                  <TextField
                    id="payment_type"
                    variant="standard"
                    type="text"
                    name="payment_type"
                    style={{ width: "100%", marginTop: "8%" }}
                    value={paymentDetails.payment_type}
                    onChange={handleChange}
                    select
                    defaultValue="EUR"
                  >
                    {payment_type_select.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div className="col">
                  <div className="add-container">
                    <span
                      className="new-invoice-btn"
                      onClick={handlePaymentSubmit}
                    >
                      Add Payment
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bill_to_div px-5 ">
              <p>
                Bill To <br />
                {invoiceDetails?.bill_to.map((field, index) => (
                  <React.Fragment key={`bill_to_${index}`}>
                    {field}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            </div>

            <div className="row po_details_div px-5 ">
              <div className="col">
                PO Number
                <br />
                {invoiceDetails?.PO_number}
              </div>
              <div className="col">
                PO Date
                <br />
                {invoiceDetails?.PO_date}
              </div>
              <div className="col">
                Type of Work
                <br />
                {invoiceDetails?.type_of_work}
              </div>
              <div className="col">
                Job Site No.
                <br />
                {invoiceDetails?.job_site_num}
              </div>
              <div className="col">
                Job Site Name
                <br />
                {invoiceDetails?.job_site_name}
              </div>
              <div className="col">
                Job Location
                <br />
                {invoiceDetails?.job_location}
              </div>
            </div>

            <div className="line"></div>
            <div className="row item_details_div px-5 ">
              <div className="col">
                Lot No.
                <br />
                {invoiceDetails?.lot_no}
              </div>
              <div className="col">
                Description
                <br />
                {invoiceDetails?.items.map((item, index) => (
                  <span key={index}>
                    {item.description}
                    {index < invoiceDetails?.items.length - 1 && <br />}
                  </span>
                ))}
              </div>
              <div className="col">
                Quantity
                <br />
                {invoiceDetails?.items.map((item, index) => (
                  <span key={index}>
                    {item.quantity}
                    {index < invoiceDetails?.items.length - 1 && <br />}
                  </span>
                ))}
              </div>
              <div className="col">
                Price Each
                <br />
                {invoiceDetails?.items.map((item, index) => (
                  <span key={index}>
                    {item.price_each}
                    {index < invoiceDetails?.items.length - 1 && <br />}
                  </span>
                ))}
              </div>
              <div className="col">
                Amount
                <br />
                {invoiceDetails?.items.map((item, index) => (
                  <span key={index}>
                    {`${"    "}$ ${
                      (item.quantity || 0) * (item.price_each || 0)
                    }`}
                    <br />
                  </span>
                ))}
              </div>
            </div>

            <div className="invoice-last-div px-5">
              <p>
                Total Due &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                $ {invoiceDetails?.total_amount}
              </p>
            </div>
          </>
          {/* {invoiceGenerated && (
          <h3>Thank you for using Tub Pro's, Inc for Invoice!</h3>
        )}
        <div className={invoiceGenerated ? "reg" : ""}></div> */}
        </div>
      </div>
    </div>
  );
}
