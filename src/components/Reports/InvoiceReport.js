import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import axios from "axios";
import { GET_ALL_INVOICES } from "../../Auth_API";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "../../context/AuthContext";
import { Toolbar } from "@mui/material";

export default function InvoiceReport() {
  let navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [invoices, setInvoices] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const { setInvoiceDetails } = UserLogin();
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const searchWords = searchQuery.split(" ");

  /* Endpoint integration for get all the invoices */
  useEffect(() => {
    const fetchUnpaidInvoices = async () => {
      try {
        const response = await axios.get(`${GET_ALL_INVOICES}`);
        console.log(response.data.invoices);
        setInvoices(
          response.data.invoices.map((invoice) => ({
            ...invoice,
            date: new Date(invoice.date).toLocaleDateString(),
          }))
        );
        const totalSum = response.data.invoices.reduce(
          (sum, invoice) => sum + invoice.total_amount,
          0
        );
        setTotalAmount(totalSum);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUnpaidInvoices();
  }, []);

  const columns = [
    { id: "invoice_num", label: "Invoice Number", minWidth: 170 },
    { id: "date", label: "Date", minWidth: 170 },
    { id: "bill_to", label: "Bill To", minWidth: 170 },
    { id: "PO_number", label: "PO Number", minWidth: 170 },
    { id: "PO_date", label: "PO Date", minWidth: 170 },
    { id: "type_of_work", label: "Type of Work", minWidth: 170 },
    { id: "job_site_num", label: "Job Site Number", minWidth: 170 },
    { id: "job_site_name", label: "Job Site Name", minWidth: 170 },
    { id: "job_location", label: "Job Location", minWidth: 170 },
    { id: "lot_no", label: "Lot Number", minWidth: 170 },
    { id: "total_amount", label: "Invoice Amount", minWidth: 170 },
    { id: "payment_status", label: "Payment Status", minWidth: 170 },
    {
      id: "add_payment",
      label: "Add Payment",
      minWidth: 170,
    },
  ];

  /* Table pagination */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleInvoicePayment = async (e, invoiceNum) => {
    e.preventDefault();
    setInvoiceDetails(invoiceNum);
    navigate("/pay_invoice");
  };

  /* Functions for Search Input Field */
  const handleSearchClick = () => {
    setIsExpanded(!isExpanded);
    setSearchQuery("");
  };

  return (
    <div style={{ marginTop: "2%" }}>
      <div id="invoice-generated">
        <div className="container px-5 py-5" style={{ width: "100%" }}>
          <>
            <h2
              style={{
                display: "flex",
                margin: "auto",
                justifyContent: "center",
              }}
            >
              <span
                onClick={() => {
                  navigate("/");
                }}
                style={{ cursor: "pointer", marginLeft: "-40%" }}
              >
                <i class="fa fa-chevron-left fa-1x" aria-hidden="true"></i>
              </span>
              <span style={{ cursor: "pointer", marginLeft: "40%" }}>
                {" "}
                Invoice Report
              </span>
            </h2>
            {/* Search field */}
            <>
              <Toolbar className="toolbar-search">
                <form className="d-flex search-form" role="search">
                  <div
                    className={`search-container ${
                      isExpanded ? "expanded" : ""
                    }`}
                  >
                    <button
                      onClick={handleSearchClick}
                      className="search-button"
                    >
                      <i className="fa fa-search"></i>
                    </button>
                    <input
                      className="search-input"
                      type="text"
                      placeholder="Search here..."
                      onClick={handleSearchClick}
                      onBlur={() => setIsExpanded(false)}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </form>
              </Toolbar>
            </>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 1000 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align="left"
                          style={{
                            minWidth: column.minWidth,
                            backgroundColor: "lightgrey",
                          }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {invoices
                      .filter((invoice) => {
                        const searchString = searchWords.map((word) =>
                          word.toLowerCase()
                        );
                        return (
                          searchString.some(
                            (word) =>
                              invoice.bill_to
                                .join(", ")
                                .toLowerCase()
                                .includes(word) ||
                              invoice.job_site_name.toLowerCase().includes(word)
                          ) ||
                          searchString.every(
                            (word) =>
                              invoice.bill_to
                                .join(", ")
                                .toLowerCase()
                                .includes(word) ||
                              invoice.job_site_name.toLowerCase().includes(word)
                          )
                        );
                      })
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((invoice) => (
                        <TableRow
                          key={invoice.invoice_num}
                          onClick={() => setInvoiceDetails(invoice.invoice_num)}
                          style={{ cursor: "pointer" }}
                        >
                          {columns.map((column) => (
                            <TableCell key={column.id} align="left">
                              {column.id === "date" ? (
                                new Date(invoice.date).toLocaleDateString()
                              ) : column.id === "bill_to" ? (
                                invoice.bill_to.join(", ")
                              ) : column.id === "payment_status" ? (
                                invoice.payment_status.toString()
                              ) : column.id === "total_amount" ? (
                                `$${invoice.total_amount.toFixed(2)}`
                              ) : column.id === "add_payment" ? (
                                invoice.payment_status ? (
                                  <>
                                    <i
                                      class="fa fa-check fa-2x"
                                      aria-hidden="true"
                                    ></i>
                                  </>
                                ) : (
                                  <>
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      onClick={(e) =>
                                        handleInvoicePayment(
                                          e,
                                          invoice.invoice_num
                                        )
                                      }
                                    >
                                      Add
                                    </Button>
                                  </>
                                )
                              ) : (
                                invoice[column.id]
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div className="total_amount_invoices py-4">
                <h6>
                  <b>Total: ${totalAmount.toFixed(2)}</b>
                </h6>
              </div>

              <TablePagination
                className="table-last-row-audio"
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={invoices.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </>
        </div>
      </div>
    </div>
  );
}
