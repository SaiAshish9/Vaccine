import { useContext, useState } from "react";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import { GoThreeBars } from "react-icons/go";
import { AiOutlineClose } from "react-icons/ai";
import { Drawer } from "@material-ui/core";
import { Context } from "../../contexts/index.js";
import { options } from "../../constants/options";
import Cookie from "js-cookie";

const Nav = () => {
  const router = useRouter();
  const { locale } = router;
  const {
    state: { countryCode, texts, loading, email },
    signOut,
    toggleModal,
    setUserType,
    setAuthType,
  } = useContext(Context);

  const changeLanguage = (e) => {
    router.push(router.pathname, router.asPath, { locale: e.target.value });
  };

  const [open, IsOpen] = useState(false);

  console.log("locale", locale);

  const language = (locale !== "undefined" ? locale : countryCode) || "en";
  const textObj = texts[language] || {};

  const links = [
    {
      data: textObj["aboutUs"],
      path: "/about-us",
    },
    {
      data: textObj["FAQs"],
      path: "/faq",
    },
    {
      data: textObj["Vaccine"],
      path: "/vaccine",
    },
    {
      data: textObj["Terms"],
      path: "/terms-and-conditions",
    },
    {
      data: textObj["PrivacyPolicy"],
      path: "/privacy-policy",
    },
  ];

  return (
    <div
      style={{ width: "100%", position: "relative", zIndex: 3 }}
      className={styles.alignRight}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <img
          onClick={() => {
            router.push("/");
          }}
          src="https://searchvaccines.com/images/logo.png"
          alt="img"
          className={styles.image}
        />
        {!open ? (
          <GoThreeBars
            onClick={() => {
              IsOpen(!open);
            }}
            size={24}
            style={{ cursor: "pointer" }}
            className={styles.icon}
          />
        ) : (
          <AiOutlineClose
            onClick={() => {
              IsOpen(!open);
            }}
            style={{ cursor: "pointer" }}
            size={24}
            className={styles.icon}
          />
        )}

        <Drawer
          anchor="left"
          open={open}
          onClose={() => {
            IsOpen(!open);
          }}
        >
          <div
            style={{
              width: "63vw",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100vh",
              backgroundColor: "#fff",
              padding: "3rem 0",
            }}
          >
            <div>
              <p
                onClick={() => {
                  router.push("/");
                  if (router.pathname === "/") {
                    IsOpen(!open);
                  }
                }}
                className={
                  router.pathname === "/" ? styles.active1 : styles.link1
                }
                style={{ marginRight: "1rem" }}
              >
                Home
              </p>
              {!email ? (
                <div>
                  <p
                    onClick={() => {
                      toggleModal(true);
                      IsOpen(!open);
                      setAuthType("signup");
                    }}
                    style={{ marginTop: "1rem" }}
                    className={styles.link1}
                  >
                    Register
                  </p>
                  <p
                    onClick={() => {
                      toggleModal(true);
                      IsOpen(!open);
                      setAuthType("signin");
                    }}
                    style={{ marginTop: "1rem" }}
                    className={styles.link1}
                  >
                    Login
                  </p>
                </div>
              ) : (
                <p
                  style={{ marginTop: "1rem" }}
                  onClick={(e) => {
                    // e.stopPropagation();
                    // e.preventDefault();
                    if (email) {
                      if (router.pathname !== "/") {
                        signOut();
                        router.push("/");
                      } else {
                        if (
                          Cookie.get("email") !== "developer@searchvaccines.com"
                        )
                          router.push("/step");
                        else router.push("/dashboard");
                      }
                      toggleModal(false);
                    }
                    setUserType(null);
                  }}
                  className={styles.link1}
                >
                  {router.pathname === "/" ? "Dashboard" : "Logout"}
                </p>
              )}

              {links.map((i, k) => (
                <p
                  key={k}
                  onClick={() => {
                    router.push(i.path);
                  }}
                  className={
                    router.pathname == i.path ? styles.active1 : styles.link1
                  }
                  style={{ marginTop: "1rem" }}
                >
                  {i.data}
                </p>
              ))}
              <select
                onChange={changeLanguage}
                defaultValue={locale}
                className={styles.langDropdown}
                style={{
                  marginTop: "1.5rem",
                  position: "relative",
                  right: "1.4rem",
                }}
              >
                {options.map((i, k) => (
                  <option key={k} className="text-black" value={i.value}>
                    {i.icon} {i.text}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Drawer>

        <div
          className={styles.links}
          style={{ display: "flex", alignItems: "center" }}
        >
          {/* {links.map((i, k) => k===1 && (
            <p
              key={k}
              onClick={() => {
                router.push(i.path);
              }}
              className={
                router.pathname === i.path ? styles.active : styles.link
              }
              style={{ marginRight: "1rem" }}
            >
              {i.data}
            </p>
          ))} */}

          {!email ? (
            <div
              style={{
                display: "flex",
              }}
            >
              <p
                onClick={() => {
                  toggleModal(true);
                  setAuthType("signup");
                }}
                className={styles.link}
                style={{ marginRight: "1rem" }}
              >
                Register
              </p>
              <p
                onClick={() => {
                  toggleModal(true);
                  setAuthType("signin");
                }}
                className={styles.link}
              >
                Login
              </p>
            </div>
          ) : (
            <p
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (email) {
                  if (router.pathname !== "/") {
                    signOut();
                    router.push("/");
                  } else {
                    if (Cookie.get("email") !== "developer@searchvaccines.com")
                      router.push("/step");
                    else router.push("/dashboard");
                  }
                  toggleModal(false);
                }
                setUserType(null);
              }}
              className={styles.link}
            >
              {router.pathname === "/" ? "Dashboard" : "Logout"}
            </p>
          )}

          <select
            onChange={changeLanguage}
            defaultValue={language}
            className={styles.langDropdown}
          >
            {options.map((i, k) => (
              <option key={k} className="text-black" value={i.value}>
                {i.icon} {i.text}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Nav;
