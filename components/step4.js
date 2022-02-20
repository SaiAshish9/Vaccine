import React, { useContext, useEffect } from "react";
import { VscFeedback } from "react-icons/vsc";
import { Context } from "../contexts";
import { FcCancel } from "react-icons/fc";
import { GiPartyPopper } from "react-icons/gi";
import styles from "../styles/Step.module.css";

const Step4 = ({ current, setCurrent, incrementCount }) => {
  const {
    state: { status },
    checkStatus,
  } = useContext(Context);

  const fetchStatus = async () => {
    await checkStatus();
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const data = {
    waiting: {
      icon: (
        <VscFeedback
          style={{
            fontSize: "3.6rem",
            marginBottom: "1rem",
            color: "#4169bf",
          }}
        />
      ),
      text: "Wait for official feedback",
    },
    sent: {
      icon: (
        <GiPartyPopper
          style={{
            fontSize: "3.6rem",
            marginBottom: "1rem",
            // color: "#4169bf",
            color: "#fd973b",
          }}
        />
      ),
      text: (
        <span>
          Congratulation's 🎉 ! Your leter of intent <br /> is accepted
        </span>
      ),
    },
    declined: {
      icon: (
        <FcCancel
          style={{
            fontSize: "3.6rem",
            marginBottom: "1rem",
          }}
        />
      ),
      text: (
        <span>
          Your letter of intent
          <br /> was rejected
        </span>
      ),
    },
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "7rem 0",
        flexDirection: "column",
        cursor: "pointer",
      }}
    >
      {data[status].icon}
      {/* {data["Declined"].icon} */}
      {/* {data["Sent"].icon} */}

      <p style={{ fontWeight: 500, textAlign: "center" }}>
        {data[status].text}
        {/* {data["Declined"].text} */}
        {/* {data["Sent"].text} */}
      </p>
      {status === "sent" && (
        <button
          onClick={() => {
            setCurrent(current + 1);
            incrementCount(current + 2);
          }}
          className={styles.btn}
          style={{ marginRight: "1rem" }}
        >
          {" "}
          Proceed Further
        </button>
      )}
    </div>
  );
};

export default Step4;
