import React from "react";
import styles from "../styles/Loader.module.css";

const Splash = () => {
  return (
    <div 
    
    className={styles.loadingDiv}>
      <img
        src="https://searchvaccines.com/images/logo.png"
        className={styles.img}
        alt="Search Vaccines"
      />
    </div>
  );
};

export default Splash;
