$(document).ready(function () {
	$('#txtTelResidencial').mask('(00) 0000-0000'); //Telefone
	$('#txtTelCelular').mask('(00) 00000-0000');//Celular
	$('#txtCep').mask('00000-000'); //CEP 
	$('#txtCpf').mask('000.000.000-00'); //CPF 


	$('#Clique3').click(function() { 
		//console.log('L_9');
    	document.location = '#ancoraCartao';
	} );

//console.log('L_14_visibility' + $("#divTermoconteudoTodo").css('visibility'));
 if($("#divTermoconteudoTodo").css('visibility') == "visible") {
 	document.location = '#ancoraCartao';
 };


//ancora posiciona texto nos termos do cartão alimentação: 
$('#CliqueCartaoAlimentacacao').click(function() { 
    	document.location = '#ancoraCartaoAlimentação';
} );

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
		$('#txtEmailConfirma').focus();
		return false;
	}

	console.log('validarDadosCadastro  txtEmail: ' + txtEmail);

	if($("#txtSenha").val() != $("#txtSenhaConfirma").val()){
		alert('Senha diferente com a Senha de confirmação, favor verifique !');
		$('#txtSenhaConfirma').focus();
		return false;
	}

	if($('#txtNomeCompleto').val() == '') { 
		alert('Necessário preenchar o Nome completo !');
		$('#txtNomeCompleto').focus();
		return false;
	}

	if( $('#sexoM').prop('checked') == false && $('#sexoF').prop('checked') == false ) {
		alert('Necessário escolher o Sexo!');
		$('#sexoM').focus();
		return false;
	}

	if($('#dtDataNascimento').val() == '') { 
		alert('Necessário preenchar a Data de nascimento !');
		return false;
	}

	if($('#maiorS').prop('checked') == false && $('#maiorN').prop('checked') == false) { 
		alert('Necessário marcar se é ou não Maior de 18 anos!');
		$('#maiorS').focus();
		return false;
	}

	if($('#txtCpf').val() == '') { 
		alert('Necessário preenchar o CPF !');
		$('#txtCpf').focus();
		return false;
	}

	if($('#nomeCompletoMae').val() == '') { 
		alert('Necessário preenchar o Nome completo da mãe !');
		$('#nomeCompletoMae').focus();
		return false;
	}

	if($('#txtTelResidencial').val() == '' && $('#txtTelCelular').val() == '') { 
		alert('Necessário preencher algum telefone Residencial ou Celular!');
		$('#txtTelCelular').focus();
		return false;
	}

	if($('#txtCep').val() == '') { 
		alert('Necessário preenchar o CEP !');
		$('#txtCep').focus();
		return false;
	}

	if($('#txtEndereco').val() == '') { 
		alert('Necessário preenchar o Endereço !');
		$('#txtEndereco').focus();
		return false;
	}

	if($('#numNumero').val() == '') { 
		alert('Necessário preenchar o Número !');
		$('#numNumero').focus();
		return false;
	}

	if($('#txtEstado').val() == '') { 
		alert('Necessário preenchar o Estado !');
		$('#txtEstado').focus();
		return false;
	}

	if($('#txtCidade').val() == '') { 
		alert('Necessário preenchar a Cidade !');
		$('#txtCidade').focus();
		return false;
	}

	if($('#txtBairro').val() == '') { 
		alert('Necessário preenchar o Bairro !');
		$('#txtBairro').focus();
		return false;
	}

	/*if($('#txtComplemento').val() == '') { 
		alert('Necessário preenchar o Estado !');
		return false;
	} */

	return true;
}



function validarDadosCadastroAlimentacao() {
	//console.log('L_206_validarDadosCadastroAlimentacao  ');

	//console.log('L_208: ' + $('#rdConcordaTermoAlimentacao').prop('checked'));
	if($('#rdConcordaTermoAlimentacao').prop('checked')  == false){
		alert('Necessário concordar com os Termos!');
		$('#rdConcordaTermoAlimentacao').focus();
		return false;
	}

	if($('#txtNomeCompleto').val() == '') { 
		alert('Necessário preenchar o Nome completo !');
		$('#txtNomeCompleto').focus();
		return false;
	}

	if($('#maiorS').prop('checked') == false && $('#maiorN').prop('checked') == false ) { 
		alert('Necessário marcar se é ou não Maior de 18 anos!');
		$('#maiorS').focus();
		return false;
	}

	if($('#txtCpf').val() == '') { 
		alert('Necessário preenchar o CPF !');
		$('#txtCpf').focus();
		return false;
	}

	if($('#txtRG').val() == '') { 
		alert('Necessário preenchar o RG !');
		$('#txtRG').focus();
		return false;
	}

	if($('#txtTelCelular').val() == '') { 
		alert('Necessário preencher o telefone Celular!');
		$('#txtTelCelular').focus();
		return false;
	}

	if($('#txtCep').val() == '') { 
		alert('Necessário preenchar o CEP !');
		$('#txtCep').focus();
		return false;
	}

	if($('#txtEndereco').val() == '') { 
		alert('Necessário preenchar o Endereço !');
		$('#txtEndereco').focus();
		return false;
	}

	if($('#numNumero').val() == '') { 
		alert('Necessário preenchar o Número !');
		$('#numNumero').focus();
		return false;
	}

	if($('#txtEstado').val() == '') { 
		alert('Necessário preenchar o Estado !');
		$('#txtEstado').focus();
		return false;
	}

	if($('#txtCidade').val() == '') { 
		alert('Necessário preenchar a Cidade !');
		$('#txtCidade').focus();
		return false;
	}

	if($('#txtBairro').val() == '') { 
		alert('Necessário preenchar o Bairro !');
		$('#txtBairro').focus();
		return false;
	}

	return true;
}
