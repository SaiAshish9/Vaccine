// import { useState, useContext } from "react";
// import styles from "../styles/Step.module.css";
// import { options } from "../constants/options";
// import { toast } from "react-toastify";
// import { Context, saveDetailsWithoutVaccine } from "../contexts";
// import moment from "moment";
// import { useRouter } from "next/router";

// const Option = ({ text, placeholder, icon, err, index, value, onChange }) => {
//   const [clicked, setClicked] = useState(false);
//   const [values, setValues] = useState(options);
//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//       }}
//     >
//       <p style={{ position: "relative", top: 3.6 }} className={styles.tag}>
//         {text}
//       </p>
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           position: "relative",
//         }}
//         className={styles.cont}
//         onClick={() => {
//           if (icon) {
//             setClicked(!clicked);
//           }
//         }}
//       >
//         <input
//           value={value}
//           onChange={onChange}
//           required
//           type={
//             index < 4
//               ? "text"
//               : index == 4
//               ? "email"
//               : index == 5
//               ? "tel"
//               : "number"
//           }
//           onKeyUp={(e) => {
//             if (icon && e.target.value)
//               setValues(
//                 values.filter((x) => x["text"].startsWith(e.target.value))
//               );
//             else {
//               setValues(options);
//             }
//           }}
//           style={{
//             cursor: icon ? "pointer" : "text",
//             position: "relative",
//             zIndex: icon ? 2 : 0,
//           }}
//           placeholder={placeholder}
//           className={err.includes(index) ? styles.input1 : styles.input}
//         />
//       </div>
//     </div>
//   );
// };

// const Step = ({ step, setStep, option }) => {
//   const [name, setName] = useState("");
//   const [organisation, setOrganisation] = useState("");
//   const [country, setCountry] = useState("");
//   const [city, setCity] = useState("");
//   const [email, setEmail] = useState("");
//   const [number, setNumber] = useState("");
//   const [qty, setQty] = useState("");
//   const [err, setErr] = useState([]);
//   const [err_msg, setErrMsg] = useState("");
//   const router = useRouter();
//   const { locale } = router;
//   const {
//     state: { user_details, texts, countryCode },
//     setUserDetails,
//   } = useContext(Context);
//   const language =
//     locale !== "undefined" ? locale : countryCode ? countryCode : "en";
//   const textObj = texts[language] || {};

//   const handleSubmit = () => {
//     console.log(option);
//     const postURI =
//       "https://sheet.best/api/sheets/1cc81098-a651-4659-a9fa-8fdbf0edea52";
//     const postData = {
//       city: city,
//       country: country,
//       email: email,
//       firstname: name.split(" ")[0],
//       lastname: name.split(" ")[1],
//       number: number,
//       organization: organisation,
//       qNeeded: option === "supply" ? qty : null,
//       qOffering: option === "demand" ? qty : null,
//       created_at: moment().format("MMMM Do YYYY, h:mm:ss a"),
//     };
//     fetch(postURI, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ...postData, vaccine: "" }),
//     })
//       .then((res) => {
//         saveDetailsWithoutVaccine(postData);
//         setUserDetails(postData);
//         toast.success("Form submitted successfully!");
//       })
//       .catch((err) => {
//         toast.error(err.message);
//       });
//   };

