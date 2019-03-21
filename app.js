// Módulos
var express = require('express');
var app = express();
// Variables
app.set('port', 8081);

app.get('/usuarios', function(req, res) {
    console.log("Depurar aquó");
    res.send('ver usuarios');
});
app.get('/canciones', function(req, res) {
    res.send('ver canciones');
});
// lanzar el servid
app.listen(app.get('port'), 8081, function() {
    console.log("Servidor activo");
});