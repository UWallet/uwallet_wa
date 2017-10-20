var app = app || {};
app.Lists_model = Backbone.Model.extend({
  urlRoot: 'http://192.168.99.101:4000/lists/by_user',

    initialize: function() {
        this.on('change', function(){
            //console.log('El modelo ha sido modificado.');
        });
    }
});
