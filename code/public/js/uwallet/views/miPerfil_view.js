var app = app || {};

app.MiPerfil_view = Backbone.View.extend({
	el: '#div_menu_mi_perfil',
	//template: _.template($('#tpl_mi_perfil').html()),
	template: '\
		<h1> Mi perfil </h1>\
	',

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
		//this.$el.html(this.template());  // Se usaba cuando el template se importaba desde el html
		this.$el.html(this.template);
	},

	funcion1111: function(){

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
