// Initialize Firebase
var config = {
  apiKey: "AIzaSyBLxyENt-MNT4Gswv3P2DSxf4vJmqf2qd0",
  authDomain: "gpa-d-78c0e.firebaseapp.com",
  databaseURL: "https://gpa-d-78c0e.firebaseio.com",
  projectId: "gpa-d-78c0e",
  storageBucket: "gpa-d-78c0e.appspot.com",
  messagingSenderId: "703800029718"
};
firebase.initializeApp(config);

var database = firebase.database();

// sessionStorage.getItem('userID');
var poster = "idkyet";

$("#target").submit(function(event) {
  event.preventDefault();

  title = $("#title").val();
  description = $("#description").val();
  price = $("#price").val();
  quantity = $("#quantity").val();
  image = $("#image").val();
  link = $("#link").val();

  $("#title").val("");
  $("#description").val("");
  $("#price").val("");
  $("#quantity").val("");
  $("#image").val("");
  $("#link").val("");

  postingObj = {
    description: description,
    img: image,
    poster: poster,
    pricePerUnit: price,
    qty: quantity,
    title: title,
    url: link
  };

  database.ref("offers").push(postingObj);
});
