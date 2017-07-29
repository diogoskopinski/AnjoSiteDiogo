$(document).ready(function(){
    anjo.commonEvents();
});

function verificaLoginCartao(){
	firebase.auth().onAuthStateChanged(function(user) {
	  	if (user) {
			window.location.href = 'cadastroCartaoPagSeguro.html';
	  	} else {
	    	alert('É necessário o usuário logar no site!');
	    	return false;
	  	}
	});
}