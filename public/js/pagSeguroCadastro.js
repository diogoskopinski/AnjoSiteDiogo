var idUsuario = null;
$(document).ready(function(){
    anjo.commonEvents();

	firebase.auth().onAuthStateChanged(function(user) {
	  	if (user) {
		    // User is signed in.
		    
		    console.log('a_uid_L_10: ' + user.uid);
		    idUsuario = user.uid;

		    console.log('a_L_12: ' + idUsuario);

		    if(idUsuario == 'WfSo7LZgDEVtPPUx0c6cNHM7DLJ2'){
		    	console.log('é igual admin');
		    	$('#divInfDadosPagSeguro, #showFormPagSeguro').css('visibility', 'visible');
				coonsole.log('mostra botao usuario admin');
		    }

		    /*var name, email, photoUrl, uid;
			if (user != null) {
				name = user.displayName;
				email = user.email;
				photoUrl = user.photoURL;
				uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
				               // this value to authenticate with your backend server, if
				               // you have one. Use User.getToken() instead.
		        console.log('name: ' + name + '  - email: ' +  email + ' photoUrl: ' +photoUrl);
		        console.log('uid: ' + uid);
			} */

	  	} else {
	    	// No user is signed in.
	    	console.log('b_L_18: ' + user);
	    	alert('Necessário logar no site!');
	    	return false;
	  	}
	});

	//Testes Diogo	
	$("#showFormPagSeguro").on("click", function(){
		$('.trInfPagSeguro').remove();
		console.log('chegou aqui L_6bbb p listar');
		listar();
	});
	
	/*validaListagem();

	function validaListagem(){
		var usuario = firebase.auth().currentUser;
		console.log('usuario: ' + usuario);

		//var idUsuario = usuario.uid;
		//console.log('L_7_usuario.uid: ' + idUsuario);

	}*/
	
	
//var a = validarDadosCadastro();
//console.log('a: ' + a);



	$("#saveFormPagSeguro").on("click", function(){
		if(validarDadosCadastro()) {

			var key = firebase.database().ref().push().key;	
			console.log('key cadastro: ' + key);

			var strSexo = null;
			if($('#sexoM').prop('checked')) {
				strSexo = 'Masculino';
			} else if($('#sexoF').prop('checked')) {
				strSexo = 'Feminino';
			}

			var bolMaior = null;
			if($('#maiorS').prop('checked')) {
				bolMaior = true;
			} else if($('#maiorN').prop('checked')) {
				bolMaior = false;
			}

			var pagSeguroCadastro = {
				email: 				$("#txtEmail").val(),
				senha: 				$("#txtSenha").val(),
				nomeCompleto: 		$("#txtNomeCompleto").val(),
				sexo: 				strSexo,
				dataNascimento: 	$("#dtDataNascimento").val(),
				bolMaior:			bolMaior,
				cpf:				$("#txtCpf").val(),
				nomeCompletoMae:	$("#nomeCompletoMae").val(),
				telefoneResidencial:$("#txtTelResidencial").val(),
				telefoneCelular:   	$("#txtTelCelular").val(),
				cep:  				$("#txtCep").val(),
				endereco:  			$("#txtEndereco").val(),
				numero:  			$("#numNumero").val(),
				estado:  			$("#txtEstado").val(),
				cidade:  			$("#txtCidade").val(),
				bairro:  			$("#txtBairro").val(),
				complemento:  		$("#txtComplemento").val(),
				dataCadastro:  		formataDataAtual()
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
			
			$('.trInfPagSeguro').remove();
			listar(key);
		} else {
			return false;
		}
		
	});
	
	function listar(key){
		console.log('key listar: ' + key);
	
		//databaseURL: "https://anjosite-65d1e.firebaseio.com",
		if(key) {
			$.get("https://anjosite-65d1e.firebaseio.com/pagSeguroDados.json?orderBy=\"$value\"&startAt=\"key\"", function(json){
				var table = $("#tblDadosPagSeguro");
				console.log('Cheogu no filtro aaa key: ' + key);

				$.each(json, function(i, e){
					//console.log('i: ' + i + ' - e: '+e);

					var bolMaior = null;
					if(e.bolMaior) {
						bolMaior = 'Sim';
					} else if(e.bolMaior == false) {
						bolMaior = 'Não';
					}

					var html = [];
					html.push("<tr class='trInfPagSeguro'>");
					//html.push("  <td>" + e.uid + "</td>");
					html.push("  <td>" + i + "</td>");
					html.push("  <td>" + e.nomeCompleto + "</td>");
					html.push("  <td>" + e.nomeCompletoMae + "</td>");
					html.push("  <td>" + e.sexo + "</td>");
					html.push("  <td>" + e.cpf + "</td>");
					html.push("  <td>" + e.telefoneResidencial + "</td>");
					html.push("  <td>" + e.telefoneCelular + "</td>");
					html.push("  <td>" + e.cidade + "</td>");
					html.push("  <td>" + e.estado + "</td>");
					html.push("  <td>" + e.endereco + "</td>");
					html.push("  <td>" + e.numero + "</td>");
					html.push("  <td>" + e.complemento + "</td>");
					html.push("  <td>" + e.bairro + "</td>");
					html.push("  <td>" + e.cep + "</td>");
					html.push("  <td>" + e.dataNascimento + "</td>");
					html.push("  <td>" + bolMaior + "</td>");
					html.push("  <td>" + e.email + "</td>");
					html.push("  <td>" + e.senha + "</td>");
					html.push("  <td>" + e.dataCadastro + "</td>");
					html.push("</tr>");
					table.append(html.join(""));
				});

				console.log('table: ' + table);
			});
		} else {
			$.get("https://anjosite-65d1e.firebaseio.com/pagSeguroDados.json", function(json){
				var table = $("#tblDadosPagSeguro");

				if(key) {
					i = key;
					console.log('key: ' + key + ' i: '+i);
				}

				$.each(json, function(i, e){
					console.log('i: ' + i + ' - e: '+e);

					var bolMaior = null;
					if(e.bolMaior) {
						bolMaior = 'Sim';
					} else if(e.bolMaior == false) {
						bolMaior = 'Não';
					}

					var html = [];
					html.push("<tr class='trInfPagSeguro'>");
					//html.push("  <td>" + e.uid + "</td>");
					html.push("  <td>" + i + "</td>");
					html.push("  <td>" + e.nomeCompleto + "</td>");
					html.push("  <td>" + e.nomeCompletoMae + "</td>");
					html.push("  <td>" + e.sexo + "</td>");
					html.push("  <td>" + e.cpf + "</td>");
					html.push("  <td>" + e.telefoneResidencial + "</td>");
					html.push("  <td>" + e.telefoneCelular + "</td>");
					html.push("  <td>" + e.cidade + "</td>");
					html.push("  <td>" + e.estado + "</td>");
					html.push("  <td>" + e.endereco + "</td>");
					html.push("  <td>" + e.numero + "</td>");
					html.push("  <td>" + e.complemento + "</td>");
					html.push("  <td>" + e.bairro + "</td>");
					html.push("  <td>" + e.cep + "</td>");
					html.push("  <td>" + e.dataNascimento + "</td>");
					html.push("  <td>" + bolMaior + "</td>");
					html.push("  <td>" + e.email + "</td>");
					html.push("  <td>" + e.senha + "</td>");
					html.push("  <td>" + e.dataCadastro + "</td>");
					html.push("</tr>");
					table.append(html.join(""));
				});

				console.log('table: ' + table);
			});
		}
		

		console.log('chegou aqui L_55 p listar');

	};
	
	  
});