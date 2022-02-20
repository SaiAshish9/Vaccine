import Api from "./api";
import createDataContext from "./createDataContext";
import { mockTranslations } from "../jsons/mockTranslations";
import axios from "axios";
import Cookie from "js-cookie";
import moment from "moment";
import firebase from "../firebase";
import { v4 as uuidv4 } from "uuid";

var database = firebase.database();

const db = firebase.firestore();

const FIREBASE_BASE_URL = `https://searchvaccines-c7371-default-rtdb.firebaseio.com/`;

const STORAGE_TOKEN = "584187f2-d847-4c6c-a844-73973fd0e264";

const DATASTORE_URL =
  "https://sheet.best/api/sheets/7a9d2217-df3d-40b7-af5c-df8843e5ce70/tabs/";

const reducer = (state, action) => {
  switch (action.type) {
    case "set-texts":
      return { ...state, texts: action.payload };
    case "set-countryCode":
      return { ...state, countryCode: action.payload };
    case "toggle-loading":
      return { ...state, loading: action.payload };
    case "set-user_details":
      return { ...state, user_details: action.payload };
    case "set-email":
      return { ...state, email: action.payload };
    case "toggle-modal":
      return { ...state, open_modal: action.payload };
    case "set-form_data":
      return { ...state, form_values: action.payload };
    case "set-table_data":
      return { ...state, table_data: action.payload };
    case "set-form_count":
      return { ...state, form_count: action.payload };
    case "set-auth_type":
      return { ...state, auth_type: action.payload };
    case "set-user_type":
      return { ...state, user_type: action.payload };
    case "set-status":
      return { ...state, status: action.payload };
    case "toggle-loading":
      return { ...state, loading: action.payload };
    case "set-verified":
      return { ...state, verified: action.payload };
    case "set-previous":
      return { ...state, previous: action.payload };
    case "set-table_count":
      return { ...state, table_count: action.payload };
    case "set-deleted":
      return { ...state, deleted: action.payload };
    case "set-role":
      return { ...state, role: action.payload };
    case "set-products":
      return { ...state, products: action.payload };
    case "set-orders":
      return { ...state, orders: action.payload };
    case "set-loa_uploaded":
      return { ...state, loa_uploaded: action.payload };
    case "set-admin_modal_fields":
      return { ...state, admin_modal_fields: action.payload };
    default:
      return state;
  }
};

const languages = {
  pt: ["pt-BR", "pt"],
  es: [
    "es",
    "es-AR",
    "es-GT",
    "es-CR",
    "es-PA",
    "es-DO",
    "es-MX",
    "es-VE",
    "es-CO",
    "es-PE",
    "es-EC",
    "es-CL",
    "es-UY",
    "es-PY",
    "es-BO",
    "es-SV",
    "es-HN",
    "es-NI",
    "es-PR",
  ],
  ru: ["ru", "ru-MI", "uk"],
  pl: ["pl"],
  de: ["de", "de-CH", "de-AT", "de-LU", "de-LI"],
  hu: ["hu"],
  zh: ["zh", "zh-TW", "zh-CN", "zh-HK", "zh-SG"],
  tr: ["tr"],
};

const setCountryIP = (dispatch) => {
  const userLanguage = navigator.language;

  for (const language of Object.keys(languages)) {
    if (languages[language].includes(userLanguage)) {
      dispatch({
        type: "set-countryCode",
        payload: language,
      });
      break;
    }
  }
};

const generatePDF = (dispatch) => async ({ child, file, type }) => {
  try {
    const email = Cookie.get("email");
    console.log(`${type}/${email}`, type, child);
    console.log(url);
    await firebase.storage().ref().child(child).put(file, "application/pdf");
    const url = await firebase
      .storage()
      .ref(`${type}/${email}`)
      .getDownloadURL();
    let obj = {};
    obj[type] = url;
    await db.collection("dev-users").doc(email).update(obj);
  } catch (e) {
    throw new Error(e);
  }
};

const fetchTexts = (dispatch) => async () => {
  try {
    const fetchUrl = "1acdf5a8-7165-40ab-a0e8-22917fd76808";
    const { data } = await Api(fetchUrl);
    generateTranslations(data, dispatch);
  } catch (e) {
    generateTranslations(mockTranslations, dispatch);
  }

  setCountryIP(dispatch);
};

