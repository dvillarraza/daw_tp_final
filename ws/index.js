var PORT=3000;
var express = require('express');
var app = express();
var mysql = require('./mysql');
app.use(express.json()); // para parsear application/json
app.use(express.static('.')); // para servir archivos estaticos

app.get('/devices', function(req, res, next) {
    var consulta = ""; //String para armar la consulta 
    
    //Segun el filtro se genera la consulta
    if (req.query.filter == 0){ //Devuelve todos los dispositivos
        consulta = "SELECT * FROM Devices";
    }
    if (req.query.filter == 1){ //Devuelve todas las lamparas
        consulta = "SELECT * FROM Devices WHERE type=0";
    }
    if (req.query.filter == 2){ //Devuelve todas las persianas
        consulta = "SELECT * FROM Devices WHERE type=1";
    }

    mysql.query(consulta, function(err, rta, field) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(rta);
    });
});

app.post('/devices', function(req, res, next) {

    console.log(req.body);

    st=0;
    if(req.body.state)
        st=1;

    id = req.body.id.split("_")[1]; // viene dev_xx

    mysql.query('UPDATE Devices SET state=? WHERE id=?', [st, id], function(err, rta, field) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(JSON.stringify(req.body));
    });
});


app.listen(PORT, function(req, res) {
    console.log("API funcionando en el puerto "+PORT);
});