// Sign Up
$('#signUpSubmit').click(function(event) {
    event.preventDefault();
    var email = $('#signUpEmail').val();
    var password = $('#signUpPassword').val();
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      }).then(
          //TODO: Create a user object in Firebase Database. It should contain the following fields:
            /*
                UID
                address
                city
                country
                createDate
                firstName
                lastName
                postalCode
                province
            */
      );      
});

// Sign In
$('#signInSubmit').click(function(event) {
    event.preventDefault();
    var email = $('#signInEmail').val();
    var password = $('#signInPassword').val();
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
    });
});

// !!!!!!!!!!IMPORTANT - All pages will need to reference this code to determine if the user is logged in or not!!!!!!!!!!!!
// Listener on the Firebase user object.
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
      console.log("Display Name: " + user.displayName, 
                    "Email: " + user.email, 
                    "\nEmail Verified?: " + user.emailVerified, 
                    "\nPhoto URL: " + user.photoURL, 
                    "\nIs Anonymous: " + user.isAnonymous, 
                    "\nUID: " + user.uid, 
                    "\nProvider Data: " + user.providerData);
    }

    var db = firebase.database();

    // For this line to work, there MUST be a matching users entry in the Firebase database. I've created 1 user as an example. Sign-In using abc@abc.com with password 123456.
    db.ref('users').orderByChild('UID').equalTo(user.uid).once('value').then(function(snapshot) {
        console.log(snapshot.val())
    });
  });