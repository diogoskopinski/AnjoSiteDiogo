var functions = require('firebase-functions');

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