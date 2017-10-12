var app = app || {};

app.ListaPagos_view = Backbone.View.extend({
	el: '#div_menu_lista_pagos',
	template: _.template($('#tpl_lista_de_pagos').html()),

	events: {
		'click #btn_cualquiera': 'funcion1111'

		// añadir headers https://stackoverflow.com/questions/38796670/backbone-js-setting-header-for-get-request
	},

	initialize: function() {
		var self = this;
		self.render();
	},

	render: function() {
		this.$el.show();
		this.$el.html(this.template());
	},

	funcion1111: function(){

	}

});

//var noficaciones_view = new app.Noficaciones_view();
