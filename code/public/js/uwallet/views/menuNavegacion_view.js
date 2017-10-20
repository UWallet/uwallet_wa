var app = app || {};

app.MenuNavegacion_view = Backbone.View.extend({
	el: '#div_menu_navegacion',
	template: '<!-- Template menu de navegación -->\
	<!-- HEADER-->\
	<header id="header">\
							<div class="row"  >\
									 <div class="col-lg-1 col-md-6 col-sm-6 col-xs-12 logo-wrapper">\
									 </div>\
									 <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 logo-wrapper">\
											 <img src="public/img/logo_uwallet.png" alt="" />\
									 </div>\
										<div class="col-lg-9 col-md-6 col-sm-6 col-xs-12 text-right" >\
												<div class="menu-links scroll-me">\
												<a class="userName"> Nombre </a>\
												<a class="userMoney"> <i class="ion-ios-camera-outline"></i> </a>\
												<!-- <a href="#clients"> <i class="ion-ios-grid-view-outline"></i> </a>\
												<a href="#contact"> <i class="ion-ios-chatboxes-outline"></i> </a> -->\
												</div>\
							</div>\
							</div>\
	</header>\
 		<nav class="navbar navbar-fixed-left navbar-minimal animate" role="navigation">\
 		  <div class="navbar-toggler animate">\
 		    <span class="menu-icon"></span>\
 		  </div>\
 		  <ul class="navbar-menu animate">\
 				<li>\
 		      <a class="animate" id="opc_inicio">\
 		        <span class="desc animate"> Inicio </span>\
 		        <i class="fa fa-home" arial-hidden="true"></i>\
 		      </a>\
 		    </li>\
\
 		    <li>\
 		      <a class="animate" id="opc_notificaciones">\
 		        <span class="desc animate"> Notificaciones  </span>\
 		        <i class="fa fa-bell " arial-hidden="true"></i>\
 		      </a>\
 		    </li>\
\
 		    <li>\
 		      <a class="animate" id="opc_lista_pagos">\
 		        <span class="desc animate"> lista de pagos</span>\
 		        <i class="fa fa-list-alt" arial-hidden="true"></i>\
 		      </a>\
 		    </li>\
 		    <li>\
 		      <a class="animate" id="opc_mi_perfil">\
 		        <span class="desc animate"> Mi perfil</span>\
 		        <i class="fa fa-user-circle" arial-hidden="true"></i>\
 		      </a>\
 		    </li>\
\
 		    <li>\
 		      <a class="animate" id="opc_cerrar_sesion">\
 		        <span class="desc animate"> Cerrar sesion </span>\
 		        <i class="fa fa-power-off" arial-hidden="true"></i>\
 		      </a>\
 		    </li>\
 		  </ul>\
 		</nav>\
 	<!-- Fin template menu de navegacion -->\
',

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
		//self.render();

	},

	render: function() {
		var self = this;
		this.$el.show();
		this.$el.html(this.template); // Como se importa desde el html, se usa la template como funcion
    iniciar_menu_navegacion();
		miPerfil_view.peticionusuario();
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
		notificaciones_view.render();
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
		//var miPerfil_view = new app.MiPerfil_view();
		miPerfil_view.render();
		$('#div_menu_mi_perfil').show('slow');
  },

  opc_cerrar_sesion: function(){
		//sessionStorage.setItem('token', '');
		 sessionStorage.clear();
		 location.reload(true);
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

var menuNavegacion_view = new app.MenuNavegacion_view();
