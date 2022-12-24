import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'; 
import { getFirestore  } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCXjbReWOuxaeNweohFeVQ28kQYmXeeBaw",
    authDomain: "myprojectvuejs-d015b.firebaseapp.com",
    projectId: "myprojectvuejs-d015b",
    storageBucket: "myprojectvuejs-d015b.appspot.com",
    messagingSenderId: "166856243360",
    appId: "1:166856243360:web:4b320492556b43e711b1c5",
    measurementId: "G-QDFC89GJR7"
  };


  // Initialize Firebase
const app = initializeApp(firebaseConfig);
//initialize firebase auth
const auth = getAuth();
const db   =  getFirestore (app)
  export { app, auth , db}
  
  