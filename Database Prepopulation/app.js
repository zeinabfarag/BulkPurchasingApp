var users = {
  firstName: 'John',
  lastName: 'Doe',
  address: '8820 Mississauga Road',
  postalCode: 'L2N3E3',
  city: 'Mississauga',
  province: 'Ontario',
  country: 'Canada',
  createDate: '03/20/2018'
};

/* var user = {
  firstName: 'David',
  lastName: 'Pham',
  address: '23 Stone Mason Crescent, Suite #22',
  postalCode: 'M9J8J3',
  city: 'Toronto',
  province: 'Ontario',
  country: 'Canada',
  createDate: '05/20/2018'
}; */

var offers = {
  title: 'Floating Rubber Duck',
  description: '10x9x9-cm. Each one is packaged in its own bag.',
  url:
    'https://www.alibaba.com/product-detail/Customized-safety-bath-ducky-promotional-floating_60090269681.html?spm=a2700.7724838.2017115.1.24a072fdhLLAdp',
  img:
    'https://sc01.alicdn.com/kf/HTB1Hdr9ksjI8KJjSsppq6xbyVXap/Customized-safety-bath-ducky-promotional-floating-rubber.jpg',
  qty: 5000,
  pricePerUnit: 1.5,
  poster: ''
};

var commits = {
  offeringID: 0,
  userID: 1,
  commitQty: 950,
  createDate: '07/29/2018'
};

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

  var db = firebase.database();

  /* db.ref('users').push(users);
  db.ref('offers').push(offers);
  db.ref('commits').push(commits); */

  db.ref('users').once('value', function(snapshot) {
    console.log(snapshot.val());
  });
});
