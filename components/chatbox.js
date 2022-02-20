import React from "react";
import { HiOutlineEmojiHappy } from "react-icons/hi";

const Chatbox = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          width: "25%",
          height: "100%",
          borderRight: "1px solid #edf0f7",
        }}
      >
        {[...Array(10).keys()].map((i, k) => (
          <div
            key={k}
            style={{
              height: "10%",
              borderBottom: "1px solid #edf0f7",
            }}
          ></div>
        ))}
      </div>
      <div
        style={{
          width: "75%",
          background: "#fff",
          display: "flex",
          flexDirection: "column-reverse",
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: "100%",
            borderTop: "1px solid #edf0f7",
            height: "3.6rem",
            background: "#fcfdff",
            display: "flex",
            alignItems: "center",
            padding: "0 1rem",
          }}
        >
          <HiOutlineEmojiHappy
            size={27}
            style={{
              cursor: "pointer",
              color: "#76787b",
            }}
          />
          <div
            style={{
              width: "100%",
              height: "2.6rem",
              marginLeft: "1rem",
              borderRadius: 7,
              border: "2px solid #edf0f7",
              background: "#fff",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              style={{
                width: "90%",
                height: "80%",
                border: "none",
                outline: "none",
                padding: "0.5rem",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
