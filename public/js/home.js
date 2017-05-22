$(document).ready(function(){
    anjo.commonEvents();
	
	var pontosDoadosRef = firebase.database().ref('doacoes/'); 

    pontosDoadosRef.on('value', function(doacoes){
        $('#doacoes-pontos').html(doacoes.child('pontos_doados').val());
        $('#doacoes-quantidade').html(doacoes.child('quantidade_doacoes').val());
    });

  $('.parallax').parallax();

});