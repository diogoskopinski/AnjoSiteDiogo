var contato = (function(){
	var sendMail = function(){
		var data = $('form').serializeArray();

		var success = function(){
			Materialize.toast('E-mail enviado com sucesso!' ,4000,'',function(){
				$('form').trigger('reset');
			});
		};

		var error = function(xhr){
			Materialize.toast(xhr.responseText ,4000,'');
		};

		if(!data){
			Materialize.toast('Preencha o formulario corretamente!' ,4000,'');
		} else {
			$.ajax({
				url : '/email',
    			crossDomain: true,
				type: 'POST',
				data : data,
				dataType: 'json',
				success : success,
				error : error
			});
		} 
	};

	return {
		sendMail : sendMail
	}
})();

$(document).ready(function(){
	anjo.commonEvents();

	$('.enviar-email-contato').on('click',function(){
		contato.sendMail();
	});
});