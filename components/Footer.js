import { useContext } from "react";
import styles from "../styles/Footer.module.css";
import Mail from "./svgs/mail";
import Pin from "./svgs/pin";
import { Context } from "../contexts/index.js";

import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();
  const { locale } = router;
  const {
    state: { countryCode, texts, loading },
  } = useContext(Context);

  const language =
    locale !== "undefined" ? locale : countryCode ? countryCode : "en";
  const textObj = texts[language] || {};

  const data = [
    {
      title: textObj["contact"],
      options: [
        {
          icon: <Mail />,
          texts: ["alan@searchvaccines.com"],
        },
        {
          icon: <Pin />,
          texts: [
            "1 E Poultry Ave,",
            "Farringdon",
            "Farringdon",
            "London EC!A 9PT",
            "UK",
          ],
        },
      ],
    },
    {
      title: "",
      options: [
        {
          texts: [textObj["aboutUs"]],
          link: "/about-us",
        },
        {
          texts: [textObj["Vaccine"]],
          link: "/vaccine",
        },
        {
          texts: [textObj["Terms"]],
          link: "/terms-and-conditions",
        },
        {
          texts: [textObj["PrivacyPolicy"]],
          link: "/privacy-policy",
        },
        {
          texts: [textObj["faq"]],
          link: "/faq",
        },
      ],
    },
    {
      title: "",
      options: [
        // {
        //   texts: [textObj["letterOfInterest"]],
        //   link: "/loi",
        // },
      ],
    },
  ];

  return (
    <>
      <div className={styles.footer}>
        {data.map((i, k) => (
          <div key={k}>
            <p
              className={styles.title}
              style={{
                height: "3rem",
                marginBottom: "2.3rem",
              }}
            >
              {i.title}
            </p>
            {i.options.map((a, b) => (
              <div
                key={b}
                className={styles.row}
                style={{ marginTop: "1.5rem", alignItems: "flex-start" }}
              >
                <div style={{ width: "1rem", marginRight: 10 }}>{a.icon}</div>
                <div
                  className={styles.text}
                  style={{ marginLeft: 10, justifyContent: "flex-start" }}
                >
                  {a.texts.map((x, y) =>
                    k === 0 ? (
                      <div key={y}>
                        {x}
                        <br />
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          router.push(a.link);
                        }}
                        style={{ cursor: "pointer" }}
                        key={y}
                      >
                        {x}
                        <br />
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
        <div style={{ width: "9%" }} />
      </div>
    </>
  );
}
