import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCOHUPKqJlYbcHMvIl3vC8qSLLjg-mPzWM",
  authDomain: "procom-f3588.firebaseapp.com",
  projectId: "procom-f3588",
  storageBucket: "procom-f3588.appspot.com",
  messagingSenderId: "1035208774401",
  appId: "1:1035208774401:web:f63c6ae3553ef1b1edc100",
  measurementId: "G-GF9331LT48",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase
    .firestore()
    .settings({ experimentalForceLongPolling: true, merge: true });
}

export { firebase };
