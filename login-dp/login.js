$('#signUpSubmit').click(function(event) {
    event.preventDefault();
    var email = $('#signUpEmail').val();
    var password = $('#signUpPassword').val();
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });      
});

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
    } else {
      // User is signed out.
      // ...
    }
  });