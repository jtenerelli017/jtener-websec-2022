// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import * as rtdb from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJDoJS1DR66szG3_X-OAUNNnXr19n3__Y",
  authDomain: "jtener-websec-2022.firebaseapp.com",
  databaseURL: "https://jtener-websec-2022-default-rtdb.firebaseio.com",
  projectId: "jtener-websec-2022",
  storageBucket: "jtener-websec-2022.appspot.com",
  messagingSenderId: "792031619120",
  appId: "1:792031619120:web:4c79b9b85b44ca40f6a5f5",
  measurementId: "G-YPJKE61V29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let db = rtdb.getDatabase(app);
let titleRef = rtdb.ref(db, "/title");

//READ
rtdb.onValue(titleRef, ss=>{
  $("#title").html(ss.val());
});

//UPDATE
$("#newtitle").on("keyup", evt=>{
  let newtitle = $("#newtitle").val();
  rtdb.set(titleRef, newtitle);
})