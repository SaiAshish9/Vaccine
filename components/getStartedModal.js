import React from "react";
import { Backdrop, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../styles/getStartedModule.module.css";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const GetStartedModal = ({ first, setFirst }) => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={first}>
      <Box
        className={styles.box}
        style={{
          backgroundColor: "#f3f2f7",
          borderRadius: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <p
          style={{
            fontSize: "1.2rem",
            textAlign: "center",
            color: "#000",
            fontWeight: 500,
          }}
        >
          Process
        </p>
        <img
          alt="image"
          src={window.location.origin + "/images/dashboard.png"}
          style={{ width: "100%", height: "88.8vh" }}
        />
        <button
          onClick={() => {
            setFirst(false);
          }}
          className={styles.btn1}
        >
          Get Started
        </button>
      </Box>
    </Backdrop>
  );
};

export default GetStartedModal;
