import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA6G0CQp_QIz-4oVOL9ZXk94OvSlXbk08M",
  authDomain: "stack-overflow-20070122167.firebaseapp.com",
  projectId: "stack-overflow-20070122167",
  storageBucket: "stack-overflow-20070122167.appspot.com",
  messagingSenderId: "1016110096873",
  appId: "1:1016110096873:web:6c072086e4e092de4a6b78",
  measurementId: "G-1EEKB1H9LE"
};

const firebaseApp = initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };
// export default db;
