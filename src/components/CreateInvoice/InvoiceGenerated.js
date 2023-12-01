import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { UserLogin } from "../../context/AuthContext";
import logo from "../../assets/img/logo.png";
import { useNavigate } from "react-router";

function InvoiceGenerated() {
  let navigate = useNavigate();
  const { formData } = UserLogin();
  const [invoiceGenerated, setInvoiceGenerated] = useState(false);

  const generatePDF = () => {
    const pdf = new jsPDF();
    const pdfContent = document.getElementById("pdf");
    const contentHeight = pdfContent.clientHeight;
    const contentWidth = pdfContent.clientWidth;
    pdf.internal.pageSize.height = contentHeight;
    pdf.internal.pageSize.width = contentWidth;

    html2canvas(pdfContent, { scale: 1 }).then((canvas) => {
      const contentDataURL = canvas.toDataURL("image/png");
      pdf.addImage(contentDataURL, "PNG", 0, 0, contentWidth, contentHeight);
      pdf.save(`invoice.pdf`);
      pdf.internal.pageSize.height = 297;
      pdf.internal.pageSize.width = 210;
    });
    setInvoiceGenerated(true);
  };

  return (
    <div id="invoice-generated">
      <div className="row">
        <div className="col-3" style={{ marginTop: "40px" }}>
          <div className="add-container">
            <span
              onClick={() => {
                navigate("/");
              }}
              className="new-invoice-btn"
            >
              Generate new invoice
            </span>
          </div>
        </div>
        <div className="col-6">
          <h2>Invoice Details</h2>
        </div>
        <div className="col-3" style={{ marginTop: "50px" }}>
          <span onClick={generatePDF} className="new-invoice-btn">
            Save the PDF
            {/* <i class="fa fa-download fa-2x" aria-hidden="true"></i> */}
          </span>
        </div>
      </div>

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
                {formData.invoice && formData.invoice.invoice_num
                  ? formData.invoice.invoice_num
                  : ""}
              </p>

              <p>
                Date
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {formData.invoice && formData.invoice.date
                  ? new Date(formData.invoice.date).toLocaleDateString()
                  : ""}
              </p>
            </div>
          </div>

          <div className="bill_to_div px-5 ">
            <p>
              Bill To <br />
              {formData.bill_to.map((field, index) => (
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
              {formData.PO_number}
            </div>
            <div className="col">
              PO Date
              <br />
              {formData.PO_date}
              {/* {formData.invoice && formData.invoice.date
                ? new Date(formData.invoice.date).toLocaleDateString()
                : ""} */}
            </div>
            <div className="col">
              Type of Work
              <br />
              {formData.type_of_work}
            </div>
            <div className="col">
              Job Site No.
              <br />
              {formData.job_site_num}
            </div>
            <div className="col">
              Job Site Name
              <br />
              {formData.job_site_name}
            </div>
            <div className="col">
              Job Location
              <br />
              {formData.job_location}
            </div>
          </div>

          <div className="line"></div>
          <div className="row item_details_div px-5 ">
            <div className="col">
              Lot No.
              <br />
              {formData.lot_no}
            </div>
            <div className="col">
              Description
              <br />
              {formData.items.map((item, index) => (
                <span key={index}>
                  {item.description}
                  {index < formData.items.length - 1 && <br />}
                </span>
              ))}
            </div>
            <div className="col">
              Quantity
              <br />
              {formData.items.map((item, index) => (
                <span key={index}>
                  {item.quantity}
                  {index < formData.items.length - 1 && <br />}
                </span>
              ))}
            </div>
            <div className="col">
              Price Each
              <br />
              {formData.items.map((item, index) => (
                <span key={index}>
                  {item.price_each}
                  {index < formData.items.length - 1 && <br />}
                </span>
              ))}
            </div>
            <div className="col">
              Amount
              <br />
              {formData.items.map((item, index) => (
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
              Total Due &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; ${" "}
              {formData.invoice?.total_amount}
            </p>
            <h5>Thank You! We truly appreciate your business!</h5>
          </div>
        </div>
        {invoiceGenerated && (
          <h3>Thank you for using Tub Pro's, Inc for Invoice!</h3>
        )}
        <div className={invoiceGenerated ? "reg" : ""}></div>
      </div>
    </div>
  );
}

export default InvoiceGenerated;
