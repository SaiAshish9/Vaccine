import React, { useContext, useState, useEffect } from "react";
import styles from "../styles/StepForm.module.css";
import { useRouter } from "next/router";
import { Context, saveDetailsWithoutVaccine } from "../contexts";
import { useForm } from "react-hook-form";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
} from "@material-ui/core";
import Cookie from "js-cookie";
import { IoIosArrowDown } from "react-icons/io";
import { toast } from "react-toastify";
import { IoCloudUploadOutline } from "react-icons/io5";

const Form = ({ setCurrent, loading }) => {
  const router = useRouter();
  const { locale } = router;
  const {
    state: {
      texts,
      form_values,
      countryCode,
      auth_type,
      user_type,
      vaccine_type,
    },
    setFormValues,
  } = useContext(Context);
  const { handleSubmit, register, errors } = useForm();

  const [open, setOpen] = useState(false);
  const [vaccines, setVaccines] = useState([]);

  const [value, setValue] = useState(
    form_values ? form_values["payment"] : "Letter of credit"
  );

  const [type, setType] = useState(
    form_values && form_values["user_type"]
      ? form_values["user_type"]
      : "Private"
  );

  const [v_type, setVType] = useState(
    form_values && form_values["vaccine_type"]
      ? form_values["vaccine_type"]
      : "Covaxin"
  );

  const language =
    locale !== "undefined" ? locale : countryCode ? countryCode : "en";
  const textObj = texts[language] || {};
  const options = [
    {
      label: textObj["firstName"],
      placeholder: `${textObj["firstName"]}...`,
      value: "first_name",
    },
    {
      label: textObj["surName"],
      placeholder: `${textObj["surName"]}...`,
      value: "surname",
    },
    {
      label: textObj["position"],
      placeholder: `${textObj["position"]}...`,
      value: "position",
    },
    {
      label: textObj["orgName"],
      placeholder:
        language !== "en" ? `${textObj["orgName"]}...` : "Organisation...",
      value: "organisation_name",
    },
    {
      label: textObj["country"],
      placeholder:
        language !== "en" ? `${textObj["country"]}...` : "Country...",
      value: "country",
    },
    {
      label: textObj["city"],
      placeholder: language !== "en" ? `${textObj["city"]}...` : "City...",
      value: "city",
    },
    {
      label: textObj["email"],
      placeholder: textObj["email"],
      value: "email",
    },
    {
      label: textObj["number"],
      placeholder: "Contact Number...",
      value: "contact_number",
    },
    {
      label: textObj["quantity"],
      placeholder: "0",
      value: "quantity",
    },
    {
      label: "Target price",
      placeholder: "0",
      value: "target_price",
    },
  ];

  const handleImgChange = (e) => {
    var file1 = e.target.files[0];
    var reader = new FileReader();
    reader.onload = (e) => {
      setImgFile(reader.result);
    };
    setFile(file1);
    reader.readAsDataURL(file1);
  };

  const onSubmit = (values) => {
    if (type && (user_type || type) && vaccines.length > 0) {
      setFormValues();
      try {
        saveDetailsWithoutVaccine(
          {
            ...values,
            payment: value,
            user_type: user_type ? user_type : type,
            // vaccine_type: vaccine_type ? vaccine_type : v_type,
            vaccine_types: vaccines.join(", "),
            email: Cookie.get("email"),
            image: file,
          },
          imgFile
        );
      } catch (e) {
        toast.error("Something went wrong! Try once again");
      }
      setFormValues({
        ...values,
        user_type: user_type ? user_type : type,
        vaccine_types: vaccines.join(", "),
        email: Cookie.get("email"),
        payment: value,
      });
      toast.success("Detail's updated successfully");
      setCurrent(1);
    } else if (!user_type && !type) {
      toast.error("User type is required");
    } else {
      toast.error("Vaccine type(s) are required");
    }
  };

  useEffect(() => {
    if (form_values && form_values["vaccine_types"]) {
      setVaccines(form_values["vaccine_types"].split(", "));
      setImgFile(form_values["logo"]);
    }
  }, [form_values]);

  const [file, setFile] = useState(null);
  const [imgFile, setImgFile] = useState(null);

  return (
    <>
      {!loading ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: "1rem" }}>
            <p className={styles.label}>1. User type</p>
            <div style={{ display: "flex", position: "relative" }}>
              <div style={{ width: "100%", padding: 0 }}>
                <div
                  type={"text"}
                  className={styles.input}
                  disabled
                  style={{
                    cursor: !user_type ? "pointer" : "auto",
                    width: "100%",
                    position: "relative",
                    zIndex: 2,
                    opacity: 0.6,
                  }}
                  onClick={() => {
                    setOpen(!open);
                  }}
                  placeholder="Select category..."
                >
                  {user_type === type && user_type !== "not specified" ? (
                    <p>{user_type}</p>
                  ) : (
                    <p>{type && type !== "not specified" ? type : "Select category..."}</p>
                  )}
                </div>
              </div>

              {open && user_type == null && (
                <div
                  style={{
                    position: "absolute",
                    top: "2rem",
                    width: "100%",
                    background: "#fff",
                    zIndex: 1,
                    borderRadius: 10,
                    border: "2px solid #eee",
                    paddingTop: "3.6rem",
                  }}
                >
                  {["Private", "Government", "Laboratory"].map((i, k) => (
                    <div
                      key={k}
                      onClick={() => {
                        setType(i);
                        setOpen(false);
                      }}
                      style={{
                        width: "100%",
                        padding: "1rem",
                        cursor: "pointer",
                        color: "#797d85",
                        borderBottom: k < 2 ? "1px solid #eee" : "none",
                      }}
                    >
                      <p>{i}</p>
                    </div>
                  ))}
                </div>
              )}

              {user_type === null && (
                <IoIosArrowDown
                  color="#333"
                  style={{
                    position: "absolute",
                    right: "1rem",
                    bottom: "3.15rem",
                    zIndex: 2,
                  }}
                />
              )}
            </div>
          </div>

          {options.map((i, k) => (
            <div key={k} style={{ marginBottom: "1rem" }}>
              <p className={styles.label}>
                {k + 2}. {i ? i.label : ""}
              </p>
              <input
                name={i.value}
                ref={(function x() {
                  switch (k) {
                    case 7:
                      return register({
                        required: "Required",
                        pattern: /^\d+$/,
                        message: "Contact number must consist of digit's only",
                      });
                    case 8:
                      return register({
                        required: "Required",
                        pattern: /^\d+$/,
                        message: "Quantity must consist of digit's only",
                      });
                    case 9:
                      return register({
                        required: "Required",
                        pattern: /^\d+$/,
                        message: "Price must consist of digit's only",
                      });
                    case 6:
                      return register({
                        required: "Required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "invalid email address",
                        },
                      });
                    default:
                      return register({ required: "Required" });
                  }
                })()}
                type={"text"}
                placeholder={i ? i.placeholder : "..."}
                defaultValue={
                  k === 6
                    ? Cookie.get("email")
                    : form_values
                    ? form_values[i.value]
                    : null
                }
                disabled={
                  k === 6
                  // && auth_type === "signin"
                }
                className={
                  Object.keys(errors).includes(i.label)
                    ? styles.input1
                    : styles.input
                }
              />
            </div>
          ))}

          <div style={{ marginBottom: "1rem" }}>
            <p className={styles.label}>12. Logo</p>
            <label htmlFor="logo" style={{ width: "100%", maxWidth: "38rem" }}>
              <div className={styles.upload}>
                {imgFile ? (
                  <img src={imgFile} alt="img" style={{ width: "63%" }} />
                ) : (
                  <IoCloudUploadOutline
                    style={{
                      fontSize: "5.4rem",
                      color: "#4169bf",
                    }}
                  />
                )}
                {!imgFile && (
                  <p
                    style={{
                      fontWeight: 500,
                      marginTop: "0.1rem",
                      fontSize: "1.1rem",
                      color: "#4169bf",
                    }}
                  >
                    Upload
                  </p>
                )}
              </div>
            </label>
          </div>
          <input
            id="logo"
            style={{ display: "none" }}
            type="file"
            accept=".png,.jpg,.jpeg"
            onChange={(e) => handleImgChange(e)}
          />

          <div style={{ marginBottom: "1rem" }}>
            <p className={styles.label}>13. Vaccine type(s)</p>
            <div
              style={{
                display: "flex",
                position: "relative",
                marginTop: "1rem",
              }}
            >
              <FormGroup row>
                {["Covaxin", "AstraZeneca", "Sputnik", "J&J", "Janssen"].map(
                  (i, k) => (
                    <FormControlLabel
                      key={k}
                      control={
                        <Checkbox
                          checked={vaccines.includes(i)}
                          name={i}
                          color="primary"
                          onChange={(e) => {
                            const x = [...vaccines, e.target.name];
                            if (!vaccines.includes(e.target.name))
                              setVaccines(x);
                            else
                              setVaccines(
                                vaccines.filter((x) => x != e.target.name)
                              );
                          }}
                        />
                      }
                      label={i}
                    />
                  )
                )}
              </FormGroup>

              {/* <IoIosArrowDown
                color="#333"
                style={{
                  position: "absolute",
                  right: "1rem",
                  bottom: "3.15rem",
                  zIndex: 2,
                }}
              /> */}
            </div>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <p className={styles.label}>14. Payment method</p>
            <RadioGroup
              style={{ margin: "1rem 0" }}
              aria-label="payment"
              name="payment"
              required
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            >
              <FormControlLabel
                value="Letter of credit"
                control={<Radio color="primary" />}
                label="Letter of credit"
              />
              <FormControlLabel
                value="Escrow account"
                control={<Radio color="primary" />}
                label="Escrow account"
              />
              <FormControlLabel
                value="100% payment"
                control={<Radio color="primary" />}
                label="100% Payment"
              />
            </RadioGroup>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <button style={{ margin: "1rem auto" }} className={styles.btn}>
              Submit
              {/* {textObj["submitAndSeeResults"]} */}
            </button>
            <p
              style={{
                color: "red",
                textAlign: "center",
              }}
            >
              {Object.keys(errors).length > 0 &&
                !errors[textObj["email"]] &&
                "*All field's are required in valid format."}
              {Object.keys(errors).length > 0 &&
                errors[textObj["email"]] &&
                errors[textObj["email"]].message}
            </p>
          </div>
        </form>
      ) : (
        <div
          style={{
            height: "60vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={window.location.origin + "/images/spinner.svg"} alt="img" />
        </div>
      )}
    </>
  );
};

export default Form;
