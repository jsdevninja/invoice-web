import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: 36,
    paddingRight: 36,
  },
  table: {},
}));

const Dashboard = () => {
  const classes = useStyles();

  return <div className={classes.root}>This is Dashboard page</div>;
};

export default Dashboard;
