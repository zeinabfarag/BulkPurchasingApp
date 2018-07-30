// Sign Up
$("#signUpSubmit").click(function(event) {
  event.preventDefault();

  var email = $("#signUpEmail").val();
  var password = $("#signUpPassword").val();

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    })
    .then(function() {
      var db = firebase.database();

      var userAddress = $("#signUpAddress").val();
      var userCity = $("#signUpCity").val();
      var userCountry = $("#signUpCountry").val();
      var userFirstName = $("#signUpFirstName").val();
      var userLastName = $("#signUpLastName").val();
      var userPostalCode = $("#signUpPostalCode").val();
      var userProvince = $("#signUpProvince").val();

      var newUser = {
        UID: firebase.auth().currentUser.uid,
        address: userAddress,
        city: userCity,
        country: userCountry,
        createDate: new Date().toDateString(),
        firstName: userFirstName,
        lastName: userLastName,
        postalCode: userPostalCode,
        province: userProvince
      };

      db.ref("users/" + firebase.auth().currentUser.uid).set(newUser);

      sessionStorage.setItem("userId", user.uid);
      window.location.href = "index.html";
    });
});
