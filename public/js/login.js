var login = (function(){

	var doLoginWithEmailAndPassword = function (email, password) {
		firebase.auth().signInWithEmailAndPassword(email, password).catch(loginEvents.onError);
	};

	var doLoginWithToken = function(token){
		firebase.auth().signInWithCustomToken(token).catch(loginEvents.onTokenError); 
	}

	firebase.auth().onAuthStateChanged( function (user) {
		if (user) {
			loginEvents.onSuccess();
		} else {
			loginEvents.onLogout();
		}

		/*console.log('user.uid_login.js: ' + user);
		if(user = 'WfSo7LZgDEVtPPUx0c6cNHM7DLJ2') {
			$('#divInfDadosPagSeguro, #showFormPagSeguro').css({visibility : "visibility"});
			coonsole.log('mostra botao usuario admin');
		}*/
	}, loginEvents.onError );

	var doLoginWithFacebook = function(){
		var facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
		firebase.auth().signInWithPopup(facebookAuthProvider);
	};

	var doLoginWithGoogle = function(){
		var googleAuthProvider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(googleAuthProvider);
	};

	return {
		doLoginWithEmailAndPassword : doLoginWithEmailAndPassword,
		doLoginWithFacebook : doLoginWithFacebook,
		doLoginWithGoogle : doLoginWithGoogle
	}

})();