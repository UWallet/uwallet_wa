var app = app || {};

app.MenuNavegacion_view = Backbone.View.extend({
	el: '#div_menu_navegacion',
	template: _.template($('#tpl_menu_navegacion').html()),

	events: {
    'click #opc_inicio': 'opc_inicio',
		'click #opc_enviar_dinero': 'opc_enviar_dinero',
    'click #opc_notificaciones': 'opc_notificaciones',
    'click #opc_lista_pagos': 'opc_lista_pagos',
    'click #opc_extractos': 'opc_extractos',
    'click #opc_mi_perfil': 'opc_mi_perfil',
    'click #opc_cerrar_sesion': 'opc_cerrar_sesion'
  //  'click #': '',
	},

	initialize: function() {
		var self = this;
		self.render();
	},

	render: function() {
    this.$el.show();
		this.$el.html(this.template());
    iniciar_menu_navegacion();

	},

  opc_inicio: function(){

  },

	opc_enviar_dinero: function(){

	},

  opc_notificaciones: function(){

  },

  opc_lista_pagos: function(){

  },

  opc_extractos: function(){

  },

  opc_mi_perfil: function(){

  },

  opc_cerrar_sesion: function(){

  }

});

//var menuNavegacion_view = new app.MenuNavegacion_view();
