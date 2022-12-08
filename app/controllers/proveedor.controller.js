const db = require("../models");
const Proveedor = db.Proveedor;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // crea un Proveedor
    const proveedor = {
        ruc: req.body.ruc,
        empresa: req.body.empresa
    };
    // Guardamos a la base de datos
    Proveedor.create(proveedor)
        .then(data => {
            console.log("se ha creado un Proveedor", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al guardar el Proveedor."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Proveedor.findByPk(id)
        .then(data => {
            console.log("se ha buscado un Proveedor", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener venta con id=" + id
            });
        });
};
exports.findOneDocumento = (req, res) => {
    const ruc = req.params.ruc;
    Proveedor.findAll({where: {ruc: ruc}})
        .then(data => {
            if (data.length===0) {
                console.log("se ha buscado un Proveedor pero no existe");
                res.send(false);
            } else {
                console.log("se ha buscado un Proveedor que sí existe", data);
                res.send(true);
            }
            
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener Proveedor con cedula=" + ruc
            });
        });
};
exports.findAll = (req, res) => {
    const ruc = req.query.ruc;
    if (ruc) {
        Proveedor.findAll({ where: {ruc:ruc} })
            .then(data => {
                console.log("se han buscado Proveedors", data);
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Ocurrio un error al obtener los Proveedors."
                });
            });
    } else {
        Proveedor.findAll()
        .then(data => {
            console.log("se han buscado Proveedors", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener los Proveedors."
            });
        });
    }
};

exports.update = (req, res) => {
    const id = req.params.id;
  
    Proveedor.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                console.log("se ha actualizado un Proveedor con id", id);
                res.send({
                    message: "El Proveedor se ha actualizado correctamente."
                });
            } else {
                res.send({
                    message: `Ocurrio un error. No se pudo actualizar Proveedor con id= ${id}.!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error actualizando el Proveedor con id= " + id
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;
  
    Proveedor.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                console.log("se ha borrado el Proveedor con id ", id);
                res.send({
                    message: "El Proveedor fue borrado correctamente!"
                });
            } else {
                res.send({
                    message: `Ocurrió un error. No se pudo borrar el Proveedor con id= ${id}.!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error borrando el Proveedor con id= " + id
            });
        });
};