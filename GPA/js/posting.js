// Initialize Firebase
var config = {
  apiKey: "AIzaSyCDl5786d2qbt1J1QsOdhYVLM7o19JRoGA",
  authDomain: "gpa-d-7c696.firebaseapp.com",
  databaseURL: "https://gpa-d-7c696.firebaseio.com",
  projectId: "gpa-d-7c696",
  storageBucket: "gpa-d-7c696.appspot.com",
  messagingSenderId: "718824836495"
};
firebase.initializeApp(config);

var database = firebase.database();

// sessionStorage.getItem('userID');

$("#target").submit(function(event) {
  event.preventDefault();

  var poster = sessionStorage.getItem("userId");

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
  window.location.href = "index.html";
});
