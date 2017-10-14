var app = app || {};

app.MenuInicio_view = Backbone.View.extend({
	el: '#div_menu_inicio',
	template: '\
		<div class="row">\
			<h1>Bienvenido a UWallet</h1>\
			<div class="col-md-4" data-toggle="modal" data-target="#modal_aceptacion">\
				<h1>Enviar dinero</h1>\
				<center><img src="public/img/enviar_dinero.png" alt=""></center>\
			</div>\
			<div class="col-md-4">\
				<h1>Lista de pagos</h1>\
				<center><img src="public/img/lista_pago.png" alt=""></center>\
			</div>\
			<div class="col-md-4">\
				<h1>Extractos</h1>\
				<center><img src="public/img/pdf.png" alt=""></center>\
			</div>\
		</div>\
	',

	events: {
    'click #opc_inicio': 'opc_inicio',
		'click #opc_enviar_dinero': 'opc_enviar_dinero',
    'click #opc_cerrar_sesion': 'opc_cerrar_sesion'
  //  'click #': '',
	},

	initialize: function() {
    console.log("Entro en menu inicio");
		var self = this;
		self.render();
	},

	render: function() {
		this.$el.show();
		//this.$el.html(this.template());  // Se usaba cuando el template se importaba desde el html
		this.$el.html(this.template);

	},

  opc_inicio: function(){

  },

	opc_enviar_dinero: function(){

	},

  opc_cerrar_sesion: function(){

  }

});

//var menuInicio_view = new app.MenuInicio_view();
