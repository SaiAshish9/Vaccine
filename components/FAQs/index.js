import React, {useContext} from "react";
import {Context} from "../../contexts";
import styles from "../../styles/FAQS.module.css";

import {useRouter} from "next/router";

const FAQS = () => {
  const router = useRouter();
  const { locale } = router;
  const {
    state: { countryCode, texts, loading },
  } = useContext(Context);

  const language =
    locale !== 'undefined' ? locale : countryCode ? countryCode : "en";  const textObj = texts[language] || {};
  

  const questions = [
    {
      q: textObj["faqQ1"],
      a: textObj["faqA1"],
    },
    {
      q: textObj["faqQ2"],
      a: textObj["faqA2"],
    },
    {
      q: textObj["faqQ3"],
      a: textObj["faqA3"],
    },
  ];

  return (
    <div className={styles.container}>
      <div style={{ height: "4rem" }} />
      {questions.map((i, k) => (
        <div key={k} style={{ width: "70vw" }}>
          <div className={styles.row}>
            <p className={styles.tag}>Q.</p>
            <p
              style={{
                color: "#444243",
                fontSize: "0.9rem",
                fontWeight: "bold",
              }}
            >
              {i["q"]}
            </p>
          </div>
          <div className={styles.row1}>
            <p className={styles.tag1}>A.</p>
            <p
              style={{
                color: "#9d9b9c",
                fontSize: "0.8rem",
                fontWeight: "bold",
              }}
            >
              {i["a"]}
            </p>
          </div>
          {k !== 2 && (
            <div
              style={{
                height: "2px",
                backgroundColor: "#f9f9f9",
                width: "100%",
                margin: "2rem 0",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQS;
