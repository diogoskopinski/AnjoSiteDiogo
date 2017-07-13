$(document).ready(function(){
    anjo.commonEvents();

	//usuario = firebase.auth().currentUser;
	//console.log('L_7_usuario.uid: ' + usuario.uid);

	//if(usuario.uid == 'WfSo7LZgDEVtPPUx0c6cNHM7DLJ2') {

		//Testes Diogo	
		$("#showFormPagSeguro").on("click", function(){
			console.log('chegou aqui L_6bbb p listar');
			
			listar();
		});
	//} 
	
	/*validaListagem();

	function validaListagem(){
		var usuario = firebase.auth().currentUser;
		console.log('usuario: ' + usuario);

		//var idUsuario = usuario.uid;
		//console.log('L_7_usuario.uid: ' + idUsuario);

	}*/
	
	$("#saveFormPagSeguro").on("click", function(){
		var key = firebase.database().ref().push().key;	
		console.log('key cadastro: ' + key);

		var pagSeguroCadastro = {
			NomeCompleto: 		$("#NomeCompleto").val(),
			NomeCompletoMae:	$("#NomeMae").val()
		};
		

		console.log('pagSeguroCadastro_L_23: ' + pagSeguroCadastro);
/*Local	/
Dados	{ "pagSeguroDados": { "yLVzQhTJmENBbM5lX5fkgjN9zCi2": { "NomeCompleto": "Teste Diogo", "NomeMae": "Teste Mae 13:49" } } }
Autenticação	{ "provider": "google", "uid": "yLVzQhTJmENBbM5lX5fkgjN9zCi2" } */

		var updates = {};
		updates["pagSeguroDados" + "/" + key] = pagSeguroCadastro;

		console.log('pagSeguroCadastro_L_31: ' + updates["pagSeguroDados" + "/" + key]);
		
		firebase.database().ref().update(updates);
	
		alert("Registo salvo" );
		
		//listar();
		
	});
	
	function listar(){
	
		//databaseURL: "https://anjosite-65d1e.firebaseio.com",
		$.get("https://anjosite-65d1e.firebaseio.com/pagSeguroDados.json", function(json){
			var table = $("#tblDadosPagSeguro");
			$.each(json, function(i, e){
				var html = [];
				html.push("<tr>");
				//html.push("  <td>" + e.uid + "</td>");
				html.push("  <td>" + i + "</td>");
				html.push("  <td>" + e.NomeCompleto + "</td>");
				html.push("  <td>" + e.NomeCompletoMae + "</td>");
				html.push("</tr>");
				table.append(html.join(""));
			});

			console.log('table: ' + table);
		});

		console.log('chegou aqui L_55 p listar');

	};
	
	  
});