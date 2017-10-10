var app = app || {};

var NotificationCollection = Backbone.Collection.extend({
  Model: app.Notification,
  url: "http://192.168.99.101:4000/notifications/"
});

app.notifications = new NotificationCollection();

//userregs = new Userregs();

/*
userreg = new Userreg(){
  firstName:'jonatan',
  lastName: 'parra',
  money: 0,
  email: 'japarrat@unal.edu.co',
  password: '12345',
  confirm_password: '12345'
}


userregs.add( userreg );

console.log( userregs.toJSON() );
*/
