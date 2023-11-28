import React from "react";
import logo from "../../assets/img/logo.png";
import { UserLogin } from "../../context/AuthContext";

export default function Invoice_Form() {
  const { invoiceDetails } = UserLogin();

  return (
    <div style={{ marginTop: "5%" }}>
      <div id="invoice-generated">
        <div className="container px-5 py-5" style={{ width: "100%" }}>
          <div id="pdf">
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
          </div>
          {/* {invoiceGenerated && (
          <h3>Thank you for using Tub Pro's, Inc for Invoice!</h3>
        )}
        <div className={invoiceGenerated ? "reg" : ""}></div> */}
        </div>
      </div>
    </div>
  );
}
