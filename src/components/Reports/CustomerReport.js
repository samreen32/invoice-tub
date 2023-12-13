import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { GET_ALL_INVOICES } from "../../Auth_API";
import { UserLogin } from "../../context/AuthContext";
import { Toolbar } from "@mui/material";
import { useNavigate } from "react-router";

export default function CustomerReport() {
  let navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [invoices, setInvoices] = useState([]);
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
        setInvoices(response.data.invoices);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUnpaidInvoices();
  }, []);

  const columns = [
    { id: "id", label: "#", minWidth: 170 },
    { id: "bill_to", label: "Customer", minWidth: 170 },
  ];

  /* Table pagination */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
                Customer Report
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
                      .map((invoice, index) => (
                        <TableRow
                          key={invoice.invoice_num}
                          onClick={() => setInvoiceDetails(invoice.invoice_num)}
                          style={{ cursor: "pointer" }}
                        >
                          <TableCell align="left">{index + 1}</TableCell>
                          {columns.slice(1).map((column) => (
                            <TableCell key={column.id} align="left">
                              {column.id === "date"
                                ? new Date(invoice.date).toLocaleDateString()
                                : column.id === "bill_to"
                                ? invoice.bill_to.join(", ")
                                : invoice[column.id]}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>

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
