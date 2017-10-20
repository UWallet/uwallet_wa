var app = app || {};
app.Listscreate_model = Backbone.Model.extend({
  urlRoot: 'http://192.168.99.101:4000/lists',
  validate: function (attrs) {
    var errors = [];
    //Validación cantidad de atributos = 5
    if(Object.keys(attrs).length != 5){
      errors.push({name: 'Cantidad de atributos', message: 'La cantidad de atributos es incorrecta.'});    }
    //Validacion de campo de descripcion
    if (!attrs.description) {
      errors.push({name: 'Descripción', message: 'Es necesario que esté el campo del recordatorio.'});    }
    //Validacion de campo de dia de pago
    if (!attrs.date_pay) {
      errors.push({name: 'Dia de pago', message: 'Es necesario que esté el campo de fecha de pago.'});    }
    //Validacion de campo de COSTO
    if (!attrs.cost) {
      errors.push({name: 'Valor de deuda', message: 'Es necesario que esté el campo del valor de la deuda.'});    }
    //Validacion de campo de acreedor
    if (!attrs.target_account) {
      errors.push({name: 'Acreedor', message: 'Es necesario que esté el campo del usuario acreedor.'});    }
    //Validacion de campo de estado
    if (!attrs.state_pay) {
      errors.push({name: 'Estado', message: 'Es necesario que esté el campo del estado de la deuda.'});    }
    return errors.length > 0 ? errors : false;
  },
    initialize: function() {
        this.on('change', function(){
            //console.log('El modelo ha sido modificado.');
        });
    }
});
