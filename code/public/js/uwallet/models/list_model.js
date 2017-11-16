var app = app || {};

var string = 'http://';
string += localStorage.getItem("direccion_ip");
string += ':4060/lists/by_user';

app.Lists_model = Backbone.Model.extend({
  urlRoot: string,

    initialize: function() {
        this.on('change', function(){
            //console.log('El modelo ha sido modificado.');
        });
    }
});
