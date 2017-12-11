$(document).ready( function() {//jquery esta cargado
	//ejemplo para postear credenciales
	//Yo uso un plugin de alertas que esta piola que se llama sweet alert, vas a ver lineas con swal.close() por ejemplo que es de ese plugin
	//te dejo el js y el css del plugin en sus respectivas carpetas, vas a tener que incluirlos antes de este js
	$('#btnLogin').click(function(){

		var email = $("#txtEmail").text();
		var password = $("#txtPassword").text();
		if (email == '' || password == '')
		{
			swal('Problemas!','Debes completar todos los campos','error');
		}
		else{
			swal({
			    title: "Validando credenciales", 
			    text: "Por favor espere.", 
			    showCancelButton: false,
			    showConfirmButton: false
			});
			//Este ajax es distinto a los demas que vamos a usar, los otros si o si 
			//van a necesitar que le pongamos en el header el Token que conseguimos aca
			$.ajax({
			     url:'https://bellman.infovalue.com.ar/app/postLogin',
			       type: 'post',
			       data: {
			       	email: email,
			       	password: password
			       },
			       success: function(respuesta)
			       {
			               swal.close();
			               var datos = JSON.parse(respuesta);
			               var nombre = datos.nombre;
			               window.localStorage.setItem("token", datos.token);
			               // window.localStorage.setItem("nombre", respuesta.nombre);
			               $("#tnusuario").text(nombre);
			               //to do:
			               // parsear la info y mostrar la pagina que corresponda.
			               };    
			       },//fin success
			       error: function (error) 
			       {
			        swal('Problemas','No se pudo iniciar sesion','error');
			       }
			 });//fin ajax
		}//fin else
	}); //fin btnLogin

	//ejemplo de un ajax para solicitar informacion
	$("#ejemplo").click(function(){
		var token = window.localStorage.getItem("token");
		$.ajax({
		        url:'http://bellman.infovalue.com.ar/app/ejemplo',
		          type: 'POST',
		          beforeSend: function (xhr) {
		              xhr.setRequestHeader ("Authorization", "Bearer"+token);
		          },
		          data: {token: token},
		          success: function(respuesta) {
		                  // swal.close();
		                  respuesta = JSON.parse(respuesta);
		                  //recorres el json, puede ser un json dentro de otro json como en este caso
		                  //recorremos el json 'datos' dentro de respuesta
		                  for (var i = 0; i < respuesta.datos.length; i++)
		                  {
		                    var nombre = respuesta.datos[i].nombre;
		                    var idInsumo = respuesta.datos[i].id;
		                    var um = respuesta.datos[i].unidadMedida;
		                    var pactivo = respuesta.datos[i].principioActivo;
		                    var stock = respuesta.datos[i].disponibilidad;
		                    //aca podes setear los spans inputs lo que sea que tengas que renderizar en la app
		                  };
		          },//fin success
		          error: function (error) {
		           swal('Problemas',error,'error');
		          }
		  });//fin ajax
	}); //fin ejemplo
});// fin onReady