function ocultarSlide(nombre){
    $("#"+nombre).removeClass('bounceInLeft');
    $("#"+nombre).addClass('bounceOutLeft');
    setTimeout(function () {
      $("#"+nombre).addClass('oculto');
    }, 500);
}
function mostrarSlide(nombre){
    $("#"+nombre).removeClass('bounceOutLeft');
    $("#"+nombre).removeClass('oculto');
    $("#"+nombre).addClass('bounceInRight');
}
    // swal({
    //     title: "Validando credenciales", 
    //     text: "Por favor espere.", 
    //     showCancelButton: false,
    //     showConfirmButton: false
    // });
$(document).ready( function() {

      var token = window.localStorage.getItem("token");
      var tablaCantidades = "";  
      var idClienteV = '';
      var hoy =  moment().format('YYYY-MM-DD'); 
      $('#fechaEntregaSolicitada').val(hoy);
      $(".logo").click(function(){  
         swal({
            title: "Menu opciones", 
            text: "Seleccionar accion:",
            showCancelButton: true,
            type:'info',
            closeOnConfirm: false,
            confirmButtonText:'Menu Principal',
            cancelButtonText: 'Cerrar Sesion',
          }, function(isConfirm){
              if (isConfirm) {
                location.reload();
              } else {
              window.localStorage.setItem("token", '1');
              location.reload();
              }
            });
      });//fin logo

      //logoMini
      $(".logoMini").click(function(){  
         swal({
            title: "Menu opciones", 
            text: "Seleccionar accion:",
            showCancelButton: true,
            type:'info',
            closeOnConfirm: false,
            confirmButtonText:'Menu Principal',
            cancelButtonText: 'Cerrar Sesion',
          }, function(isConfirm){
              if (isConfirm) {
                location.reload();
              } else {
              window.localStorage.setItem("token", '1');
              location.reload();
              }
            });
      });//fin logoMini

      //validacion de token
      // if (token == null)
      //   {
      //      swal({
      //       title: "Sesion expirada", 
      //       text: "Por favor ingrese nuevamente.", 
      //       showCancelButton: false,
      //       showConfirmButton: true
      //   });
      //     mostrarSlide('contenedorLogin');
      //   }
      // else{ 
      //   // alert('token guardado: '+token);
      //   $.ajax({
      //           url:'http://vientri.infovalue.com.ar/app/chequearToken',
      //             type: 'post',
      //              beforeSend: function (xhr) {
      //                 xhr.setRequestHeader ("Authorization", "Bearer"+token);
      //             },
      //             data: {},
      //             success: function(respuesta) {
      //                     swal.close();
      //                     var role = window.localStorage.getItem("role");
      //                     var nombre = window.localStorage.getItem("nombre");
      //                     $("#tnusuario").text(nombre);
      //                     switch (role){
      //                       case 'Solicitante':
      //                             ocultarSlide('contenedorLogin');
      //                             setTimeout(function () {
      //                               mostrarSlide('contenedorMenuSolicitante');
      //                            }, 500);
      //                            break;
      //                       case 'Resolutor':
      //                          alert('Perfil Resolutor proximamente.');
      //                            //  ocultarSlide('contenedorLogin');
      //                            //  setTimeout(function () {
      //                            //    mostrarSlide('contenedorMenuResolutor');
      //                            // }, 500);
      //                         break;
      //                         case 'Administrador':
      //                           alert('Perfil Admin proximamente');
      //                            //  ocultarSlide('contenedorLogin');
      //                            //  setTimeout(function () {
      //                            //    mostrarSlide('contenedorMenuAdministrador');
      //                            // }, 500);
      //                         break;
      //                       default: alert('usuario sin rol identificado');
      //                         break;
      //                     };    
      //             },//fin success
      //             error: function (error) {
      //              mostrarSlide('contenedorLogin'); 
      //              swal('Credenciales','La sesion ha expirado','info');
      //             }
      //       });//fin ajax
      // }//fin else validacion token

      $('#btnIngresar').click(function() {
          var email = $('#txtEmailLogin').val(); 
          var password = $('#txtPasswordLogin').val(); 
           email = 'leonardo@vientri.com';
           password = 'Inicio123';
           if (email == '' || password == '' )
            {
              swal({
                title: "Problemas!", 
                text: "Complete todos los campos.", 
                showCancelButton: false,
                showConfirmButton: true,
                type:'error',
               });
            }
            else{
                swal({
                title: "Enviando información", 
                text: "Por favor espere.", 
                showCancelButton: false,
                showConfirmButton: false
           });
           $.ajax({
                url:'http://vientri.infovalue.com.ar/app/postLogin',
                  type: 'post',
                  data: {email: email,password: password},
                  success: function(respuesta) {
                          swal.close();
                          respuesta = JSON.parse(respuesta);
                          nombre = respuesta.nombre;
                          role = respuesta.role;
                          window.localStorage.setItem("token", respuesta.token);
                          window.localStorage.setItem("role", respuesta.role);
                          window.localStorage.setItem("nombre", respuesta.nombre);
                          $("#tnusuario").text(nombre);
                           ocultarSlide('contenedorLogin');
                           switch (role)
                           {
                                    case 'Cliente':
                                          ocultarSlide('contenedorLogin');
                                          setTimeout(function () {
                                            mostrarSlide('contenedorMenuSolicitante');
                                         }, 500);
                                         break;
                                    case 'Vendedor':
                                          ocultarSlide('contenedorLogin');
                                          setTimeout(function () {
                                            mostrarSlide('contenedorMenuVendedor');
                                         }, 500);
                                      break;
                                      case 'Empresa':
                                        alert('Perfil Empresa proximamente');
                                         //  ocultarSlide('contenedorLogin');
                                         //  setTimeout(function () {
                                         //    mostrarSlide('contenedorMenuAdministrador');
                                         // }, 500);
                                      break;
                                    default: alert('usuario sin rol identificado');
                                      break;
                                  };    
                          //  setTimeout(function () {
                          //    mostrarSlide('contenedorMenuSolicitante');
                          //    $('.nsolicitante').text(nombre);
                          // }, 500);
                          
                  },//fin success
                  error: function (error) {
                   swal('Problemas','No se pudo iniciar sesion','error');
                  }
            });//fin ajax
        }//fin else   
      });//fin btnIngresar
       var listaDepositos = '';
       var tablaNuevoPedido = '';
       $('#btnNuevoPedidoSolicitante').click(function () {
         swal({
             title: "Buscando información", 
             text: "Por favor espere.", 
             showCancelButton: false,
             showConfirmButton: false
         });
         token = window.localStorage.getItem("token");
         $.ajax({
                 url:'http://vientri.infovalue.com.ar/app/listarProductos',
                   type: 'POST',
                   beforeSend: function (xhr) {
                       xhr.setRequestHeader ("Authorization", "Bearer"+token);
                   },
                   data: {token: token},
                   success: function(respuesta) {
                           swal.close();
                           // respuesta = JSON.parse(respuesta);
                           console.log(respuesta);
                           for (var i = 0; i < respuesta.length; i++)
                           {
                             var nombre = respuesta[i].DES;
                             
                             var idInsumo = respuesta[i].ID;

                             var um = 'unidades';

                             var pactivo = '';
                             if (pactivo=='') {pactivo= null};
                             var control = '';
                              if (control=='') {control= null};
                             var banda = 'BLANCA';
                             var stock = respuesta[i].STK;
                             if (stock == '0'){
                              $('#contTodosInsumos').append("<div class='cinsumo' estado='no_apretado' um='"+um+"' idInsumo='"+idInsumo+"' control='"+control+"' pactivo='"+pactivo+"' disponibilidad="+stock+"><div><img class='iestado' src='img/psinseleccionar.svg'></div><div class='coninfoinsumo'><span class='nominsum'>"+nombre+"</span><br><span class='stock sinStock'>Sin stock</span></div><div class='banda "+banda+"'></div></div>");
                             }
                             else{
                              $('#contTodosInsumos').append("<div class='cinsumo' estado='no_apretado' nombre='"+nombre+"' um="+um+" idInsumo="+idInsumo+" control='"+control+"' pactivo='"+pactivo+"' disponibilidad="+stock+"><div><img class='iestado' src='img/psinseleccionar.svg'></div><div class='coninfoinsumo'><span class='nominsum'>"+nombre+"</span><br><span class='stock'>Stock:"+stock+" unidades.</span></div><div class='banda "+banda+"'></div></div>");
                             }
                           };
                           //agregar los insumos al listado
                           $('#bodyDestinos').empty();
                           // for (var i = 0; i < respuesta.destinos.length; i++)
                           // {
                           //    var idDestino = respuesta.destinos[i].id;
                           //    var ubicacion = respuesta.destinos[i].ubicacion;
                           //    var denominacion = respuesta.destinos[i].denominacion;
                           //   $('#bodyDestinos').append("<div class='cdestino' estado='no_apretado'  idDestino="+idDestino+" ubicacion="+ubicacion+" denominacion="+denominacion+"><div><img class='iestado' src='img/psinseleccionar.svg'></div><div style='margin-left:10px;margin-right:20px;width:30%;'><span class='nominsum'>"+denominacion+"</span></div><div class='coninfodestino'><span style='color:black;'>"+ubicacion+"</span></div></div>");
                           // };
                           ocultarSlide('contenedorMenuSolicitante');
                           setTimeout(function () {
                               mostrarSlide('contenedorNuevoPedidoSolicitante');
                               // $(".nombreUsuario").text(nombreUsuario);
                           }, 500);
                   },//fin success
                   error: function (error) {
                    swal('Problemas',error,'error');
                   }
           });//fin ajax
         });//fin nuevo pedido solicitante
      $("#btnVolverAMenu").click(function(){
        location.reload();
      });
      $('#btnNuevoPedidoVendedor').click(function () {
        swal({
            title: "Buscando información", 
            text: "Por favor espere.", 
            showCancelButton: false,
            showConfirmButton: false
        });
        token = window.localStorage.getItem("token");
        $.ajax({
                url:'http://vientri.infovalue.com.ar/app/listarClientesEmpresas',
                  type: 'POST',
                  beforeSend: function (xhr) {
                      xhr.setRequestHeader ("Authorization", "Bearer"+token);
                  },
                  data: {token: token},
                  success: function(respuesta) {
                          swal.close();
                         console.log(respuesta);
                         // respuesta = JSON.parse(respuesta);
                          
                          for (var i = 0; i < respuesta.length; i++)
                          {
                            // var nombre = respuesta['empresas'][i]['idEmpresa'];
                            // var idEmpresa = respuesta['empresas'][i]['idEmpresa'];
                            var nombre = respuesta[i]['name'];
                            var idEmpresa = respuesta[i]['idEmpresa'];
                            idCliente = respuesta[i]['id'];

                            // var nombre = respuesta[i][0].idEmpresa;
                            // var idsEmpresa = respuesta[i][0].id;
                            $('#contTodosEmpresas').append("<div class='ccliente ' estado='no_apretado' nombre='"+nombre+"' idCliente="+idCliente+" ><div><img class='iestado' src='img/psinseleccionar.svg'></div><div class='coninfocliente'><span class='nominsum'>"+nombre+"</span><br></div></div></div>");
                           
                          };
                          //agregar los insumos al listado
                          
                          ocultarSlide('contenedorMenuVendedor');
                          setTimeout(function () {
                              mostrarSlide('contenedorNuevoPedidoVendedor');
                              // $(".nombreUsuario").text(nombreUsuario);
                          }, 500);
                  },//fin success
                  error: function (error) {
                   swal('Problemas',error,'error');
                  }
          });//fin ajax
        });//fin nuevo pedido solicitante
      var listaPedidos = [];
      //buscador clientes
        $("#inpbsqClientes").click(function(){
          $(this).val('');
          $(".cinsumo").removeClass('oculto');
        });
        $("#inpbsqClientes" ).keyup(function() {
              var valor = $( "#inpbsq" ).val().toUpperCase();
              // if (valor == ''){$(".cinsumo").removeClass('oculto');};
              $(".cinsumo").removeClass('oculto');
              $('.cinsumo:not(:contains('+valor+'))').addClass('oculto');
              $(".cinsumo[control*='"+valor+"']").removeClass('oculto');
              $(".cinsumo[pactivo*='"+valor+"']").removeClass('oculto');
              $(".cinsumo[nombre*='"+valor+"]'").removeClass('oculto');
          });

      //selecciona cliente
      $(document).on('click','.ccliente', function() {  
        var idCliente = $(this).attr('idCliente');
        swal({
            title: "Buscando información", 
            text: "Por favor espere.", 
            showCancelButton: false,
            showConfirmButton: false
        });
        token = window.localStorage.getItem("token");
        $.ajax({
                url:'http://vientri.infovalue.com.ar/app/listarProductosClientes',
                  type: 'POST',
                  beforeSend: function (xhr) {
                      xhr.setRequestHeader ("Authorization", "Bearer"+token);
                  },
                  data: {token,idCliente},
                  success: function(respuesta) {
                          swal.close();
                          // respuesta = JSON.parse(respuesta);
                          console.log(respuesta);
                          for (var i = 0; i < respuesta.length; i++)
                          {
                            var nombre = respuesta[i].DES;
                            
                            var idInsumo = respuesta[i].ID;

                            var um = 'unidades';

                            var pactivo = '';
                            if (pactivo=='') {pactivo= null};
                            var control = '';
                             if (control=='') {control= null};
                            var banda = 'BLANCA';
                            var stock = respuesta[i].STK;
                            if (stock == '0'){
                             $('#contTodosInsumos').append("<div class='cinsumo' estado='no_apretado' um='"+um+"' idInsumo='"+idInsumo+"' control='"+control+"' pactivo='"+pactivo+"' disponibilidad="+stock+"><div><img class='iestado' src='img/psinseleccionar.svg'></div><div class='coninfoinsumo'><span class='nominsum'>"+nombre+"</span><br><span class='stock sinStock'>Sin stock</span></div><div class='banda "+banda+"'></div></div>");
                            }
                            else{
                             $('#contTodosInsumos').append("<div class='cinsumo' estado='no_apretado' nombre='"+nombre+"' um="+um+" idInsumo="+idInsumo+" control='"+control+"' pactivo='"+pactivo+"' disponibilidad="+stock+"><div><img class='iestado' src='img/psinseleccionar.svg'></div><div class='coninfoinsumo'><span class='nominsum'>"+nombre+"</span><br><span class='stock'>Stock:"+stock+" unidades.</span></div><div class='banda "+banda+"'></div></div>");
                            }
                          };
                          //agregar los insumos al listado
                          $('#bodyDestinos').empty();
                          // for (var i = 0; i < respuesta.destinos.length; i++)
                          // {
                          //    var idDestino = respuesta.destinos[i].id;
                          //    var ubicacion = respuesta.destinos[i].ubicacion;
                          //    var denominacion = respuesta.destinos[i].denominacion;
                          //   $('#bodyDestinos').append("<div class='cdestino' estado='no_apretado'  idDestino="+idDestino+" ubicacion="+ubicacion+" denominacion="+denominacion+"><div><img class='iestado' src='img/psinseleccionar.svg'></div><div style='margin-left:10px;margin-right:20px;width:30%;'><span class='nominsum'>"+denominacion+"</span></div><div class='coninfodestino'><span style='color:black;'>"+ubicacion+"</span></div></div>");
                          // };
                          ocultarSlide('contenedorMenuSolicitante');
                          ocultarSlide('contenedorNuevoPedidoVendedor');

                          setTimeout(function () {
                              mostrarSlide('contenedorNuevoPedidoSolicitante');
                              // $(".nombreUsuario").text(nombreUsuario);
                          }, 500);
                  },//fin success
                  error: function (error) {
                   swal('Problemas',error,'error');
                  }
          });//fin ajax




      });

      $("#btnIrAProductos").click(function(){

      });
      //buscador insumos
        $("#inpbsq").click(function(){
          $(this).val('');
          $(".cinsumo").removeClass('oculto');
        });
        $("#inpbsq" ).keyup(function() {
              var valor = $( "#inpbsq" ).val().toUpperCase();
              // if (valor == ''){$(".cinsumo").removeClass('oculto');};
              $(".cinsumo").removeClass('oculto');
              $('.cinsumo:not(:contains('+valor+'))').addClass('oculto');
              $(".cinsumo[control*='"+valor+"']").removeClass('oculto');
              $(".cinsumo[pactivo*='"+valor+"']").removeClass('oculto');
              $(".cinsumo[nombre*='"+valor+"]'").removeClass('oculto');
          });
        //selecciona insumo
        $(document).on('click','.cinsumo', function() {
            var estado = $(this).attr('estado');
            var idInsumo = $(this).attr('idInsumo');
            var insumo = $(this).find("> div.coninfoinsumo > span.nominsum").text();
            var unidadMedida = $(this).attr('um');
            var stock = $(this).attr('disponibilidad');
            if (estado == 'no_apretado')
             {
               $(this).attr('estado','apretado');
               var innerInsumo = [];
               innerInsumo.push(insumo, idInsumo, unidadMedida);
               listaPedidos.push(innerInsumo);
               $(this).find("> div > img").attr( "src",'img/pseleccionado.svg');
             }
            else{
              $(this).attr('estado','no_apretado');
              $(this).find("> div > img").attr( "src",'img/psinseleccionar.svg' );
               for (var i=listaPedidos.length-1; i>=0; i--)
                {
                   if (listaPedidos[i][0] === insumo) {
                       listaPedidos.splice(i, 1);
                   }
                }//fin for
          }//fin else stock
        });//fin cinsumo
        
        $(".btnIrACantidades").click(function(){
            $('#bodyCantidades').empty();
            if (listaPedidos.length == 0)
              {
                  swal({
                    title: "Datos insuficientes", 
                     text: "Selecciona al menos un insumo.", 
                     showCancelButton: false,
                     showConfirmButton: true,
                     type:'info'
                  });

              }
              else{
              

             for (var i = 0; i < listaPedidos.length; i++)
              {   
                  var insumo = listaPedidos[i][0];
                  var nombre =  insumo.substring(0, 20);
                  var unidadMedida = listaPedidos[i][2];
                  var idInsumo = listaPedidos[i][1];
                 $('#bodyCantidades').append('<tr class="conInsumoCantid" idInsumo='+idInsumo+'><td>'+nombre+'</td><td><input type="number" class="form-control inputNumero" style="width:70px !important;" value="1"></td><td class="tunidmed">'+unidadMedida+'</td><td> <div class="btnEliminarInsumo"><img src="img/borrarinsumo.svg" class="btnborrar" idInsumo='+idInsumo+'></div></td></tr>');
              
              }; 
             ocultarSlide('contenedorNuevoPedidoSolicitante');     
             setTimeout(function ()
             {
                mostrarSlide('contenedorCantidades');
             }, 400);
             
          }//fin else
        });
      jQuery(document).on('focus click', '.inputNumero',  function(e){
              $(this).val("");
      });

        $(document).on('click','.btnborrar', function() {
          var id = $(this).attr('idInsumo');
          $( ".conInsumoCantid" ).each(function(){
            var idPadre = $(this).attr('idInsumo');
            if (idPadre == id) {
              $(this).remove();
            };
          });
        });//fin btnborrar
        var listaNuevosConfirmados = [];
        $("#btnVolverAInsumos").click(function(){
          
           // $(".conInsumoCantid").each(function(){
           //      $(this).remove();
           //    });
           // $(".cinsumo").each(function(){
           //   $(this).attr('estado','no_apretado');
           //   $(this).find("> div > img").attr( "src",'img/psinseleccionar.svg' );
           // }); 
            
           ocultarSlide('contenedorCantidades');
           setTimeout(function ()
           {
              mostrarSlide('contenedorNuevoPedidoSolicitante');
              listaNuevosConfirmados = [];
           }, 400);
         });
        $("#btnIrADestinos").click(function(){
          $("#conTodosInConf").empty();
          listaNuevosConfirmados = [];
          var validaCantidades = true;
          $(".conInsumoCantid").each(function(){
            
            var idInsumo = $(this).attr('idInsumo');
            var nombreInsumo = $(this).find("td:first-child").text();
            var cantidad = $(this).find("td > input.inputNumero").val();
            var um = $(this).find("td.tunidmed").text();
            if (cantidad == '' || cantidad == '0')
            {
              validaCantidades = false;
            }
            else{
              $("#conTodosInConf").append("<div class='conNomInsumo'><div><b><span>"+nombreInsumo+"</span></b></div><div style='margin-left:20px;'><b><span>"+cantidad+' ('+um+')'+"</span></b></div></div>");
              var innerConfirmado = [];
              innerConfirmado.push(idInsumo,cantidad);
              listaNuevosConfirmados.push(innerConfirmado);
            }//fin else valida
          });//fin each
          if (validaCantidades == false){
            swal('Problemas!', 'Las cantidades no pueden estar vacias.','error');
          }
          else{
            ocultarSlide('contenedorCantidades');
            setTimeout(function ()
            {
               mostrarSlide('contenedorFecha');
            }, 400);
          }
        }); //fin btnIrADestinos

        //selecciona destino
        var idDestino = '';
        var ubicacion = '';
        var denominacion = '';
         $(document).on('click','.cdestino', function() {
            var estado = $(this).attr('estado');
                idDestino = $(this).attr('idDestino');
                ubicacion = $(this).find("div > span.nominsum").text();
                denominacion = $(this).find("div.coninfodestino > span").text();
                // alert('ubicacion'+ubicacion+' | denominacion: '+denominacion);

            $(".cdestino").each(function(){
              $(this).attr('estado','no_apretado');
              $(this).find("> div > img").attr( "src",'img/psinseleccionar.svg');
            });
            $(this).attr('estado','apretado');
            $(this).find("> div > img").attr( "src",'img/pseleccionado.svg');
         });
         $("#btnIrAFecha").click(function(){
            
             if (idDestino == ''){
              swal('Problemas!','Debes seleccionar un destino.','error');
             }
             else{
              ocultarSlide('contenedorDestinos');  
              $('#confirmaDestino').text(ubicacion); 
              setTimeout(function ()
              {
                 mostrarSlide('contenedorFecha');
              }, 400);
             }
            
          
         });
         $("#btnVolverADestinos").click(function(){
            ocultarSlide('contenedorFecha');
            setTimeout(function ()
            {
               mostrarSlide('contenedorDestinos');
            }, 400);
          });


         var hoy = moment().format('YYYY-MM-DD');
         var ayer = moment().add(-1, 'days');
         var maximo = moment().add(60, 'days').format('DD-MM-YYYY');
         var fechaSolicitada = '';

         $('#btnIrAConfirma').click(function () {
           fechaSolicitada = $('#fechaEntregaSolicitada').val();
           var muestraFecha = moment(fechaSolicitada).format('l'); 
           
           var valida = moment(fechaSolicitada).isAfter(ayer, 'day'); // true
           if (valida == true) {
                 $('#confirmaFecha').text(muestraFecha);
                 ocultarSlide('contenedorFecha');
                 $('#listaConfirmaInsumos').empty();
                 setTimeout(function ()
                  {
                     mostrarSlide('contenedorConfirma');
                  }, 400);
           }
           else{
             swal('Problemas!','La fecha ingresada no es valida','error');
           }

          });//fin SeleccionarFecha
          $("#btnVolverAFecha").click(function(){
            ocultarSlide('contenedorConfirma');
            setTimeout(function ()
            {
               mostrarSlide('contenedorFecha');
            }, 400);
          });
          $("#btnVolverACantidades").click(function(){
            ocultarSlide('contenedorDestinos');
            setTimeout(function ()
            {
               mostrarSlide('contenedorCantidades');
            }, 400);
          });

          $("#btnEnviarPedido").click(function(){

            var listaPedidosConfirmado = listaNuevosConfirmados;
            console.log(listaPedidosConfirmado);
            var mensaje = $("#txtMensaje").val();
            swal({
                   title: "Enviando información", 
                   text: "Por favor espere.", 
                   showCancelButton: false,
                   showConfirmButton: false
             });
            $.ajax({
                    url:'http://vientri.infovalue.com.ar/app/nuevo-pedido',
                      type: 'POST',
                      beforeSend: function (xhr) {
                          xhr.setRequestHeader ("Authorization", "Bearer"+token);
                      },
                      data: {
                              listaPedidosConfirmado : listaPedidosConfirmado,
                              idDestino : 'sucursal',
                              fechaSolicitada : fechaSolicitada,
                              idClienteV: idClienteV,
                              mensaje: mensaje
                          },
                          success: function(respuesta) {
                              //swal('Solicitud enviada', 'Podes ver el estado de tu pedido en tu historial.','success');
                              // swal.close();
                             
                              swal({
                                  title: "Solicitud enviada", 
                                  text: "Podes ver el estado de tu pedido en tu historial.",
                                  showCancelButton: false,
                                  type:'success',
                                  closeOnConfirm: false,
                                  confirmButtonText: 'Ir al menu',
                                }, function(isConfirm){
                                    if (isConfirm) {
                                      location.reload();
                                    } else {
                                     location.reload();
                                    }
                                  });
                          },//fin success
                          error: function (error) {
                              swal('Problemas','No se pudo completar el pedido.'+error,'error');
                           }
              });//fin ajax
          });//fin enviar pedido
      //historial solicitante
      $('#btnHistorialPedidosSolicitante').click(function () {
        swal({
                title:"Buscando información", 
                text: "Por favor espere.", 
                showCancelButton: false,
                showConfirmButton: false
          });
         var token = window.localStorage.getItem("token");
         $.ajax({
                 url:'http://vientri.infovalue.com.ar/app/historial-solicitante',
                   type: 'POST',
                   beforeSend: function (xhr) {
                       xhr.setRequestHeader ("Authorization", "Bearer"+token);
                   },
                   data: {token: token},
                   success: function(respuesta) {
                           swal.close();
                           for (var i = 0; i < respuesta.length; i++)
                           {

                            $('#conhistsolicitudes').append("<div class='conSolicitud' idSolicitud="+respuesta[i].id+"><div><img src='img/isolicitudhistorial.svg' style='width:20px;'></div><div style='margin-left:20px;width:200px;'><span class='nomDestino'>"+respuesta[i].destino+"</span><br><span class='fechaSoli'>"+respuesta[i].fechaEntregaSolicitada+"</span></div><div class='estsolic'><span>"+respuesta[i].estado+"</span></div></div>")
                           };
                            ocultarSlide('contenedorMenuSolicitante');
                             setTimeout(function () {
                               mostrarSlide('contenedorHistorialSolicitante');
                               $(".nombreUsuario").text(nombre);
                            }, 500);
                   },//fin success
                   error: function (error) {
                    swal('Problemas',error,'error');
                   }
           });//fin ajax

      });
      $(".btnvuelvemenu1").click(function(){
        location.reload();
      });
      $(document).on('click','.conSolicitud', function() {
        var idSolicitud = $(this).attr('idsolicitud');
        swal({
                title:"Buscando información", 
                text: "Por favor espere.", 
                showCancelButton: false,
                showConfirmButton: false
          });
         var token = window.localStorage.getItem("token");
         $.ajax({
            url:'http://vientri.infovalue.com.ar/app/historialPedido-solicitante',
              type: 'POST',
              beforeSend: function (xhr) {
                  xhr.setRequestHeader ("Authorization", "Bearer"+token);
              },
              data: {token: token, idSolicitud: idSolicitud},
              success: function(respuesta) {
                      swal.close();
                        ocultarSlide('contenedorHistorialSolicitante');
                        setTimeout(function () {
                          mostrarSlide('contenedorHistorialPedidoSolicitante');
                          $("#conTodosInfoPedido").empty();
                          for (var i = 0; i < respuesta.length; i++)
                          {   
                              var nombre = respuesta[i]['insumo'].substring(0,20);
                              var um = respuesta[i]['unidadMedidaInsumo'];
                              var cantidad = respuesta[i]['cantidadSolicitada'];
                              var destino =  respuesta[i]['destino2'];
                              var fecha =  respuesta[i]['fechaEntregaSolicitada'];
                              var mensaje = respuesta[i]['mensaje'];
                              $("#txtinfodestino").text(destino);
                              $("#txtinfofecha").text(fecha);
                              $("#txtmensajePedido").text(mensaje);



                             $("#conTodosInfoPedido").append("<div class='conNomInsumo'><div><b><span>"+nombre+"</span></b></div><div style='margin-left:20px;'><b><span>"+cantidad+' ('+um+')'+"</span></b></div></div>");
                          };
                       }, 500);
              },//fin success
              error: function (error) {
               swal('Problemas',error,'error');
              }
      });//fin ajax 

      });
    $("#btnVolverAHistorialSolicitante").click(function(){
       ocultarSlide('contenedorHistorialPedidoSolicitante');  
       
       setTimeout(function ()
       {
          mostrarSlide('contenedorHistorialSolicitante');
       }, 400);
     

    });
  });//fin onReady