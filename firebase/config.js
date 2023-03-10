import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUD-vPqKendOG-s-gG-oyYj7awxftoXCk",
  authDomain: "data-migration-73361.firebaseapp.com",
  projectId: "data-migration-73361",
  storageBucket: "data-migration-73361.appspot.com",
  messagingSenderId: "654375893511",
  appId: "1:654375893511:web:4d0fb3a45ba233efc288a2",
};
console.log(firebaseConfig);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();
export { auth, provider };
export default db;
