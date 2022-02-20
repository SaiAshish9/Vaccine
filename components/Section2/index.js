import styles from "../../styles/Section2.module.css";

const Section2 = () => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        width: "100vw",
        padding: "4rem 0 1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p className={styles.heading}>Our Partner's</p>
      <div
        className={styles.adjustment}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {[
          "/images/partner1.png",
          "/images/partner2.png",
          "/images/partner3.png",
          "/images/partner4.png",
        ].map((i, k) => (
          <img
            key={k}
            src={window.location.origin + i}
            className={styles.img1}
            alt="img"
            style={{
              width: k > 2 ? "7rem" : "9rem",
              cursor: "pointer",
              margin: k === 1 ? "2.2rem 2rem 1.2rem" : "1.2rem 2rem",
            }}
          />
        ))}
      </div>

      <img
        src="https://searchvaccines.com/images/map.png"
        className={styles.img}
        alt="img"
      />
    </div>
  );
};

export default Section2;
