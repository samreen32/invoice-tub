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
import { GET_UNPAID_INVOICES } from "../../Auth_API";
import { Link, useNavigate } from "react-router-dom";

export default function NonPayment_Report() {
  let navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [invoices, setInvoices] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  /* Endpoint integration */
  useEffect(() => {
    const fetchUnpaidInvoices = async () => {
      try {
        const response = await axios.get(`${GET_UNPAID_INVOICES}`);
        console.log(response.data.invoices);
        setInvoices(
          response.data.invoices.map((invoice) => ({
            ...invoice,
            date: new Date(invoice.date).toLocaleDateString(),
          }))
        );
        // Calculate the total sum of total_amount
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
    { id: "total_amount", label: "Invoice Amount", minWidth: 170 },
    { id: "paid_to_date", label: "Paid to Date", minWidth: 170 },
    { id: "total_amount", label: "Due", minWidth: 170 },
  ];

  /* Table pagination */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
                style={{ cursor: "pointer", marginLeft: "-33%" }}
              >
                <i class="fa fa-chevron-left fa-1x" aria-hidden="true"></i>
              </span>
              <span style={{ cursor: "pointer", marginLeft: "33%" }}>
                Unpaid Invoice Report
              </span>
            </h2>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 400 }}>
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
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((invoice) => (
                        <TableRow key={invoice._id}>
                          {columns.map((column) => (
                            <TableCell key={column.id} align="left">
                              {column.id === "paid_to_date"
                                ? "$0.00"
                                : column.id === "total_amount"
                                ? `$${invoice.total_amount}`
                                : column.format &&
                                  typeof invoice[column.id] === "number"
                                ? column.format(invoice[column.id])
                                : invoice[column.id]}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div className="total_unpaid_invoices px-3 py-4">
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
