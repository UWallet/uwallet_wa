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
		var self = this;
		self.ocultar_menus();
		var menuInicio_view = new app.MenuInicio_view();
		$('#div_menu_inicio').show('slow');
  },

	opc_enviar_dinero: function(){

	},

  opc_notificaciones: function(){
		var self = this;
		self.ocultar_menus();
		var notificaciones_view = new app.Notificaciones_view();
		$('#div_menu_notificaciones').show('slow');
  },

  opc_lista_pagos: function(){
		var self = this;
		self.ocultar_menus();
		var listaPagos_view = new app.ListaPagos_view();
		$('#div_menu_lista_pagos').show('slow');
  },

  opc_extractos: function(){
		var self = this;
		self.ocultar_menus();
		var extractos_view = new app.Extractos_view();
		$('#div_menu_extractos').show('slow');
  },

  opc_mi_perfil: function(){
		var self = this;
		self.ocultar_menus();
		var miPerfil_view = new app.MiPerfil_view();
		$('#div_menu_mi_perfil').show('slow');
  },

  opc_cerrar_sesion: function(){

  },

	ocultar_menus: function(){
		$('#div_menu_inicio').hide('slow');
		$('#div_menu_notificaciones').hide('slow');
		$('#div_menu_lista_pagos').hide('slow');
		$('#div_menu_extractos').hide('slow');
		$('#div_menu_mi_perfil').hide('slow');
		$('#div_menu_inicio').hide('slow');
	}

});

//var menuNavegacion_view = new app.MenuNavegacion_view();
