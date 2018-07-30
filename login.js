
// *DP* - Looks like your button is missing a ID class. This links to nowhere.
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
      // *DP* - No purpose to the .then; if you end it right away. Remove?
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

    // *DP* What is dataRef? it's the first time your using this variable.
    // *DP* It looks like your trying to push this information to our database, but it does need to be setup before we can do this.
    // *DP* Try adding this line before var dataref = firebase.database()
    // *DP* Also, lets push into the correct tree dataRef.ref('users')
  dataRef.ref().push({
    firstName: firstName,
    lastName: lastName,
    address: address,
    city: city,
    province: province,
    postalcode: postalcode,
    email: email,
    password: password
    // *DP* We need to record the UID so we can match the auth and database objects
    // *DP* UID: firebase.auth().currentUser.UID (Not 100% sure here, console.log it and take a look at what it returns.)
    // *DP* We also want the country
  });

  // *DP* - Don't think we need this, or at least it's not doing anything.
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

// *DP* Be very careful here, we are all reading and writing to session storage, by including this line you might be deleting someone elses variables
// *DP*  Instead use sessionStorage.removeItem("name_of_variable") to delete own keys relevant to you
  // Clear sessionStorage
  sessionStorage.clear();

  // Anyone can use firebase to get this information, It makes it easier for the person who needs the information, but I don't think it's necessary.
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
