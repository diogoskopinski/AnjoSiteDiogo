$(document).ready(function () {
	$('#txtTelResidencial').mask('(00) 0000-0000'); //Telefone
	$('#txtTelCelular').mask('(00) 00000-0000');//Celular
	$('#txtCep').mask('00000-000'); //CEP 
	$('#txtCpf').mask('000.000.000-00'); //CEP 

});

	function formataDataAtual(){
		var data = new Date();
		var dataFormatada = (("00" + data.getDate()).slice(-2) + "/" + 
			("00" + (data.getMonth() + 1)).slice(-2) + "/" + 
			data.getFullYear() + " " + 
			("00" + data.getHours()).slice(-2) + ":" + 
			("00" + data.getMinutes()).slice(-2) + ":" + 
			("00" + data.getSeconds()).slice(-2)
		);
		
		console.log('dataFormatada: ' +dataFormatada);
		return dataFormatada;
	}

	function validarDadosCadastro() {

		if($("#txtEmail").val() != $("#txtEmailConfirma").val()){
			alert('E-mail diferente com o E-mail de confirmação, favor verifique !');
			return false;
		}

		console.log('validarDadosCadastro  txtEmail: ' + txtEmail);

		if($("#txtSenha").val() != $("#txtSenhaConfirma").val()){
			alert('Senha diferente com a Senha de confirmação, favor verifique !');
			return false;
		}

		if($('#txtNomeCompleto').val() == '') { 
			alert('Necessário preenchar o Nome completo !');
			return false;
		}

		if( $('#sexoM').prop('checked') == false && $('#sexoF').prop('checked') == false ) {
			alert('Necessário escolher o Sexo!');
			return false;
		}

		if($('#dtDataNascimento').val() == '') { 
			alert('Necessário preenchar a Data de nascimento !');
			return false;
		}

		if($('#maiorS').prop('checked') == false && $('#maiorN').prop('checked')) { 
			alert('Necessário marcar se é ou não Maior de 18 anos!');
			return false;
		}

		if($('#txtCpf').val() == '') { 
			alert('Necessário preenchar p CPF !');
			return false;
		}

		if($('#txtCpf').val() == '') { 
			alert('Necessário preenchar p CPF !');
			return false;
		}

		if($('#nomeCompletoMae').val() == '') { 
			alert('Necessário preenchar o Nome completo da mãe !');
			return false;
		}

		if($('#txtTelResidencial').val() == '' && $('#txtTelCelular').val() ) { 
			alert('Necessário preencher algum telefone Residencial ou Celular!');
			return false;
		}

		if($('#txtCep').val() == '') { 
			alert('Necessário preenchar o CEP !');
			return false;
		}

		if($('#txtEndereco').val() == '') { 
			alert('Necessário preenchar o Endereço !');
			return false;
		}

		if($('#numNumero').val() == '') { 
			alert('Necessário preenchar o Número !');
			return false;
		}

		if($('#txtEstado').val() == '') { 
			alert('Necessário preenchar o Estado !');
			return false;
		}

		if($('#txtCidade').val() == '') { 
			alert('Necessário preenchar a Cidade !');
			return false;
		}

		if($('#txtBairro').val() == '') { 
			alert('Necessário preenchar o Bairro !');
			return false;
		}

		/*if($('#txtComplemento').val() == '') { 
			alert('Necessário preenchar o Estado !');
			return false;
		} */

		return true;
	}
