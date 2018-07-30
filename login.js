// Create new User
$('#signUpSubmit').click(function(event) {
  event.preventDefault();

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    }).then;

  // Capture user inputs and store them into variables
  var firstName = $('#inputFName')
    .val()
    .trim();
  var lastName = $('#inputLName')
    .val()
    .trim();
  var address = $('#inputAddress')
    .val()
    .trim();
  var city = $('#inputCity')
    .val()
    .trim();
  var province = $('inputProvince')
    .val()
    .trim();
  var postalcode = $('#inputPC')
    .val()
    .trim();
  var email = $('inputEmail4')
    .val()
    .trim();
  var password = $('#inputPassword4')
    .val()
    .trim();

  dataRef.ref().push({
    firstName: firstName,
    lastName: lastName,
    address: address,
    city: city,
    province: province,
    postalcode: postalcode,
    email: email,
    password: password
  });

  dataRef.ref().on('child added', function(childSnapShot) {}),
    function(errorObject) {
      console.log('Errors handled: ' + errorObject.code);
    };

  // Console log each of the user inputs to confirm we are receiving them
  console.log(childSnapShot.val().firstName);
  console.log(childSnapShot.val().lastName);
  console.log(childSnapShot.val().address);
  console.log(childSnapShot.val().city);
  console.log(childSnapShot.val().province);
  console.log(childSnapShot.val().postalcode);
  console.log(childSnapShot.val().email);
  console.log(childSnapShot.val().password);

  // Clear sessionStorage
  sessionStorage.clear();

  // Store all content into sessionStorage
  sessionStorage.setItem('first name', firstName);
  sessionStorage.setItem('last name', lastName);
  sessionStorage.setItem('address', address);
  sessionStorage.setItem('city', city);
  sessionStorage.setItem('province', province);
  sessionStorage.setItem('postal code', postalcode);
  sessionStorage.setItem('email', email);
  sessionStorage.setItem('password', password);
});

// Sign In
$('#signInSubmit').click(function(event) {
  event.preventDefault();
  var email = $('#signInEmail').val();
  var password = $('#signInPassword').val();
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
});

// FirebaseUI config.

// !!!!!!!!!!IMPORTANT - All pages will need to reference this code to determine if the user is logged in or not!!!!!!!!!!!!
// Listener on the Firebase user object.
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var uiConfig = {
      signInSuccessUrl:
        'https://duke6am.github.io/GoogleSignin/SigninSuccess.html'
    };
    // User is signed in.
    var firstName = user.firstName;
    var lastName = user.lastName;
    var email = user.email;
    var address = user.address;
    var city = user.city;
    var province = user.Province;
    var country = user.country;
    var postalCode = user.postalCode;
    var createDate = user.createDate;
    var uid = user.UID;

    //var emailVerified = user.emailVerified;
    //var photoURL = user.photoURL;
    //var isAnonymous = user.isAnonymous;
    //var uid = user.uid;
    //var providerData = user.providerData;
    // ...
    console.log(
      'First Name: ' + user.firstName,
      'Last Name: ' + user.lastName,
      'Email: ' + user.email,
      'Address: ' + user.address,
      'City: ' + user.city,
      'Province: ' + user.province,
      'Country: ' + user.country,
      'Postal Code: ' + user.postalCode,
      'Create Date: ' + user.createDate,
      'User ID: + ' + user.UID
      //'\nEmail Verified?: ' + user.emailVerified,
      //'\nPhoto URL: ' + user.photoURL,
      //'\nIs Anonymous: ' + user.isAnonymous,
      //'\nUID: ' + user.uid,
      //'\nProvider Data: ' + user.providerData
    );
  } else {
    console.log('epic fail');
  }

  var db = firebase.database();

  // For this line to work, there MUST be a matching users entry in the Firebase database. I've created 1 user as an example. Sign-In using abc@abc.com with password 123456.
  db.ref('users')
    .orderByChild('UID')
    .equalTo(user.uid)
    .once('value')
    .then(function(snapshot) {
      console.log(snapshot.val());
    });
});
