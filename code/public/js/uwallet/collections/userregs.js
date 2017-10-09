Userregs = Backbone.Collection.extend({
  Model: Userreg,
  url: "/users"
});

userregs = new Userregs();


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
