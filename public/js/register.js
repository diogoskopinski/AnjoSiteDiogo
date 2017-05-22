var register = (function(){
	var emailAddress;

	var doRegisterWithEmailAndPassword = function (name, email, password) {
		emailAddress = email;
		firebase.auth().createUserWithEmailAndPassword(email, password).then(registerEvents.onSuccess, registerEvents.onError);
	}

	var getPathParameter = function() {
		var url = decodeURIComponent(window.location.href);
		var urlArray = url.split('/');
		return urlArray[urlArray.length - 1];
	};

	var registerIfUidExistsOnUrl = function (currentUid) {
		var uid = getPathParameter();
		if(uid){
			if(uid !== 'cadastro'){
				firebase.database().ref('convidados/' + currentUid ).set({
					uid_convidante : uid
				});	
			}			
		}
	}

	return {
		doRegisterWithEmailAndPassword : doRegisterWithEmailAndPassword,
		registerIfUidExistsOnUrl : registerIfUidExistsOnUrl
	}
})();

$(document).ready(function(){
	anjo.commonEvents();

	$('.do-register').on('click', function(){
		var name = $('#register-name').val();
		var email = $('#register-email').val();
		var password = $('#register-password').val();
		register.doRegisterWithEmailAndPassword(name, email, password);
		$('#login-email-password-modal').modal('close');
	});    
});