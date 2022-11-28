const firebaseConfig = {
      apiKey: "AIzaSyDrEpcFQrNyBcW6vmB6lq-EAv_4SwDJHgw",
      authDomain: "kwitter-kk.firebaseapp.com",
      databaseURL: "https://kwitter-kk-default-rtdb.firebaseio.com",
      projectId: "kwitter-kk",
      storageBucket: "kwitter-kk.appspot.com",
      messagingSenderId: "829902661574",
      appId: "1:829902661574:web:32f297517f30a771ae34c7",
      measurementId: "G-W9T1SHGJPV"
    };
 
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var userName = localStorage.getItem("username");
document.getElementById("username").innerHTML = "Welcome" + userName;

function addRoom() {
      roomName = document.getElementById("roomName").value;
      firebase.database().ref("/").child(roomName).update({
            purpose: "adding room names"
      });

localStorage.setItem("roomName",roomName);
window.location = "kwitter_page.html";

}









function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
             snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  roomNames = childKey;
             console.log(roomNames)
              var row = "<div class='room_name' onclick='reDirect(this.id)'id='"+roomNames+"'>"+roomNames+"</div><hr>"
              document.getElementById("output").innerHTML += row;
                  //End code
            });
      });
}
getData();
function reDirect(roomName){
localStorage.setItem("roomName",roomName);
window.location = "kwitter_page.html";
}

function logout() {
      localStorage.removeItem("userName");
      localStorage.removeItem("roomName");
      window.location.replace("index.html");
  }
