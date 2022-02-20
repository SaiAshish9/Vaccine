import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Context, incrementCount } from "../contexts";
import { toast } from "react-toastify";
import firebase from "../firebase";
import styles from "../styles/LOI.module.css";
import { IoCloudUploadOutline } from "react-icons/io5";

const Step3 = ({ current, setCurrent }) => {
  const { handleSubmit, reset } = useForm();
  const router = useRouter();
  const { locale } = router;
  const {
    state: { texts, form_values, countryCode },
    generatePDF,
  } = useContext(Context);
  const language =
    locale !== "undefined" ? locale : countryCode ? countryCode : "en";
  const textObj = texts[language] || {};
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const onSubmit = () => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "4rem 0",
          flexDirection: "column",
        }}
      >
        <label htmlFor="pdf" style={{ cursor: "pointer" }}>
          {!loading ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                cursor: "pointer",
              }}
            >
              {/* <img
              src="images/pdf.png"
              style={{
                width: "5.4rem",
                height: "5.4rem",
                marginBottom: "1rem",
              }}
              alt="image"
            /> */}
              <IoCloudUploadOutline
                style={{
                  fontSize: "5.4rem",
                  color: "#4169bf",
                }}
              />
              <p
                style={{
                  fontWeight: 500,
                  marginTop: "1rem",
                  fontSize: "1.17rem",
                  color: file === null ? "#000" : "#4169bf",
                }}
              >
                {file === null ? "Click Here" : file.name}
              </p>
            </div>
          ) : (
            <>
              <div style={{ height: "2.7rem" }} />
              <img
                src={window.location.origin + "/images/spinner.svg"}
                alt="img"
              />
            </>
          )}

          <input
            id="pdf"
            style={{ display: "none" }}
            type="file"
            accept=".pdf"
            onChange={(e) => {
              console.log(e.target.files[0].name);
              setFile(e.target.files[0]);
            }}
          />
        </label>
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
            setCurrent(current - 1);
            incrementCount(current);
          }}
          className={styles.btn}
          style={{ marginRight: "1rem", background: "#000" }}
        >
          {textObj["previous"]}
        </button>
        <button
          disabled={file === null}
          onClick={async () => {
            setLoading(true);
            try {
              await generatePDF({
                child: `${
                  form_values["user_type"] === "Laboratory" ? "loc" : "loi"
                }/${form_values ? form_values["email"] : "invalid"}`,
                file,
                type: form_values["user_type"] === "Laboratory" ? "loc" : "loi",
              });
              toast.success("LOI uploaded successfully!");
              reset();
              setLoading(false);
              setCurrent(current + 1);
              incrementCount(current + 2);
            } catch (e) {
              console.log(e)
              reset();
              setLoading(false);
              toast.error("Something went wrong!");
            }
          }}
          style={{
            opacity: file === null ? 0.6 : 1,
          }}
          className={styles.btn}
        >
          Upload PDF
        </button>
      </div>
    </form>
  );
};

export default Step3;
