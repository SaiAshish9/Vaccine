import React, { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import ItemsList from "./ItemsList.js";
import ModalForm from "./ModalForm.js";
import FilterBox from "./FilterBox.js";
import { Tabs, Paper, Tab, Box } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Context } from "../../contexts";
import { mockDemand } from "../../jsons/mockDemand";

import { useRouter } from "next/router";

import styles from "../../styles/DemandSupply.module.css";
import { mockSupply } from "../../jsons/mockSupply";

export default function DemandSupply({ option }) {
  const [filterString, setFilterString] = useState("");
  const [filterCategory, setCategory] = useState("name");
  const [demand, setDemand] = useState([]);
  const [supply, setSupply] = useState([]);
  const [show, setShow] = useState(false);
  const [modalItem, setViewedItem] = useState({});
  const [isLoading, setLoading] = useState(true);

  const router = useRouter();
  const { locale } = router;
  const {
    state: { texts, countryCode },
  } = useContext(Context);

  const language =
    locale !== "undefined" ? locale : countryCode ? countryCode : "en";
  const textObj = texts[language] || {};

  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    setViewedItem(data);
    setShow(true);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
    );
  }

  const filterData = (data) => {
    return data.filter((ele) => {
      try {
        if (filterCategory in ele) {
          return ele[`${filterCategory}`]
            .toLowerCase()
            .includes(filterString.toLowerCase());
        } else {
          return false;
        }
      } catch (err) {
        return false;
      }
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const demandURI =
          "https://sheet.best/api/sheets/3113ba6f-1e43-4f3d-bb8b-702797f24e0b";
        const supplyURI =
          "https://sheet.best/api/sheets/0ecfca96-d2cd-44f7-aae8-e311c771014f";
        const fetchURI = option === "demand" ? demandURI : supplyURI;
        const res = await fetch(fetchURI);
        const data = await res.json();
        option === "demand" ? setDemand(data) : setSupply(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        option === "demand" ? setDemand(mockDemand) : setSupply(mockSupply);
        setLoading(false);
      }
    }
    if (demand.length === 0 || supply.length === 0) {
      setLoading(true);
      fetchData();
    }
  }, [option]);

  return (
    <>
      <Container
        style={{ marginTop: "1rem", marginBottom: "2rem" }}
        className={styles.container}
      >
        <ModalForm
          show={show}
          handleClose={handleClose}
          itemDetail={modalItem}
          tabName={option}
          option={option}
        />
        <FilterBox
          filterString={filterString}
          setFilterString={setFilterString}
          setCategory={setCategory}
        />
        <div
          style={{
            marginTop: "1.5rem",
            marginBottom: "1rem",
          }}
        >
          {option == "demand" && (
            <TabPanel>
              {isLoading ? (
                <Container className={styles.loadingDiv}>
                  <CircularProgress />
                </Container>
              ) : (
                <ItemsList
                  option={1}
                  data={filterData(demand)}
                  showModal={handleShow}
                />
              )}
            </TabPanel>
          )}

          {option == "supply" && (
            <TabPanel>
              {isLoading ? (
                <Container className={styles.loadingDiv}>
                  <CircularProgress />
                </Container>
              ) : (
                <ItemsList
                  option={2}
                  data={filterData(supply)}
                  showModal={handleShow}
                />
              )}
            </TabPanel>
          )}
        </div>
      </Container>
      {option == "supply" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "2rem 0",
          }}
        >
          <div
            onClick={() => {
              router.push("/loi");
            }}
            className={styles.btn}
          >
            Generate LOI
          </div>
        </div>
      )}
    </>
  );
}
