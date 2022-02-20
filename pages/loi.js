import React, { useState, useContext } from "react";
import Nav from "../components/Nav";
import styles from "../styles/LOI.module.css";
// import { IoIosArrowDown } from "react-icons/io";
import { Dialog, Box } from "@material-ui/core";
import { jsPDF } from "jspdf";
import { useForm } from "react-hook-form";
import { Context } from "../contexts";
import { useRouter } from "next/router";

const LOI = () => {
  const [open, setOpen] = useState(false);
  const { handleSubmit, register, errors } = useForm();
  const router = useRouter();
  const { locale } = router;
  const {
    state: { user_details, countryCode, texts },
  } = useContext(Context);

  const onSubmit = (values) => {
    console.log(errors);
    console.log(values);
    savePDF(values);
    setOpen(!open);
  };
  const language =
    locale !== "undefined" ? locale : countryCode ? countryCode : "en";
  const textObj = texts[language] || {};

  const makeid = (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const savePDF = (values) => {
    const doc = new jsPDF();
    const image = new Image();
    image.src = window.location.origin + "/images/logo.png";
    doc.setProperties({ title: "Letter Of Intent" });
    doc.addImage(image, "PNG", 125, 10, 80, 14.4);
    doc.setFontSize(14);
    doc.text("LETTER OF INTENT", 78, 35);
    doc.setFontSize(12);
    doc.text("Date: ", 15, 54);
    doc.setFont("arial", "bold");
    doc.text(new Date().toDateString(), 27, 54);
    doc.setFont("arial", "normal");
    doc.text("REF:", 15, 64);
    doc.setFont("arial", "bold");
    doc.text(makeid(10), 45, 64);
    // doc.text(textObj.toTheAttention + " :", 15, 76);
    doc.text("To whom it may concern" + " :", 15, 76);
    doc.setFontSize(12);
    doc.setFont("arial", "normal");
    doc.text(`We `, 24, 88);
    doc.setFont("arial", "bold");
    doc.text(`${values["Organization name"]}`, 33, 88);
    doc.setFont("arial", "normal");
    doc.text(`(company name), with address: `, 60, 88);
    doc.setFont("arial", "bold");
    doc.text(values["Country"], 115, 88);
    doc.setFont("arial", "normal");
    doc.text("represented by ", 152, 88);
    doc.setFont("arial", "bold");
    doc.text(values["First Name"] + " " + values["Surname"], 15, 98);
    doc.setFont("arial", "normal");
    doc.text(
      " with full corporate authority and legal responsibilities under penalty of perjury do",
      63,
      98
    );
    doc.text(
      "hereby officially confirm our willingness and readiness to buy COVID-19 vaccine under",
      15,
      108
    );
    doc.text("following conditions:", 15, 118);
    doc.text("1. PRODUCT:   COVID-19 vaccine", 15, 128);
    doc.text("2. ORIGIN: Worldwide", 15, 138);
    doc.text("3. QUANTITY: ", 15, 148);
    doc.setFont("arial", "bold");
    doc.text(values["Quantity"], 80, 148);
    doc.setFont("arial", "normal");
    doc.text(
      "4. DELIVERY TIME:  up to 21 days after receiving of 100% of the payment ",
      15,
      158
    );
    doc.text("5. TARGET PRICE (USD):", 15, 168);
    doc.setFont("arial", "bold");
    doc.text(values["Price"], 80, 168);
    doc.setFont("arial", "normal");
    doc.text(
      "6. PAYMENT TERM: 100% prepayment, after signing the contract",
      15,
      178
    );
    doc.text(
      "7. DELIVERY TERMS: Air freight  in designated refrigerated containers",
      15,
      188
    );
    doc.text("8. DESTINATION:", 15, 198);
    doc.setFont("arial", "bold");
    doc.text(values["Country"], 80, 198);
    doc.setFont("arial", "normal");

    doc.text("Sincerely,", 15, 238);
    doc.setFont("arial", "bold");
    doc.text(
      values["Position"] +
        ",   " +
        values["First Name"] +
        " " +
        values["Surname"],
      15,
      248
    );
    doc.setFont("arial", "normal");
    doc.text("/ Attach signature and company stamp /", 15, 258);
    doc.save("LetterOfIntent.pdf");
  };

  const data = [
    {
      title: textObj["firstName"],
      value: user_details ? user_details["firstname"] : "",
    },
    {
      title: textObj["surName"],
      value: user_details ? user_details["lastname"] : "",
    },
    {
      title: textObj["position"],
    },
    {
      title: textObj["orgName"],
      value: user_details ? user_details["organization"] : "",
    },
    {
      title: textObj["country"],
      value: user_details ? user_details["country"] : "",
    },
    {
      title: textObj["quantity"],
      value: user_details ? user_details["qNeeded"] : "",
    },
    {
      title: textObj["price"],
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ width: "100vw" }}>
        <Nav />
      </div>
      <div className={styles.container}>
        <Dialog
          open={open}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
            className={styles.box}
            style={{ paddingBottom: "1rem" }}
          >
            <p style={{ fontSize: "1.5rem", fontWeight: 500 }}>
              Please follow the steps and upload the PDF
            </p>
            <Box
              className={styles.box1}
              style={{ width: "75%", marginTop: "10%" }}
            >
              {[
                {
                  text: "Print PDF",
                  img: window.location.origin + "images/pdf.png",
                },
                {
                  text: "Attach Signature",
                  img: window.location.origin + "images/signature.png",
                },
                {
                  text: "Add Stamp",
                  img: window.location.origin + "images/stamp.png",
                },
              ].map((i, k) => (
                <div
                  key={k}
                  style={{ cursor: "pointer" }}
                  className={styles.circleCont}
                  onClick={() => {
                    if (k === 0) {
                    }
                  }}
                >
                  <div className={styles.circle}>
                    <img
                      src={i.img}
                      alt="img"
                      style={{
                        width: "3rem",
                        position: "relative",
                        left: k > 0 ? 5 : 0,
                        height: "3rem",
                      }}
                    />
                  </div>
                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: 500,
                      marginTop: "1rem",
                      textAlign: "center",
                    }}
                  >
                    {i.text}
                  </p>
                </div>
              ))}
            </Box>

            <div className={styles.padding}>
              <p
                style={{
                  fontWeight: 500,
                  marginBottom: "1rem",
                  color: "#4169bf",
                  textAlign: "center",
                }}
              >
                <span style={{ color: "#000" }}>send it to</span>{" "}
                <a href="mailto:michal@searchvaccines.com">
                  alan@searchvaccines.com
                </a>
              </p>
            </div>
          </Box>
        </Dialog>
        <p className={styles.title}>{textObj["generateLOI"]}</p>
        <div className={styles.content}>
          {data.map((i, k) => (
            <div key={k} className={styles.cont}>
              <p className={styles.tag}>{i.title}</p>
              <div
                style={{
                  display: "flex",
                  position: "relative",
                  alignItems: "center",
                }}
              >
                <input
                  name={i.title}
                  ref={register({ required: "Required" })}
                  required
                  type={k < 5 ? "text" : "number"}
                  // Object.keys(errors)
                  defaultValue={i.value}
                  placeholder={i.title + "..."}
                  className={
                    Object.keys(errors).includes(i.title)
                      ? styles.input1
                      : styles.input
                  }
                />
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            console.log(Object.keys(errors));
          }}
          type="submit"
          style={{
            outline: "none",
            padding: 0,
            border: "none",
            background: "#fff",
            margin: "2rem 0",
          }}
        >
          <div className={styles.btn}>{textObj["generatePDF"]}</div>
        </button>
        <p
          style={{
            margin: "-0.5rem 1rem 2rem",
            color: "red",
            textAlign: "center",
          }}
        >
          {Object.keys(errors).length > 0 ? "*All field's are required." : ""}
        </p>
      </div>
    </form>
  );
};

export default LOI;
