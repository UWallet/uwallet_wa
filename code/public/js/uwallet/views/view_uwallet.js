var app = app || {};


app.RegisterView = Backbone.View.extend({
	el: '#div_registrar_usuario111',

	events: {
		'click #btn_registrar_usuario': 'crear_usuario'
	},

	initialize: function(saludo) {
		console.log("RegisterView inicializado " + saludo);
	},

/*
	crear_usuario: function(e){
	    e.preventDefault();
	    console.log("Entro en crear notificacion");

			var book = new app.Notification({
				id: '-Kuif_DOp-8BC5_PksuH',
				user_id: "string",
				subject: "string",
				content: "string",
				read: true,
				delivered: true
			 });

			book.save({}, {
			    success: function (model, respose, options) {
			        console.log("The model has been saved to the server");
			    },
			    error: function (model, xhr, options) {
							console.log(model);
							console.log(xhr);
							console.log(options);
			        console.log("Something went wrong while saving the model");
			    }
			});

		},
*/

	crear_usuario: function(e){
    e.preventDefault();
  //  console.log("Entro en crear usuario");
	/*	xhr = app.userregs.save({
      firstName:'jonatan',
      lastName: 'parra',
      money: 0,
      email: 'japarrat@unal.edu.co',
      password: '12345',
      confirm_password: '12345'
		});
*/
/*
userreg = new Userreg(){
  firstName:'jonatan',
  lastName: 'parra',
  money: 0,
  email: 'japarrat@unal.edu.co',
  password: '12345',
  confirm_password: '12345'



	"email": "jonatanparrat@gmail.com",
	"identification": 1434502211,
	"firstName": "asdasd",
	"lastName": "asd",
		"password": "foobar",
		"password_confirmation": "foobar"
}*/
	/*	var book = new app.Userreg({
			firstName:'jonatan',
			lastName: 'parra',
			identification: '1025588796',
			email: 'japarrat@unal.edu.co',
			password: '1234567',
			password_confirmation: '1234567'
		 });
*/

		options = {
			success: function () {
					alert('Thanks for the feedback!');
			},
			error: function (model, error) {
					console.log("Error en validacion:");
					console.log(error);
					console.log(model);
				}
		};


		 var user_prueba = new app.Userreg({
			"user" : {
				"email": "japarrat3@unal.edu.co",
				"identification": 1434567820,
				"firstName": "JONATAN",
				"lastName": "asd",
				"password": "foobar",
				"password_confirmation": "foobar"
			}
		});

		//console.log(user_prueba.attributes);
    validate1 = user_prueba.validate(user_prueba.attributes);
		console.log(validate1);
		model_errors = user_prueba.save({}, options);
		//console.log("La respuesta es: " + model_errors);


		// La funcion save() hace el POST
		/*user_prueba.save({}, {
		    success: function (model, respose, options) {
		        console.log("The model has been saved to the server");
		    },
		    error: function (model, xhr, options) {
						console.log(model);
						console.log(xhr);
						console.log(options);
		        console.log("Something went wrong while saving the model");
		    }
		});*/


	}
});
var login = new app.RegisterView("Hola");
/*


    Create: POST http://localhost:51377/api/values
    Read: GET http://localhost:51377/api/values/{id}
    Update: PUT http://localhost:51377/api/values/{id}
    Delete: DELETE http://localhost:51377/api/values/{id}

"titulo": $('#inputTitulo').val(),
"autor": $('#inputAutor').val(),
"categoria": $('#inputCategoria').val()
*/
