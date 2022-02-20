import Head from "next/head";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Layout.module.css";
import Footer from "./Footer.js";
import { Context } from "../contexts/index.js";
import { route } from "next/dist/next-server/server/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./modal";

export default function Layout({ children }) {
  const router = useRouter();
  const { locale } = router;
  const {
    state: { texts, countryCode, open_modal, loading },
  } = useContext(Context);

  const language =
    locale !== "undefined" ? locale : countryCode ? countryCode : "en";
  const textObj = texts[language] || {};

  return (
    <>
      <Head>
        <script
          src="//code.tidio.co/oq8glsq1al4gnxppscd43hzvsiomummb.js"
          async
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function () {
            window.ldfdr = window.ldfdr || {};
            (function (d, s, ss, fs) {
              fs = d.getElementsByTagName(s)[0];
              function ce(src) {
                var cs = d.createElement(s);
                cs.src = src;
                setTimeout(function () {
                  fs.parentNode.insertBefore(cs, fs);
                }, 1);
              }
              ce(ss);
            })(
              document,
              "script",
              "https://sc.lfeeder.com/lftracker_v1_lYNOR8xnZmN4WQJZ.js"
            );
          })();
          `,
          }}
        ></script>
        <title>{textObj ? textObj.title : ""}</title>
        <meta name="keywords" content="vaccine, covid19" />
      </Head>
      {loading ? (
        <Splash />
      ) : (
        <>
          <ToastContainer />
          <Modal />
          <main className={styles.main}>{children}</main>
          {!["/step", "/dashboard", "/verify"].includes(router.pathname) &&
            !router.pathname.split("/").includes("verify") && <Footer />}{" "}
        </>
      )}
    </>
  );
}
