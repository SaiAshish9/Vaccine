import React, { useEffect, useContext, useState } from "react";
import styles from "../../styles/Dashboard.module.css";
import { FaUserAlt } from "react-icons/fa";
import { AiFillProject } from "react-icons/ai";
import { IoDocumentText } from "react-icons/io5";
import AdminTable from "../../components/adminTable";
import Splash from "../../components/Splash";
import { Context } from "../../contexts";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { IoIosArrowDown, IoLogoBitbucket } from "react-icons/io";
import Nav from "../../components/dashboard-nav";
import { BsChatDots, BsBucket } from "react-icons/bs";
import ProductsTable from "../../components/productsTable";
import OrdersTable from "../../components/ordersTable";
import Chatbox from "../../components/chatbox";

const Dropdown = ({ placeholder, options, type, setType, disabled, err }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        padding: 0,
        cursor: "pointer",
        position: "relative",
      }}
      onClick={() => {
        setOpen(!open);
      }}
    >
      <input
        disabled
        value={type ? type : ""}
        placeholder={placeholder}
        style={{
          width: "10rem",
          cursor: !disabled ? "pointer" : "text",
          position: "relative",
          zIndex: 2,
        }}
        className={err ? styles.input1 : styles.input}
      />
      <IoIosArrowDown
        style={{ position: "absolute", top: "1.15rem", right: 10, zIndex: 2 }}
      />
      {open && !disabled && (
        <div
          style={{
            position: "absolute",
            top: "2rem",
            width: "100%",
            background: "#fff",
            zIndex: 1,
            borderRadius: 10,
            border: "2px solid #eee",
            paddingTop: "1rem",
          }}
        >
          {options.map((i, k) => (
            <div
              key={k}
              onClick={() => {
                setType(i);
                setOpen(false);
              }}
              style={{
                width: "100%",
                padding: "1rem",
                zIndex: 1,
                position: "relative",
                cursor: "pointer",
                color: "#797d85",
                borderBottom: k < options.length ? "1px solid #eee" : "none",
              }}
            >
              <p
                style={{
                  zIndex: 1,
                  position: "relative",
                }}
              >
                {i}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Dashboard = () => {
  const {
    state: { email, user_type, role },
    signOut,
    fetchTableData,
    fetchUserType,
  } = useContext(Context);

  const [filter_type, setFilterType] = useState(null);
  const [search, setSearch] = useState(null);
  const [sort_by, setSortBy] = useState(null);
  const [order, setOrder] = useState(null);
  const [err, setErr] = useState(null);
  const [selected, setSelected] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if (!Cookie.get("email")) {
      // router.push("/");
    } else {
      fetchUserType();
      fetchTableData();
    }
  }, []);

  return (
    <>
      {!email ? (
        <Splash />
      ) : (
        <div>
          <div className={styles.nav}>
            <Nav />
          </div>
          <div className={styles.container}>
            <div className={styles.drawer}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img
                  src={window.location.origin + "/images/logo.png"}
                  alt="img"
                  style={{ width: "75%" }}
                />
                <div style={{ width: "100%", marginTop: "4rem" }}>
                  {role === "admin" ? (
                    <div
                      style={{
                        borderLeft:
                          selected === 0
                            ? "0.36rem solid #073bab"
                            : "0.36rem solid #edf0f7",
                      }}
                      className={styles.link}
                      onClick={() => {
                        setSelected(0);
                      }}
                    >
                      <FaUserAlt
                        size={18}
                        color={selected === 0 ? "#073bab" : "#999"}
                      />
                      <p
                        className={
                          selected === 0 ? styles.linkText : styles.linkText1
                        }
                      >
                        Users
                      </p>
                    </div>
                  ) : ["Government", "Private"].includes(user_type) ? (
                    <div
                      style={{
                        borderLeft:
                          selected === 0
                            ? "0.36rem solid #073bab"
                            : "0.36rem solid #edf0f7",
                      }}
                      onClick={() => {
                        setSelected(0);
                      }}
                      className={styles.link}
                    >
                      <BsBucket
                        size={21}
                        color={selected === 0 ? "#073bab" : "#999"}
                      />
                      <p
                        className={
                          selected === 0 ? styles.linkText : styles.linkText1
                        }
                      >
                        Orders
                      </p>
                    </div>
                  ) : (
                    <div
                      style={{
                        borderLeft:
                          selected === 0
                            ? "0.36rem solid #073bab"
                            : "0.36rem solid #edf0f7",
                      }}
                      className={styles.link}
                      onClick={() => {
                        setSelected(0);
                      }}
                    >
                      <IoLogoBitbucket
                        size={21}
                        color={selected === 0 ? "#073bab" : "#76787B"}
                      />
                      <p
                        className={
                          selected === 0 ? styles.linkText : styles.linkText1
                        }
                      >
                        Products
                      </p>
                    </div>
                  )}

                  {role === "admin" ? (
                    <div
                      style={{
                        borderLeft:
                          selected === 1
                            ? "0.36rem solid #073bab"
                            : "0.36rem solid #edf0f7",
                      }}
                      onClick={() => {
                        setSelected(1);
                      }}
                      className={styles.link}
                    >
                      <AiFillProject
                        size={21}
                        color={selected === 1 ? "#073bab" : "#76787B"}
                      />
                      <p
                        className={
                          selected === 1 ? styles.linkText : styles.linkText1
                        }
                      >
                        Updates
                      </p>
                    </div>
                  ) : (
                    <div
                      style={{
                        borderLeft:
                          selected === 1
                            ? "0.36rem solid #073bab"
                            : "0.36rem solid #edf0f7",
                      }}
                      onClick={() => {
                        setSelected(1);
                      }}
                      className={styles.link}
                    >
                      <BsChatDots
                        size={21}
                        color={selected === 1 ? "#073bab" : "#76787B"}
                      />
                      <p
                        className={
                          selected === 1 ? styles.linkText : styles.linkText1
                        }
                      >
                        Chat's
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div
                style={{
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ width: "90%", marginLeft: "1rem" }}>
                  <img
                    alt="img"
                    style={{ width: "50%", marginBottom: "0.5rem" }}
                    src={window.location.origin + "/images/partner1.png"}
                  />
                </div>

                <p
                  style={{
                    textAlign: "start",
                    width: "100%",
                    margin: "0.5rem 0 1rem",
                    color: "#76787B",
                    fontWeight: 500,
                  }}
                >
                  Welcome Alan
                </p>
                <div
                  className={styles.link}
                  onClick={() => {
                    signOut();
                    router.push("/");
                  }}
                  style={{ margin: "0rem", padding: "0.5rem 0" }}
                >
                  <IoDocumentText color="#76787B" />
                  <p className={styles.text}>Logout</p>
                </div>
              </div>
            </div>
            {selected === 0 && (
              <div className={styles.content}>
                <p
                  style={{
                    textAlign: "center",
                    color: "#707070",
                    fontSize: 20,
                    marginBottom: role === "admin" ? 0 : "3rem",
                    padding: 0,
                  }}
                >
                  {role === "admin"
                    ? "Dashboard"
                    : !["Government", "Private"].includes(user_type)
                    ? "Products"
                    : "Orders"}
                </p>
                {role === "admin" && (
                  <div className={styles.filter}>
                    <Dropdown
                      options={[
                        "ID",
                        "Created At",
                        "Email",
                        "User Type",
                        "Role",
                      ]}
                      placeholder={"Filter..."}
                      type={filter_type}
                      setType={setFilterType}
                      err={err === "filter_type"}
                    />
                    <input
                      disabled={filter_type === null}
                      placeholder={"Search..."}
                      style={{ width: "50%" }}
                      className={
                        err === "search" ? styles.input1 : styles.input
                      }
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                    />
                    <Dropdown
                      options={[
                        "ID",
                        "Created At",
                        "Email",
                        "User Type",
                        "Role",
                      ]}
                      placeholder={"Sort By..."}
                      type={sort_by}
                      setType={setSortBy}
                      err={err === "sort_by"}
                    />
                    <Dropdown
                      options={["Descending", "Ascending"]}
                      placeholder={"Order..."}
                      type={order}
                      setType={setOrder}
                      err={err === "order"}
                    />
                    <button
                      onClick={() => {
                        console.log(search);
                        if (
                          (filter_type && !search) ||
                          (search && !filter_type)
                        ) {
                          setErr(!search ? "search" : "user_type");
                          fetchTableData();
                        } else {
                          fetchTableData({
                            sort_by,
                            order,
                            search,
                            filter_type,
                          });
                        }
                      }}
                      className={styles.btn}
                    >
                      Apply
                    </button>
                  </div>
                )}

                <div className={styles.table} style={{ height: "70vh" }}>
                  {role === "admin" && <AdminTable />}
                  {user_type === "Laboratory" && role === "customer" && (
                    <ProductsTable />
                  )}
                  {user_type !== "Laboratory" && role === "customer" && (
                    <OrdersTable />
                  )}
                </div>
              </div>
            )}
            {selected === 1 && (
              <div className={styles.content}>
                <p
                  style={{
                    textAlign: "center",
                    color: "#707070",
                    fontSize: 20,
                    padding: 0,
                    marginBottom: "3rem",
                  }}
                >
                  Chatbox
                </p>
                <div className={styles.table} style={{ height: "80vh" }}>
                  <Chatbox />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
