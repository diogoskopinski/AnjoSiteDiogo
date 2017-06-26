var loginEvents = (function(){
	var onSuccess = function(){
		var user = firebase.auth().currentUser;
		$('.userName').html(user.displayName);
		$('.userEmail').html(user.email);
                
        var pontosReference = firebase.database().ref('pontos/' + user.uid );
                        
        pontosReference.on('value', function(snapshot){
            $('.userPoints').html(snapshot.val().pontos);
        });
        
		$('.login-button').html('Sair');
		$('#login-email-password-modal').modal('close');
        
        if(register.socialWithUid){
            register.registerIfUidExistsOnUrl(user.uid);
        }
	};

	var onError = function(){
		alert('Não foi possível realizar o login, verifique seus dados e tente novamente');
	};

	var onTokenError = function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;

		alert(errorCode + ' - ' + errorMessage);
	};

	var onLogout = function(){
		$('.userName').html('App Anjo');
		$('.userEmail').html('anjo@anjo.com.br');
        $('.userPoints').html('');
		$('.login-button').html('Entrar');
	};

	return{
		onSuccess : onSuccess,
		onError : onError,
		onTokenError : onTokenError,
		onLogout : onLogout
	}

})();