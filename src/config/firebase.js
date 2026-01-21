import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKJ_fUqxADrMdMlBkefQhuy9j94i_E_mM",
  authDomain: "suji-juho-wedding.firebaseapp.com",
  projectId: "suji-juho-wedding",
  storageBucket: "suji-juho-wedding.firebasestorage.app",
  messagingSenderId: "748762981992",
  appId: "1:748762981992:web:a97bac1a258a6d099bfddd"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
