import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Box,
  Card,
  CardContent,
  makeStyles,
} from "@material-ui/core";
import actions from "src/store/actions";
import moment from "moment";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: 36,
    paddingRight: 36,
  },
  gray: { color: "gray" },
  totalContainer: { width: "36ch", marginRight: 28 },
}));

const Invoice = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const invoices = useSelector((state) => state.invoice.list);
  const [invoice, setInvoice] = useState();

  useEffect(() => {
    const invoiceId = props.match.params.invoiceId;
    dispatch(actions.productActions.getProductsRequest(invoiceId));
  }, [props]);

  useEffect(() => {
    const invoiceId = props.match.params.invoiceId;
    const curInv = invoices.find((inv) => inv.id === parseInt(invoiceId));
    if (curInv) setInvoice(curInv);
  }, [props.match.params.invoiceId, invoices]);

  const getSubTotal = () => {
    return products.reduce((acc, cur) => acc + parseFloat(cur.price), 0);
  };

  const getGrandTotal = () => {
    let subtotal = getSubTotal();
    const tax = invoice?.tax ? (subtotal * invoice?.tax) / 100 : 0;
    const discount = invoice?.discount
      ? (subtotal * invoice?.discount) / 100
      : 0;
    return (subtotal + tax - discount).toFixed(2);
  };

  const getDate = (date) => {
    return moment(date).calendar(null, {
      lastDay: "LT - [Yesterday]",
      sameDay: "LT - [Today]",
      nextDay: "LT - [Tomorrow]",
      lastWeek: "[last] dddd [at] LT",
      nextWeek: "dddd [at] LT",
      sameElse: "L",
    });
  };

  return invoice ? (
    <div className={classes.root}>
      <Box my={6} display="flex" alignItems="center">
        <h4>INVOICE DETAILS:</h4>
      </Box>
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" flexDirection="column">
              <h2>INVOICE</h2>
              <span># INV{invoice.id}</span>
              <span>{getDate(invoice.createdAt)}</span>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="flex-end">
              <span>CUSTOMER DETAILS</span>
              <span>{invoice.name}</span>
              <span>{invoice.email}</span>
            </Box>
          </Box>
          <Table className={classes.table} aria-label="Product items">
            <TableHead>
              <TableRow>
                <TableCell align="left" className={classes.gray}>
                  ITEM
                </TableCell>
                <TableCell align="center" className={classes.gray}>
                  QUANTITY
                </TableCell>
                <TableCell align="center" className={classes.gray}>
                  PRICE - $
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="center">{row.quantity}</TableCell>
                  <TableCell align="center">{row.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box
            display="flex"
            justifyContent="flex-end"
            style={{ marginTop: 32 }}
          >
            <Box
              display="flex"
              flexDirection="column"
              className={classes.totalContainer}
            >
              <Box display="flex" justifyContent="space-between">
                <span>Sub Total</span>
                <span>${getSubTotal()}</span>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <span>Tax {invoice.tax}(%)</span>
                <span>
                  $
                  {invoice.tax
                    ? ((getSubTotal() * invoice.tax) / 100).toFixed(2)
                    : 0}
                </span>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <span>Discount {invoice.discount}(%)</span>
                <span>
                  $
                  {invoice.discount
                    ? ((getSubTotal() * invoice.discount) / 100).toFixed(2)
                    : 0}
                </span>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                style={{ marginTop: 12 }}
              >
                <span>Grand Total</span>
                <span>${getGrandTotal()}</span>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  ) : (
    <div>Loading Invoice...</div>
  );
};

export default Invoice;
