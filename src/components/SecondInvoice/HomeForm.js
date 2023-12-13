import React, { useEffect, useState } from "react";
import { UserLogin } from "../../context/AuthContext";
import logo from "../../assets/img/logoSecond.png";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { CREATE_ESTIMATE_INVOICE } from "../../Auth_API";

function HomeForm() {
  let navigate = useNavigate();
  const { estimateData, setEstimateData } = UserLogin();
  const [visibleAddressFields, setVisibleAddressFields] = useState(1);
  const [focusedField, setFocusedField] = useState(null);

  /* Input field validation */
  const handleInputChange = (index, e) => {
    const { name, value } = e?.target || {};

    setEstimateData((prevData) => {
      if (index !== undefined) {
        const updatedItems = [...prevData.items];
        updatedItems[index] = {
          ...updatedItems[index],
          [name]: value,
        };

        const totalAmount = updatedItems.reduce(
          (total, item) =>
            total + (item.estimate_quantity || 0) * (item.estimate_cost || 0),
          0
        );

        return {
          ...prevData,
          items: updatedItems,
          estimate_total: totalAmount,
        };
      } else {
        if (
          name === "estimate_address_1" ||
          name === "estimate_address_2" ||
          name === "estimate_address_3"
        ) {
          const updatedAddress = [...prevData.estimate_address];
          const fieldIndex = Number(name.split("_")[2]);
          updatedAddress[fieldIndex - 1] = value;

          return {
            ...prevData,
            estimate_address: updatedAddress,
          };
        } else {
          return {
            ...prevData,
            [name]: value,
          };
        }
      }
    });
  };

  /* Endpoint integration */
  const handleCreateInvoice = async () => {
    try {
      const response = await axios.post(
        `${CREATE_ESTIMATE_INVOICE}`,
        estimateData
      );
      console.log("Invoice created successfully:", response.data);
      //   navigate(`/invoice_generated`);
      setEstimateData((prevData) => ({
        ...prevData,
        estimate_invoice: {
          ...prevData.estimate_invoice,
          estimate_no: response.data.estimate_invoice.estimate_no,
          estimate_date: response.data.estimate_invoice.estimate_date,
          estimate_total: response.data.estimate_invoice.estimate_total,
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
    setEstimateData((prevData) => ({
      ...prevData,
      items: [
        ...prevData.items,
        {
          estimate_item: "",
          estimate_description: "",
          estimate_quantity: 0,
          estimate_cost: 0,
          estimate_total: 0,
        },
      ],
    }));
  };

  /* Press enter key to add new field as well as key focus */
  const handleAddressEnterKey = (e, fieldIndex) => {
    if (e.key === "Enter") {
      const nextVisibleFields = Math.min(visibleAddressFields + 1, 3);
      setVisibleAddressFields(nextVisibleFields);
      setFocusedField(nextVisibleFields - 1);
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (focusedField !== null) {
      const inputRef = document.getElementById(
        `estimate_address_${focusedField + 1}`
      );
      if (inputRef) {
        inputRef.focus();
      }
    }
  }, [focusedField]);

  //   const isValidDateFormat = (inputDate) => {
  //     // Implement your date format validation logic here
  //     // For example, you can use a regular expression to check the format
  //     const dateFormatRegex = /^\d{2}\/\d{2}\/\d{2}$/;
  //     return dateFormatRegex.test(inputDate);
  //   };

  return (
    <div id="invoice-generated">
      <div className="row">
        <div className="col-md-2">
          <span
            onClick={() => {
              navigate("/");
            }}
            style={{ cursor: "pointer" }}
          >
            <i class="fa fa-chevron-left fa-1x" aria-hidden="true"></i>
          </span>
        </div>
        <div className="col-md-8">
          <span style={{ cursor: "pointer" }}>
            <h2>Please Enter your Invoice details</h2>
          </span>
        </div>
        <div className="col-md-2">
          <span onClick={handleCreateInvoice} style={{ cursor: "pointer" }}>
            <i class="fa fa-chevron-right fa-1x" aria-hidden="true"></i>
          </span>
        </div>
      </div>
      <div
        className="container px-5 py-5"
        style={{ width: "100%", marginTop: "5%" }}
      >
        <>
          <div className="row">
            <div className="invoice-first-div col-10 px-5">
              <address className="mt-3 px-3">
                H FLOOR COVERING LLC <br />
                1148 BLAKES FIELD PL <br />
                HENDERSON NV 89011
              </address>
            </div>
            <div className="col-2">
              <h4 style={{ textAlign: "center" }}>Estimate</h4>
              <img src={logo} alt="logo tub" />
            </div>
          </div>

          <form>
            <div className="estimate_address_div px-5">
              <p>
                Name/Address <br />
                {[1, 2, 3].map(
                  (fieldIndex) =>
                    fieldIndex <= visibleAddressFields && (
                      <React.Fragment key={`estimate_address_${fieldIndex}`}>
                        <TextField
                          id={`estimate_address_${fieldIndex}`}
                          type="text"
                          variant="standard"
                          name={`estimate_address_${fieldIndex}`}
                          style={{ width: "60%" }}
                          value={
                            estimateData.estimate_address[fieldIndex - 1] || ""
                          }
                          onChange={(e) => handleInputChange(undefined, e)}
                          onKeyDown={(e) =>
                            handleAddressEnterKey(e, fieldIndex)
                          }
                        />
                        <br />
                      </React.Fragment>
                    )
                )}
              </p>
            </div>
            <br />
            <br />

            <div className="row estimate_details_div px-5 ">
              <div className="col">
                Date
                <br />
                <TextField
                  id="estimate_date"
                  type="date"
                  variant="standard"
                  name="estimate_date"
                  InputProps={{ disableUnderline: true }}
                  value={estimateData.estimate_date}
                  onChange={(e) => handleInputChange(undefined, e)}
                  placeholder="MM/DD/YY"
                />
              </div>
              <div className="col">
                Estimate No.
                <br />
                <TextField
                  id="estimate_no"
                  type="text"
                  variant="standard"
                  name="estimate_no"
                  InputProps={{ disableUnderline: true }}
                  value={estimateData.estimate_no}
                  readonly
                />
              </div>
              <div className="col">
                Project
                <br />
                <TextField
                  id="estimate_project"
                  type="text"
                  variant="standard"
                  name="estimate_project"
                  InputProps={{ disableUnderline: true }}
                  value={estimateData.estimate_project}
                  onChange={(e) => handleInputChange(undefined, e)}
                />
              </div>
            </div>

            <div className="line"></div>
            <br />

            <div className="row item_details_div px-5">
              <div className="col">
                <span className="plus-icon" onClick={handleAddItem}>
                  <i className="fas fa-plus-circle"></i>
                </span>
                &nbsp; Item
              </div>
              <div className="col"> Description</div>
              <div className="col">Quantity</div>
              <div className="col">Cost</div>
              <div className="col">Total</div>
            </div>

            <div className="row item_details_div px-5">
              <React.Fragment>
                {estimateData.items.map((item, index) => (
                  <div className="row" style={{ marginTop: "-25px" }}>
                    <div className="col">
                      <TextField
                        id="estimate_item"
                        variant="standard"
                        type="text"
                        name="estimate_item"
                        value={item.estimate_item}
                        onChange={(e) => handleInputChange(index, e)}
                      />
                    </div>
                    <div className="col">
                      <TextField
                        id="estimate_description"
                        variant="standard"
                        type="text"
                        name="estimate_description"
                        value={item.estimate_description}
                        onChange={(e) => handleInputChange(index, e)}
                      />
                    </div>
                    <div className="col">
                      <TextField
                        id="estimate_quantity"
                        variant="standard"
                        type="number"
                        name="estimate_quantity"
                        value={item.estimate_quantity}
                        onChange={(e) => handleInputChange(index, e)}
                        style={{ width: "50%" }}
                      />
                    </div>
                    <div className="col">
                      <TextField
                        id="estimate_cost"
                        variant="standard"
                        type="text"
                        name="estimate_cost"
                        value={item.estimate_cost}
                        onChange={(e) => handleInputChange(index, e)}
                        style={{ width: "50%" }}
                      />
                    </div>
                    <div className="col my-2">
                      <TextField
                        id="estimate_total"
                        variant="standard"
                        type="text"
                        InputProps={{ disableUnderline: true }}
                        readonly
                        value={`${"    "}$ ${
                          (item.estimate_quantity || 0) *
                          (item.estimate_cost || 0)
                        }`}
                      />
                    </div>
                  </div>
                ))}
                <br />
              </React.Fragment>

              <div className="invoice-last-div">
                <div className="row">
                  <div className="col-md-8">
                    <span>All jobs are completely guaranteed</span>
                  </div>
                  <div className="col-md-2">
                    <span>Total </span>${estimateData.estimate_total || ""}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </>
      </div>
    </div>
  );
}

export default HomeForm;
