import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Avatar } from "@material-ui/core";
import { Context, sendMail } from "../../contexts/index.js";

import { useRouter } from "next/router";

import styles from "../../styles/ItemsList.module.css";
import { IconContext } from "react-icons";
import { toast } from "react-toastify";

export default function ItemsList({ data, showModal, option }) {
  console.log("-gg", data);

  const router = useRouter();
  const { locale } = router;
  const {
    state: { countryCode, texts, user_details },
  } = useContext(Context);

  const sendRequest = (data) => {
    const postURI =
      "https://sheet.best/api/sheets/1cc81098-a651-4659-a9fa-8fdbf0edea52";
    const postData = {
      ...user_details,
      vaccine: data.name,
    };
    fetch(postURI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    })
      .then((res) => {
        // sendMail({
        //   email: user_details.email,
        //   data: postData,
        // });

        toast.success("Contact Requested!");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const language =
    locale !== "undefined" ? locale : countryCode ? countryCode : "en";
  const textObj = texts[language] || {};

  if (data.length === 0) {
    return (
      <Container className={styles.noItemFound}>
        <p>Oops no items found... please search for something else instead.</p>
      </Container>
    );
  }
  return (
    <Container className={styles.itemsContainer}>
      {data.map((item, i) => {
        return (
          <ListRow
            key={i}
            option={option}
            data={item}
            showModal={showModal}
            lang={textObj}
            sendRequest={sendRequest}
          />
        );
      })}
    </Container>
  );
}

function ListRow({ data, showModal, option, image, lang, sendRequest }) {
  const flags = {
    Philipines: "🇵🇭",
    Paraguay: "🇵🇾",
    Brasil: "🇧🇷 ",
    India: "🇮🇳",
    Portugal: "🇵🇹",
    Turkey: "🇹🇷",
  };

  if (option === 1) {
    return (
      <Container
        style={{ margin: "1rem 0", padding: "1rem" }}
        className={styles.itemDiv}
      >
        <Row style={{ paddingRight: "1rem" }} className="align-items-center">
          <Col md={1} xs={12} className={styles.priceCol}>
            <Avatar
              alt="img"
              variant="rounded"
              style={{
                height: "3rem",
                width: "3rem",
                backgroundColor: "#fff",
                color: "violet",
                fontSize: 27,
              }}
              size={42}
            >
              {flags[data["location"]]}
            </Avatar>
          </Col>

          <Col md={4} xs={12} className={styles.priceCol}>
            <IconContext.Provider value={{ color: "black" }}>
              <div className={styles.alignIcon}>
                <span style={{ marginLeft: 10 }}>
                  {lang.price}:{" "}
                  {data["price"] == 1
                    ? "$"
                    : data["price"] == 2
                    ? "$$$"
                    : "$$$$$"}
                </span>
              </div>
              <div className={styles.alignIcon}>
                <span style={{ marginLeft: 10 }}>
                  {lang.qtyOrdered}: {data["quantity"]}
                </span>
              </div>
              <div className={styles.alignIcon}>
                <span style={{ marginLeft: 10 }}>
                  {lang.Added}: {data["added"]}
                </span>
              </div>
            </IconContext.Provider>
          </Col>
          <Col md={5} xs={12}>
            <div>
              <h3>{data["name"]}</h3>
              <p>{data["description"]}</p>
            </div>
          </Col>
          <Col style={{ marginBottom: "0.8rem", marginTop: "0.5rem" }} md={2}>
            <Button onClick={() => sendRequest(data)} variant="primary">
              {lang.connect}
            </Button>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container
        style={{ margin: "1rem 0", padding: "1rem" }}
        className={styles.itemDiv}
      >
        <Row style={{ paddingRight: "1rem" }} className="align-items-center">
          <Col md={2} xs={3} className="align-items-center">
            <Avatar
              alt="img"
              variant="rounded"
              style={{
                height: "3rem",
                width: "3rem",
                backgroundColor: "#fff",
                color: "violet",
                fontSize: 27,
              }}
              size={42}
            >
              {flags[data["location"]]}
            </Avatar>
          </Col>
          <Col md={3} xs={9} className={styles.priceCol}>
            <IconContext.Provider value={{ color: "black" }}>
              <div className={styles.alignIcon}>
                <span style={{ marginLeft: 10 }}>
                  {lang.price}:{" "}
                  {data["price"] == 1
                    ? "$"
                    : data["price"] == 2
                    ? "$$$"
                    : "$$$$$"}
                </span>
              </div>
              <div className={styles.alignIcon}>
                <span style={{ marginLeft: 10 }}>
                  {lang.minOrder}: {data["min-order"]}
                </span>
              </div>
              <div className={styles.alignIcon}>
                <span style={{ marginLeft: 10 }}>
                  {lang.getBy}: {data["get-by"]}
                </span>
              </div>
            </IconContext.Provider>
          </Col>
          <Col md={5} xs={12}>
            <div>
              <h3>{data["name"]}</h3>
              <p>{data["description"]}</p>
            </div>
          </Col>
          <Col style={{ marginBottom: "0.8rem", marginTop: "0.5rem" }} md={2}>
            <Button onClick={() => sendRequest(data)} variant="primary">
              {lang.connect}
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
