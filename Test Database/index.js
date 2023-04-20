// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAvi3F5iDdJXHYrjDe8p_Lk9mwKKA8wqi4",
    authDomain: "apolo27-12ab2.firebaseapp.com",
    projectId: "apolo27-12ab2",
    storageBucket: "apolo27-12ab2.appspot.com",
    messagingSenderId: "603615465183",
    appId: "1:603615465183:web:8c5f506d2b1b4e902f636a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Set database variable
  var database = firebase.database()
  var i = 0;
  
  function save() {
  
    database.ref('sensors/' + Date.now()).set({
      date: Date.now(),
      temperature_ambiental: 15 + i,
      speed: -10+0.2*i**2,
      humidity: 30+i*0.1,
      heart_rate_1: -0.5*i**2+30*i,
      heart_rate_2: -0.4*i**2+30*i,
      temperature_1: 15 + i,
      temperature_2: 15 + 0.8*i,
    })
    i++;
  }
  function get(){
    database.ref("/sensors").orderByChild("dateAdded").limitToLast(5).once('value').then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
          console.log(childSnapshot.val());
      });
      alert("Get")
 });
  }
  // function get() {
  //   var username = document.getElementById('username').value
  
  //   var user_ref = database.ref('users/' + username)
  //   user_ref.on('value', function(snapshot) {
  //     var data = snapshot.val()
  
  //     alert(data.email)
  
  //   })
  
  // }
  
  function update() {
    var username = document.getElementById('username').value
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
  
    var updates = {
      email : email,
      password : password
    }
  
    database.ref('users/' + username).update(updates)
  
    alert('updated')
  }
  
  function remove() {
    var username = document.getElementById('username').value
  
    database.ref('users/' + username).remove()
  
    alert('deleted')
  }