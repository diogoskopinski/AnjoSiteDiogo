var idUsuario = null;
$(document).ready(function(){
    anjo.commonEvents();

	firebase.auth().onAuthStateChanged(function(user) {
	  	if (user) {
		    // User is signed in.
		    idUsuario = user.uid;

		     if(user.email != '') {
				$("#txtEmail").val(user.email);
				$("#txtEmail").focus();
			}

		    //console.log('a_L_12: ' + idUsuario);

			var usersReference = firebase.database().ref('users/' + idUsuario);

			usersReference.on('value', function(snapshot){
    			var snpU = snapshot.val();
				for(var u in snpU) {
					if(u == 'tipo_usuario' && (snpU[u] == 'A' || snpU[u] == 'G')) {
						//console.log('é igual admin ou gerente: ' + snpU[u]);
		    			$('#divInfDadosPagSeguro, #showFormPagSeguro').css('visibility', 'visible');
						//console.log('mostra botao usuario admin ou gerente');
					}

				}
			});


			var peopleReference = firebase.database().ref('people/' + idUsuario );
                        
	        peopleReference.on('value', function(snapshot){
	        	var snp = snapshot.val();
	    		for(var i in snp) {
	    			//console.log('i: ' + i + ' snp[i]: ' + snp[i]);
	    			if(i == 'fullname') {
	    				$("#txtNomeCompleto").focus();
	    				$("#txtNomeCompleto").val(snp[i]);
	    			}

	    			if(i == 'sexo') {
	    				if(snp[i] == 'homem'){
	    					$('#sexoM').attr('checked', true);
	    				} else {
	    					$('#sexoF').attr('checked', true);
						}
	    			}

	    			if(i == 'bairro') {
	    				$("#txtBairro").focus();
	    				$("#txtBairro").val(snp[i]);
	    			}

	    			if(i == 'nascimento') {
	    				$("#dtDataNascimento").focus();
	    				var data = snp[i];
	    				var dataFormatada = data.substr(8,2) + '/' + data.substr(5,2) + '/' +data.substr(0,4)
	    				$("#dtDataNascimento").val(dataFormatada);
	    			}

	    			if(i == 'cpf') {
	    				$("#txtCpf").focus();
	    				$("#txtCpf").val(snp[i]);
	    				$("#txtCpf").mask('999.999.999-99');
	    			}

	    			if(i == 'ddd') {
						$('#txtTelCelular').val(snp[i]);
	    			}

	    			if(i == 'telefone') {
	    				$('#txtTelCelular').focus();
						$('#txtTelCelular').val($('#txtTelCelular').val() + snp[i]);
						$('#txtTelCelular').mask('(99) 99999-9999');//Celular
	    			}
					
					if(i == 'cep') {
	    				$('#txtCep').focus();
						$('#txtCep').val(snp[i]);
						$('#txtCep').mask('99999-999'); //CEP 
	    			}

	    			if(i == 'rua') {
	    				$('#txtEndereco').focus();
						$('#txtEndereco').val(snp[i]);
	    			}

	    			if(i == 'numero') {
	    				$('#numNumero').focus();
						$('#numNumero').val(snp[i]);
	    			}

	    			if(i == 'estado') {
	    				var numEstado = snp[i];
	    				var estadoReference = firebase.database().ref('estados/' );

	    				estadoReference.on('value', function(snapshot){
		        			var snpE = snapshot.val();
		    				for(var j in snpE) {
		    					for(var k in snpE[j]) {
			    					if(snpE[j][k].id_estado == numEstado){
			    						$('#txtEstado').focus();
			    						$('#txtEstado').val(snpE[j][k].nome_estado);
			    					}
		    					}
		    				}
	    				});
	    			}

	    			if(i == 'cidade') {
	    				$('#txtCidade').focus();
						$('#txtCidade').val(snp[i]);
	    			}

	    			if(i == 'complemento') {
	    				$('#txtComplemento').focus();
						$('#txtComplemento').val(snp[i]);
	    			}
	    		}
	        });

	  	} else {
	    	// No user is signed in.
	    	console.log('b_L_18: ' + user);
	    	alert('É necessário o usuário logar no site!');
	    	window.location.href = 'pontos.html';
	    	return false;
	  	}
	});

	//Testes Diogo	
	$("#showFormPagSeguro").on("click", function(){
		$('.trInfPagSeguro').remove();
		console.log('chegou aqui L_6bbb p listar');
		listar();
	});
	

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
					//html.push("<tr class='trInfPagSeguro'>");
					//html.push("<th>");
					$('#thId').after("<td>" + i + "</td>");
					$('#thNome').after("<td>" + e.nomeCompleto + "</td>");
					$('#thNomeMae').after("<td>" + e.nomeCompletoMae + "</td>");
					$('#thSexo').after("<td>" + e.sexo + "</td>");
					$('#thCPF').after("<td>" + e.cpf + "</td>");
					$('#thTelResidencial').after("<td>" + e.telefoneResidencial + "</td>");
					$('#thTelCelular').after("<td>" + e.telefoneCelular + "</td>");
					$('#thCidade').after("<td>" + e.cidade + "</td>");
					$('#thEstado').after("<td>" + e.estado + "</td>");
					$('#thEndereco').after("<td>" + e.endereco + "</td>");
					$('#thNumero').after("<td>" + e.numero + "</td>");
					$('#thComplemento').after("<td>" + e.complemento + "</td>");
					$('#thBairro').after("<td>" + e.bairro + "</td>");
					$('#thCEP').after("<td>" + e.cep + "</td>");
					$('#thDtNascimento').after("<td>" + e.dataNascimento + "</td>");
					$('#thMaior').after("<td>" + bolMaior + "</td>");
					$('#thEmail').after("<td>" + e.email + "</td>");
					$('#thSenha').after("<td>" + e.senha + "</td>");
					$('#thDtCadastro').after("<td>" + e.dataCadastro + "</td>");
					//html.push("</tr>");
					//table.append(html.join(""));
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
					//html.push("<tr class='trInfPagSeguro'>");
					//html.push("  <td>" + e.uid + "</td>");
					$('#thId').after("<td>" + i + "</td>");
					$('#thNome').after("<td>" + e.nomeCompleto + "</td>");
					$('#thNomeMae').after("<td>" + e.nomeCompletoMae + "</td>");
					$('#thSexo').after("<td>" + e.sexo + "</td>");
					$('#thCPF').after("<td>" + e.cpf + "</td>");
					$('#thTelResidencial').after("<td>" + e.telefoneResidencial + "</td>");
					$('#thTelCelular').after("<td>" + e.telefoneCelular + "</td>");
					$('#thCidade').after("<td>" + e.cidade + "</td>");
					$('#thEstado').after("<td>" + e.estado + "</td>");
					$('#thEndereco').after("<td>" + e.endereco + "</td>");
					$('#thNumero').after("<td>" + e.numero + "</td>");
					$('#thComplemento').after("<td>" + e.complemento + "</td>");
					$('#thBairro').after("<td>" + e.bairro + "</td>");
					$('#thCEP').after("<td>" + e.cep + "</td>");
					$('#thDtNascimento').after("<td>" + e.dataNascimento + "</td>");
					$('#thMaior').after("<td>" + bolMaior + "</td>");
					$('#thEmail').after("<td>" + e.email + "</td>");
					$('#thSenha').after("<td>" + e.senha + "</td>");
					$('#thDtCadastro').after("<td>" + e.dataCadastro + "</td>");
					//html.push("</tr>");
					//table.append(html.join(""));
				});

				console.log('table: ' + table);
			});
		}
		

		console.log('chegou aqui L_55 p listar');

	};
	
	  
});