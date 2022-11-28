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

var roomName = localStorage.getItem("roomName");
var userName = localStorage.getItem("username");

function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(roomName).push({
        name: userName,
        message: msg,
        like: 0
    });
}

function getData() {
    firebase.database().ref("/" + roomName).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebaseMessageId = childKey;
                messageData = childData;

                var name = messageData["name"];
                var message = messageData["message"];
                var like = messageData["like"];
                nameWithTag = "<h4> " + name +"<img src='tick.png' class='user_tick'></img></h4>"
                    messageWithTag = "<h4 class='message_h4'>" +message+"</h4>"
                    likeButton = "<button class= 'btn btn-warning' id='"+firebaseMessageId+"' value='"+like+"' onclick='updateLike(this.id)>"
                spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

                    row = nameWithTag + messageWithTag + likeButton;
                    document.getElementById("output").innerHTML += row;
                ;

            }
        });
    });
}

getData();


function updateLike(messageID) {




}

function logout() {
    localStorage.removeItem("userName");
    localStorage.removeItem("roomName");
    window.location.replace("index.html");
}
