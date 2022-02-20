import React, { useState, useContext, useEffect } from "react";
import { Backdrop, Box } from "@material-ui/core";
import styles from "../styles/AuthModal.module.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  IoCloudUploadOutline,
  IoCloseCircleOutline,
  IoOpenOutline,
  IoCaretForwardCircleSharp,
} from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { Context } from "../contexts";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Dropdown = ({ label, options, type, setType, defautValue }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        padding: 0,
        cursor: "pointer",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div className={styles.descOption}>
          <p className={styles.label}>{label}</p>
          <div style={{ position: "relative", width: "100%", zIndex: 2 }}>
            <input
              placeholder={label + "..."}
              disabled={true}
              style={{ cursor: "pointer", position: "relative", zIndex: 2 }}
              value={type ? type : defautValue}
              defautValue={defautValue}
              className={styles.input}
            />
            {open && (
              <div
                style={{
                  position: "absolute",
                  top: "2rem",
                  background: "#fff",
                  zIndex: 1,
                  width: "100%",
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
                      cursor: "pointer",
                      color: "#797d85",
                      borderBottom: k < 2 ? "1px solid #eee" : "none",
                    }}
                  >
                    <p>{i}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <IoIosArrowDown
          style={{
            position: "absolute",
            top: "1.15rem",
            right: 14,
            color: "#999",
            zIndex: 3,
          }}
        />
      </div>
    </div>
  );
};

const Link = ({ text, link }) => {
  return (
    <div className={styles.descOption}>
      <p className={styles.label}>{text}</p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <a
          style={{
            color: "#4169bf",
            marginBottom: "1rem",
          }}
          target="__blank"
          href={link}
        >
          {link ? link.substring(0, 50) + "..." : ""}
        </a>
        {link && (
          <a
            style={{
              color: "#4169bf",
            }}
            target="__blank"
            href={link}
          >
            <IoOpenOutline
              style={{
                color: "#4169bf",
                fontSize: 18,
                marginBottom: "1rem",
                marginLeft: "1rem",
              }}
            />
          </a>
        )}
      </div>
    </div>
  );
};

const Option = ({ label, disabled, value, step, setStep }) => {
  return (
    <div className={styles.descOption}>
      <p className={styles.label}>{label}</p>
      {label !== "step" ? (
        <input
          placeholder={label + "..."}
          disabled={disabled}
          style={{ cursor: "not-allowed", opacity: 0.5 }}
          value={value}
          className={styles.input}
        />
      ) : (
        <input
          placeholder={label + "..."}
          type="number"
          min={1}
          max={5}
          onChange={(e) => {
            setStep(e.target.value);
          }}
          value={step}
          defaultValue={value}
          className={styles.input}
        />
      )}
    </div>
  );
};

const ConfirmationDialog = ({
  openConfirmationDialog,
  setOpenConfirmationDialog,
  email,
  page,
  setOpen,
}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const { deleteUser, fetchTableData } = useContext(Context);

  return (
    <Backdrop className={classes.backdrop} open={openConfirmationDialog}>
      <Box
        style={{
          height: "12rem",
          width: "30rem",
          background: "#edf0f7",
          position: "relative",
          zIndex: 2,
          borderRadius: 10,
          padding: "2rem",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            color: "#000",
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          Are you sure, you really
          <br /> want to delete this user?
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <button
            className={styles.btn}
            onClick={async () => {
              setLoading(true);
              await deleteUser(email);
              await fetchTableData({ page });
              setLoading(false);
              setOpenConfirmationDialog(false);
              setOpen(false);
            }}
            style={{
              opacity: loading ? 0.3 : 1,
              marginRight: "1rem",
              background: "green",
            }}
          >
            Yes
          </button>
          <button
            onClick={() => {
              setOpenConfirmationDialog(false);
            }}
            className={styles.btn}
            style={{ background: "#d13430", opacity: loading ? 0.3 : 1 }}
          >
            No
          </button>
        </div>
      </Box>
    </Backdrop>
  );
};

const Description = ({ open, setOpen, data, page }) => {
  const classes = useStyles();
  const [imgFile, setImgFile] = useState();
  const {
    state: { admin_modal_fields },
    updateUser,
    fetchTableData,
    fetchAdminModalFields,
  } = useContext(Context);
  const [role, setRole] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [step, setStep] = useState(data ? data["step"] : 1);
  const [load, setLoad] = useState(false);

  const getData = async () => {
    setLoad(true);
    fetchAdminModalFields(data["email"], data["user_type"]);
    setLoad(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Backdrop className={classes.backdrop} open={open}>
      <Box
        className={styles.modalBox}
        style={{
          backgroundColor: "#fff",
          borderRadius: 10,
          height: "90vh",
          width: "90vw",
          display: "flex",
          padding: "0rem 2rem 0",
          flexDirection: "column",
          position: "relative",
          zIndex: 1,
        }}
      >
        <ConfirmationDialog
          openConfirmationDialog={openConfirmationDialog}
          setOpenConfirmationDialog={setOpenConfirmationDialog}
          email={data ? data["email"] : null}
          setOpen={setOpen}
          page={page}
        />
        <div
          style={{
            height: 27,
            width: 27,
            borderRadius: "50%",
            padding: 0,
            position: "absolute",
            zIndex: 44,
            cursor: "pointer",
            backgroundColor: "#fff",
            right: -10,
            top: -10,
          }}
        >
          <IoCloseCircleOutline
            size={27}
            onClick={() => {
              setRole(null);
              setStatus(null);
              setOpen(false);
            }}
            style={{
              color: "#000",
            }}
          />
        </div>
        {!load && admin_modal_fields && (
          <>
            <div
              className={styles.modal}
              style={{ paddingTop: "2rem", overflowY: "scroll" }}
            >
              <div className={styles.desc}>
                <Link
                  text={
                    data
                      ? data["user_type"] !== "Laboratory"
                        ? "letter of intent"
                        : "letter of collaboration"
                      : null
                  }
                  link={data ? data["loi"] : null}
                />
                <Dropdown
                  label="status"
                  type={status}
                  setType={setStatus}
                  defautValue={data ? data["status"] : null}
                  options={["waiting", "sent", "declined"]}
                />
                {data &&
                  Object.entries(data)
                    .slice(0, 11)
                    .map(
                      (i, k) =>
                        i[0] !== "role" &&
                        i[0] != "status" &&
                        i[0] != "loi" &&
                        i[0] != "loa" && (
                          <Option
                            key={k}
                            disabled={true}
                            step={step}
                            setStep={setStep}
                            label={i[0]}
                            value={i[1]}
                          />
                        )
                    )}
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <p
                    className={styles.label}
                    style={{ margin: 0, width: "50%" }}
                  >
                    Logo
                  </p>
                  <label htmlFor="logo" style={{ width: "100%" }}>
                    <div
                      className={styles.upload}
                      style={{ width: "100%", height: "14rem", cursor: "text" }}
                    >
                      {admin_modal_fields && admin_modal_fields["logo"] ? (
                        <img
                          src={admin_modal_fields["logo"]}
                          alt="img"
                          style={{ width: "45%" }}
                        />
                      ) : (
                        <IoCloudUploadOutline
                          style={{
                            fontSize: "5.4rem",
                            color: "#4169bf",
                          }}
                        />
                      )}
                    </div>
                  </label>
                </div>
              </div>
              <div className={styles.desc}>
                <Link
                  text="letter of acceptance"
                  link={data ? data["loa"] : null}
                />
                <Dropdown
                  label="role"
                  type={role}
                  setType={setRole}
                  defautValue={data ? data["role"] : null}
                  options={["customer", "admin"]}
                />
                {data &&
                  Object.entries(data)
                    .slice(11)
                    .map(
                      (i, k) =>
                        i[0] != "logo" &&
                        i[0] != "loa" && (
                          <Option
                            key={k}
                            value={i[1]}
                            disabled={true}
                            label={
                              i[0] === "form_count"
                                ? "Current Step"
                                : i[0] === "user_type"
                                ? "User Type"
                                : i[0] === "vaccine_type"
                                ? "Vaccine Type"
                                : i[0]
                            }
                          />
                        )
                    )}
                {admin_modal_fields &&
                  Object.entries(admin_modal_fields).map(
                    (i, k) =>
                      i[0] != "logo" &&
                      i[0] != "loa" && (
                        <Option
                          key={k}
                          value={i[1]}
                          disabled={true}
                          label={
                            i[0] === "form_count"
                              ? "Current Step"
                              : i[0] === "user_type"
                              ? "User Type"
                              : i[0] === "vaccine_type"
                              ? "Vaccine Type"
                              : i[0]
                          }
                        />
                      )
                  )}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button
                className={styles.btn}
                onClick={() => {
                  setOpenConfirmationDialog(true);
                }}
                style={{
                  width: "10rem",
                  margin: "1rem",
                  background: "#d13430",
                }}
              >
                Delete
              </button>
              <button
                className={styles.btn}
                style={{
                  width: "10rem",
                  margin: "1rem",
                  opacity: loading ? 0.3 : 1,
                }}
                onClick={async () => {
                  setLoading(true);
                  await updateUser({
                    email: data["email"],
                    role: role ? role : data["role"],
                    status: status ? status : data ? data["status"] : null,
                    step,
                  });
                  await fetchTableData({ page });
                  setLoading(false);
                  setOpen(false);
                }}
              >
                Apply
              </button>
            </div>
          </>
        )}
        {!admin_modal_fields && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height:"100%"
            }}
          >
            <img
              alt="img"
              src={window.location.origin + "/images/spinner.svg"}
            />
          </div>
        )}
      </Box>
    </Backdrop>
  );
};

export default Description;
