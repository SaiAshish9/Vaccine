import React, { useState, useContext, useEffect } from "react";
import Nav from "../components/Nav";
import styles from "../styles/StepForm.module.css";
import { useRouter } from "next/router";
import { Context, incrementCount } from "../contexts";
import Form from "../components/Form";
import Step2 from "../components/Step2";
import Step3 from "../components/step3";
import Step4 from "../components/step4";
import Loader from "../components/Loader";
import GetStartedModal from "../components/getStartedModal";
import { useMediaQuery } from "react-responsive";
import Step5 from "../components/step5";
import { FiMail } from "react-icons/fi";
import { BiSad } from "react-icons/bi";
import Cookie from "js-cookie";
import Splash from "../components/Splash";

const Step = () => {
  const router = useRouter();
  const { locale } = router;
  const {
    state: { texts, countryCode, email, role, form_count, verified, deleted },
    fetchFormData,
    checkVerification,
  } = useContext(Context);
  const language =
    locale !== "undefined" ? locale : countryCode ? countryCode : "en";
  const textObj = texts[language] || {};
  const [current, setCurrent] = useState(form_count);
  const [loading, setLoading] = useState(false);
  const [first, isFirst] = useState(true);
  const media = useMediaQuery({ query: "(max-width: 900px)" });

  const fetchData = async () => {
    setLoading(true);
    await fetchFormData();
    setCurrent(form_count - 1);
    await checkVerification();
    // setCurrent(2)
    setLoading(false);
  };

  useEffect(() => {
    if (role === "admin") {
      router.push("dashboard");
    }
    fetchData();
  }, [form_count]);

  return email === null ? (
    <Splash />
  ) : (
    <div style={{ width: "100vw", minHeight: "100vh" }}>
      <Nav />
      {first && !media ? (
        <div>
          <GetStartedModal first={first} setFirst={isFirst} />
        </div>
      ) : (
        <div>
          <div className={styles.bar}>
            <div className={styles["center-cont"]}>
              {[...Array(5).keys()].map((i, k) => (
                <div
                  className={k <= current ? styles.circle : styles.circle1}
                  key={k}
                >
                  <p>{k + 1}</p>
                </div>
              ))}
            </div>
            <div className={styles.line} />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              padding: "4.5rem 0",
            }}
          >
            <div className={styles.cont}>
              {current === 0 && verified && !deleted && (
                <Form loading={loading} setCurrent={setCurrent} />
              )}
              {current === 0 && !verified && !deleted && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "40vh",
                    flexDirection: "column",
                  }}
                >
                  <FiMail
                    style={{
                      fontSize: "4rem",
                      color: "#4169bf",
                    }}
                  />
                  <p
                    style={{
                      color: "#4169bf",
                      fontWeight: 500,
                      marginTop: "1rem",
                      textAlign: "center",
                    }}
                  >
                    We sent you an email <br /> Please verify it !
                  </p>
                </div>
              )}

              {current === 0 && deleted && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "40vh",
                    flexDirection: "column",
                  }}
                >
                  <BiSad
                    style={{
                      fontSize: "4rem",
                      color: "#4169bf",
                    }}
                  />
                  <p
                    style={{
                      color: "#4169bf",
                      fontWeight: 500,
                      marginTop: "1rem",
                      textAlign: "center",
                    }}
                  >
                    Your account was deactivated <br /> Please contact our team
                    for further details !
                  </p>
                </div>
              )}

              {current === 1 && (
                <Step2
                  current={current}
                  textObj={textObj}
                  setCurrent={setCurrent}
                  incrementCount={incrementCount}
                />
              )}
              {current === 2 && (
                <Step3 current={current} setCurrent={setCurrent} />
              )}
              {current === 3 && (
                <Step4
                  current={current}
                  incrementCount={incrementCount}
                  setCurrent={setCurrent}
                />
              )}
              {current === 4 && (
                <Step5
                  current={current}
                  incrementCount={incrementCount}
                  setCurrent={setCurrent}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step;
