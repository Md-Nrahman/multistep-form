import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBw6fnu4tkY_wFM4B3Os6NSfJyTZr7zbG4",
  authDomain: "user-table-f3cbe.firebaseapp.com",
  databaseURL: "https://user-table-f3cbe-default-rtdb.firebaseio.com",
  projectId: "user-table-f3cbe",
  storageBucket: "user-table-f3cbe.appspot.com",
  messagingSenderId: "603032869521",
  appId: "1:603032869521:web:e3504803279476b7727d30",
  measurementId: "G-41EEJ70WR2",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const storage = getStorage(app);

export default db;
