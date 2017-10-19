
// Esta funcion ayuda a convertir los datos de un formulario a un json
// Recibe un arreglo
function objectifyForm(formArray){
	var returnArray = {};
	for (var i=0; i < formArray.length; i++){
		returnArray[formArray[i]['name']] = formArray[i]['value'];
	}
	return returnArray;
}

// Ayuda a controlar los errores
var options = {
		success: function () {
			alert('Thanks for the feedback!');
		},
		error: function (model, r) {
			console.log(r);
			console.log(r.responseText);
			console.log("Status:" + r.status);
			console.log(model);
		}
}

function mostrar_errores_modelo(errores){
	lista_errores = "<ul>";
	for (var i = 0; i < errores.length; i++) {
		lista_errores += "<li><strong>" + errores[i]['name'] + ":</strong> "+ errores[i]['message'] + "</li>"
	}
	lista_errores += "</ul>"
	mostrar_modal_generico('Error en el formulario', 'No es posible enviar tu formulario debido a que:', lista_errores, 'fallo.png' )
}

// Reemplaza a los modales de los errores del modelo para todos los modelos, necesita el ID del div donde se va a mostrar
 function mostrar_errores_modelo_2 (error, id_div){
	 codigo = armar_lista_errores_modelo(error);
	 console.log(codigo);
	 $(id_div).empty();
	 $(id_div).fadeIn('slow');
	 $(id_div).append(codigo);
 };

function armar_lista_errores_modelo(errores){
	lista_errores = "<ul>";
	for (var i = 0; i < errores.length; i++) {
		lista_errores += "<li><strong>" + errores[i]['name'] + ":</strong> "+ errores[i]['message'] + "</li>"
	}
	lista_errores += "</ul>"
	return lista_errores;
}

function mostrar_modal_generico(contenido_header, titulo, contenido, imagen){
	// Limpiar el contenido del modal
	$("#modal_generico_body").empty();
	$("#modal_generico_header").empty();

	$('#modal_generico').modal('show');   // Muestra el modal

	// Mostrar contenido
	$("#modal_generico_header").append("<strong>"+ contenido_header + "</strong>");
	$('#modal_generico_body').append("<h1>"+ titulo+ "</h1>")
	$('#modal_generico_body').append("<center><h3>" + contenido + "</h3></center>")
	$('#modal_generico_body').append("<img class='center-block' src='public/img/"+ imagen+ " ' alt=''>")

}


var numeros="0123456789";

function tiene_numeros(texto){
   for(i=0; i<texto.length; i++){
      if (numeros.indexOf(texto.charAt(i),0)!=-1){
         return 1;
      }
   }
   return 0;
}

var letras_mayusculas="ABCDEFGHYJKLMNÑOPQRSTUVWXYZ";

function tiene_mayusculas(texto){
   for(i=0; i<texto.length; i++){
      if (letras_mayusculas.indexOf(texto.charAt(i),0)!=-1){
         return 1;
      }
   }
   return 0;
}
