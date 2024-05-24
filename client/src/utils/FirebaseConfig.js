import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
    apiKey: "AIzaSyBuRGQXxjGyzyop8LWZuZIPKSveR3Z7NQw",
    authDomain: "whatsapp-clone-cef7a.firebaseapp.com",
    projectId: "whatsapp-clone-cef7a",
    storageBucket: "whatsapp-clone-cef7a.appspot.com",
    messagingSenderId: "1049038631850",
    appId: "1:1049038631850:web:df14d047c794e04d75b1d3",
    measurementId: "G-7B92FHB4QP"
  };


  const app = initializeApp(firebaseConfig);
  export const firebaseAuth = getAuth(app);