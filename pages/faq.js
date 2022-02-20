import React, { useContext } from "react";
import { useRouter } from "next/router";
import FAQS from "../components/FAQs";
import Nav from "../components/Nav";
import styles from "../styles/FAQS.module.css";
import { Context } from "../contexts";

const Faq = () => {
  const router = useRouter();
  const { locale } = router;
  const {
    state: { country_code, texts, loading },
  } = useContext(Context);

  const language =
    locale !== "undefined" ? locale : country_code ? countryCode : "en";
  const textObj = texts ? texts[language] : {};

  return (
    <div>
      {!loading && (
        <>
          <div className={styles.main}>
            <Nav />
            <div className={styles.alignment}>
              <p className={styles.title}>{textObj["faq"]}</p>
              <img
                alt="img"
                src="https://searchvaccines.com/images/faq.svg"
                className={styles.img}
              />
            </div>
            <div className={styles.alignment1}>
              <div
                style={{
                  minHeight: "45vh",

                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  alt="img"
                  src="https://searchvaccines.com/images/faq.svg"
                  style={{ width: "90vw", margin: "9vh auto 0" }}
                />
              </div>
              <div
                style={{
                  marginTop: "3rem",
                  padding: "2rem 5%",
                }}
              >
                <p className={styles.title} style={{ textAlign: "center" }}>
                  Frequently Asked <br /> Questions
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              width: "100%",
              paddingBottom: "4rem",
              backgroundColor: "#fff",
            }}
          >
            <FAQS />
          </div>
        </>
      )}
    </div>
  );
};

export default Faq;
