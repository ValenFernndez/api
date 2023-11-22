const sql = require("../db/db.js");
// constructor
const Contenido = function (contenido) {
    this.nombre = contenido.nombre;
    this.sinopsis = contenido.sinopsis;
    this.url = contenido.url;
    this.url_imagen = contenido.url_imagen;
    this.año_lanzamiento = contenido.año_lanzamiento;
    this.duracion = contenido.duracion;
    this.restriccion_edad = contenido.restriccion_edad;
};

Contenido.create = (newContenido, result) => {
    sql.query("INSERT INTO contenidos SET ?", newContenido, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Contenido creado: ", { id: res.insertId, ...newContenido });
        result(null, { id: res.insertId, ...newContenido });
    });
};

Contenido.findById = (id, result) => {
    sql.query(`SELECT * FROM contenidos WHERE id_contenido  = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("contenido encontrada: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    });
};
Contenido.updateById = (id, contenido, result) => {
    sql.query(
        "UPDATE contenidos SET nombre = ?, sinopsis = ?, url = ?,lanzamiento= ?, duracion =?, restriccion_edad = ? WHERE id_contenido = ?",
        [contenido.nombre, contenido.sinopsis, contenido.url, contenido.lanzamiento, contenido.duracion, contenido.restriccion_edad, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("contenido actualizado: ", { id: id, ...contenido });
            result(null, { id: id, ...usuario });
        }
    );
};


Contenido.getAll = (result) => {
    let query = "SELECT * FROM contenidos";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("contenidos: ", res);
        result(null, res);
    });
};



Contenido.remove = (id, result) => {
    sql.query("DELETE FROM contenidos WHERE id_contenido = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Tutorial with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("contenido borrado id: ", id);
        result(null, res);
    });
};

Contenido.findByName = (name, result) => {
    sql.query(`SELECT * FROM contenidos WHERE nombre LIKE "%${name}%"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("contenidos encontrados: ", res);
            result(null, res);
            return;
        }

        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    });
};

module.exports = Contenido;