// Módulos
var express = require('express');
var app = express();
var swig = require('swig');


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// Variables
app.set('port', 8081);

//Rutas/controladores por lógica
//Rutas/controladores por lógica
require("./routes/rusuarios.js")(app, swig);
require("./routes/rcanciones.js")(app, swig);
require("./routes/rusuarios.js")(app); // (app, param1, param2, etc.)
require("./routes/rcanciones.js")(app); // (app, param1, param2, etc.)
// lanzar el servid
app.listen(app.get('port'), 8081, function() {
    console.log("Servidor activo");
});

mongodb://admin:admin@cluster0-shard-00-00-4h3lp.mongodb.net:27017,cluster0-shard-00-01-4h3lp.mongodb.net:27017,cluster0-shard-00-02-4h3lp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true