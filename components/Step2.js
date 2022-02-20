import React, { useContext } from "react";
import { Box } from "@material-ui/core";
import styles from "../styles/LOI.module.css";
import { jsPDF } from "jspdf";
import { Context } from "../contexts";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
  console.log(values);
  var docDefinition = {
    pageSize: "A4",
    pageOrientation: "portrait",
    images: {
      img: window.location.origin + "/images/logo.png",
    },
    style: {
      align: {
        lineHeight: 2,
      },
    },
    content: [
      {
        image: "img",
        // height:10,
        width: 125,
        alignment: "right",
      },
      {
        text:
          values["user_type"] !== "Laboratory"
            ? "LETTER OF INTENT"
            : "LETTER OF COLLABORATION",
        alignment: "center",
        bold: true,
        margin: [0, 45, 0, 36],
      },
      {
        columns: [
          {
            text: "Date: ",
            width: "8%",
          },
          {
            text: new Date().toDateString(),
            bold: true,
            alignment: "left",
          },
        ],
        margin: [0, 0, 0, 10],
      },
      {
        columns: [
          {
            text: "REF: ",
            width: "8%",
          },
          {
            text: makeid(10),
            bold: true,
            alignment: "left",
          },
        ],
      },
      {
        columns: [
          {
            text: `To whom it may concern, we,  ${values["organisation_name"]}  , with address:  ${values["city"]} , ${values["country"]}  represented by  ${values["first_name"]} ${values["surname"]}  with full corporate authority and legal responsibilities under penalty of perjury do herely officially confrm our willingness and readiness to buy COVID-19 vaccine under following conditions:`,
            lineHeight: 2,
          },
        ],
        margin: [0, 45, 0, 18],
      },
      // {
      //   columns: [
      //     {
      //       text: "To whom it may concern, we, ",
      //       width: "30%",
      //     },
      //     {
      //       text: values["Name Of Organisation"],
      //       bold: true,
      //       alignment: "center",
      //       width: "37%",
      //     },
      //     {
      //       text: " , with address: ",
      //       width: "20%",
      //       alignment: "center",
      //     },
      //   ],
      //   margin: [0, 45, 0, 18],
      // },

      // {
      //   columns: [
      //     {
      //       text: values["City"] + " ," + values["Country"],
      //       width: "27%",
      //       // alignment: "center",
      //       bold: true,
      //     },
      //     {
      //       text: "represented by",
      //       width: "16%",
      //     },
      //     {
      //       text: values["First Name"] + " " + values["Surname"],
      //       bold: true,
      //       width: "27%",
      //       alignment: "center",
      //     },
      //     {
      //       text: "with full corporate authority ",
      //     },
      //   ],
      //   margin: [0, 7],
      // },

      // {
      //   text:
      //     "and legal responsibilities under penalty of perjury do herely officially confirm our willingness and ",
      //   margin: [0, 7],
      // },
      // {
      //   text: "readiness to buy COVID-19 vaccine under following conditions:",
      //   margin: [0, 7],
      // },
      {
        columns: [
          {
            text: "1. PRODUCT: ",
            width: "16%",
          },
          {
            text: values["vaccine_types"],
            bold: true,
          },
        ],
        margin: [0, 7],
      },
      {
        columns: [
          {
            text: "2. ORIGIN: ",
            width: "13%",
          },
          {
            text: "Worldwide",
            bold: true,
          },
        ],
        margin: [0, 7],
      },

      {
        columns: [
          {
            text: "3. QUANTITY: ",
            width: "16%",
          },
          {
            text: values["quantity"],
            bold: true,
          },
        ],
        alignItems: "start",
        margin: [0, 7],
      },
      {
        text:
          "4. DELIVERY TIME:  up to 21 days after receiving of 100% of the payment ",
        margin: [0, 7],
      },
      {
        columns: [
          {
            text: "5. TARGET PRICE (USD):",
            width: "27%",
          },
          {
            text: values["target_price"],
            bold: true,
          },
        ],
        margin: [0, 7],
      },
      {
        columns: [
          {
            text: "6. PAYMENT TERM: ",
            width: "22%",
          },
          {
            text: values["payment"],
            bold: true,
            width: "19%",
          },
          {
            text: ", after signing the contract",
            width: "auto",
          },
        ],
        margin: [0, 7],
      },
      {
        text:
          "7. DELIVERY TERMS: Air freight  in designated refrigerated containers",
        margin: [0, 7],
      },
      {
        columns: [
          {
            text: "8. DESTINATION:",
            width: "20%",
          },
          {
            text: values["country"],
            bold: true,
          },
        ],
        margin: [0, 7],
      },

      {
        text: "Sincerely,",
        margin: [0, 36, 0, 7],
      },
      {
        text:
          values["position"] +
          ",   " +
          values["first_name"] +
          " " +
          values["surname"],
        bold: true,
        margin: [0, 7],
      },
      {
        text: "/* Attach signature and company stamp */",
        margin: [0, 7],
      },
      {
        qr: `searchvaccines_${values["first_name"]}_${values["surname"]}-${values["city"]}, ${values["country"]}`,
        fit: 70,
        alignment: "right",
        margin: [0, 10, 0, 0],
      },
    ],
  };
  pdfMake
    .createPdf(docDefinition)
    // .open();
    .download(
      `${
        values["user_type"] === "Laboratory"
          ? "Letter Of Collaboration"
          : "Letter Of Intent"
      }.pdf`
    );

  // const doc = new jsPDF({
  //   orientation: "p",
  //   format: "a4",
  // });
  // const image = new Image();
  // doc.setProperties({ title: "Letter Of Intent" });
  // doc.setFontSize(14);
  // doc.text("LETTER OF INTENT", 78, 35);
  // doc.setFontSize(12);
  // doc.text("Date: ", 15, 54);
  // doc.setFont("arial", "bold");
  // doc.text(new Date().toDateString(), 27, 54);
  // doc.setFont("arial", "normal");
  // doc.text("REF:", 15, 64);
  // doc.setFont("arial", "bold");
  // doc.text(makeid(10), 27, 64);
  // // doc.text(textObj.toTheAttention + " :", 15, 76);
  // doc.text("To The Attention" + " :", 15, 76);
  // doc.setFontSize(12);
  // doc.setFont("arial", "normal");
  // doc.text(`We `, 24, 88);
  // doc.setFont("arial", "bold");
  // if (values["Name Of Organisation"])
  //   doc.text(`${values["Name Of Organisation"]}`, 33, 88);
  // doc.setFont("arial", "normal");
  // if (values["Name Of Organisation"])
  //   doc.text(
  //     `(company name), with address: `,
  //     33 + values["Name Of Organisation"].length * 2.1,
  //     88
  //   );
  // doc.setFont("arial", "bold");
  // if (values["City"] && values["Country"])
  //   doc.text(values["City"] + " ," + values["Country"], 33 + values["Name Of Organisation"].length * 8, 88);
  // doc.setFont("arial", "normal");
  // if (values["City"] && values["Country"])
  //   doc.text(
  //     "represented by ",
  //     97 + (values["City"].length + values["Country"].length) * 2.2,
  //     88
  //   );
  // doc.setFont("arial", "bold");
  // if (values["First Name"] && values["Surname"])
  //   doc.text(values["First Name"] + " " + values["Surname"], 15, 98);
  // doc.setFont("arial", "normal");
  // if (values["First Name"] && values["Surname"])
  //   doc.text(
  //     " with full corporate authority and legal responsibilities under penalty of perjury do",
  //     15 + (values["First Name"].length + values["Surname"].length) * 2.2,
  //     98
  //   );
  // doc.text(
  //   "hereby officially confirm our willingness and readiness to buy COVID-19 vaccine under",
  //   15,
  //   108
  // );
  // doc.text("following conditions:", 15, 118);
  // doc.text("1. PRODUCT:   COVID-19 vaccine", 15, 128);
  // doc.text("2. ORIGIN: Worldwide", 15, 138);
  // doc.text("3. QUANTITY: ", 15, 148);
  // doc.setFont("arial", "bold");
  // if (values["Quantity"]) doc.text(values["Quantity"], 45, 148);
  // doc.setFont("arial", "normal");
  // doc.text(
  //   "4. DELIVERY TIME:  up to 21 days after receiving of 100% of the payment ",
  //   15,
  //   158
  // );
  // doc.text("5. TARGET PRICE (USD):", 15, 168);
  // doc.setFont("arial", "bold");
  // if (values["Price"]) doc.text(values["Price"], 80, 168);
  // doc.setFont("arial", "normal");
  // doc.text("6. PAYMENT TERM: ", 15, 178);
  // doc.setFont("arial", "bold");
  // if (values["Payment"]) doc.text(values["Payment"], 58, 178);
  // doc.setFont("arial", "normal");
  // if (values["Payment"])
  //   doc.text(
  //     ", after signing the contract",
  //     58 + values["Payment"].length * 2.2,
  //     178
  //   );
  // doc.text(
  //   "7. DELIVERY TERMS: Air freight  in designated refrigerated containers",
  //   15,
  //   188
  // );
  // doc.text("8. DESTINATION:", 15, 198);
  // doc.setFont("arial", "bold");
  // if (values["Country"]) doc.text(values["Country"], 52, 198);
  // doc.setFont("arial", "normal");

  // doc.text("Sincerely,", 15, 238);
  // doc.setFont("arial", "bold");
  // if (values["First Name"] && values["Surname"] && values["Position"])
  //   doc.text(
  //     values["Position"] +
  //       ",   " +
  //       values["First Name"] +
  //       " " +
  //       values["Surname"],
  //     15,
  //     248
  //   );
  // doc.setFont("arial", "normal");
  // doc.text("/ Attach signature and company stamp /", 15, 258);
  // image.src = window.location.origin + "/images/logo.png";
  // doc.addImage(image, "PNG", 125, 10, 80, 14.4);
  // doc.save("LetterOfIntent.pdf");
  // doc.output("dataurlnewwindow");
};

