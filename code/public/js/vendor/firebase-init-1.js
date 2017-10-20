
// Este init es copiado del proyecto basico de un proyecto de internet
// https://push-example-f01c5.firebaseapp.com/   abrir consola
// Tampoco sirvio :v
// Esta con el apiKey y messagingSenderId de ellos




var config = {
  apiKey: "AIzaSyCJdU1vqgFALqSph3Q8CYZa2dyCZLTjFk0",
  authDomain: "push-example-f01c5.firebaseapp.com",
  databaseURL: "https://push-example-f01c5.firebaseio.com",
  storageBucket: "push-example-f01c5.appspot.com",
  messagingSenderId: "1098514015680"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.requestPermission()
.then(function(){
  console.log('I am in here');

  return messaging.getToken()
.then(function(currentToken) {
  console.log(currentToken);
})
.catch(function(err) {
  console.log('An error occurred while retrieving token. ', err);
  showToken('Error retrieving Instance ID token. ', err);
  setTokenSentToServer(false);
});

}).catch(function(err){
  console.log('Error');
});
