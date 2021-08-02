import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  Button,
  Box,
  Divider,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from "@material-ui/core";
import IconEnter from "../assets/enter-icon.png";
import IconEdit from "../assets/edit.png";
import actions from "src/store/actions";

const useStyles = makeStyles(() => ({
  gray: { color: "gray" },
  totalContainer: { width: "36ch", marginRight: 28 },
}));

const initForm = {
  name: "",
  phone: "",
  address: "",
  email: "",
  pincode: "",

  productName: "",
  productQuantity: 0,
  productPrice: 0,

  tax: 0,
  discount: 0,
  products: [],
};

const ProductDialog = ({ handleClose, modalOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initForm);
  const [items, setItems] = useState([]);

  const resetForm = () => {
    setForm(initForm);
    setStep(0);
    setItems([]);
  };

  const proceed = () => {
    if (step === 0) {
      setStep(1);
    } else {
      const invoice = {
        name: form.name,
        phone: form.phone,
        address: form.address,
        email: form.email,
        pincode: form.pincode,
        tax: form.tax,
        discount: form.discount,
        products: items,
      };
      dispatch(actions.invoiceActions.createInvoicesRequest(invoice));
      resetForm();
      handleClose();
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const _form = { ...form };
    _form[name] = value;
    setForm(_form);
  };

  const addProduct = () => {
    const _items = JSON.parse(JSON.stringify(items));
    _items.push({
      name: form.productName,
      quantity: form.productQuantity,
      price: form.productPrice,
    });
    setItems(_items);

    const _form = { ...form };
    _form.productName = "";
    _form.productQuantity = "";
    _form.productPrice = "";
    setForm(_form);
  };

  const editCustomer = () => {
    setStep(0);
  };

  const getSubTotal = () => {
    return items.reduce((acc, cur) => acc + parseFloat(cur.price), 0);
  };

  const getGrandTotal = () => {
    let subtotal = getSubTotal();
    const tax = form.tax ? (subtotal * form.tax) / 100 : 0;
    const discount = form.discount ? (subtotal * form.discount) / 100 : 0;
    return (subtotal + tax - discount).toFixed(2);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="create-new-invoice"
      open={modalOpen}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle id="create-new-invoice" onClose={handleClose}>
        Create New Invoice
      </DialogTitle>
      <DialogContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
          style={{ marginBottom: 18 }}
        >
          {step === 0 ? "CUSTOMER DETAILS" : "PRODUCT DETAILS"}
          {step === 1 && (
            <Box display="flex">
              <Box display="flex" flexDirection="column" alignItems="flex-end">
                <span>Customer Details</span>
                <span>{form.name}</span>
                <span>{form.email}</span>
              </Box>
              <Button aria-label="edit" onClick={editCustomer}>
                <img src={IconEdit} alt="edit" />
              </Button>
            </Box>
          )}
        </Box>
        <Divider />
        {step === 0 ? (
          <Box display="flex" flexDirection="column">
            <Box display="flex">
              <TextField
                label="Full Name"
                required
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                style={{ margin: 12 }}
                name="name"
                value={form.name}
                onChange={handleInputChange}
              />
              <TextField
                label="Phone Number"
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+91</InputAdornment>
                  ),
                }}
                fullWidth
                style={{ margin: 12 }}
                name="phone"
                value={form.phone}
                onChange={handleInputChange}
              />
            </Box>
            <Box display="flex">
              <TextField
                id="filled-multiline-static"
                label="Address"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                style={{ margin: 12, flex: 1 }}
                multiline
                rows={5}
                name="address"
                value={form.address}
                onChange={handleInputChange}
              />
              <Box
                display="flex"
                flexDirection="column"
                style={{ flex: 1, margin: 12 }}
              >
                <TextField
                  label="Email ID"
                  required
                  variant="outlined"
                  InputProps={{
                    shrink: true,
                  }}
                  fullWidth
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                />
                <TextField
                  label="Pincode"
                  variant="outlined"
                  InputProps={{
                    shrink: true,
                  }}
                  fullWidth
                  style={{ marginTop: 12 }}
                  name="pincode"
                  value={form.pincode}
                  onChange={handleInputChange}
                />
              </Box>
            </Box>
          </Box>
        ) : (
          <>
            <Table aria-label="Product items">
              <TableHead>
                <TableRow>
                  <TableCell align="left">ITEM</TableCell>
                  <TableCell align="center">QUANTITY</TableCell>
                  <TableCell align="center">PRICE - $</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((row, index) => (
                  <TableRow key={"productitem" + index}>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="center">{row.quantity}</TableCell>
                    <TableCell align="center">{row.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box display="flex" style={{ marginTop: 8, marginBottom: 8 }}>
              <TextField
                required
                placeholder="Please enter Item Name"
                variant="outlined"
                fullWidth
                size="small"
                style={{ marginRight: 12 }}
                name="productName"
                value={form.productName}
                onChange={handleInputChange}
              />
              <TextField
                required
                placeholder="0.00"
                variant="outlined"
                fullWidth
                size="small"
                style={{ marginRight: 12 }}
                name="productQuantity"
                value={form.productQuantity}
                onChange={handleInputChange}
              />
              <TextField
                required
                placeholder="0.00"
                variant="outlined"
                fullWidth
                size="small"
                style={{ marginRight: 12 }}
                name="productPrice"
                value={form.productPrice}
                onChange={handleInputChange}
              />
              <Button
                aria-label="delete"
                color="primary"
                variant="outlined"
                onClick={addProduct}
              >
                <img src={IconEnter} alt="enter" />
              </Button>
            </Box>
            <Divider />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              style={{ marginTop: 48 }}
            >
              <Box display="flex">
                <TextField
                  required
                  placeholder="Tax"
                  variant="outlined"
                  size="small"
                  type="number"
                  style={{ marginRight: 12 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                  name="tax"
                  value={form.tax}
                  onChange={handleInputChange}
                />
                <TextField
                  required
                  placeholder="Discount"
                  variant="outlined"
                  size="small"
                  type="number"
                  style={{ marginRight: 12 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                  name="discount"
                  value={form.discount}
                  onChange={handleInputChange}
                />
              </Box>
              <Box display="flex">
                <span style={{ marginRight: 32 }}>Sub Total</span>
                <span>${getSubTotal()}</span>
              </Box>
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions style={{ background: "lightgray" }}>
        {step === 1 && (
          <Box display="flex" style={{ flex: 1, marginLeft: 32 }}>
            <Box
              display="flex"
              flexDirection="column"
              style={{ marginRight: 24 }}
            >
              <span>Tax</span>
              <span>
                ${form.tax ? ((getSubTotal() * form.tax) / 100).toFixed(2) : 0}
              </span>
            </Box>
            <Box display="flex" flexDirection="column">
              <span>Discount</span>
              <span>
                $
                {form.discount
                  ? ((getSubTotal() * form.discount) / 100).toFixed(2)
                  : 0}
              </span>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              style={{ marginLeft: "auto" }}
            >
              <span>Grand Total</span>
              <span>${getGrandTotal()}</span>
            </Box>
          </Box>
        )}
        <Button autoFocus onClick={proceed} color="primary" variant="contained">
          {step === 0 ? "Proceed" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDialog;