const Step2 = ({ current, setCurrent, incrementCount, textObj }) => {
  const {
    state: { form_values, user_type },
    fetchFormData
  } = useContext(Context);


  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        className={styles.box}
        style={{ paddingBottom: "0rem", width: "100%" }}
      >
        <p
          className={styles.label1}
          style={{
            fontSize: "1.5rem",
            marginBottom: "2rem",
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          Please follow the step's to continue
        </p>
        <Box className={styles.box1} style={{ width: "75%", marginTop: "1%" }}>
          {[
            {
              text: "Print PDF",
              img: window.location.origin + "/images/pdf.png",
            },
            {
              text: "Attach Signature",
              img: window.location.origin + "/images/signature.png",
            },
            {
              text: "Add Stamp",
              img: window.location.origin + "/images/stamp.png",
            },
          ].map((i, k) => (
            <div
              key={k}
              // style={{ cursor: "pointer" }}
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
              marginBottom: "1.2rem",
              color: "#4169bf",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => {
              fetchFormData();
              setCurrent(current - 1);
              incrementCount(current);
            }}
            className={styles.btn}
            style={{ marginRight: "1rem", background: "#000" }}
          >
            {textObj["previous"]}
          </button>

          <button
            onClick={() => {
              setCurrent(current + 1);
              incrementCount(current + 2);
              savePDF(form_values);
            }}
            className={styles.btn}
          >
            Generate PDF
          </button>
        </div>
      </Box>
    </>
  );
};

export default Step2;
