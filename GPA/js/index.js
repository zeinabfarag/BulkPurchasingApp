// This is the media object/offering element, use to display offers
function addOffering(
  oImg,
  oTitle,
  oDesc,
  oPPU,
  oOfferId,
  oPoster,
  oFurfillment
) {
  var offerLi = $("<li>");
  offerLi.addClass("media");

  var offerImg = $("<img>");
  offerImg.addClass("m-3");
  offerImg.addClass("img-thumbnail");
  offerImg.addClass("col-2");
  offerImg.attr("src", oImg);
  //offerImg.attr("src", "img/imgHolder.png");

  var offerMediaBody = $("<div>");
  offerMediaBody.addClass("media-body");

  var offerH5 = $("<h5>");
  offerH5.addClass("mt-0");
  offerH5.addClass("mb-1");
  offerH5.text(oTitle);

  var offerDesc = $("<p>");
  offerDesc.attr("id", "description");
  offerDesc.text(oDesc);

  var offerSection = $("<section>");
  offerSection.addClass("row");
  offerSection.addClass("align-bottom");

  var offerPPU = $("<section>");
  offerPPU.addClass("col-4");
  offerPPU.attr("id", "ppu");
  offerPPU.text("Price per Unit: $" + oPPU);

  var offerPoster = $("<section>");
  offerPoster.addClass("col-4");
  offerPoster.attr("id", "poster");
  // TODO: Get name of poster instead of key
  offerPoster.text("Poster: " + oPoster);

  var offerFurfill = $("<section>");
  offerFurfill.addClass("col-4");
  offerFurfill.attr("id", "furfillment");
  // TODO: Get sum of all commits and display at XXX/oFurfillment
  offerFurfill.text("Fulfillment: " + oFurfillment);

  var offerCommit = $("<button>");
  offerCommit.addClass("btn btn-primary commit");
  offerCommit.attr("type", "submit");
  offerCommit.attr("offerId", oOfferId);
  offerCommit.click(function(event) {
    event.preventDefault();
    sessionStorage.setItem("offerId", $(this).attr("offerId"));
    window.location.href = "commit.html";
  });

  offerCommit.text("Make a commit to buy");

  if (firebase.auth().currentUser != null) {
    offerCommit.show();
  } else {
    offerCommit.hide();
  }

  offerSection.append(offerPPU, offerPoster, offerFurfill);

  offerMediaBody.append(offerH5, offerDesc, offerSection, offerCommit);

  offerLi.append(offerImg, offerMediaBody);

  $(".list-unstyled").append(offerLi);
}

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

var db = new firebase.database();

// Populates media objects for each offer in the database
db.ref("offers").on("child_added", function(snapshot) {
  offerSnapshot = snapshot.val();

  addOffering(
    offerSnapshot.img,
    offerSnapshot.title,
    offerSnapshot.description,
    offerSnapshot.pricePerUnit,
    snapshot.key,
    offerSnapshot.poster,
    offerSnapshot.qty
  );
});

function showCommitVisibility(showHide) {
  if (showHide === true) {
    $(".commmit").show();
  } else {
    $(".commmit").hide();
  }
}

$("#loginout").click(function() {
  if ($("#loginout").text() === "Sign In") {
    window.location.href = "signin.html";
  } else {
    firebase.auth().signOut();
    $("#loginout").text("Sign In");
  }
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $("#loginout").text("Sign Out");
    showCommitVisibility(true);
  } else {
    showCommitVisibility(false);
  }
});
