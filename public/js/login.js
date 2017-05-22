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
	}, loginEvents.onError );

	var doLoginWithFacebook = function(success, error){
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