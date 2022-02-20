import React from "react";

const LOI1 = () => {
  return (
    <div
      style={{
        padding: "2rem",
        height: "100vh",
        width: "100%",
      }}
    >
      <div
        style={{ width: "100%", display: "flex", flexDirection: "row-reverse" }}
      >
        <img src="https://searchvaccines.com/images/logo.png" alt="img" style={{ height: "2.7rem" }} />
      </div>
      <p
        style={{
          fontWeight: 500,
          textAlign: "center",
          margin: "1.5rem 0",
          fontSize: "1.2rem",
        }}
      >
        LETTER OF INTEND
      </p>
      <p>Date: …………..</p>
      <p>REF:</p>
      <br />
      <p style={{ fontWeight: 500 }}>To the attention:</p>
      <br />
      <p>
        <span> </span>We …………………. / company name / ID…………. , with address:
        ……………………. , CEO Mrs./Mr…………. / full name /, with full corporate
        authority and legal responsibilities under penalty of perjury do hereby
        officially confirm our willingness and readiness to buy COVID-19 vaccine
        under following conditions:
      </p>
      <div style={{ height: "3.5rem" }} />
      <p>1. PRODUCT: COVID-19 vaccine</p>
      <p>2. ORIGIN: India</p>
      <p>3. QUANTITY: ……………………. Million doses</p>
      <p>
        4. DELIVERY TIME: …..... / options – up to 21 days; 90 days and over 120
        days after receiving of 100% of the payment /
      </p>
      <p>5. TARGET PRICE: USD…………./ depending on the delivery time /</p>
      <p>6. PAYMENT TERM: 100% prepayment, after signing the contract</p>
      <p>
        7. DELIVERY TERMS: Air freight / in designated refrigerated containers /
      </p>
      <p>8. DESTINATION: …………………</p>
      <div style={{ height: "2.5rem" }} />
      <p style={{ fontWeight: 500, fontSize: 14 }}>
        Attachment: Authorization Letter to import COVID-19 vaccine to the
        destination country from related Governmental Authority.
      </p>
      <div style={{ height: "2rem" }} />
      <p>Sincerely,</p>
      <p>Mr. ……………..</p>
      <p>/ signature and company stamp /</p>
    </div>
  );
};

export default LOI1;
