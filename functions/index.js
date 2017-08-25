var functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const cors = require('cors')({origin: true});

// Email config
var email		= 'paulo.sbx3@gmail.com';
var password	= 'govrsiboxaloliio';
var send = require('gmail-send')({
  user: 	email,									// Your GMail account used to send emails
  pass: 	password,								// Application-specific password
  to:   	email,									// Send back to yourself; 
													// you also may set array of recipients: 
													// [ 'user1@gmail.com', 'user2@gmail.com' ]
  from:   	'App Anjo',								// from: by default equals to use
// replyTo:'user@gmail.com'							// replyTo: by default undefined
  subject: 	'Teste envio cartaoPagSeguro - subject',
  text:    	'Teste envio cartaoPagSeguro - text'
// html:    '<b>html text text</b>'
});

exports.email = functions.https.onRequest((req, res) => {
	cors(req, res, () => {	
		if(req.body.name.length <= 0){
		   res.status(400).send('Nome não definido!');
		} else if(req.body.email.length <= 0){
			res.status(400).send('Email não definido!');		
		} else if(req.body.subject.length <= 0){		
			res.status(400).send('Assunto não definido!');
		} else if(req.body.body.length <= 0){
			res.status(400).send('Mensagem não definida!');
		} else {
			send({
				//to : ['paulo.sb@live.com','rangeldiretorcomercial@gmail.com','diogo.skopinski@gmail.com','danilopanta_@hotmail.com'],
				to : ['diogo.skopinski@gmail.com'],
				subject : req.body.subject,
				html : '<b>' + req.body.name + '</b><br>' + req.body.body
			});
			res.status(200).send('E-mail enviado com sucesso!');
		}
	});
});	 

exports.increasePointsWhenRegisterPayment = functions.database.ref('pagamentos/{user}/{payment}').onWrite(event => {
	var pagamento = event.data;
	var user = event.params.user;
	increasePoints(pagamento.valor, user);
	var convidante = getConvidante(user);
	if(convidante){
		switch (pagamento.versao) {
			case "life":
				pontos = 1;
				break;
			case "premium":
				pontos = 2;
				break;
			default:
				pontos = false;
		}
		increasePoints(pontos, convidante);
	}
});

exports.increasePointsWhenRegisterBasicVersion = functions.database.ref('users/{user}').onWrite(event => {
	var dados = event.data;
	var version = dados.child('versao');
	var user = event.params.user;
	var convidadosReference = admin.database().ref('convidados/' + user);
	convidadosReference.once('value').then(function(convidado){
		registerInviteList(convidado.val().uid_convidante, user);
	});
	
	if(version.changed() && convidadosReference){
		switch (version.val()) {
			case "basica":
				var pontos = 0.20;
				convidadosReference.once('value').then(function(convidado){
					var convidante = convidado.val().uid_convidante;
					increasePoints(pontos, convidante);
				});
				break;
			default:
				break;
		}
	}
});

var registerInviteList = function(convidante, user){
	admin.database().ref('users/' + user).once('value').then(function(snapshot){
		var convitesReference = admin.database().ref("convites/" + convidante + "/" + user).set({
			nome_convidado : snapshot.val().nome
		});
	});
}

var increasePoints = function(pontos, id){
	var pontosReference = admin.database().ref('pontos/' + id);
	pontosReference.once('value',function(snapshot){
		snapshot.val().pontos += pontos;
	});
};