const generateTranslations = (translations, dispatch) => {
  const translation = {
    en: {},
    pt: {},
    es: {},
    ru: {},
    pl: {},
    de: {},
    hu: {},
    zh: {},
    ph: {},
    tr: {},
    FR: {},
    IL: {},
  };
  translations.forEach((e) => {
    translation["en"][`${e.text}`] = e.en;
    translation["pt"][`${e.text}`] = e.pt;
    translation["es"][`${e.text}`] = e.es;
    translation["ru"][`${e.text}`] = e.ru;
    translation["pl"][`${e.text}`] = e.pl;
    translation["de"][`${e.text}`] = e.de;
    translation["hu"][`${e.text}`] = e.hu;
    translation["zh"][`${e.text}`] = e.zh;
    translation["ph"][`${e.text}`] = e.ph;
    translation["tr"][`${e.text}`] = e.tr;
    translation["FR"][`${e.text}`] = e.FR;
    translation["IL"][`${e.text}`] = e.IL;
  });

  dispatch({
    type: "set-texts",
    payload: translation,
  });

  dispatch({
    type: "toggle-loading",
    payload: false,
  });
};

const setUserDetails = (dispatch) => async (data) => {
  dispatch({
    type: "set-user_details",
    payload: data,
  });
};

const checkVerification = (dispatch) => async () => {
  try {
    var usersData = await db
      .collection("dev-users")
      .doc(Cookie.get("email"))
      .get();
    if (usersData.exists && usersData.data()["verified"]) {
      dispatch({
        type: "set-verified",
        payload: true,
      });
    }
  } catch (e) {}
};

export const incrementCount = async (data) => {
  const email = Cookie.get("email");
  await db.collection(`dev-users`).doc(email).update({ step: data });
};

export const saveDetailsWithoutVaccine = async (data, imgFile) => {
  try {
    const email = Cookie.get("email");
    const ordersRef = await db.collection("dev-orders").doc(email).get();
    const productsRef = await db.collection("dev-products").doc(email).get();

    var res;
    var req = data;
    var orders_req = {
      payment: req["payment"],
      vaccine_types: req["vaccine_types"],
      target_price: req["target_price"],
      quantity: req["quantity"],
    };
    var products_req = orders_req;

    if (data["image"]) {
      await firebase
        .storage()
        .ref()
        .child(`logo/${email}`)
        .put(data["image"], "image/jpeg");
      const url = await firebase
        .storage()
        .ref(`logo/${email}`)
        .getDownloadURL();
      orders_req = {
        ...orders_req,
        logo: url,
      };
    }

    if (req["user_type"] !== "Laboratory") {
      if (!ordersRef.exists) {
        orders_req = {
          ...orders_req,
          product_id: uuidv4(),
          created_at: moment().format("MMMM Do YYYY, h:mm:ss a"),
        };
        await db.collection(`dev-orders`).doc(email).set(orders_req);
      } else {
        await db.collection(`dev-orders`).doc(email).update(orders_req);
      }
    } else {
      if (!productsRef.exists) {
        products_req = {
          ...products_req,
          product_id: uuidv4(),
          created_at: moment().format("MMMM Do YYYY, h:mm:ss a"),
        };
        await db.collection(`dev-products`).doc(email).set(products_req);
      } else {
        await db.collection(`dev-products`).doc(email).update(products_req);
      }
    }

    res = await db.collection(`dev-users`).doc(email).update({
      first_name: req["first_name"],
      surname: req["surname"],
      city: req["city"],
      contact_number: req["contact_number"],
      country: req["country"],
      organisation_name: req["organisation_name"],
      position: req["position"],
      user_type: req["user_type"],
      step: 2,
    });
  } catch (e) {
    console.log(e);
    throw new Error("Something went wrong!");
  }
};

