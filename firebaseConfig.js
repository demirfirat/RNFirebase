import { firebase } from "@react-native-firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyCYrhTZwf8ALuUfl0HfP0nKuvrU2QhAtRk",
    authDomain: "girisyapapi.firebaseapp.com",
    projectId: "girisyapapi",
    storageBucket: "girisyapapi.firebasestorage.app",
    messagingSenderId: "671070682525",
    appId: "1:671070682525:web:cdbe9e2789f7748c1a8374",
    measurementId: "G-0JT5PRX87R"
  };
  
  // Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const auth = firebase.auth();