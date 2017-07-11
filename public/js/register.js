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
    };

    var socialWithUid = false;

    return {
        doRegisterWithEmailAndPassword : doRegisterWithEmailAndPassword,
        registerIfUidExistsOnUrl : registerIfUidExistsOnUrl,
        socialWithUid : socialWithUid
    }
})();

$(document).ready(function(){
    anjo.commonEvents();

    $('.do-register').on('click', function(){
        var name = $('#register-name').val();
        var email = $('#register-email').val();
        var password = $('#register-password').val();
        register.doRegisterWithEmailAndPassword(name, email, password);
    });

    $('.do-register-google').on('click', function(){
        register.socialWithUid = true;
        login.doLoginWithGoogle(register.checkSocialLoginWithUid);
    });

    $('.do-register-facebook').on('click', function(){
        register.socialWithUid = true;
        login.doLoginWithFacebook(register.checkSocialLoginWithUid);
    });
	
//	var $ = require("jquery");

	//Testes Diogo	
	$("#showFormPagSeguro").on("click", function(){
		listar();	
	});
	
	$("#saveFormPagSeguro").on("click", function(){
		var key = firebase.database().ref().push().key;	
		console.log('key cadastro: ' + key);

		var pagSeguroCadastro = {
			uid: key,
			NomeCompleto: 	$("#NomeCompleto").val(),
			Telefone: 	  	$("#Telefone").val(),
			NomeMae:		$("#NomeMae").val()
		};
		
		var updates = {};
		updates["pagSeguroDados" + "/" + key] = pagSeguroCadastro;
		
		firebase.database().ref().update(updates);
	
		alert("Registo salvo" );
		
		//listar();
		
	});
	
	function listar(){
	
		$.get("https://ead-crud.firebaseio.com/clientes.json", function(json){
			var table = $("#table");
			$.each(json, function(i, e){
				var html = [];
				html.push("<tr>");
				html.push("  <td>" + e.uid + "</td>");
				html.push("  <td>" + e.nome + "</td>");
				html.push("</tr>");
				table.append(html.join(""));
			});
		});
	};	
	  
});