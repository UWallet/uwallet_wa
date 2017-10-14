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
		// Cuando funciona la peticion se buscan en 'options'
		var onDataHandler = function(collection, response, options) {
			if (options.xhr.status == 200){

		 } else {
			 alert("Respuesta desconocida");
			 console.log(response.status + " - " + response.responseText);
		 }
	};

		// Cuando falla la peticion se buscan en 'response'
		var onErrorHandler = function(collection, response, options) {
			console.log("Entro en error handle");
			if(response.status == 401) {
				//
			} else {
				alert("Respuesta desconocida");
				console.log(response.status + " - " + response.responseText);
			}
		};
		var self = this;
		//e.preventDefault();
		//user = objectifyForm( $('#form_transaction_by_id').serializeArray());  // Convierte todos los datos del formulario en un objeto

		var transaction = new app.TransactionByUser_model(); // Se le pasa el id para el getById

				var response = transaction.fetch({
					headers: {
						'Authorization': sessionStorage.getItem("token")
					},success: onDataHandler,	error: onErrorHandler
				});
				console.log(response);
	},

	create_transaction: function(e){
		e.preventDefault();
		console.log("casi");
		$("#input_amount").prop('disabled', true);
	}


});

var transaction_view = new app.Transaction_view();

/*


<!-- Template login-->
<script type="text/template" id="tpl_transaccion">
	<br> <br>
	<form role="form" id="form_transaccion">
		<div class="row">
			<div class="col-md-6">
				<div class="form-group">
					<label for="input_email"> userid </label>
					<input class="form-control" name="userid" id="input_email" type="text" placeholder="Email" required  value="jonatan10@gmail.com" />
				</div>
			</div>
			<div class="col-md-6">
				<div class="form-group">
					<label for="input_password">	amount </label>
					<input class="form-control" name="amount" id="input_password" type="text" placeholder="Contraseña" required  value="foobar"/>
				</div>
			</div>

		</div>
		<input type="submit" class="btn btn-default" value="Iniciar sesión" form="form_transaccion" />

	</form>
</script>
<!-- Template login-->
































*/
