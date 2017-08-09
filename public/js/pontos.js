$(document).ready(function(){
    anjo.commonEvents();
});

function verificaLoginCartao(){
	//alert('aa0 - verificaLoginCartao');

	firebase.auth().onAuthStateChanged(function(user) {
	  	if (user) {
			window.location.href = 'cadastroCartaoPagSeguro.html';
	  	} else {
	    	alert('É necessário o usuário logar no site!');
	    	return false;
	  	}
	});
}

function verificaLoginCartaoAlimentacao(){
	//alert('L_19 - aa - 1 - verificaLoginCartaoAlimentacao');

	firebase.auth().onAuthStateChanged(function(user) {
		//console.log('L_17_verificaLoginCartaoAlimentacao: ' + user);

	  	if (user) {
			window.location.href = 'cadastroCartaoAlimentacao.html';
	  	} else {
	    	alert('É necessário o usuário logar no site!');
	    	return false;
	  	}
	});
}

