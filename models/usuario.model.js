const sql = require("../db/db.js");

// constructor
const Usuario = function (usuario) {
    this.nombre = usuario.nombre;
    this.email = usuario.email;
    this.password = usuario.password;
    this.plan = usuario.plan;
    this.estado = usuario.estado;
};

Usuario.create = (newUsuario, result) => {
    sql.query("INSERT INTO usuarios SET ?", newUsuario, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("usuario creado: ", { id: res.insertId, ...newUsuario });
        result(null, { id: res.insertId, ...newUsuario });
    });
};

Usuario.findById = (id_usuario, result) => {
    sql.query(`SELECT * FROM usuarios WHERE id_usuario = ${id_usuario}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("usuario encontrada: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    });
};
Usuario.updateById = (id, usuario, result) => {
    
    sql.query(
        "UPDATE usuarios SET nombre = ?, email = ?, password = ?, estado = ?, plan = ? WHERE id_usuario = ?",
        [usuario.nombre, usuario.email, usuario.password,usuario.estado, usuario.plan, id],
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

            console.log("usuario actualizado: ", { id: id, ...usuario });
            result(null, { id: id, ...usuario });
        }
    );
    console.log("salio")
};


Usuario.getAll = (result) => {
    let query = "SELECT * FROM usuarios";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("usuarios: ", res);
        result(null, res);
    });
};



Usuario.remove = (id, result) => {
    sql.query("DELETE FROM usuarios WHERE id_usuario = ?", id, (err, res) => {
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

        console.log("usuario borrado id: ", id);
        result(null, res);
    });
};

module.exports = Usuario;