import React, { useState } from "react";
import { useNavigate } from "react-router";
import { TextField } from "@mui/material";
import axios from "axios";
import { GET_INVOICE } from "../../Auth_API";
import { UserLogin } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function RP_Home() {
  let navigate = useNavigate();
  const { setInvoiceDetails } = UserLogin();
  const [credentials, setCredentials] = useState({
    invoice_num: "",
  });
  const { invoice_num } = credentials;

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  /* Endpoint function that gets invoice */
  const handleInvoiceForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`${GET_INVOICE}/${invoice_num}`);
      const invoiceDetails = response.data.invoice;
      setInvoiceDetails(invoiceDetails);
      console.log(response.data.invoice, "invoice");
      const element = document.querySelectorAll(".modal-backdrop");
      element.forEach((item) => {
        item.style.display = "none";
      });
      document.body.style.overflow = "auto";

      navigate("/view_invoice");
    } catch (error) {
      console.error("Error fetching invoice details:", error.message);
    }
  };

  return (
    <div style={{ marginTop: "10%" }}>
      <div class="d-flex justify-content-center align-items-center">
        <div class="d-flex text-center">
          <div class="ag-format-container">
            <div class="ag-courses_box">
              <div class="ag-courses_item">
                <Link to="/invoice" class="ag-courses-item_link">
                  <div class="ag-courses-item_bg"></div>

                  <div class="ag-courses-item_title">Generate Invoice</div>
                  <div class="ag-courses-item_date-box">Generate</div>
                </Link>
              </div>
              <div class="ag-courses_item">
                <Link
                  class="ag-courses-item_link"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <div class="ag-courses-item_bg"></div>
                  <div class="ag-courses-item_title">Recieve Payment</div>
                  <div class="ag-courses-item_date-box">Recieve</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal --> */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Invoice Number
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              Enter Invoice Number
              <TextField
                // variant="standard"
                placeholder="e.g. 8900"
                name="invoice_num"
                value={invoice_num}
                type="text"
                onChange={onChange}
                margin="normal"
                sx={{ width: "100%" }}
                required
                // error={error && !isValidEmail(email)}
                // helperText={error && !isValidEmail(email) && "Enter a valid email!"}
              />
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleInvoiceForm}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
