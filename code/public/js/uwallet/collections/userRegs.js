var app = app || {};

var UserregCollecion = Backbone.Collection.extend({
  Model: app.Userreg,
  url: "http://192.168.99.101:4000/users/register"
});

app.userregs = new UserregCollecion();

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
