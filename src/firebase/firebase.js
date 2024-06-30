import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnnpONpk_LvCpZt8D2D9yTqSNDdqH2mz4",
  authDomain: "ecom-5a09c.firebaseapp.com",
  projectId: "ecom-5a09c",
  storageBucket: "ecom-5a09c.appspot.com",
  messagingSenderId: "120729052959",
  appId: "1:120729052959:web:4d9ed85f10f0e96ba1b22a",
  measurementId: "G-0Q47H8CH4F",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth };