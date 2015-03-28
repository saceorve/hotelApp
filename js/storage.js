//Almacenamiento
var almacenamiento = {
    createReg: function(nom, id){
        window.localStorage.setItem('name',nom);
        window.localStorage.setItem('uuid',id);
    },
    isRegistered: function(){
        if(window.localStorage.getItem('uuid') != undefined && window.localStorage.getItem('uuid') != '')
            return true;
        else
            return false;
    },
    db: window.openDatabase("hotelApp", "1.0", "HotalApp", 200000),
    reservar: function(th,ha,pr,di){
        function populateDB(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS reservas (id, th, ha, pr, di)');
            tx.executeSql('INSERT INTO reservas (th, ha, pr ,di) VALUES ("'+th+'","'+ha+'","'+pr+'","'+di+'")');
        }

        function errorCB(err) {
            alert("Error processing SQL: "+err);
        }

        function successCB() {
            window.location.href = "#home";
            navigator.notification.alert('Reserva Guardada en espera de sincronización',null,'Guardado','Aceptar');
        }
        almacenamiento.db.transaction(populateDB, errorCB, successCB);
    },
    leerReservas: function(){
        function populateDB(tx){
            tx.executeSql("SELECT * FROM reservas",[],function(tx2,r){
                var l = r.rows.length;
                for(i=0;i<l;i++)
                    server.sendReserva(r.rows.item(i).th,r.rows.item(i).ha,r.rows.item(i).pr,r.rows.item(i).di);
            },function(err){
                alert('Error: '+err.code);
            });
        }
        function errorCB(err){
            alert('Error: '+err.code);
        }
        almacenamiento.db.transaction(populateDB, errorCB, null);
    },
    crearHistorial: function(th,ha,pr,di){
        function populateDB(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS historial (id, th, ha, pr, di, fecha)');
            var d = new Date();
            var fecha = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();
            tx.executeSql('INSERT INTO historial (th, ha, pr, di, fecha) VALUES ("'+th+'","'+ha+'","'+pr+'","'+di+'","'+fecha+'")');
        }

        function errorCB(err) {
            alert("Error processing SQL: "+err);
        }

        function successCB() {
            navigator.notification.alert('Su Historial se ha actualizado',null,'Historial','Aceptar');
            almacenamiento.borrarReservas();
        }
        almacenamiento.db.transaction(populateDB, errorCB, successCB);
    },
    leerHistorial: function(){
        function populateDB(tx){
            tx.executeSql("SELECT * FROM historial",[],function(tx2,r){
                var l = r.rows.length;
                var hist = $('#historial .ui-content').html('');
                for(i=0;i<l;i++){
                    hist.append('<details><summary>'+r.rows.item(i).fecha+'</summary><strong>Tipo Habitación:</strong> '+r.rows.item(i).th+'<br><strong>Habitaciones:</strong> '+r.rows.item(i).ha+'<br><strong>Personas:</strong> '+r.rows.item(i).pr+'<br><strong>Días:</strong> '+r.rows.item(i).di+'<br></details>');
                }
            },function(err){
                alert('Error: '+err.code);
            });
        }
        function errorCB(err){
            alert('Error: '+err.code);
        }
        almacenamiento.db.transaction(populateDB, errorCB, null);
    },
    borrarReservas: function(){
        function populateDB(tx) {
            tx.executeSql('DELETE from reservas');
        }
        function errorCB(err) {
            alert("Error eliminar reservas: "+err);
        }
        almacenamiento.db.transaction(populateDB, errorCB, null);
    }
};