import React, { useEffect, useContext,useState } from "react";
import { Context } from "../contexts";
import styles from "../styles/Table.module.css";

const columns = [
  "S.No.",
  "ID",
  "Created At",
  "Product Name",
  "Quantity",
  "Target Price",
  "Vaccine Types",
];

const OrdersTable = () => {
  const {
    fetchOrders,
    state: { orders },
  } = useContext(Context);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className={styles.dashboard_table}>
      <table className={styles.table}>
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
          {orders &&
            orders.map((i, k) => (
              <tr
                onClick={() => {
                  // setOpen(true);
                  // setSelected(k);
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
                <td>
                  {i["product_id"] && i["product_id"].slice(0, 7) + "..."}
                </td>
                <td>{i["created_at"]}</td>
                <td>{i["quantity"]}</td>
                <td>{i["target_price"]}</td>
                <td>{i["vaccine_types"]}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {!orders && (
        <div
          style={{
            width: "70v",
            height: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            background: "#fcfdff",
            margin: 0,
          }}
        >
          <img
            src={window.location.origin + "/images/spinner-1.svg"}
            style={{ margin: 0, background: "#fcfdff" }}
            alt="img"
          />
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
