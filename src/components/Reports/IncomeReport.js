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
import { GET_INCOME_INVOICE } from "../../Auth_API";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "../../context/AuthContext";

export default function IncomeReport() {
  let navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [invoices, setInvoices] = useState([]);
  const { setInvoiceDetails } = UserLogin();

  /* Endpoint integration for get all the invoices */
  useEffect(() => {
    const fetchIncomeInvoices = async () => {
      try {
        const response = await axios.get(`${GET_INCOME_INVOICE}`);
        console.log(response.data.invoices);
        setInvoices(response.data.invoices);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchIncomeInvoices();
  }, []);

  const columns = [
    { id: "invoice_num", label: "Invoice Number", minWidth: 170 },
    { id: "total_amount", label: "Invoice Amount", minWidth: 170 },
    { id: "date", label: "Date", minWidth: 170 },
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
              Income Report
            </h2>

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
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((invoice) => (
                        <TableRow
                          key={invoice.invoice_num}
                          style={{ cursor: "pointer" }}
                        >
                          {columns.map((column) => (
                            <TableCell key={column.id} align="left">
                              {column.id === "date"
                                ? invoice.payment_date
                                  ? new Date(
                                      invoice.payment_date
                                    ).toLocaleDateString()
                                  : "N/A"
                                : column.id === "total_amount"
                                ? `$${invoice.total_amount.toFixed(2)}`
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
