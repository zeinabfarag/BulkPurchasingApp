// Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
var config = {
  apiKey: 'AIzaSyCDl5786d2qbt1J1QsOdhYVLM7o19JRoGA',
  authDomain: 'gpa-d-7c696.firebaseapp.com',
  databaseURL: 'https://gpa-d-7c696.firebaseio.com',
  projectId: 'gpa-d-7c696',
  storageBucket: 'gpa-d-7c696.appspot.com',
  messagingSenderId: '718824836495'
};
firebase.initializeApp(config);

var database = firebase.database().ref('offers');

database.on('child_added', function(childSnapshot) {
  var data = childSnapshot.val();
  var description = data.description;
  var image = data.img;
  var price = data.pricePerUnit;
  var qty = data.qty;
  var title = data.title;
  var url = data.url;
  console.log(data);
  console.log(price);
  console.log(title);

  var col = $('<div>').addClass('col');
  var card = $('<div>').addClass('card mx-4');
  card.attr('style', 'width: 18rem;');

  var thumbnail = $('<img>')
    .addClass('card-img-top')
    .attr('src', image)
    .attr('style', 'width: 16rem')
    .attr('style', 'align-center');

  var innerDiv = $('<div>').addClass('card-body');
  var title = $('<h5>' + title + '</h5>').addClass('card-title');
  var descript = $('<h6>' + description + '</h6>');
  var priced = $(
    '<p> Price per unit: $' + price + ' after a qty of ' + qty + '</p>'
  ).addClass('card-text');
  var a = $('<a>Wholesaler URL</a>').addClass('btn btn-primary');
  a.attr('href', url);

  // title, price per unit and button placed into innerDiv
  innerDiv.append(title, descript, priced, a);
  card.append(thumbnail, innerDiv);
  col.append(card);

  $('#user-posts').append(col);
});
