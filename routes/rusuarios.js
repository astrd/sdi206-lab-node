module.exports = function(app, swig,gestorBD) {
    app.get("/identificarse", function(req, res) {
        var respuesta = swig.renderFile('views/bidentificacion.html', {});
        res.send(respuesta);
    });
    app.post("/identificarse", function(req, res) {
        var seguro = app.get("crypto").createHmac('sha256', app.get('clave'))
            .update(req.body.password).digest('hex');
        var criterio = {
            email : req.body.email,
            password : seguro
        }
        gestorBD.obtenerUsuarios(criterio, function(usuarios) {
            if (usuarios == null || usuarios.length == 0) {
                req.session.usuario = null;

                res.redirect("/identificarse" + "?mensaje=Email o password incorrecto"+ "&tipoMensaje=alert-danger ");
            } else {
                req.session.usuario = usuarios[0].email;
                res.redirect("/publicaciones");
            }
        });

    });
    app.get("/publicaciones", function(req, res) {
        var criterio = { autor : req.session.usuario };
        gestorBD.obtenerCanciones(criterio, function(canciones) {
            if (canciones == null) {
                res.send("Error al listar ");
            } else {
                var respuesta = swig.renderFile('views/bpublicaciones.html',
                    {
                        canciones : canciones
                    });
                res.send(respuesta);
            }
        });
    });
    app.get('/desconectarse', function (req, res) {
        req.session.usuario = null;
        res.send("Usuario desconectado");
    });
    app.get("/usuarios", function(req, res) {
        res.send("ver usuarios");
    });
    app.get("/registrarse", function(req, res) {
        var respuesta = swig.renderFile('views/bregistro.html', {});
        res.send(respuesta);
    });
    app.post('/usuario', function(req, res) {

        var requisito = {"email":req.body.email};

        gestorBD.obtenerUsuarios(requisito, function(usuarios) {
            if (usuarios.length>=0){
                res.send("Error al insertar ");
            }

            else {
                var seguro = app.get("crypto").createHmac('sha256', app.get('clave'))
                    .update(req.body.password).digest('hex');
                var usuario = {
                    email : req.body.email,
                    password : seguro
                }
                gestorBD.insertarUsuario(usuario, function(id) {
                    gestorBD.insertarUsuario(usuario, function(id) {
                        if (id == null){
                            res.send("Error al insertar ");
                            res.redirect("/registrarse?mensaje=Error al registrar usuario")
                        } else {
                            res.send('Usuario Insertado ' + id);
                            res.redirect("/identificarse?mensaje=Nuevo usuario registrado");
                        }
                    });

                });
            }
        });

    });

};
