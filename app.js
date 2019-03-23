// Módulos

var express = require('express');
var app = express();
var fileUpload = require('express-fileupload');
app.use(fileUpload());
var mongo = require('mongodb');
var swig = require('swig');


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var gestorBD = require("./modules/gestorBD.js");
gestorBD.init(app,mongo)

app.use(express.static('public'));

// Variables
app.set('port', 8081);
app.set('db','mongodb://admin:admin@cluster0-shard-00-00-4h3lp.mongodb.net:27017,cluster0-shard-00-01-4h3lp.mongodb.net:27017,cluster0-shard-00-02-4h3lp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true');


//Rutas/controladores por lógica
require("./routes/rusuarios.js")(app, swig, gestorBD);
require("./routes/rcanciones.js")(app, swig, gestorBD);
// lanzar el servid
app.listen(app.get('port'), 8081, function() {
    console.log("Servidor activo");
});

