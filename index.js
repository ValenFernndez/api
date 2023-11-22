const express = require("express");
const cors = require ("cors");
const Usuarios = require('./controllers/usuario.controller.js');
const Contenidos = require('./controllers/contenido.controller.js');

require('dotenv').config();
const app = express();

app.use(cors());

app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

var port = process.env.PORT || 81 // puerto

//routes
app.get("/api/usuarios",Usuarios.list);
app.get("/api/usuarios/:id",Usuarios.getId);
app.post("/api/usuarios",Usuarios.create);
app.post("/api/usuarios/:id", Usuarios.update);
app.delete("/api/usuarios/:id", Usuarios.delete);
app.get("/api/contenidos",Contenidos.list);
app.get("/api/contenidos/:id",Contenidos.getId);
app.get("/api/contenidos/tag/:id", Contenidos.Tag);


app.listen(port);
console.log("Listening to api in port "+ port);