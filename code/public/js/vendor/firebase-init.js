
firebase.initializeApp({
  'messagingSenderId': '82818122160'
})

console.log("en firebase init");
const messaging = firebase.messaging();
console.log(messaging);


messaging.getToken()
.then(function(currentToken) {
  if (currentToken) {
    sendTokenToServer(currentToken);
    updateUIForPushEnabled(currentToken);
  } else {
    // Show permission request.
    console.log('No Instance ID token available. Request permission to generate one.');
    // Show permission UI.
    updateUIForPushPermissionRequired();
    setTokenSentToServer(false);
  }
})
.catch(function(err) {
  console.log('An error occurred while retrieving token. ', err);
  showToken('Error retrieving Instance ID token. ', err);
  setTokenSentToServer(false);
});

messaging.onMessage(function(payload) {
  console.log("Message received. ", payload);
  // ...
});
