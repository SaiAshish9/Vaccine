import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Context, incrementCount } from "../contexts";
import { toast } from "react-toastify";
import styles from "../styles/LOI.module.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import { GiPartyPopper } from "react-icons/gi";

const Step5 = () => {
  const { handleSubmit, reset } = useForm();
  const router = useRouter();
  const { locale } = router;
  const {
    state: { loa_uploaded, texts, form_values, countryCode },
    generatePDF,
    checkLOA,
  } = useContext(Context);
  const language =
    locale !== "undefined" ? locale : countryCode ? countryCode : "en";
  const textObj = texts[language] || {};
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const onSubmit = () => {};

  const check = async () => {
    setLoading(true);
    await checkLOA();
    setLoading(false);
  };

  useEffect(() => {
    check();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!loading && !loa_uploaded ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "7rem 0",
            flexDirection: "column",
          }}
        >
          <label htmlFor="loa" style={{ cursor: "pointer" }}>
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
                <IoCloudUploadOutline
                  style={{
                    fontSize: "5.4rem",
                    color: "#4169bf",
                    marginBottom: "0.5rem",
                    cursor: "pointer",
                  }}
                />
                <p style={{ fontWeight: 500, textAlign: "center" }}>
                  {file === null ? "Letter Of Acceptance" : file.name}
                </p>
              </div>
            ) : (
              <>
                <div style={{ height: "2rem" }} />
                <img
                  src={window.location.origin + "/images/spinner.svg"}
                  alt="img"
                />
              </>
            )}
          </label>

          {!loading && (
            <button
              type="submit"
              disabled={file === null}
              onClick={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                setLoading(true);
                try {
                  await generatePDF({
                    child: `loa/${
                      form_values ? form_values["email"] : "invalid"
                    }`,
                    file,
                    type: "loa",
                  });
                  toast.success("LOA uploaded successfully!");
                  reset();
                  setLoading(false);
                  setFile(null);
                  reset();
                } catch (e) {
                  console.log(e);
                  reset();
                  setLoading(false);
                  toast.error("Something went wrong!");
                  reset();
                }
              }}
              className={styles.btn}
              style={{ marginTop: "1rem", opacity: file ? 1 : 0.4 }}
            >
              Upload
            </button>
          )}

          <input
            id="loa"
            style={{ display: "none" }}
            type="file"
            accept=".pdf"
            onChange={(e) => {
              setFile(null);
              setFile(e.target.files[0]);
            }}
          />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "7rem 0",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <GiPartyPopper
            style={{
              fontSize: "3.6rem",
              marginBottom: "2rem",
              // color: "#4169bf",
              color: "#fd973b",
            }}
          />
          <p>
            Congratulation's 🎉 ! Your leter of acceptance <br /> is uploaded.
            You will be redirected to dashboard
            <br /> when it's processed successfully.
          </p>
        </div>
      )}
    </form>
  );
};

export default Step5;
