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

var database = firebase.database();

var user = sessionStorage.getItem('userId');
var offeringId = sessionStorage.getItem('offerId');

$('#target').submit(function(event) {
  event.preventDefault();
  number = $('#commitment').val();

  $('#commitment').val('');

  var currentdate = moment().format('MM/DD/YYYY');

  commitObj = {
    commitQty: number,
    commitDate: currentdate,
    userID: user,
    offeringID: offeringID
  };

  database.ref('commits').push(commitObj);
});

database.ref('/offers/' + offeringId).on('value', function(snapshot) {
  var description = snapshot.val().description;
  var image = snapshot.val().img;
  var price = snapshot.val().pricePerUnit;
  var quantity = snapshot.val().qty;
  var title = snapshot.val().title;
  var url = snapshot.val().url;

  $('#title').text(title);
  $('#description').text(description);
  $('#offeringimg').attr('src', image);
  $('#price').text(price);
  $('#quantity').text(quantity);
  $('#url').attr('href', url);
});
