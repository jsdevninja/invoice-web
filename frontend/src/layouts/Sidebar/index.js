import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  List,
  ButtonBase,
  ListItem,
  makeStyles,
  Grid,
} from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    backgroundColor: "#424b56",
    maxWidth: "36ch",
    overflow: "auto",
  },
  empty: {
    minHeight: "64px",
    maxHeight: "64px",
  },
  title: {
    margin: 12,
    color: "gray",
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
    borderTop: "1px solid gray",
    "&:last-child": {
      borderBottom: "1px solid gray",
    },
  },
  item: {
    display: "block",
    paddingTop: 0,
    paddingBottom: 0,
  },
  itemLeaf: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    textTransform: "none",
    padding: 15,
    paddingLeft: 25,
    width: "100%",
  },
  number: {
    color: "white",
  },
  items: {
    marginRight: "auto",
    color: "white",
    marginTop: 8,
    marginBottom: 4,
  },
  date: {
    color: "gray",
    marginLeft: "auto",
  },
  name: {
    color: "darkblue",
  },
  price: {
    color: "white",
    marginLeft: "auto",
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const list = useSelector((state) => state.invoice.list);

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

  const getGrandTotal = (invoice) => {
    let subtotal = invoice.subtotal;
    const tax = invoice?.tax ? (subtotal * invoice?.tax) / 100 : 0;
    const discount = invoice?.discount
      ? (subtotal * invoice?.discount) / 100
      : 0;
    return (subtotal + tax - discount).toFixed(2);
  };

  return (
    <>
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        className={classes.root}
      >
        <div className={classes.empty} />
        <h5 className={classes.title}>Invoices - {list.length}</h5>
        <Box>
          {list.map((item) => (
            <List key={item.id} className={classes.list}>
              <ListItem disableGutters key={item.id} className={classes.item}>
                <ButtonBase
                  focusRipple
                  className={classes.button}
                  component={RouterLink}
                  to={"/invoice/" + item.id}
                >
                  <Grid container direction="row" alignItems="center">
                    <span className={classes.number}>INV. # - {item.id}</span>
                    <span className={classes.date}>
                      {getDate(item.createdAt)}
                    </span>
                  </Grid>
                  <span className={classes.items}>items - {item.products}</span>
                  <Grid container direction="row" alignItems="center">
                    <span className={classes.name}>{item.name}</span>
                    <span className={classes.price}>
                      ${getGrandTotal(item)}
                    </span>
                  </Grid>
                </ButtonBase>
              </ListItem>
            </List>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
