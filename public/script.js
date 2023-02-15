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

// Make a twoot
let twoot1 = {
  "author": {
    "handle": "JtenerWebSec",
    "picture": "https://i.redd.it/zaq25fj3d2551.jpg"
  },
  "timestamp": "2/15/2023, 3:13:27 PM",
  "text": "If you can't do it good, do it hard.",
  "images": [
    "https://upload.wikimedia.org/wikipedia/commons/7/71/St._Bernard_puppy.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Image-Cavapoo_puppy.JPG/1280px-Image-Cavapoo_puppy.JPG"
  ],
  "likes": {
    "count": 2,
    "users": [
      "puppyLover1", "puppyLover2"
    ]
  },
  "retwoots": {
    "count": 1,
    "users": [
      "alexander488"
    ]
  }
}

let renderTwoot = (twt) => {
  $("#everytwoot").append(`
    <div class="twoot">
      <h1>${twt.text}</h1>
    </div>
  `);
}

renderTwoot(twoot1);
$(".twoot").on("click", (evt) => {
  $(evt.currentTarget).addClass("clicked");
});

// //READ
// rtdb.onValue(titleRef, ss=>{
//   $("#title").html(ss.val());
// });

// //UPDATE
// $("#newtitle").on("keyup", evt=>{
//   let newtitle = $("#newtitle").val();
//   rtdb.set(titleRef, newtitle);
// })

// new Date().getTime()
// new Date(2349812903482).toLocaleString()