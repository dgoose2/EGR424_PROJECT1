// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDgN34ixHe_z7SglJKNm5p_64eDUClYjA",
  authDomain: "egr424-chuck-norris.firebaseapp.com",
  projectId: "egr424-chuck-norris",
  storageBucket: "egr424-chuck-norris.appspot.com",
  messagingSenderId: "603055157937",
  appId: "1:603055157937:web:60beff3e060911488de890"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore database
export const db = getFirestore(app);