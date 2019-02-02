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

var user = sessionStorage.getItem("userId");

var offeringId = sessionStorage.getItem("offerId");

$("#target").submit(function(event) {
  event.preventDefault();
  number = $("#commitment").val();

  $("#commitment").val("");

  var currentdate = moment().format("MM/DD/YYYY");

  commitObj = {
    commitQty: number,
    commitDate: currentdate,
    userID: user,
    offeringID: offeringID
  };

  database.ref("commits").push(commitObj);
});

database.ref("/offers/" + offeringId).on("value", function(snapshot) {
  var description = snapshot.val().description;
  var image = snapshot.val().img;
  var price = snapshot.val().pricePerUnit;
  var quantity = snapshot.val().qty;
  var title = snapshot.val().title;
  var url = snapshot.val().url;

  $("#title").text(title);
  $("#description").text(description);
  $("#offeringimg").attr("src", image);
  $("#price").text(price);
  $("#quantity").text(quantity);
  $("#url").attr("href", url);
});
