var app = app || {};

app.MenuInicio_view = Backbone.View.extend({
	el: '#div_menu_inicio',
	template: _.template($('#tpl_menu_inicio').html()),

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

		this.$el.html(this.template());
    this.$el.show();
	},

  opc_inicio: function(){

  },

	opc_enviar_dinero: function(){

	},

  opc_cerrar_sesion: function(){

  }

});

//var menuInicio_view = new app.MenuInicio_view();
