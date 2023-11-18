const Usuario = require("../models/usuario.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "datos vacios!"
      });
    }
  
    const usuario = new Usuario({
      //id: req.body.id,
      nombre: req.body.nombre,
      estado: req.body.estado,
      plan: req.body.plan
    });
  
    Usuario.create(usuario, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "error al crear usuario."
        });
      else res.send(data);
    });
  };

exports.list = (req, res) => {
    Usuario.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "error al buscar los usuarios."
        });
      else res.send({"status": 200, "data":data});
    });
  };
  exports.getId = (req, res) => {
    Usuario.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `usuario no encontrado id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "error al buscar id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };
  
  exports.update = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "sin contenido!"
      });
    }
  
    console.log(req.body);
  
    Usuario.updateById(
      req.params.id_usuario,
      new Usuario(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `usuario no encontrado id ${req.params.id_usuario}.`
            });
          } else {
            res.status(500).send({
              message: "error al actualizar usuario id " + req.params.id_usuario
            });
          }
        } else res.send(data);
      }
    );
  };
exports.delete = (req, res) => {
  Usuario.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Usuario no encontrado id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "no se puede borrar Usuario, id " + req.params.id
        });
      }
    } else res.send({ message: `Usuario borrado!` });
  });
};

