import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { UserLogin } from "../context/AuthContext";
import logo from "../assets/img/logo.png";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router";
import { INVOICE } from "../Auth_API";
import axios from "axios";
import Swal from "sweetalert2";
import { GrNext } from "react-icons/gr";

function Invoice() {
  let navigate = useNavigate();
  const { formData, setFormData } = UserLogin();
  const [invoiceGenerated, setInvoiceGenerated] = useState(false);

  /* Input field validation */
  const handleInputChange = (index, e) => {
    const { name, value } = e?.target || {};

    setFormData((prevData) => {
      if (index !== undefined) {
        const updatedItems = [...prevData.items];
        updatedItems[index] = {
          ...updatedItems[index],
          [name]: value,
        };

        const totalAmount = updatedItems.reduce(
          (total, item) =>
            total + (item.quantity || 0) * (item.price_each || 0),
          0
        );

        return {
          ...prevData,
          items: updatedItems,
          total_amount: totalAmount,
        };
      } else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  };

  /* Endpoint integration */
  const handleCreateInvoice = async () => {
    try {
      const response = await axios.post(`${INVOICE}`, formData);
      console.log("Invoice created successfully:", response.data);
      navigate(`/InvoiceGenerated`);
      setFormData((prevData) => ({
        ...prevData,
        invoice: {
          ...prevData.invoice,
          invoice_num: response.data.invoice.invoice_num,
          date: response.data.invoice.date,
          total_amount: response.data.invoice.total_amount,
        },
      }));
      {
        Swal.fire({
          icon: "success",
          title: "Success...",
          text: "Invoice Generated!",
        });
        return;
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to create invoice. Please try again later.",
      });
      console.error("Failed to create invoice:", error.message);
    }
  };

  const handleAddItem = () => {
    setFormData((prevData) => ({
      ...prevData,
      items: [
        ...prevData.items,
        {
          description: "",
          quantity: 0,
          price_each: 0,
          total_amount: 0,
        },
      ],
    }));
  };

  return (
    <div id="invoice-generated">
      <div style={{ display: "flex" }}>
        <h2>Please Enter your Invoice details</h2>
      </div>
      <div
        className="container px-5 py-5"
        style={{ width: "100%", marginTop: "5%" }}
      >
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
              <span
                onClick={handleCreateInvoice}
                style={{ float: "right", cursor: "pointer" }}
              >
                <i class="fa fa-chevron-right fa-2x" aria-hidden="true"></i>
              </span>
            </div>
          </div>

          <form>
            <div className="bill_to_div px-5 ">
              <p>
                Bill To <br />
                <TextField
                  id="bill_to"
                  type="text"
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  name="bill_to"
                  value={formData.bill_to}
                  onChange={(e) => handleInputChange(undefined, e)}
                />
              </p>
            </div>
            <br />

            <div className="row po_details_div px-5 ">
              <div className="col">
                PO Number
                <br />
                <TextField
                  id="po_num"
                  type="text"
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  name="PO_number"
                  value={formData.PO_number}
                  onChange={(e) => handleInputChange(undefined, e)}
                />
              </div>
              <div className="col">
                PO Date
                <br />
                <TextField
                  id="po_date"
                  type="text"
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  name="PO_date"
                  value={formData.PO_date}
                  onChange={(e) => handleInputChange(undefined, e)}
                />
              </div>
              <div className="col">
                Type of Work
                <br />
                <TextField
                  id="type_of_work"
                  type="text"
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  name="type_of_work"
                  value={formData.type_of_work}
                  onChange={(e) => handleInputChange(undefined, e)}
                />
              </div>
              <div className="col">
                Job Site No.
                <br />
                <TextField
                  id="job_site_no"
                  type="text"
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  name="job_site_num"
                  value={formData.job_site_num}
                  onChange={(e) => handleInputChange(undefined, e)}
                />
              </div>
              <div className="col">
                Job Site Name
                <br />
                <TextField
                  id="job_site_name"
                  type="text"
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  name="job_site_name"
                  value={formData.job_site_name}
                  onChange={(e) => handleInputChange(undefined, e)}
                />
              </div>
              <div className="col">
                Job Location
                <br />
                <TextField
                  id="job_location"
                  type="text"
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  name="job_location"
                  value={formData.job_location}
                  onChange={(e) => handleInputChange(undefined, e)}
                />
              </div>
            </div>

            <div className="line"></div>
            <div className="row item_details_div px-5 ">
              <div className="col">
                Lot No.
                <br />
                <TextField
                  id="lot_no"
                  variant="standard"
                  type="text"
                  InputProps={{ disableUnderline: true }}
                  name="lot_no"
                  value={formData.lot_no}
                  onChange={(e) => handleInputChange(undefined, e)}
                />
              </div>
              <div className="invoice-amount col">
                Amount <br />
                <TextField
                  id="amount"
                  variant="standard"
                  type="text"
                  InputProps={{ disableUnderline: true }}
                  readonly
                  value={`$${formData.total_amount || ""}`}
                />
              </div>
              {formData.items.map((item, index) => (
                <div className="row mt-3">
                  <div className="col">
                    {index === 0 && (
                      <span className="plus-icon" onClick={handleAddItem}>
                        <i className="fas fa-plus-circle"></i>
                      </span>
                    )}
                    Description
                    <br />
                    <TextField
                      id="description"
                      variant="standard"
                      type="text"
                      InputProps={{ disableUnderline: true }}
                      name="description"
                      value={item.description}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </div>
                  <div className="col">
                    Quantity
                    <br />
                    <TextField
                      id="quantity"
                      variant="standard"
                      type="number"
                      InputProps={{ disableUnderline: true }}
                      name="quantity"
                      value={item.quantity}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </div>
                  <div className="col">
                    Price Each
                    <br />
                    <TextField
                      id="price_each"
                      variant="standard"
                      type="text"
                      InputProps={{ disableUnderline: true }}
                      name="price_each"
                      value={item.price_each}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </div>
                </div>
              ))}

              <div className="col invoice-last-div px-5">
                <p>
                  Total Due &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
                  &nbsp;
                  <TextField
                    id="total_due"
                    variant="standard"
                    type="text"
                    InputProps={{ disableUnderline: true }}
                    readonly
                    value={`$${formData.total_amount || ""}`}
                  />
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Invoice;