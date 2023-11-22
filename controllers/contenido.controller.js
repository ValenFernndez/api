const Contenido = require("../models/contenido.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "datos vacios!"
      });
    }
  
    const contenido = new Contenido({
      nombre: req.body.nombre,
      sinopsis : req.body.sinopsis,
      url : req.body.url,
      url_imagen : req.body.url_imagen,
      año_lanzamiento : req.body.año_lanzamiento,
      duracion : req.body.duracion,
      restriccion_edad : req.body.restriccion_edad
    });
  
    Contenido.create(contenido, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "error al crear contenido."
        });
      else res.send(data);
    });
  };

  exports.Tag = (req, res) => {
    Contenido.getTag(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Etiqueta no encontrada id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "error al buscar id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };
exports.list = (req, res) => {
    Contenido.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "error al buscar los contenidos."
        });
      else res.send({"status": 200, "data":data});
    });
  };
  exports.getId = (req, res) => {
    Contenido.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `contenido no encontrado id ${req.params.id}.`
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
  
    Contenido.updateById(
      req.params.id_contenido,
      new Contenido(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `contenido no encontrado id ${req.params.id_contenido}.`
            });
          } else {
            res.status(500).send({
              message: "error al actualizar contenido id " + req.params.id_contenido
            });
          }
        } else res.send(data);
      }
    );
  };
exports.delete = (req, res) => {
  Contenido.remove(req.params.id_contenido, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `contenido no encontrado id_contenido ${req.params.id_contenido}.`
        });
      } else {
        res.status(500).send({
          message: "no se puede borrar contenido, id_contenido " + req.params.id_contenido
        });
      }
    } else res.send({ message: `contenido borrado!` });
  });
};

