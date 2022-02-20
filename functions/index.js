const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const moment = require("moment");
const fetch = require("node-fetch");
const btoa = require("btoa");

const DATASTORE_URL =
  "https://sheet.best/api/sheets/7a9d2217-df3d-40b7-af5c-df8843e5ce70/tabs/";

admin.initializeApp();
require("dotenv").config();

const { SENDER_EMAIL, SENDER_PASSWORD, STORAGE_TOKEN } = process.env;

const authData = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: SENDER_EMAIL,
    pass: SENDER_PASSWORD,
  },
});

exports.sendRegistrationEmail = functions.auth.user().onCreate((user) => {
  ejs.renderFile(
    __dirname + "/registration.ejs",
    {
      link: `https://searchvaccines.com/verify/${btoa(user["email"])}`,
    },
    (err, temp) => {
      if (err) {
        console.log(err);
      }
      authData
        .sendMail({
          from: "developer@seachvaccines.com",
          to: user["email"],
          subject: "Welcome to searchvaccines family",
          text: "Greeting's",
          html: temp,
        })
        .then((res) => console.log("email sent"))
        .catch((e) => console.log(e));
    }
  );
});

exports.sendEmailNotificationForProducts = functions.firestore
  .document("dev-products/{id}")
  .onCreate((snap, context) => {
    const data = snap.data();
    console.log(data);
    ejs.renderFile(
      __dirname + "/index.ejs",
      {
        data,
      },
      (err, temp) => {
        if (err) {
          console.log(err);
        }
        authData
          .sendMail({
            from: "developer@seachvaccines.com",
            to: "alan@searchvaccines.com",
            subject: "Products added successfully",
            text: data ? "searchvaccines" : "error",
            html: temp,
          })
          .then((res) => console.log("email sent"))
          .catch((e) => console.log(e));
      }
    );
});

exports.sendEmailNotificationForOrders = functions.firestore
  .document("dev-orders/{id}")
  .onCreate((snap, context) => {
    const data = snap.data();
    console.log(data);
    ejs.renderFile(
      __dirname + "/index.ejs",
      {
        data,
      },
      (err, temp) => {
        if (err) {
          console.log(err);
        }
        authData
          .sendMail({
            from: "developer@seachvaccines.com",
            to: "alan@searchvaccines.com",
            subject: "Orders added successfully",
            text: data ? "searchvaccines" : "error",
            html: temp,
          })
          .then((res) => console.log("email sent"))
          .catch((e) => console.log(e));
      }
    );
});

// functions.database
//   .ref("/demand-private-without-vaccines/{docId}/{Id}")
//   .onCreate((snap, ctx) => {
//     const data = snap.val();
//     console.log(data);
//     ejs.renderFile(
//       __dirname + "/index.ejs",
//       {
//         data,
//       },
//       (err, temp) => {
//         if (err) {
//           console.log(err);
//         }
//         authData
//           .sendMail({
//             from: "developer@seachvaccines.com",
//             to: "alan@searchvaccines.com",
//             subject: "Vaccines added successfully",
//             text: data ? "searchvaccines" : "error",
//             html: temp,
//           })
//           .then((res) => console.log("email sent"))
//           .catch((e) => console.log(e));
//       }
//     );
//   });

const sendUploadEmail = ({ text, email }) => {
  ejs.renderFile(
    __dirname + "/upload.ejs",
    {
      text,
    },
    (err, temp) => {
      if (err) {
        console.log(err.message);
      }
      authData
        .sendMail({
          from: "developer@seachvaccines.com",
          to: email,
          subject: `${text} uploaded successfully`,
          html: temp,
        })
        .then((res) => console.log("email sent"))
        .catch((e) => {
          console.log(e);
        });
    }
  );
};

exports.sendPDF = functions.storage.object().onFinalize(async (obj) => {
  const url = `https://firebasestorage.googleapis.com/v0/b/searchvaccines-c7371.appspot.com/o/${encodeURIComponent(
    obj["name"]
  )}?alt=media&token=${STORAGE_TOKEN}`;

  let data;
  const check = obj["name"].split("/")[0] === "loi";
  const check_loc = obj["name"].split("/")[0] === "loc";
  const check_loa = obj["name"].split("/")[0] === "loa";
  const check_logo = obj["name"].split("/")[0] === "logo";

  if (!check_logo) {
    if (check) {
      data = {
        Created_At: moment().format("MMMM Do YYYY, h:mm:ss a"),
        Email: obj["name"].split("/")[1],
        LOI: url,
        "Status (Waiting/Sent/Declined)": "Waiting",
      };
    } else if (check_loc) {
      data = {
        Created_At: moment().format("MMMM Do YYYY, h:mm:ss a"),
        Email: obj["name"].split("/")[1],
        LOC: url,
        "Status (Waiting/Sent/Declined)": "Waiting",
      };
    } else {
      data = {
        LOA: url,
      };
    }

    fetch(
      DATASTORE_URL + `Uploads/search?Email=*${obj["name"].split("/")[1]}*`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then(async (present) => {
        if (present.length > 0) {
          await fetch(
            DATASTORE_URL + "Uploads" + `/Email/*${obj["name"].split("/")[1]}*`,
            {
              method: check ? "PUT" : "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          );
        } else {
          await fetch(DATASTORE_URL + "Uploads", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
        }
      });

    if (check) {
      sendUploadEmail({
        text: "letter of intent",
        email: obj["name"].split("/")[1],
      });
    } else if (check_loc) {
      sendUploadEmail({
        text: "letter of collaboration",
        email: obj["name"].split("/")[1],
      });
    } else if (check_loa) {
      sendUploadEmail({
        text: "letter of acceptance",
        email: obj["name"].split("/")[1],
      });
    }

    ejs.renderFile(
      __dirname + "/pdf.ejs",
      {
        url,
        check: check
          ? "Letter Of Intent"
          : check_loc
          ? "Letter Of Collaboration"
          : "Letter Of Acceptance",
      },
      (err, temp) => {
        if (err) {
          console.log(err.message);
        }
        authData
          .sendMail({
            from: "developer@seachvaccines.com",
            to: "alan@searchvaccines.com",
            subject: `${check ? "LOI" : check_loc ? "LOC" : "LOA"}-${
              obj["name"].split("/")[1]
            }`,
            html: temp,
          })
          .then((res) => console.log("email sent"))
          .catch((e) => {
            console.log(e);
          });
      }
    );
  }
});
