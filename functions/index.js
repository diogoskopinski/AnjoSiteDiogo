var functions = require('firebase-functions');
/*const cors = require('cors')({origin: true});

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
  subject: 	'test subject',
  text:    	'test text'
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
			console.log(req.body.name, req.body.email);
			send({
				to : ['paulo.sb@live.com','rangeldiretorcomercial@gmail.com','diogo.skopinski@gmail.com','danilopanta_@hotmail.com'],
				subject : req.body.subject,
				html : '<b>' + req.body.name + '</b><br>' + req.body.body
			});
			res.status(200).send('E-mail enviado com sucesso!');
		}
	});
});	 
*/

exports.increasePointsWhenRegisterPayment = functions.database.ref('pagamentos/{user}/{payment}').onWrite(event => {
	var dados = event.data;
	var convidadosReference = firebase.database().ref('convidados/' + event.params.user );	
	convidadosReference.on('value', function(convidado){
		if(convidado){
			var uid_convidante = convidado.val().uid_convidante;
			var pontosReference = firebase.database().ref('pontos/' + uid_convidante);
			pontosReference.on('value', function(pontos){
				pontos.val().pontos += dados.pontos;
				pontosReference.set({pontos : pontos});
			});	
		}
	});
});

exports.increasePointsWhenRegisterVersion = functions.database.ref('users/{user}').onWrite(event => {
	var dados = event.data;
	var version = dados.child('versao');
	if(version.changed()){

		var pontos;
		switch (version.val()) {
			case "basica":
				pontos = 0.20;
				break;
			default:
				pontos = false;
							 }

		if(pontos){
			var userUid = event.params.user;
			var convidadosReference = firebase.database().ref('convidados/' + userUid );
			var inviterUid;
			if(convidadosReference){
				convidadosReference.once('value').then(function(convidado){
					inviterUid = convidado.uid_convidante;
				});

				var pontosReference = firebase.database().ref('pontos/' + inviterUid);
				pontosReference.once('value',function(snapshot){
					pontos += snapshot.val().pontos; 
				});

				pontosReference.update({
					pontos: pontos
				});
			}
		}
	}
});