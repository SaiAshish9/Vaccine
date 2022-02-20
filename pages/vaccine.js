import React from "react";
import Nav from "../components/Nav";
import styles from "../styles/Home.module.css";

const Vaccine = () => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "95vh",
      }}
    >
      <Nav />
      <img
        src="https://searchvaccines.com/images/vaccines.jpg"
        alt="img"
        className={styles.vaccine}
      />

      <div className={styles.embed}>
        <iframe
          src="https://ourworldindata.org/coronavirus-data-explorer?zoomToSelection=true&time=2021-01-01..latest&country=USA~ISR~GBR~ARE~OWID_WRL~EuropeanUnion~BRA~CHN~IDN~BGD~RUS~MEX~CHL&region=World&vaccinationsMetric=true&interval=total&hideControls=true&perCapita=true&smoothing=0&pickerMetric=population&pickerSort=desc"
          loading="lazy"
          className={styles.frame}
        ></iframe>
      </div>
    </div>
  );
};

export default Vaccine;
