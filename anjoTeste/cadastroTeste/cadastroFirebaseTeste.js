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
	
	//var $ = require("jquery");

	//Testes Diogo	
	$("#showFormPagSeguro").on("click", function(){
		listar();	
	});
	
	$("#saveFormPagSeguro").on("click", function(){
		var key = firebase.database().ref().push().key;	
		var contato = {
			uid: key,
			nome: $("#name").val()
		};	
		
		var updates = {};
		updates["clientes" + "/" + key] = contato;
		
		firebase.database().ref().update(updates);
	
		alert("Registo salvo" );
		
		listar();
		
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

 <div class="input-field col s6">
                  <i class="material-icons prefix">account_circle</i>
                  <input id="NomeCompleto" name="NomeCompleto" type="text" class="validate">
                  <label for="icon_prefix">Nome Completo</label>
                </div>

                <div class="input-field col s6">
                  <i class="material-icons prefix">phone</i>
                  <input id="Telefone" name="Telefone" type="tel" class="validate">
                  <label for="icon_telephone">Telefone</label>
                </div>

                <div class="input-field col s6">
                  <i class="material-icons prefix">account_circle</i>
                  <input id="NomeMae" name="NomeMae" type="text" class="validate">
                  <label for="icon_prefix">Nome Completo da Mãe</label>
                </div>

				

pagSeguroDados {
	uid -> id do cliente  *
	NomeCompleto   	*
	NomeMae   		*
	Telefone		*
	idade
	menorNome
	Endereco {
		Rua
		UF
		bairro
		cep
		complemento
		municipio
		numero_rua
	}
}

{

    "ObjetoPai":[
        {
            "ObjetoFilho":"valor"
        },
        {
            "ObjetoFilho":"valor"
        }
    ]

}


{
	"pagSeguroDados":
	{
		"uid": 			"1234",
		"NomeCompleto": "Diogo Tess aaa",
		"NomeMae":		"Mae teserw 13:43hrs",
		"Telefone":		"51 8499849",
		"idade":		"34",
	}
}


{
  "pagSeguroDados": {
    "uid":            "yLVzQhTJmENBbM5lX5fkgjN9zCi2",
    "NomeCompleto": "Teste Diogo",
    "NomeMae":      "Teste Mae 13:49",
    "Telefone":     "51 6987987489",
    "idade":        "34"
  }
}

WfSo7LZgDEVtPPUx0c6cNHM7DLJ2


yLVzQhTJmENBbM5lX5fkgjN9zCi2


{
  "pagSeguroDados": {
    "uid":				"WfSo7LZgDEVtPPUx0c6cNHM7DLJ2",
    "NomeCompleto": 	"Teste Diogo",
    "NomeMae":      	"Teste Mae 13:49",
    "Telefone":     	"51 6987987489",
    "idade":        	"34"
  }
}


ID do cliente da Web

939261382842-vob24qr5bdnk9o6u0b58qht3iiuif7nj.apps.googleusercontent.com
Chave secreta do cliente da Web
AyTT9RLxrmIImIpoUQpJ38uG
