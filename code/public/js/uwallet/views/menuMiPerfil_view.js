var app = app || {};

app.MiPerfil_view = Backbone.View.extend({
	el: '#div_menu_mi_perfil',
	template: _.template($('#tpl_mi_perfil').html()),

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
