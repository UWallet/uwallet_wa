var app = app || {};

app.MiPerfil_view = Backbone.View.extend({
	el: '#div_menu_mi_perfil',
	//template: _.template($('#tpl_mi_perfil').html()),
	template: '\
		<h1> Mi perfil </h1>\
		<div class="item-dpp">\
			<div class="personal-state">\
				<div class="user_name_and_online">\
					<span class="user_name" id="firstName"></span><span class="user_name"> </span><span class="user_name" id="lastName"></span><br>\
				</div>\
				<div class="one-info">\
					<span class="span-state">Email: <span class="span-state-2"  id="email"></span></span>\
				</div>\
				<div class="one-info">\
					<span class="span-state">Dinero: $<span class="span-state-2" id="money"></span></span>\
				</div>\
			</div>\
		</div>\
	</div>\
	',

	events: {
		'click #btn_cualquiera': 'funcion1111'

		// añadir headers https://stackoverflow.com/questions/38796670/backbone-js-setting-header-for-get-request
	},

	initialize: function() {
		var self = this;
		self.render();
		self.peticion();
	},

	render: function() {
		this.$el.show();
		//this.$el.html(this.template());  // Se usaba cuando el template se importaba desde el html
		this.$el.html(this.template);
	},

	peticion: function(e){money
		// Cuando funciona la peticion se buscan en 'options'
		var onDataHandler = function(collection, response, options) {
			if (options.xhr.status == 200){
				usuario = JSON.parse(options.xhr.responseText);
				$('#firstName').text(usuario.firstName);
				$('#lastName').text(usuario.lastName);
				$('#email').text(usuario.email);
				$('#money').text(usuario.money);
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
				console.log(response.status + " - " + responses.responseText);
			}
		};
		console.log("Entro en profile");

		var self = this;
		var perfil = new app.Profile_model();
		var response = perfil.fetch({
      headers: {
        'Authorization': sessionStorage.getItem("token")
      },success: onDataHandler,
					error: onErrorHandler
    });
		console.log(response);
	}

});

//var noficaciones_view = new app.Noficaciones_view();
/*
'\
        <form>\
            <legend>Share the feedback</legend>\
            <div class="control-group email">\
                <label>Email</label>\
                <input type="text" id="email" placeholder="Your email address...">\
                <span class="help-inline"></span>\
            </div>\
            <div class="control-group website">\
                <label>Web site</label>\
                <input type="text" id="website" placeholder="Your website...">\
                <span class="help-inline"></span>\
            </div>\
            <div class="control-group feedback">\
                <label>Feedback</label>\
                <textarea id="feedback" class="input-xxlarge" placeholder="Feedback text..." rows="6"></textarea>\
                <span class="help-inline"></span>\
            </div>\
            <button type="submit" id="submit" class="btn">Submit</button>\
        </form>\
    '*/
