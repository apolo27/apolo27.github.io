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
  var lastItem;
  
  function get(){
    database.ref("/sensors").orderByChild("dateAdded").limitToLast(5).once('value').then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
          lastItem = childSnapshot.val();
          let date = new Date(lastItem.date).toISOString();
          let tc = lastItem.temperature;
          
          temperature_categories.push(date);
          temperature_corporal.push(tc);
      });
    });
    chart_temperature.render();
  }
  