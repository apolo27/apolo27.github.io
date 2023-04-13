function toogleToScreen(toogle){
    if (toogle=="tripulants"){
        $("#body-1").hide();
        $("#body-2").show();
    }
    else{
        $("#body-1").show();
        $("#body-2").hide();
    }
}

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAvi3F5iDdJXHYrjDe8p_Lk9mwKKA8wqi4",
    authDomain: "apolo27-12ab2.firebaseapp.com",
    projectId: "apolo27-12ab2",
    storageBucket: "apolo27-12ab2.appspot.com",
    messagingSenderId: "603615465183",
    appId: "1:603615465183:web:8c5f506d2b1b4e902f636a"
  };

  firebase.initializeApp(firebaseConfig);
  
  // Set database variable
  var database = firebase.database()
  var i = 0;
  
  function save() {
  
    database.ref('sensors/' + Date.now()).set({
      date: Date.now(),
      temperature: 15 + i
    })
    i++;
  }
  function get(){

    database.ref("/sensors").orderByChild("dateAdded").limitToLast(5).once('value').then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
          update_char(childSnapshot.val());
      });
 });
  }
  function get_only_last(){
    
    database.ref("/sensors").orderByChild("dateAdded").limitToLast(1).once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            update_char(childSnapshot.val());
        });
   });
  }
