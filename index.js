const express = require("express");
const cors = require ("cors");
const Usuarios = require('./controllers/usuario.controller.js');

const app = express();

app.use(cors());

app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

var port = process.env.PORT || 81 // puerto

app.get('/', function(req, res) {
  res.json({ mensaje: '¡Hola Mundo!' })   
})

//routes
app.get("/usuarios",Usuarios.list);


app.listen(port);
console.log("Listening to api in port "+ port);