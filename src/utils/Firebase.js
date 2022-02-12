// Conexion a Firebase
// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBum-rqpDfzfb6uYofSP2GCoyOr46T-w4k",
  authDomain: "bunkan-app-8d29e.firebaseapp.com",
  projectId: "bunkan-app-8d29e",
  storageBucket: "bunkan-app-8d29e.appspot.com",
  messagingSenderId: "891363942478",
  appId: "1:891363942478:web:fe675089ff8b010f22631f",
  measurementId: "G-G4W7R4BK4X"
};

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig)
//export const analytics = getAnalytics(firebaseApp);