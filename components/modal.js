import React, { useState, useContext, useRef } from "react";
import { Backdrop, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../styles/AuthModal.module.css";
import { useForm } from "react-hook-form";
import { GrFormClose } from "react-icons/gr";
import { Context } from "../contexts";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Modal = () => {
  const classes = useStyles();
  const [current, setCurrent] = useState(0);
  const [authOption, setAuthOption] = useState(0);
  const { handleSubmit, register, errors, watch } = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const password = useRef({});
  password.current = watch("password", "");

  const {
    signIn,
    signUp,
    state: { open_modal, user_type, auth_type, role, form_count },
    toggleModal,
    setAuthType,
    fetchUserType,
    toggleLoading,
  } = useContext(Context);

  const onSubmit = async (values) => {
    // setLoading(true);
    if (auth_type == "signup") {
      if (values["password"] === values["confirm"]) {
        try {
          toggleLoading(true);
          const data = await signUp({
            email: values["email"],
            password: values["password"],
          });
          setAuthType("signup");
          setLoading(false);
          await fetchUserType();
          toggleLoading(false);
          if (data["role"] === "customer") {
            router.push("step");
          } else {
            router.push("dashboard");
          }
          toggleModal(false);
          // toast.success("Authenticated Successfully");
        } catch (e) {
          console.log(e);
          setLoading(false);
          // setOpen(false);
          toggleLoading(false);
          toggleModal(false);
          toast.error("Invalid Credential's");
        }
      }
    } else {
      try {
        toggleLoading(true);
        const data = await signIn({
          email: values["email"],
          password: values["password"],
        });
        if (data["role"] === "customer") {
          if (form_count === 6) {
            router.push("dashboard");
          } else {
            router.push("step");
          }
          setAuthType("signin");
        } else {
          router.push("dashboard");
        }
        toggleLoading(false);
        setLoading(false);
        // setOpen(false);
        console.log(values["email"]);
        toggleModal(false);
        // toast.success("Authenticated Successfully");
      } catch (e) {
        console.log(e);
        setLoading(false);
        toggleLoading(false);
        // setOpen(false);
        toggleModal(false);
        toast.error("Invalid Credential's");
      }
    }
  };

  return (
    <Backdrop className={classes.backdrop} open={open_modal}>
      {auth_type == null && (
        <Box
          className={styles.box}
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <GrFormClose
            size={27}
            onClick={() => {
              setCurrent(0);
              toggleModal(false);
              // setOpen(false);
            }}
            style={{
              position: "absolute",
              top: 5,
              right: 5,
              cursor: "pointer",
            }}
          />
          <img
            src={window.location.origin + "/images/faq.svg"}
            alt="image"
            className={styles.img}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => {
                setAuthOption(1);
                setCurrent(current + 1);
                setAuthType("signin");
              }}
              className={styles.btn1}
              style={{ marginRight: "1rem", background: "#000" }}
            >
              Login
            </button>
            <button
              onClick={() => {
                setAuthOption(0);
                setAuthType("signup");
                setCurrent(current + 1);
              }}
              className={styles.btn1}
            >
              Register
            </button>
          </div>
        </Box>
      )}

      {auth_type != null && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            className={styles.box}
            style={{
              // width: "70vw",
              backgroundColor: "#fff",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <GrFormClose
              size={27}
              onClick={() => {
                setCurrent(0);
                // setOpen(false);
                toggleModal(false);
              }}
              style={{
                position: "absolute",
                top: 5,
                right: 5,
                cursor: "pointer",
              }}
            />
            <input
              name={"email"}
              ref={register({
                required: "Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
              //   required
              type={"email"}
              placeholder={"Email..."}
              className={
                Object.keys(errors).includes("email")
                  ? styles.input1
                  : styles.input
              }
            />
            <input
              name={"password"}
              ref={register({
                required: "Required",
                minLength: 6,
              })}
              //   required
              type={"password"}
              placeholder={"Password..."}
              className={
                Object.keys(errors).includes("password")
                  ? styles.input1
                  : styles.input
              }
            />
            {auth_type == "signup" && (
              <input
                name="confirm"
                ref={register({
                  validate: (value) =>
                    value === password.current || "*Password's do not match",
                })}
                // required
                defaultValue=""
                type={"password"}
                placeholder={"Confirm Password..."}
                className={
                  Object.keys(errors).includes("confirm")
                    ? styles.input1
                    : styles.input
                }
              />
            )}

            <button
              onClick={() => {
                console.log(Object.keys(errors));
              }}
              disabled={loading}
              type="submit"
              style={{
                outline: "none",
                padding: 0,
                border: "none",
                background: "#fff",
                opacity: loading ? 0.6 : 1,
              }}
            >
              <div className={styles.btn}>
                {loading
                  ? "Processing..."
                  : auth_type === "signup"
                  ? "Register"
                  : "Login"}
              </div>
            </button>
            <p
              style={{
                color: "red",
                textAlign: "center",
                marginTop: "0.5rem",
              }}
            >
              {errors.email && "*Invalid email"}
              <br />
              {errors.password && "*Password must be atleast 6 character's"}
              {errors.confirm && errors.confirm.message}
            </p>
            <p
              style={{
                fontWeight: 500,
                margin: "1rem 0",
                color: "#4169bf",
                textAlign: "center",
              }}
            >
              <span style={{ color: "#000" }}>
                {auth_type == "signin"
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </span>
              <a
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (auth_type === "signup") {
                    setAuthOption(1);
                    setAuthType("signin");
                  } else {
                    setAuthOption(0);
                    setAuthType("signup");
                  }
                }}
              >
                {auth_type === "signin" ? " register" : " login"}
              </a>
            </p>
          </Box>
        </form>
      )}
    </Backdrop>
  );
};

export default Modal;
