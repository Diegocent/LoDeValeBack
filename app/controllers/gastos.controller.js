const db = require("../models");
const Gastos = db.Gastos;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
        // crea una Gastos
    const gastos = {
        descripcion: req.body.descripcion,
        monto: req.body.monto,
        fecha: req.body.fecha,
    };
    // Guardamos a la base de datos
    Gastos.create(gastos)
        .then(data => {
            console.log("se ha creado una Gastos", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al guardar la Gastos"
            });
        });
};

// encontrar por id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Gastos.findByPk(id)
        .then(data => {
            console.log("se ha buscado una Gastos", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err + ". Error al obtener Gastos con id=" + id
            });
        });
};

// encontrar (de manera opcional cada uno) por VentaId, ProductoId
exports.findAll = (req, res) => {
    
    var condition = null;


    Gastos.findAll({
        where: condition })
        .then(data => {
            console.log("se han buscado las Gastoss", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al obtener las Gastoss."
            });
        });
};

// actualizar cabecera
exports.update = (req, res) => {
    const id = req.params.id;
  
    Gastos.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                console.log("se ha actualizado La Gastos con id ", id);
                res.send({
                    message: "La Gastos se ha actualizado correctamente."
                });
            } else {
                res.send({
                    message: `Ocurrió un error. No se pudo actualizar Cabecera con id= ${id}.!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error actualizando La Gastos con id= " + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Gastos.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                console.log("se ha borrado La Gastos con id ", id);
                res.send({
                    message: "La Gastos fue borrada correctamente!"
                });
            } else {
                res.send({
                    message: `Ocurrió un error. No se pudo borrar La Gastos con id= ${id}.!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error borrando la categoría con id= " + id
            });
        });
};
