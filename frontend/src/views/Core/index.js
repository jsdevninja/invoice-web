import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  createStyles,
  jssPreset,
  makeStyles,
  StylesProvider,
  ThemeProvider,
  AppBar,
  Toolbar,
  Typography,
  Fab,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import rtl from "jss-rtl";
import { create } from "jss";

import routes from "./routes";
import LoadingScreen from "src/components/LoadingScreen";
import actions from "src/store/actions";
import ProductDialog from "src/components/ProductDialog";

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const useStyles = makeStyles(() =>
  createStyles({
    "@global": {
      "*": {
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
      },
      html: {
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
        height: "100%",
        width: "100%",
        fontFamily: "Arial, Helvetica, sans-serif",
      },
      body: {
        height: "100%",
        width: "100%",
      },
      "#root": {
        height: "100%",
        width: "100%",
      },
    },
  })
);

const theme = createMuiTheme({
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
});

const Core = () => {
  useStyles();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.global.isLoading);
  const [modalOpen, setOpen] = useState(false);

  useEffect(() => {
    dispatch(actions.invoiceActions.getInvoicesRequest());
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">Dashboard</Typography>
          <Fab
            color="secondary"
            aria-label="add"
            size="medium"
            onClick={handleOpen}
            style={{ marginLeft: "auto" }}
          >
            <AddIcon />
          </Fab>
        </Toolbar>
      </AppBar>
      <StylesProvider jss={jss}>{routes}</StylesProvider>
      {isLoading && <LoadingScreen />}
      <ProductDialog handleClose={handleClose} modalOpen={modalOpen} />
    </ThemeProvider>
  );
};

export default Core;
