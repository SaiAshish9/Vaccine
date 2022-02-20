import React, { useContext } from "react";
import { useRouter } from "next/router";
import Nav from "../components/Nav/index.js";
import styles from "../styles/AboutUs.module.css";
import { Context } from "../contexts";

const AboutUs = () => {
  const router = useRouter();
  const { locale } = router;
  const {
    state: { countryCode, texts, loading },
  } = useContext(Context);

  const language =
    locale !== "undefined" ? locale : countryCode ? countryCode : "en";
  const textObj = texts[language] || {};

  return (
    <>
      {!loading && (
        <div>
          <div
            style={{
              minHeight: "100vh",
              width: "100vw",
              backgroundColor: "#b2defc",
            }}
          >
            <Nav />
            <div className={styles.row}>
              <div className={styles.content}>
                <p className={styles.title}>{textObj.aboutHeading1}</p>
                <p className={styles.desc}>{textObj.aboutText1}</p>
              </div>
              <img
                src="https://searchvaccines.com/images/about-us.svg"
                className={styles.img}
                alt="img"
              />
            </div>

            <div className={styles.mrow}>
              <div style={{ minHeight: "45vh" }}>
                <img
                  src="https://searchvaccines.com/images/about-us.svg"
                  className={styles.img}
                  alt="img"
                />
              </div>
              <p className={styles.title}>{textObj.aboutHeading1}</p>
              <p className={styles.desc}>{textObj.aboutText1}</p>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              backgroundColor: "#fff",
            }}
          >
            <div
              className={styles.box}
              style={{
                boxShadow: "0px 50px 40px  #eee",
              }}
            >
              {[
                {
                  text: textObj.Insume,
                  img: "https://searchvaccines.com/images/about-1.png",
                },
                {
                  text: textObj.Options,
                  img: "https://searchvaccines.com/images/about-2.png",
                },
                {
                  text: textObj.Knowledge,
                  img: "https://searchvaccines.com/images/about-3.png",
                },
                {
                  text: textObj.Support,
                  img: "https://searchvaccines.com/images/about-4.png",
                },
              ].map((i, k) => (
                <div
                  key={k}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "1rem 0",
                  }}
                >
                  <img
                    src={i.img}
                    alt="img"
                    className={styles.icon}
                    style={{
                      position: "relative",
                      right: k == 1 ? 4 : 0,
                    }}
                  />
                  <p
                    style={{
                      textAlign: "center",
                      marginTop: "0rem",
                      fontWeight: 500,
                    }}
                  >
                    {i.text}
                  </p>
                </div>
              ))}
            </div>

            <div className={styles.row}>
              <div className={styles.content}>
                <p className={styles.title}>{textObj.aboutHeading2}</p>
                <p className={styles.desc}>{textObj.aboutText2}</p>
              </div>
              <img
                src="https://searchvaccines.com/images/doctor.png"
                className={styles.img}
                alt="img"
              />
            </div>
            <div
              className={styles.mrow}
              style={{ marginBottom: "2rem", alignItems: "center" }}
            >
              <img
                src="https://searchvaccines.com/images/doctor.png"
                style={{ width: "100vw", marginBottom: "2rem" }}
                className={styles.img}
                alt="img"
              />
              <p className={styles.title}>{textObj.aboutHeading2}</p>
              <p style={{ textAlign: "center" }} className={styles.desc}>
                {textObj.aboutText2}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutUs;
