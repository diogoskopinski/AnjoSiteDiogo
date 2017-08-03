$(document).ready(function () {
	$('#txtTelResidencial').mask('(00) 0000-0000'); //Telefone
	$('#txtTelCelular').mask('(00) 00000-0000');//Celular
	$('#txtCep').mask('00000-000'); //CEP 
	$('#txtCpf').mask('000.000.000-00'); //CPF 


console.log('L_8');
	$('#Clique3').click(function() { 
		console.log('L_9');
    	document.location = '#ancoraCartao';
    	$("#divTermoconteudoTodo").css('visibility', "visible");
	} );

console.log('L_14_visibility' + $("#divTermoconteudoTodo").css('visibility'));
 if($("#divTermoconteudoTodo").css('visibility') == "visible") {
 	document.location = '#ancoraCartao';
 	console.log('L_17_visibility' + $("#divTermoconteudoTodo").css('visibility'));
 };


	/*$( "#Clique3" ).click(function() {
	 	$("#escondido").css("display","block");
	  
  //  	document.location = '#ancoraCartao';
//    	 <a href="#modal1" id="Clique3"
    	 //$("#ancoraCartao").attr('href', '#ancoraCartao');
    	 $("#modal1").click();
   /* 	 $('a').attr({
   'title': 'Title modificado por jQuery',
   'href': 'http://www.desarrolloweb.com',
   'style': 'color: #f80'
}); 
   		console.log('L_23 ok ancora ?');
   		console.log('b: ' + $("#escondido").attr('href'));
	});
*/
	$( "#Clique4" ).click(function() {
		console.log('clique 4 !');
	});
});

 /*$(window).load(function () {
 	document.location = '#ancoraCartao';
 	console.log('load');
 	}); */

	$('#Clique3').click(function() { 
		console.log('L_9');
    	document.location = '#ancoraCartao';
	} );

/*
$(document.modal1).onload(function () {
	console.log('L_17 onLoad');
	document.location = '#ancoraCartao';
});
*/

 if($("#divTermoconteudoTodo").css('visibility') == "visible") {
 	document.location = '#ancoraCartao';
 	console.log('L_62_visibility' + $("#divTermoconteudoTodo").css('visibility'));
 };

console.log('L_8');
	/*$('#lblTesteDiogo').click(function() { 
		console.log('L_9');
    	document.location = '#ancoraCartao';
	} );

});
console.log('L_17');
	$('#lblTesteDiogo').click(function() { 
		console.log('L_19');
		$().load('#ancoraCartao');
    	//document.location = '#ancoraCartao';
    	console.log('L_21');
	});
*/

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

	if($('#maiorS').prop('checked') == false && $('#maiorN').prop('checked')) { 
		alert('Necessário marcar se é ou não Maior de 18 anos!');
		$('#maiorS').focus();
		return false;
	}

	if($('#txtCpf').val() == '') { 
		alert('Necessário preenchar p CPF !');
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
