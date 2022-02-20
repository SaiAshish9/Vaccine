import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import 'firebase/firestore';


var firebaseConfig = {
  apiKey: "AIzaSyDAGpgBKChElwH689rgDN_uHBb2Ud3_5PY",
  authDomain: "searchvaccines-c7371.firebaseapp.com",
  projectId: "searchvaccines-c7371",
  storageBucket: "searchvaccines-c7371.appspot.com",
  messagingSenderId: "362115749639",
  appId: "1:362115749639:web:8e3f561071ccd6ea0097a2",
  measurementId: "G-LTDRRMHP3L",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}else {
    firebase.app();
 }

 

export default firebase;
