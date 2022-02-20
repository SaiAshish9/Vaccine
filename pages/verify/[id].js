import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import Cookie from "js-cookie";
import { Context } from "../../contexts";

const Verify = () => {
  const router = useRouter();

  const { verifyEmail } = useContext(Context);

  const verify = async () => {
    try {
      await verifyEmail(atob(router.query.id));
      toast.success("Congratulation's 🎉 ! Your account is activated");
      if (Cookie.get("email")) router.push("/step");
      else router.push("/");
    } catch (e) {
      console.log;
      toast.error("Activation Unsuccessful");
      router.push("/");
    }
  };

  useEffect(() => {
    verify();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "#fcfdff",
          width: "100%",
          flexDirection: "column",
        }}
      >
        <img
          alt="img"
          src={window.location.origin + "/images/logo.png"}
          style={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            width: "14rem",
          }}
        />
        <img
          alt="image"
          src={window.location.origin + "/images/spinner-1.svg"}
        />
        <p style={{ fontWeight: 500 }}>Verifying...</p>
      </div>
    </>
  );
};

export default Verify;
