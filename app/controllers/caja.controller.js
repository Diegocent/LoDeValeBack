const db = require("../models");
const Caja = db.Caja;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
        // crea una caja
    const caja = {
        numero: req.body.numero,
        en_caja: req.body.en_caja,
        // total: req.body.total ? req.body.total : 0,  // si quiero poner como condicional se usa de esta manera para establecer por defecto
        ingreso_diario: req.body.ingreso_diario,
        fecha: req.body.fecha,
    };
    // Guardamos a la base de datos
    Caja.create(caja)
        .then(data => {
            console.log("se ha creado una caja", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al guardar la caja"
            });
        });
};

// encontrar por id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Caja.findByPk(id, {
        include: [
            {
                model: db.Usuario, as: 'Usuario'
                // ,include: [{model: db.Producto, as: 'Producto'}] si quisiera buscar algo mas adentro usaria eso
            },
        ]})
        .then(data => {
            console.log("se ha buscado una caja", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err + ". Error al obtener caja con id=" + id
            });
        });
};

// encontrar (de manera opcional cada uno) por VentaId, ProductoId
exports.findAll = (req, res) => {
    Caja.findAll()
        .then(data => {
            console.log("se han buscado las cajas", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al obtener las cajas."
            });
        });
};

// actualizar cabecera
exports.update = (req, res) => {
    const id = req.params.id;
  
    Caja.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                console.log("se ha actualizado La caja con id ", id);
                res.send({
                    message: "La caja se ha actualizado correctamente."
                });
            } else {
                res.send({
                    message: `Ocurrió un error. No se pudo actualizar Cabecera con id= ${id}.!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error actualizando La caja con id= " + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Caja.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                console.log("se ha borrado La caja con id ", id);
                res.send({
                    message: "La caja fue borrada correctamente!"
                });
            } else {
                res.send({
                    message: `Ocurrió un error. No se pudo borrar La caja con id= ${id}.!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error borrando la categoría con id= " + id
            });
        });
};
