var registerEvents = (function(){
	var onSuccess = function () {
		
		var user = firebase.auth().currentUser;		
		if(user) {
			register.registerIfUidExistsOnUrl(user.uid);
			var registerName = $('#register-name').val();
			user.updateProfile({
				displayName: registerName
			}).then(function(){
				Materialize.toast('Cadastro realizado com sucesso, seja bem vindo ao App Anjo!' ,4000,'',function(){
                    window.location.href = "/index";
                });
			});			
		}
	};

	var onError = function (error) {
		var title;
		var message;
		switch (error.code) {
			case 'auth/email-already-in-use':
				title = 'E-EMAIL JÁ EXISTE';
				message = 'Este e-mail já está cadastrado.';
				break;
			case 'auth/invalid-email':
				title = 'E-EMAIL INVÁLIDO';
				message = 'Este e-mail é inválido.';
				break;
			case 'auth/weak-password':
				title = 'SENHA FRACA';
				message = 'Sua senha deve ter pelo menos 6 caracteres.';
				break;

			default:
				title = 'OPS, ALGO INESPERADO';
				message = 'Houve algo inesperado.';
						  }
		alert( title + "\n\n" + message );
	}

	return {
		onSuccess : onSuccess,
		onError : onError
	}
})();