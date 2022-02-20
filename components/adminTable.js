import React, { useContext, useState, useCallback } from "react";
import { Context } from "../contexts";
import styles from "../styles/Table.module.css";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { IconButton } from "@material-ui/core";
import Description from "./adminTableDescription";

const columns = [
  "S.No.",
  "ID",
  "Created At",
  "Email",
  "Verified",
  "User Type",
  "Status",
  "Role",
];

const data = [
  {
    created_at: "March 29th 2021, 12:24:25 am",
    email: "cse2.saiashish.37@gmail.com",
    user_type: "Laboratory",
    role: "Customer",
  },
  {
    created_at: "March 29th 2021, 12:24:25 am",
    email: "cse2.saiashish.37@gmail.com",
    user_type: "Laboratory",
    role: "Customer",
  },
  {
    created_at: "March 29th 2021, 12:24:25 am",
    email: "cse2.saiashish.37@gmail.com",
    user_type: "Laboratory",
    role: "Customer",
  },
  {
    created_at: "March 29th 2021, 12:24:25 am",
    email: "cse2.saiashish.37@gmail.com",
    user_type: "Laboratory",
    role: "Customer",
  },
];

const BasicTable = () => {
  const {
    state: { table_data, table_count },
    fetchTableData,
  } = useContext(Context);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(-1);

  return (
    <div className={styles.dashboard_table}>
      {table_data ? (
        <table
          className={styles.table}
        >
          <thead className={styles.header}>
            <tr>
              {columns.map((i, k) => (
                <th
                  style={{
                    borderTopLeftRadius: k == 0 ? "17px" : "0px",
                    borderTopRightRadius:
                      k == columns.length - 1 ? "17px" : "0px",
                    textAlign: k === 0 ? "center" : "start",
                    minWidth: "5rem",
                  }}
                  className={styles.th}
                  key={k}
                >
                  {i}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles.header} style={{ minHeight: "70vh" }}>
            {table_data.slice(0, 10).map((i, k) => (
              <tr
                onClick={() => {
                  setOpen(true);
                  setSelected(k);
                }}
                key={k}
                className={styles.row}
              >
                <td
                  style={{
                    textAlign: "center",
                  }}
                >
                  {(page - 1) * 10 + k + 1}
                </td>
                <td>{i["id"] && i["id"].slice(0, 7) + "..."}</td>
                <td>{i["created_at"]}</td>
                <td>{i.email}</td>
                <td
                  style={{
                    color:!i['verified'] ? "red" : "green",
                    fontWeight: 500,
                    paddingLeft: "1rem",
                  }}
                >
                  {!i['verified'] ? "No" : "Yes"}
                </td>
                <td>{i.user_type.toLowerCase()}</td>
                <td
                  style={{
                    color:
                      i.status === "waiting"
                        ? "orange"
                        : i.status === "sent"
                        ? "green"
                        : "red",
                    fontWeight: 500,
                  }}
                >
                  {i.status}
                </td>
                <td
                  style={{
                    color: i.role === "admin" ? "blue" : "inherit",
                    fontWeight: i.role === "admin" ? 500 : 400,
                  }}
                >
                  {i.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div
          style={{
            width: "70v",
            height: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            background: "#fcfdff",
          }}
        >
          <img src={window.location.origin + "/images/spinner.svg"} alt="img" />
        </div>
      )}
      {table_data && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            position: "absolute",
            bottom: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              disabled={page === 1}
              onClick={() => {
                fetchTableData({ page });
                setPage(page - 1);
              }}
            >
              <GrFormPrevious
                size={27}
                style={{ opacity: page === 1 ? 0.1 : 0.4 }}
              />
            </IconButton>
            <IconButton
              disabled={page === Math.ceil(table_count / 10)}
              onClick={() => {
                fetchTableData({ page });
                setPage(page + 1);
              }}
            >
              <GrFormNext
                size={27}
                style={{
                  opacity: page === Math.ceil(table_count / 10) ? 0.1 : 0.4,
                }}
              />
            </IconButton>
            <p style={{ marginLeft: 5, color: "#8c969a" }}>
              Page 1 of {Math.ceil(table_count / 10)}
            </p>
          </div>
          <div style={{ position: "relative", right: "1.8rem" }}>
            <p style={{ color: "#8c969a" }}>
              {table_count} {table_count === 1 ? "Entry" : "Entries"}
            </p>
          </div>
        </div>
      )}
      {open && table_data && (
        <Description
          data={table_data[selected]}
          open={open}
          setOpen={setOpen}
          page={page}
        />
      )}
    </div>
  );
};

export default BasicTable;
