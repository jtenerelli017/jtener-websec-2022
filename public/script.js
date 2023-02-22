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

// Function to render a twoot
/* Sources:
https://drapak.ca/cpg/htmlConvertUnicode.shtml#:~:text=You%20do%20this%20by%20adding,will%20display%20J%20in%20HTML.
https://getbootstrap.com/docs/5.3/components/card/
https://symbl.cc/en/2764/
https://symbl.cc/en/1F502/
https://stackoverflow.com/questions/30192263/bootstrap-javascript-not-working
https://www.w3schools.com/tags/tag_script.asp
*/
let renderTwoot = (tObj, userPic) => {

  const heart = `&#${10084}`;
  const arrow = `&#${128258}`;

  $("#everytwoot").append(`
    <div class="card mb-3" style="max-width: 540px;">
      <div class="row g-0" id="pic">
        <div class="col-md-4">
          <img src="${userPic}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${tObj.handle}</h5>
            <p class="card-text">${tObj.text}</p>
            <p class="card-text">${heart} ${tObj.likes}  ${arrow} ${tObj.retwoots} -- <small class="text-muted">${tObj.timestamp}</small></p>
          </div>
        </div>
      </div>
    </div>
  `);
}

// Add a new twoot to the database
// Source: https://firebase.google.com/docs/database/web/read-and-write#updating_or_deleting_data
let createTwoot = (handle, text) => {

  const twootContent = {
    handle: handle,
    text: text,
    likes: 0,
    retwoots: 0,
    timestamp: new Date().toLocaleString()
  };

  const twootsRef = rtdb.ref(db, "/twoots");
  return rtdb.push(twootsRef, twootContent);
};

// Create twoots
// createTwoot("JtenerWebSec", "If you can't do it good, do it hard.");
// createTwoot("bobby231", "I love grilling");
// createTwoot("poopyHead63", "No profile picture for me!");

// Render twoots
let twootsRef = rtdb.ref(db, "/twoots");
rtdb.onChildAdded(twootsRef, ss => {
  const pic = "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg";
  renderTwoot(ss.val(), pic);
  // rtdb.get(db, `/users/${ss.val().handle}`)
  // .then(ss2 => {
  //   if(ss2.exists) {
  //     pic = ss2;
  //   }
  //   renderTwoot(ss, pic);
  // })
  // .catch(error => {
  //   console.error(`ERROR! ${error}`);
  // });
});