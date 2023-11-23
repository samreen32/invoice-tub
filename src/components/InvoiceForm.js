import React, { useEffect } from "react";
import $ from "jquery";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { UserLogin } from "../context/AuthContext";
import { INVOICE } from "../Auth_API";

export default function InvoiceForm() {
  let navigate = useNavigate();
  const { formData, setFormData } = UserLogin();

  /* Input field validation */
  const handleInputChange = (index, e) => {
    const { name, value } = e?.target || {};

    setFormData((prevData) => {
      if (index !== undefined) {
        const updatedItems = prevData.items.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              [name]: value,
            };
          }
          return item;
        });

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

  /* jQuery */
  useEffect(() => {
    $(document).ready(() => {
      let regBtn = $(".container .register");

      regBtn.click(function (e) {
        e.preventDefault();
        $(this)
          .siblings(".reg")
          .css({
            transform: "translateY(40%) scale(5)",
            "border-radius": "0",
            width: "100%",
            height: "100%",
          })
          .end();

        regBtn
          .siblings(".container h3:nth-of-type(1)")
          .css({
            top: "40%",
            "z-index": "8",
          })
          .end()
          .end();
      });
    });
  }, []);

  /* Plus icon fields */
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

  const handleRemoveItem = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      items: prevData.items.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="container-fluid py-5">
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="800px"
        height="600px"
        viewBox="0 0 800 600"
        enableBackground="new 0 0 800 600"
        xmlSpace="preserve"
      >
        <linearGradient
          id="SVGID_1_"
          gradientUnits="userSpaceOnUse"
          x1="174.7899"
          y1="186.34"
          x2="330.1259"
          y2="186.34"
          gradientTransform="matrix(0.8538 0.5206 -0.5206 0.8538 147.9521 -79.1468)"
        >
          <stop offset="0" style={{ stopColor: "#FFC035" }} />
          <stop offset="0.221" style={{ stopColor: "#F9A639" }} />
          <stop offset="1" style={{ stopColor: "#E64F48" }} />
        </linearGradient>
        <circle fill="url(#SVGID_1_)" cx="266.498" cy="211.378" r="77.668" />
        <linearGradient
          id="SVGID_2_"
          gradientUnits="userSpaceOnUse"
          x1="290.551"
          y1="282.9592"
          x2="485.449"
          y2="282.9592"
        >
          <stop offset="0" style={{ stopColor: "#FFA33A" }} />
          <stop offset="0.0992" style={{ stopColor: "#E4A544" }} />
          <stop offset="0.9624" style={{ stopColor: "#00B59C" }} />
        </linearGradient>
        <circle fill="url(#SVGID_2_)" cx="388" cy="282.959" r="97.449" />
        <linearGradient
          id="SVGID_3_"
          gradientUnits="userSpaceOnUse"
          x1="180.3469"
          y1="362.2723"
          x2="249.7487"
          y2="362.2723"
        >
          <stop offset="0" style={{ stopColor: "#12B3D6" }} />
          <stop offset="1" style={{ stopColor: "#7853A8" }} />
        </linearGradient>
        <circle fill="url(#SVGID_3_)" cx="215.048" cy="362.272" r="34.701" />
        <linearGradient
          id="SVGID_4_"
          gradientUnits="userSpaceOnUse"
          x1="367.3469"
          y1="375.3673"
          x2="596.9388"
          y2="375.3673"
        >
          <stop offset="0" style={{ stopColor: "#12B3D6" }} />
          <stop offset="1" style={{ stopColor: "#7853A8" }} />
        </linearGradient>
        <circle fill="url(#SVGID_4_)" cx="482.143" cy="375.367" r="114.796" />
        <linearGradient
          id="SVGID_5_"
          gradientUnits="userSpaceOnUse"
          x1="365.4405"
          y1="172.8044"
          x2="492.4478"
          y2="172.8044"
          gradientTransform="matrix(0.8954 0.4453 -0.4453 0.8954 127.9825 -160.7537)"
        >
          <stop offset="0" style={{ stopColor: "#FFA33A" }} />
          <stop offset="1" style={{ stopColor: "#DF3D8E" }} />
        </linearGradient>
        <circle fill="url(#SVGID_5_)" cx="435.095" cy="184.986" r="63.504" />
      </svg>
      <div className="invoice-conatiner">
        <h1>Tub Pro's, Inc</h1>
      </div>
      <div class="container">
        <div>
          <h2>Invoice</h2>
        </div>
        <form>
          <div className="input-row">
            <input
              type="text"
              className="email"
              placeholder="Bill To"
              name="bill_to"
              value={formData.bill_to}
              onChange={(e) => handleInputChange(undefined, e)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="text"
              className="pwd"
              placeholder="PO Number e.g.(Crimson Ridge)"
              name="PO_number"
              value={formData.PO_number}
              onChange={(e) => handleInputChange(undefined, e)}
            />
          </div>
          <div className="input-row">
            <input
              type="text"
              className="email"
              placeholder="PO Date e.g. (11/11/2023)"
              name="PO_date"
              value={formData.PO_date}
              onChange={(e) => handleInputChange(undefined, e)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="text"
              className="pwd"
              placeholder="Type of Work e.g. (Tub Install)"
              name="type_of_work"
              value={formData.type_of_work}
              onChange={(e) => handleInputChange(undefined, e)}
            />
          </div>

          <div className="input-row">
            <input
              type="text"
              className="email"
              placeholder="Job Site No. e.g. (1234)"
              name="job_site_num"
              value={formData.job_site_num}
              onChange={(e) => handleInputChange(undefined, e)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="text"
              className="pwd"
              placeholder="Job Site Name e.g. (Mesquite)"
              name="job_site_name"
              value={formData.job_site_name}
              onChange={(e) => handleInputChange(undefined, e)}
            />
          </div>
          <div className="input-row">
            <input
              type="text"
              className="email"
              placeholder="Job Location e.g. (7427)"
              name="job_location"
              value={formData.job_location}
              onChange={(e) => handleInputChange(undefined, e)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="text"
              className="pwd"
              placeholder="Lot No. e.g. (189/6)"
              name="lot_no"
              value={formData.lot_no}
              onChange={(e) => handleInputChange(undefined, e)}
            />
          </div>

          <div className="line" style={{ marginTop: "50px" }}></div>
          <div>
            <h5>
              Number of Items{" "}
              <span className="plus-icon" onClick={handleAddItem}>
                <i className="fas fa-plus-circle"></i>
              </span>
            </h5>
          </div>
          {formData.items.map((item, index) => (
            <div key={index} className="input-row">
              <input
                type="text"
                className="email"
                placeholder="Description"
                name="description"
                value={item.description}
                onChange={(e) => handleInputChange(index, e)}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                className="pwd"
                placeholder="Quantity"
                name="quantity"
                value={item.quantity}
                onChange={(e) => handleInputChange(index, e)}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                className="email"
                placeholder="Price Each"
                name="price_each"
                value={item.price_each}
                onChange={(e) => handleInputChange(index, e)}
              />
              <span
                className="trash-icon mt-4 ml-4"
                onClick={() => handleRemoveItem(index)}
              >
                <i className="fas fa-trash"></i>
              </span>
            </div>
          ))}

          <div className="input-row py-4">
            <input
              type="text"
              className="pwd"
              placeholder="Amount"
              disabled
              value={`Amount $${formData.total_amount || ""}`}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="text"
              className="pwd"
              placeholder="Total Due"
              disabled
              value={`Total Due $${formData.total_amount || ""}`}
            />
          </div>
        </form>

        <br />
        <button className="register" onClick={handleCreateInvoice}>
          <span>Register</span>
        </button>
      </div>
    </div>
  );
}