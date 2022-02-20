import React, { useState } from "react";
import { GoThreeBars } from "react-icons/go";
import { AiOutlineClose } from "react-icons/ai";
import styles from "../styles/Home.module.css";

const Nav = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "2rem 0.5rem 0",
      }}
    >
      <img
        src={window.location.origin + "/images/logo.png"}
        alt="logo"
        style={{ width: "10rem" }}
      />
      {!open ? (
        <GoThreeBars
          onClick={() => {
            IsOpen(!open);
          }}
          size={24}
          style={{ cursor: "pointer" }}
          className={styles.icon}
        />
      ) : (
        <AiOutlineClose
          onClick={() => {
            IsOpen(!open);
          }}
          style={{ cursor: "pointer" }}
          size={24}
          className={styles.icon}
        />
      )}
    </div>
  );
};

export default Nav;
