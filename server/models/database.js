import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken } from "firebase/auth";
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBS2PTUvttrItlDXzBdxG5VX_zXe6q-PYY",
    authDomain: "bitebuddy-68060.firebaseapp.com",
    projectId: "bitebuddy-68060",
    storageBucket: "bitebuddy-68060.appspot.com",
    messagingSenderId: "436681960366",
    appId: "1:436681960366:web:d2869df92d37505e49b63f"
  };
  
// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

  

const auth = getAuth();
signInWithCustomToken(auth, token)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(error.message);
    // ...
  });
