//Initialize Firebase
  var config = {
    apiKey: "AIzaSyDO5J-qwbLOzK05hMZA8q6VpE0MqGHM2nU",
    authDomain: "filetest-d7b65.firebaseapp.com",
    databaseURL: "https://filetest-d7b65.firebaseio.com",
    storageBucket: "filetest-d7b65.appspot.com",
  };
  firebase.initializeApp(config);

//function to save file
function previewFile(){
  var storage = firebase.storage();

  var file = document.getElementById("files").files[0];
    console.log(file);
  
  var storageRef = firebase.storage().ref();
  
  //dynamically set reference to the file name
  var thisRef = storageRef.child(file.name);

  //put request upload file to firebase storage
  thisRef.put(file).then(function(snapshot) {
    console.log('Uploaded a blob or file!');
});
  
  //get request to get URL for uploaded file
  thisRef.getDownloadURL().then(function(url) {
  console.log(url);
  })

  }