//Envío de datos al servidor
var server = {
    url: 'http://carlos.igitsoft.com/apps/test.php',
    sendData: function(nom,mail,tel,img){
        $.mobile.loading( 'show' );
        $.ajax({
            method: "POST",
            url: server.url,
            data: { nom: nom, mail: mail, tel: tel }
        }).done(function( msg ) {
            if(msg == 1)
                transfer.imgUpload(img);
        });
    },
    sendReserva: function(th,ha,pr,di){
        $.mobile.loading( 'show' );
        $.ajax({
            method: "POST",
            url: server.url,
            data: { tipo: th, ha: ha, pr: pr, di: di }
        }).done(function( msg ) {
            if(msg == 1){
               $.mobile.loading( 'hide' ); almacenamiento.crearHistorial(th,ha,pr,di);
                window.location.href = '#home';
                
            }
        });
    }
};