const fetchTableData = (dispatch) => async (data) => {
  try {
    dispatch({
      type: "set-table_data",
      payload: null,
    });
    var usersData;
    let users = [];
    var res = [];
    if (data && data.filter_type) {
      let x;
      if (data.filter_type === "ID") {
        x = "id";
      } else if (data.filter_type === "Created At") {
        x = "created_at";
      } else if (data.filter_type === "Email") {
        x = "email";
      } else if (data.filter_type === "User Type") {
        x = "user_type";
      } else if (data.filter_type === "Role") {
        x = "role";
      }
      usersData = await db
        .collection("dev-users")
        .orderBy(x)
        .startAt(data.search)
        .limit(10)
        .get();
      dispatch({
        type: "set-table_data",
        payload: res,
      });
    } else {
      let x;
      if (data) {
        if (data.sort_by === "ID") {
          x = "id";
        } else if (data.sort_by === "Created At") {
          x = "created_at";
        } else if (data.sort_by === "Email") {
          x = "email";
        } else if (data.sort_by === "User Type") {
          x = "user_type";
        } else if (data.sort_by === "Role") {
          x = "role";
        }
      }
      if (!data || (data && !data.page) || (data && data.page === 1)) {
        usersData = await db
          .collection("dev-users")
          .orderBy(data && data.sort_by ? x : "created_at")
          .limit(10)
          .get();
      } else {
        const prev_users = db
          .collection("dev-users")
          .orderBy(data && data.sort_by ? x : "created_at")
          .limit(data.page * 10);
        const snapshot_users = await prev_users.get();
        const last_user = snapshot_users.docs[snapshot_users.docs.length - 1];
        usersData = await db
          .collection("dev-users")
          .orderBy(data && data.sort_by ? x : "created_at")
          .startAfter(last_user.data().created_at)
          .limit(10)
          .get();
      }
      usersData.forEach((x) => {
        users.push(x.data());
      });
      users.forEach((x, i) => {
        if (!x.deleted) {
          res.push(x);
        }
      });
    }

    dispatch({
      type: "set-table_count",
      payload: usersData.size,
    });
    if (data && data.order) {
      dispatch({
        type: "set-table_data",
        payload: res,
      });
    } else {
      dispatch({
        type: "set-table_data",
        payload: res,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const fetchFormData = (dispatch) => async () => {
  try {
    const email = Cookie.get("email");
    var usersData = await db.collection("dev-users").doc(email).get();
    usersData = usersData.data();
    var ordersData = await db.collection("dev-orders").doc(email).get();
    ordersData = ordersData.data();
    if (usersData && usersData["step"]) {
      dispatch({
        type: "set-form_count",
        payload: usersData["step"],
      });
      if (usersData["deleted"]) {
        dispatch({
          type: "set-deleted",
          payload: true,
        });
      }
      dispatch({
        type: "set-role",
        payload: usersData["role"],
      });
    }

    dispatch({
      type: "set-form_data",
      payload: { ...usersData, ...ordersData },
    });
  } catch (e) {
    console.log(e);
  }
};

const updateUser = () => async ({ email, status, role, step }) => {
  try {
    await db.collection(`dev-users`).doc(email).update({ status, role, step });
    await fetchTableData();
  } catch (e) {
    console.log(e);
  }
};

const deleteUser = (dispatch) => async (email) => {
  try {
    await db.collection("dev-users").doc(email).update({
      deleted: true,
    });
    // await db.collection("dev-orders").doc(email).delete();
  } catch (e) {
    console.log(e);
  }
};

const signUp = (dispatch) => async ({ email, password }) => {
  try {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (user) => {
        await db
          .collection(`dev-users`)
          .doc(email)
          .set({
            id: uuidv4(),
            email,
            created_at: moment().format("MMMM Do YYYY, h:mm:ss a"),
            role: "customer",
            status: "waiting",
            verified: false,
            step: 1,
            user_type: "not specified",
            deleted: false,
          });
        dispatch({
          type: "set-email",
          payload: user.email,
        });
        dispatch({
          type: "set-form_count",
          payload: 1,
        });
        var usersData = await db.collection("dev-users").doc(email).get();
        usersData = usersData.data();
        if (usersData) {
          dispatch({
            type: "set-role",
            payload: usersData["role"],
          });
        }
        Cookie.set("email", user.email);
        dispatch({
          type: "set-form_data",
          payload: {
            Email: user.email,
            form_count: 1,
          },
        });
        return usersData;
      });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const signIn = (dispatch) => async ({ email, password }) => {
  try {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        dispatch({
          type: "set-email",
          payload: user.email,
        });
        Cookie.set("email", user.email);
        var usersData = await db.collection("dev-users").doc(email).get();
        usersData = usersData.data();
        var ordersData = await db.collection("dev-orders").doc(email).get();
        ordersData = ordersData.data();
        if (usersData && usersData["step"])
          dispatch({
            type: "set-form_count",
            payload: usersData["step"],
          });
        dispatch({
          type: "set-role",
          payload: usersData["role"],
        });
        dispatch({
          type: "set-form_data",
          payload: { ...usersData, ...ordersData },
        });
        return usersData;
      });
  } catch (e) {
    throw new Error(e);
  }
};

const signOut = (dispatch) => () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("Signed Out");
      dispatch({
        type: "set-email",
        payload: null,
      });
    });
  Cookie.remove("email");
  dispatch({
    type: "set-form_values",
    payload: null,
  });
  dispatch({
    type: "set-user_type",
    payload: null,
  });
  dispatch({
    type: "set-role",
    payload: null,
  });
};

const checkAuth = (dispatch) => async () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch({
        type: "set-email",
        payload: user.email,
      });
      Cookie.set("email", user.email);
    }
  });
};

