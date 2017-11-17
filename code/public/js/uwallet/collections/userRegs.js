var app = app || {};

//var string = 'http://';
//string += localStorage.getItem("direccion_ip");
//string += ':4060/users/register'


var UserregCollecion = Backbone.Collection.extend({
  Model: app.Userreg,
  url: 'http://'+localStorage.getItem("direccion_ip")+':4060/users/register'
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
