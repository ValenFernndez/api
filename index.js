const express = require("express");
const cors = require ("cors");

const app = express();

var port = process.env.PORT || 81 // puerto

app.get('/', function(req, res) {
  res.json({ mensaje: '¡Hola Mundo!' })   
})


app.listen(port);
console.log("Listening to api in port "+ port);