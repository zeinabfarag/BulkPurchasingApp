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

// session storages
var userID = sessionStorage.getItem("userId");

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $("#email").text(user.email);
  }
});

database.ref("commits").on("child_added", function(snapshot) {
  if (snapshot.val().userID === userID) {
    var p = $("<p>");

    var quantity = snapshot.val().commitQty;

    var oID = snapshot.val().offeringID;

    database.ref("offers/" + oID).on(
      "value",

      function(snapshot) {
        var title = snapshot.val().title;

        p.append(quantity + " on " + title);

        $("#yourcommits").append(p);
      }
    );
  }
});

database.ref("offers").on("child_added", function(snapshot) {
  console.log(snapshot.val().poster);

  if (snapshot.val().poster !== userID) {
    var p = $("<p>");

    var div = $("<div>");

    p.append(snapshot.val().title);

    $("#yourpostings").append(p);
  }
});

database.ref("/users/" + userID).on("value", function(snapshot) {
  var firstname = snapshot.val().firstName;
  var lastname = snapshot.val().lastName;
  var address = snapshot.val().address;
  var city = snapshot.val().city;
  var province = snapshot.val().province;
  var country = snapshot.val().country;
  var postalcode = snapshot.val().postalCode;

  $("#name").text(firstname + " " + lastname);

  $("#address").text(
    address + " , " + city + " , " + province + " , " + country
  );

  $("#postalcode").text(postalcode);
});
