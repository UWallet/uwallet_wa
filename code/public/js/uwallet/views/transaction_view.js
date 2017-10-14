var app = app || {};

app.Transaction_view = Backbone.View.extend({
	el: '#div_transaction',
	//template: _.template($('#tpl_login').html()),

	events: {
		'submit #form_transaction': 'create_transaction'

		// añadir headers https://stackoverflow.com/questions/38796670/backbone-js-setting-header-for-get-request
	},

	initialize: function() {

		var self = this;
		self.render();
    self.transaction_by_id();
		self.transaction_by_user();
	},

	render: function() {
		this.$el.show();
		//this.$el.html(this.template());
	},

	transaction_by_id: function(){
		// Cuando funciona la peticion se buscan en 'options'
		var onDataHandler = function(collection, response, options) {
			console.log(options.xhr.status + " status de transaction_by_id");
			if (options.xhr.status == 200){
				//
		 	} else {
			 	alert("Respuesta desconocida");
			 	console.log(response.status + " - " + response.responseText);
		 	}
		};

		// Cuando falla la peticion se buscan en 'response'
		var onErrorHandler = function(collection, response, options) {
			console.log("Entro en error handle");
			console.log(response.status + " status error onErrorHandler ");
			if(response.status == 401) {
				//
			} else {
				alert("Respuesta desconocida");
				console.log(response.status + " - " + response.responseText);
			}
		};


		var self = this;

		var transaction = new app.TransactionById_model({id:"2"}); // Se le pasa el id para el getById

		transaction.fetch({
      headers: {
        'Authorization':  sessionStorage.getItem("token")
      }
    },{ dataType:'text', success : onDataHandler, error: onErrorHandler });
		console.log(transaction);
	},

	transaction_by_user: function(){
		var onDataHandler = function(collection, response, options) {
			if (options.xhr.status == 200){
				console.log("Lista de transaccionesByUser funcionando y ahora? :v ");
				console.log(options.xhr.responseJSON);
		 } else {
			 alert("Respuesta desconocida");
			 console.log(response.status + " - " + response.responseText);
		 }
		};

		var onErrorHandler = function(collection, response, options) {
			console.log("Entro en error handle transaction_by_user");
			if(response.status == 401) {
				//
			} else {
				alert("Respuesta desconocida");
				console.log(response.status + " - " + response.responseText);
			}
		};

		var transaction = new app.TransactionByUser_model(); // Se le pasa el id para el getById
		var response = transaction.fetch({
			headers: {
				'Authorization': sessionStorage.getItem("token")
			},success: onDataHandler,	error: onErrorHandler
		});
	},

	create_transaction: function(e){
		e.preventDefault();
		console.log("casi");
		$("#input_amount").prop('disabled', true);
	}


});

var transaction_view = new app.Transaction_view();
