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
firebase.initializeApp(firebaseConfig);

const twootsRef = firebase.database().ref("/twoots");
const usersRef = firebase.database().ref("/users");


/*
Renders a twoot with some complex CSS styling.

Sources:
  Bootstrap card component for twoot design  https://getbootstrap.com/docs/5.3/components/card/
  Creating Unicode characters in HTML        https://drapak.ca/cpg/htmlConvertUnicode.shtml
  Black Heart Symbol Emoji                   https://symbl.cc/en/2764/
  Circular Arrows Emoji                      https://symbl.cc/en/1F502/
  Bootstrap JS troubleshooting               https://stackoverflow.com/questions/30192263/bootstrap-javascript-not-working
  HTML script Tag                            https://www.w3schools.com/tags/tag_script.asp
  Grouping HTML elements                     https://makeschool.org/mediabook/oa/tracks/web-dev-with-node/your-first-website--landing-page/grouping-elements/
  HTML URL Encoding Reference                https://www.w3schools.com/tags/ref_urlencode.ASP

Parameters:
  {object} twoot - A JSON object representing a twoot
  {string} userPic - A web link for a user profile picture

*/
const renderTwoot = (twoot, userPic) => {

  const heart = `&#${10084}`;
  const arrow = `&#${128258}`;

  /* Bootstrap card component */
  $("#everytwoot").append(`
    <div class="card mb-3" style="max-width: 540px;">
      <div class="row g-0" id="pic">
        <div class="col-md-4">
          <img src="${userPic}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${twoot.handle}</h5>
            <p class="card-text">${twoot.text}</p>
            <p class="card-text">${heart} ${twoot.likes}  ${arrow} ${twoot.retwoots} -- <small class="text-muted">${twoot.timestamp}</small></p>
          </div>
        </div>
      </div>
    </div>
  `);
}

/*
Adds a new twoot to the database.

Sources:
  Pushing to database  https://firebase.google.com/docs/database/web/read-and-write#updating_or_deleting_data

Parameters:
  {string} handle - Uniquely identifies a Twutter user
  {string} text - The content of the new twoot

*/
const createTwoot = (handle, text) => {

  const twootContent = {
    handle: handle,
    text: text,
    likes: 0,
    retwoots: 0,
    timestamp: new Date().toLocaleString()
  };

  twootsRef.push(twootContent);
};

/*
Click listener for the "Publish" button, enabling the creation of new twoots

Sources:
  getElementById().innerHTML code snippet  https://www.w3schools.com/html/tryit.asp?filename=tryhtml_id_js
  HTML DOM Document getElementById()       https://www.w3schools.com/jsref/met_document_getelementbyid.asp
  HTML DOM Element innerHTML               https://www.w3schools.com/jsref/prop_html_innerhtml.asp
  .value and other DOM elements            https://linuxhint.com/get-element-value-using-javascript
  HTML script tags and external JS files   https://blog.hubspot.com/website/call-javascript-function-html
  JS strings and string manipulation       https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
  replace()                                https://careerkarma.com/blog/javascript-replace
  innerHTML troubleshooting                https://stackoverflow.com/questions/10826756/javascript-innerhtml-not-updating-element

*/
$("#publish-twoot").on("click", evt => {

  const input = document.getElementById("input-twoot");
  const inputVal = input.value;
  if(inputVal != "") {
    createTwoot("JtenerWebSec", inputVal);
    input.value = "";
  }
})

/*
Loads a user profile picture and returns it using a callback function

Sources:
  Callbacks                     https://youtu.be/kz_vwAF4NHI
  Read and write in compat mode https://firebase.google.com/docs/database/web/read-and-write#web-version-8_3

Parameters:
  {string} handle - The user's handle, essentially their unique user ID
  {function} cb - A callback function
 */
const loadUserPic = (handle, cb) => {
  usersRef.child(handle).child("picture").get().then(ss => {
    if(ss.exists()) {
      cb(ss.val());
    } else {
      cb("https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg");
    }
  });
}

/*
An event listener that loads a user's profile picture and uses a callback function to render a twoot

Sources:
  On child added                https://firebase.google.com/docs/database/admin/retrieve-data#node.js_1
  Callbacks                     https://youtu.be/kz_vwAF4NHI
  Read and write in compat mode https://firebase.google.com/docs/database/web/read-and-write#web-version-8_3

*/
twootsRef.on("child_added", ss => {
  loadUserPic(ss.val().handle, pic => {
    renderTwoot(ss.val(), pic);
  });
});