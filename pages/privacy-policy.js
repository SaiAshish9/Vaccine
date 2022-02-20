import React from "react";
import Nav from "../components/Nav";
import styles from "../styles/Policy.module.css";

const PrivacyPolicy = () => {
  const personalInformation = [
    "We may collect and store the personal information you provide us such as your name, address and email address each time you carry out a transaction on the Website.",
    "We may also automatically receive your computer’s internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system when you browse the Website. While you can browse some sections of our Website without being a registered user, certain activities do require user registration.",
  ];

  const data = [
    {
      title: "Age of consent",
      content:
        "By using this site, you represent that either you are at least the age of majority in your state or country of residence, or that you are the age of majority in your state or country of residence and you have given your consent to allow any of your minor dependents to use the Website.",
    },
    {
      title: "Changes to this privacy policy",
      content:
        "We reserve the right to modify this Privacy Policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the Website. If we make material changes to this Privacy Policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it. If the Website is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to sell our products to you.",
    },
    {
      title: "Questions and contact information",
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <Nav />
      <div className={styles.container}>
        <p
          style={{ textAlign: "center", padding: "1rem 0 2rem" }}
          className={styles.title}
        >
          Privacy Policy
        </p>
        <div className={styles.content}>
          <p>
            Thank you for visiting{" "}
            <a className={styles.link} href="https://searchvaccines.com/">
              https://searchvaccines.com/
            </a>
            , a website to facilitate sharing of information relating to the
            sourcing and supplying of vaccines, hereinafter referred to as the
            “Website”. In this Privacy Policy, terms such as “we”, “us”, “ou” or
            similar expressions shall mean a visitor and use of words such as
            “you”, ”yours” or similar expressions shall mean any user of the
            Website.
          </p>
          <div style={{ height: "1.5rem" }} />
          <p>
            By mere use of the Website, you expressly consent to our use,
            storage, management and disclosure of your personal information in
            accordance with this Privacy Policy. We take privacy very seriously,
            and keeping your personal information secure is very important to
            us.
          </p>
          <div style={{ height: "1.5rem" }} />
          <p>
            This Privacy Policy is incorporated into and subject to the Terms of
            Use. Please read this Privacy Policy carefully:
          </p>

          <p
            style={{ textAlign: "start", padding: "2rem 0" }}
            className={styles.title}
          >
            Personal information we may collect from you
          </p>
          <p>
            We may collect and store some personal information about you
            depending on your activities on the Website.
          </p>
          <div style={{ height: "1.5rem" }} />
          <div>
            {personalInformation.map((i, k) => (
              <div key={k}>
                <p style={{ marginBottom: "1rem" }}>
                  {k + 1}. {i}
                </p>
              </div>
            ))}
          </div>

          <p
            style={{ textAlign: "start", padding: "2rem 0" }}
            className={styles.title}
          >
            How we may use this information{" "}
          </p>
          <div>
            {[
              "We may use your contact information to tailor your Website experience based on your browsing history and your interests.",
              "We may collect some additional information, such as a billing address, a credit / debit card number and a credit / debit card expiration date and/or other payment instrument details and tracking information from cheques or money orders each time you carry out a transaction on the Website.",
              "We might use third-party advertising companies to serve ads when you visit the Website. These companies may use information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.",
              "We may disclose your personal information, if we are required by law to do so, or if you violate our Terms of Service.",
            ].map((i, k) => (
              <div key={k}>
                <p style={{ marginBottom: "1rem" }}>
                  {k + 1}. {i}
                </p>
              </div>
            ))}
          </div>

          <p
            style={{ textAlign: "start", padding: "2rem 0" }}
            className={styles.title}
          >
            Cookies{" "}
          </p>
          <p>
            Cookies are small files placed on your hard drive that help us in
            collecting data to assist us in providing our services to you.
          </p>
          <div style={{ height: "1.5rem" }} />
          <div>
            {[
               "We may use such data collection tools on certain pages of the Website to help analyse our web page flow, measure promotional effectiveness, and promote trust and safety. We offer certain features that are only available through the use of Cookies. We may also use Cookies to help us provide information that is targeted to your interests.",
               "Most Cookies are automatically deleted at the end of a browsing session. You are always free to decline our Cookies if your browser permits, although in that case you may not be able to use certain features on the Website.",
               "Additionally, you may encounter Cookies or other similar tools on certain pages of the Website that are placed by third-parties. We do not control the use of cookies by third-parties."
            ].map((i, k) => (
              <div key={k}>
                <p style={{ marginBottom: "1rem" }}>
                  {k + 1}. {i}
                </p>
              </div>
            ))}
          </div>

          <p
            style={{ textAlign: "start", padding: "2rem 0" }}
            className={styles.title}
          >
            Consent{" "}
          </p>
          <div>
            {[
              "By merely visiting the Website, or mobile application you agree to be bound by the terms and conditions of this Privacy Policy. If you do not agree please do not use or access our Website.",
              "When you provide us with personal information to complete a transaction, verify your credit card, place an order, arrange for a delivery or return a purchase, we imply that you consent to our collecting it and using it for that specific reason only.",
              "If we ask for your personal information for a secondary reason, like promotions or marketing, we will either ask you directly for your expressed consent, or provide you with an opportunity to say no.",
            ].map((i, k) => (
              <div key={k}>
                <p style={{ marginBottom: "1rem" }}>
                  {k + 1}. {i}
                </p>
              </div>
            ))}
          </div>

          {data.map((i, k) => (
            <div key={k}>
              <p
                style={{ textAlign: "start", padding: "2rem 0" }}
                className={styles.title}
              >
                {i.title}
              </p>
              {k === data.length - 1 ? (
                <p>
                  If you would like to: access, correct, amend or delete any
                  personal information we have about you, raise a complaint, or
                  simply want more information, please email us at{" "}
                  <a className={styles.link} href="https://searchvaccines.com/">
                    alan@searchvaccines.com
                  </a>{" "}
                  . We typically respond to such requests between 3 to 5 working
                  days.
                </p>
              ) : (
                <p>{i.content}</p>
              )}
            </div>
          ))}
          <div style={{ height: "2rem" }} />
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
