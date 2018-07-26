var user = {
  userID: 1,
  firstName: 'John',
  lastName: 'Doe',
  address1: '8820 Mississauga Road',
  address2: '',
  postalCode: 'L2N 3E3',
  city: 'Mississauga',
  province: 'Ontario',
  country: 'Canada',
  joinDate: '03/20/2018'
};

var offering = {
  offeringID: 0,
  title: 'Floating Rubber Duck',
  description: '10x9x9-cm. Each one is packaged in its own bag.',
  url:
    'https://www.alibaba.com/product-detail/Customized-safety-bath-ducky-promotional-floating_60090269681.html?spm=a2700.7724838.2017115.1.24a072fdhLLAdp',
  img:
    'https://sc01.alicdn.com/kf/HTB1Hdr9ksjI8KJjSsppq6xbyVXap/Customized-safety-bath-ducky-promotional-floating-rubber.jpg',
  qty: 5000,
  pricePerUnit: 1.5,
  poster: user.userID
};

var commitment = {
  offeringID: 0,
  userID: 1,
  commitQty: 950,
  commitDate: '07/29/2018'
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

  /* db.ref('user').push(user);
    db.ref('offering').push(offering); */
  db.ref('commitment').push(commitment);
});
