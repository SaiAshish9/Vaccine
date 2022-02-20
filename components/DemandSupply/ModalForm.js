import React, { useContext, useState } from "react";

import { useRouter } from "next/router";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { Context } from "../../contexts/index.js";

import styles from "../../styles/ModalForm.module.css";

export default function ModalForm({
  show,
  handleClose,
  itemDetail,
  tabName,
  option,
}) {
  const [validated, setValidated] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    number: 0,
    country: "",
    organization: "",
    quantity: 0,
    city: "",
    vaccine: "",
  });

  const router = useRouter();
  const { locale } = router;
  const {
    state: { texts, countryCode, user_details },
  } = useContext(Context);

  const language =
    locale !== "undefined" ? locale : countryCode ? countryCode : "en";
  const textObj = texts[language] || {};

  const handleFirstName = (e) => {
    let newValues = Object.assign({}, formValues);
    newValues["firstname"] = e.target.value;
    setFormValues(newValues);
  };

  const handleLastName = (e) => {
    let newValues = Object.assign({}, formValues);
    newValues["lastname"] = e.target.value;
    setFormValues(newValues);
  };

  const handleEmail = (e) => {
    let newValues = Object.assign({}, formValues);
    newValues["email"] = e.target.value;
    setFormValues(newValues);
  };

  const handleContact = (e) => {
    let newValues = Object.assign({}, formValues);
    newValues["number"] = e.target.value;
    setFormValues(newValues);
  };

  const handleCountry = (e) => {
    let newValues = Object.assign({}, formValues);
    newValues["country"] = e.target.value;
    setFormValues(newValues);
  };

  const handleOrg = (e) => {
    let newValues = Object.assign({}, formValues);
    newValues["organization"] = e.target.value;
    setFormValues(newValues);
  };

  const handleQty = (e) => {
    let newValues = Object.assign({}, formValues);
    newValues["quantity"] = e.target.value;
    setFormValues(newValues);
  };

  const handleCity = (e) => {
    let newValues = Object.assign({}, formValues);
    newValues["city"] = e.target.value;
    setFormValues(newValues);
  };

  const handleSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      setLoading(true);
      const postURI =
        "https://sheet.best/api/sheets/1cc81098-a651-4659-a9fa-8fdbf0edea52";

      const postData = Object.assign({}, formValues);
      if (option === "supply") {
        postData["qOffering"] = formValues["quantity"];
      } else {
        postData["qNeeded"] = formValues["quantity"];
      }
      postData["vaccine"] = itemDetail.name;
      postData["created_at"] = new Date().toLocaleDateString();
      delete postData["quantity"];
      fetch(postURI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      })
        .then((res) => {
          handleClose();
          setLoading(false);
          toast.success("Vaccine ordered successfully!");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
    setValidated(true);
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {textObj.connectWith} - {itemDetail.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.modalBody} style={{ paddingLeft: 10 }}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>{textObj.fname}</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="First name"
                  name="firstname"
                  value={formValues["firstname"]}
                  onChange={handleFirstName}
                />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label>{textObj.lname}</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Last name"
                  name="lastname"
                  value={formValues["lastname"]}
                  onChange={handleLastName}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="6" controlId="validationCustomEmail">
                <Form.Label>{textObj.email}</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="abc@example.com"
                  name="email"
                  value={formValues["email"]}
                  onChange={handleEmail}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustomContact">
                <Form.Label>{textObj.number}</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="+44123.."
                  name="contact"
                  min="0"
                  value={formValues["number"]}
                  onChange={handleContact}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid contact.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="6" controlId="validationCustomCountry">
                <Form.Label>{textObj.country}</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="country"
                  value={formValues["country"]}
                  onChange={handleCountry}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid country.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>{textObj.city}</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formValues["city"]}
                  onChange={handleCity}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="6" controlId="validationCustomOrg">
                <Form.Label>{textObj.orgName}</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="organization"
                  name="organization"
                  value={formValues["organization"]}
                  onChange={handleOrg}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid organization.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustomQty">
                <Form.Label>
                  {tabName !== "demand"
                    ? `${textObj.qOffering}`
                    : `${textObj.qNeeded}`}
                </Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="000"
                  min="1"
                  name="quantity"
                  value={formValues["quantity"]}
                  onChange={handleQty}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid quantity.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row className="justify-content-center">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Connecting.." : `${textObj.connectNow}`}
              </Button>
            </Form.Row>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
