import React, { useState, useContext } from "react";
import styles from "../styles/Home.module.css";
import Section2 from "../components/Section2";
import Nav from "../components/Nav/index.js";
import { useRouter } from "next/router";
import { Context } from "../contexts";
import { Button } from "@material-ui/core";
import { useMediaQuery } from "react-responsive";

export default function Home() {
  const router = useRouter();
  const { locale } = router;
  const {
    state: { countryCode, texts, loading, token, open_modal },
    toggleModal,
    setUserType,
    setAuthType,
  } = useContext(Context);

  const media = useMediaQuery({
    query: "(max-width:900px)",
  });


  const language =
    locale !== "undefined" ? locale : countryCode ? countryCode : "en";
  const textObj = texts[language] || {};
  const [option, setOption] = useState("demand");

  return (
    <>
      {!loading && (
        <div>
          <div className={styles.backgroundImage}>
            <div
              className={styles.background}
              alt="img"
              src={window.location.origin + "/images/bg.png"}
            />

            <div className={styles.container}>
              <Nav />
              <div className={styles.content}>
                <p className={styles.title}>{textObj.homeHeading}</p>
                <p className={styles.desc}>{textObj.homeText}</p>
              </div>

              <a
                href="Brochure.pdf"
                className={styles.brochure}
                style={{
                  position: "absolute",
                  left: 0,
                }}
                download="Brochure.pdf"
              >
                <div
                  style={{
                    background: "#4169bf",
                    padding: "7px",
                    width: "13rem",
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                  }}
                >
                  <p
                    style={{
                      fontSize: 13.5,
                      fontWeight: 500,
                      marginLeft: "1rem",
                      color: "#fff",
                    }}
                  >
                    Download Brochure
                  </p>
                </div>
              </a>
            </div>
          </div>
          <Section2 />

          {/* {step == -1 ? ( */}
          <div className={styles.itemsDiv}>
            <p className={styles.heading}>{textObj.getStarted}</p>
            <div id="getStarted" className={styles.alignment}>
              {[
                {
                  text: [textObj.municipality],
                  image: "https://searchvaccines.com/images/municipality.png",
                },
                {
                  text: [textObj.government],
                  image: "https://searchvaccines.com/images/government.png",
                },
                {
                  text: [textObj.laboratory],
                  image: "https://searchvaccines.com/images/laboratory.png",
                },
              ].map((i, k) => (
                <Button
                  key={k}
                  onClick={() => {
                    if (!token) {
                      toggleModal(true);
                    } else {
                      // setStep(0);
                      router.push("step");
                    }
                    if (k < 2) {
                      setOption("supply");
                    } else {
                      setOption("demand");
                    }

                    if (k === 0) {
                      setUserType("Private");
                    } else if (k === 1) {
                      setUserType("Government");
                    } else {
                      setUserType("Municipality");
                    }
                    setAuthType(null);
                  }}
                  style={{
                    textTransform: "none",
                    fontWeight: 600,
                    padding: 10,
                    borderRadius: 21,
                  }}
                >
                  <div style={{ cursor: "pointer", padding: "1rem" }}>
                    <div
                      style={{
                        width: "6rem",
                        height: "6rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px solid #4168bf",
                        borderRadius: "50%",
                        backgroundColor: "white",
                      }}
                    >
                      <img src={i.image} alt="img" style={{ height: "3rem" }} />
                    </div>
                    <p
                      style={{
                        textAlign: "center",
                        margin: "1rem 0 0",
                        fontWeight: 500,
                        fontSize: "1.2rem",
                      }}
                    >
                      {i.text}
                    </p>
                  </div>
                </Button>
              ))}
            </div>
          </div>
          {/* // ) : step < 3 ? (
          //   <Step option={option} step={step} setStep={setStep} />
          // ) : (
          //   <DemandSupply option={option} />
          // )} */}
        </div>
      )}
    </>
  );
}
