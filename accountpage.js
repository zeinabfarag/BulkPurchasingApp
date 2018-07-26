$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: 'AIzaSyCDl5786d2qbt1J1QsOdhYVLM7o19JRoGA',
    authDomain: 'gpa-d-7c696.firebaseapp.com',
    databaseURL: 'https://gpa-d-7c696.firebaseio.com',
    projectId: 'gpa-d-7c696',
    storageBucket: 'gpa-d-7c696.appspot.com',
    messagingSenderId: '718824836495'
  };
  firebase.initializeApp(config);

  // Auth using a popup.
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      // This gives you a Google Access Token.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
    });

  firebase
    .auth()
    .signOut()
    .then(function() {
      // Sign-out successful.
    })
    .catch(function(error) {
      // An error happened.
    });
});
