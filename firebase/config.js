import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyBS2PTUvttrItlDXzBdxG5VX_zXe6q-PYY",
    authDomain: "bitebuddy-68060.firebaseapp.com",
    projectId: "bitebuddy-68060",
    storageBucket: "bitebuddy-68060.appspot.com",
    messagingSenderId: "436681960366",
    appId: "1:436681960366:web:d2869df92d37505e49b63f"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  })
  const db = getFirestore();
  const auth = getAuth();
  
  export { db, auth };