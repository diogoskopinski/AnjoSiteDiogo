$(document).ready(function(){
    anjo.commonEvents();

	//Testes Diogo	
	/*$("#showFormPagSeguro").on("click", function(){
		listar();	
	});
	*/
	
	$("#saveFormPagSeguro").on("click", function(){
		var key = firebase.database().ref().push().key;	
		console.log('key cadastro: ' + key);

		var pagSeguroCadastro = {
			key: {
				NomeCompleto: 		$("#NomeCompleto").val(),
				NomeCompletoMae:	$("#NomeMae").val()
			}
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
	
	/*function listar(){
	
		$.get("https://ead-crud.firebaseio.com/clientes.json", function(json){
			var table = $("#table");
			$.each(json, function(i, e){
				var html = [];
				html.push("<tr>");
				html.push("  <td>" + e.uid + "</td>");
				html.push("  <td>" + e.nome + "</td>");
				html.push("</tr>");
				table.append(html.join(""));
			});
		});
	};
	*/
	  
});