//   return (
//     <div
//       style={{
//         width: "100%",
//         minHeight: "60vh",
//       }}
//     >
//       <div
//         style={{
//           padding: "2rem 0 4rem",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         {step == 0 ? (
//           <>
//             <Option
//               err={err}
//               index={0}
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               text={textObj["tellUsYourName"]}
//               placeholder={
//                 language !== "en"
//                   ? `${textObj["tellUsYourName"]}...`
//                   : "Name..."
//               }
//             />
//             <Option
//               err={err}
//               index={1}
//               value={organisation}
//               onChange={(e) => setOrganisation(e.target.value)}
//               text={textObj["nameOfOrganisation"]}
//               placeholder={
//                 language !== "en"
//                   ? `${textObj["nameOfOrganisation"]}...`
//                   : "Organisation..."
//               }
//             />
//           </>
//         ) : step == 1 ? (
//           <>
//             <Option
//               err={err}
//               index={2}
//               value={country}
//               onChange={(e) => setCountry(e.target.value)}
//               text={textObj["country"]}
//               placeholder={
//                 language !== "en" ? `${textObj["country"]}...` : "Country..."
//               } // icon
//             />
//             <Option
//               err={err}
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               index={3}
//               text={textObj["city"]}
//               placeholder={
//                 language !== "en" ? `${textObj["city"]}...` : "City..."
//               }
//             />
//           </>
//         ) : (
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <Option
//               err={err}
//               index={4}
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               text={textObj["email"]}
//               placeholder={textObj["email"]}
//             />
//             <Option
//               err={err}
//               index={5}
//               value={number}
//               onChange={(e) => setNumber(e.target.value)}
//               text={textObj["number"]}
//               placeholder="Contact Number..."
//             />
//             <Option
//               err={err}
//               index={6}
//               value={qty}
//               onChange={(e) => setQty(e.target.value)}
//               text={textObj["quantity"]}
//               placeholder="0"
//             />
//             <div style={{ display: "flex", alignItems: "center" }}>
//               <button
//                 onClick={() => {
//                   setStep(step - 1);
//                 }}
//                 className={styles.btn}
//                 style={{ marginRight: "1rem", background: "#000" }}
//               >
//                 {textObj["previous"]}
//               </button>
//               <button
//                 onClick={() => {
//                   if (
//                     email.length > 5 &&
//                     number.length >= 5 &&
//                     qty.length > 0
//                   ) {
//                     setErr([]);
//                     handleSubmit();
//                     setErrMsg("");
//                     setStep(step + 1);
//                   } else if (email.length == 0) {
//                     const x = [4];
//                     setErr(x);
//                     setErrMsg("*Email is required");
//                   } else if (number.length < 5) {
//                     const x = [5];
//                     setErr(x);
//                     setErrMsg("*Contact number length must be atleast 5");
//                   } else if (qty.length == 0) {
//                     const x = [6];
//                     setErr(x);
//                     setErrMsg("*Quantity is required");
//                   } else if (
//                     !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
//                       email
//                     )
//                   ) {
//                     const x = [4];
//                     setErr(x);
//                     setErrMsg("*Email is invalid");
//                   } else if (!/^\d+$/.test(number)) {
//                     setErr([5]);
//                     setErrMsg("*Contact Number must consist of digit's only");
//                   } else if (!/^\d+$/.test(qty)) {
//                     setErr([6]);
//                     setErrMsg("*Quantity must consist of digit's only");
//                   }
//                 }}
//                 className={styles.btn}
//               >
//                 {textObj["submitAndSeeResults"]}
//               </button>
//             </div>
//           </div>
//         )}
//         {step != 2  && (
//           <div>
//             <button
//               onClick={() => {
//                 setStep(step - 1);
//               }}
//               className={styles.btn}
//               style={{ marginRight: "1rem", background: "#000" }}
//             >
//               {textObj["previous"]}
//             </button>
//             <button
//               onClick={() => {
//                 if (step == 0) {
//                   if (name.length >= 2 && organisation.length >= 2) {
//                     setErr([]);
//                     setErrMsg("");
//                     setStep(step + 1);
//                   } else if (name.length < 2 && organisation.length >= 2) {
//                     const x = [0];
//                     setErrMsg(
//                       "*Your name should consist of atleast 2 character's"
//                     );
//                     setErr(x);
//                   } else if (organisation.length < 2 && name.length >= 2) {
//                     const x = [1];
//                     setErrMsg(
//                       "*Organisation name must consist of atleast 2 character's"
//                     );
//                     setErr(x);
//                   } else {
//                     const x = [0, 1];
//                     setErrMsg(
//                       "*Your and organisation's name must consist of atleast 2 character's"
//                     );
//                     setErr(x);
//                   }
//                 }
//                 if (step == 1) {
//                   if (
//                     country.length > 0 &&
//                     city.length > 0 &&
//                     !/\d/g.test(country) &&
//                     !/\d/g.test(city)
//                   ) {
//                     setStep(step + 1);
//                     setErr([]);
//                     setErrMsg("");
//                   } else if (country.length == 0 && city.length != 0) {
//                     const x = [2];
//                     setErr(x);
//                     setErrMsg("*Country is required");
//                   } else if (city.length == 0 && country.length != 0) {
//                     const x = [3];
//                     setErr(x);
//                     setErrMsg("*City is required");
//                   } else if (/\d/g.test(country)) {
//                     const x = [2];
//                     setErr(x);
//                     setErrMsg("*Country should not contain digit");
//                   } else if (/\d/g.test(city)) {
//                     const x = [3];
//                     setErr(x);
//                     setErrMsg("*City should not contain digit");
//                   } else {
//                     const x = [2, 3];
//                     setErr(x);
//                     setErrMsg("*Country and city are required");
//                   }
//                 }
//               }}
//               className={styles.btn}
//             >
//               {textObj["next"]}
//             </button>
//           </div>
//         )}
//         <p style={{ margin: "1rem", color: "red", textAlign: "center" }}>
//           {err_msg}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Step;
