// code to copy into another JS file later in the project
firebase
  .auth()
  .signOut()
  .then(function() {
    // Sign-out successful.
  })
  .catch(function(error) {
    // An error happened.
  });
