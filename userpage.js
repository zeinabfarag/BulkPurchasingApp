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

var userID = "VZXVUyyGR4RCYssxdyuBUIsQsv52";

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