const toggleModal = (dispatch) => async (option) => {
  dispatch({
    type: "toggle-modal",
    payload: option,
  });
};

export const setFormValues = (dispatch) => async (values) => {
  dispatch({
    type: "set-form_data",
    payload: values,
  });
};

const setAuthType = (dispatch) => async (value) => {
  dispatch({
    type: "set-auth_type",
    payload: value,
  });
};

const setUserType = (dispatch) => async (value) => {
  dispatch({
    type: "set-user_type",
    payload: value,
  });
};

const checkStatus = (dispatch) => async () => {
  try {
    const ordersRef = await db
      .collection("dev-users")
      .doc(Cookie.get("email"))
      .get();
    if (ordersRef.exists) {
      dispatch({
        type: "set-status",
        payload: ordersRef.data()["status"],
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const toggleLoading = (dispatch) => (data) => {
  dispatch({
    type: "toggle-loading",
    payload: data,
  });
};

const fetchUserType = (dispatch) => async (email) => {
  try {
    const email_address = Cookie.get("email");
    const user = await db
      .collection("dev-users")
      .doc(email ? email : email_address)
      .get();
    if (user.data()) {
      dispatch({
        type: "set-user_type",
        payload: user.data()["user_type"],
      });
      dispatch({
        type: "set-role",
        payload: user.data()["role"],
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const fetchProducts = (dispatch) => async () => {
  try {
    dispatch({
      type: "set-products",
      payload: null,
    });
    const productsRef = await db.collection("dev-products").get();
    var products = [];
    productsRef.forEach((x) => {
      products.push(x.data());
    });
    dispatch({
      type: "set-products",
      payload: products,
    });
  } catch (e) {
    console.log(e);
  }
};

const fetchOrders = (dispatch) => async () => {
  try {
    dispatch({
      type: "set-orders",
      payload: null,
    });
    const ordersRef = await db.collection("dev-orders").get();
    var orders = [];
    ordersRef.forEach((x) => {
      orders.push(x.data());
    });
    dispatch({
      type: "set-orders",
      payload: orders,
    });
  } catch (e) {
    console.log(e);
  }
};

const verifyEmail = () => async (email) => {
  try {
    await db.collection("dev-users").doc(email).update({ verified: true });
  } catch (e) {
    throw new Error(e);
  }
};

const checkLOA = (dispatch) => async () => {
  try {
    const usersData = await db
      .collection("dev-users")
      .doc(Cookie.get("email"))
      .get();
    if (usersData.data()["loa"]) {
      dispatch({
        type: "set-loa_uploaded",
        payload: true,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const fetchAdminModalFields = (dispatch) => async (email, user_type) => {
  try {
    let data;
    dispatch({
      type: "set-admin_modal_fields",
      payload: null,
    });
    if (user_type === "Laboratory") {
      data = await db.collection("dev-products").doc(email).get();
    } else {
      data = await db.collection("dev-orders").doc(email).get();
    }
    dispatch({
      type: "set-admin_modal_fields",
      payload: data.data(),
    });
  } catch (e) {}
};

export const { Context, Provider } = createDataContext(
  reducer,
  {
    fetchTexts,
    generatePDF,
    fetchAdminModalFields,
    checkLOA,
    checkStatus,
    verifyEmail,
    setUserDetails,
    fetchProducts,
    fetchOrders,
    setFormValues,
    fetchUserType,
    setAuthType,
    signIn,
    signUp,
    signOut,
    toggleModal,
    updateUser,
    checkAuth,
    fetchFormData,
    fetchTableData,
    setAuthType,
    deleteUser,
    setUserType,
    toggleLoading,
    checkVerification,
  },
  {
    texts: null,
    countryCode: null,
    loading: true,
    user_details: null,
    open_modal: false,
    email: null,
    form_values: null,
    form_count: 0,
    auth_type: null,
    user_type: null,
    vaccine_type: null,
    status: "waiting",
    loading: true,
    verified: false,
    table_data: null,
    previous: null,
    table_count: 0,
    deleted: false,
    role: null,
    products: null,
    orders: null,
    loa_uploaded: false,
    admin_modal_fields: null,
  }
);
