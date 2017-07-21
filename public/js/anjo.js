var anjo = (function(){
    var config = {
        apiKey: "AIzaSyCJEV7cgGJ8wLPKXw0WEIFbvemKwnQTMQI",
        authDomain: "appanjo-dbb06.firebaseapp.com",
        databaseURL: "https://appanjo-dbb06.firebaseio.com",
        projectId: "appanjo-dbb06",
        storageBucket: "appanjo-dbb06.appspot.com",
        messagingSenderId: "784789781173"
    };
    

	
	/*var config = {
		apiKey: "AIzaSyCC7uDq8p2qqH6tatr3Nye5ksbIpYuV-sM",
		authDomain: "anjosite-65d1e.firebaseapp.com",
		databaseURL: "https://anjosite-65d1e.firebaseio.com",
		projectId: "anjosite-65d1e",
		storageBucket: "",
		messagingSenderId: "939261382842"
	}; */
	
    firebase.initializeApp(config);

    var commonEvents = function(){
        $('.modal').modal();
        
        $('.login-button').on('click',function(){
            if(firebase.auth().currentUser){
                firebase.auth().signOut();
            }else{
                $('#login-email-password-modal').modal('open');     
            }
        });

        $('.do-login-facebook').on('click',function(){
            login.doLoginWithFacebook();
            $('#login-email-password-modal').modal('close');
        });

        $('.do-login-google').on('click',function(){
            login.doLoginWithGoogle();
            $('#login-email-password-modal').modal('close');
        });

        $('.do-login-email-password').on('click', function(){
            var email = $('#login-email').val();
            var password = $('#login-password').val();
            login.doLoginWithEmailAndPassword(email, password);
        });

        $('.do-close-modal').on('click', function(){
            $('#login-email-password-modal').modal('close');
        });

        $(".button-collapse").sideNav(); 
        $(".collapsible").collapsible();
    };

    return {
        commonEvents : commonEvents
    }

})();