const db = require("../models");
const Usuario = db.Usuario;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.cedula) {
        res.status(400).send({
            message: "Debe ingresar el cedula de el Cliente!"
        });
        return;
    }
    if (!req.body.CajaId) {
        res.status(400).send({
            message: "Debe ingresar el id del Usuario"
        });
        return;
    }
    // crea un Usuario
    const usuario = {
        cedula: req.body.cedula,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        contraseña: req.body.contraseña,
        CajaId:req.body.CajaId
    };
    // Guardamos a la base de datos
    Usuario.create(usuario)
        .then(data => {
            console.log("se ha creado un usuario", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al guardar el usuario."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Usuario.findByPk(id)
        .then(data => {
            console.log("se ha buscado un Usuario", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener venta con id=" + id
            });
        });
};
exports.findOneCedula = (req, res) => {
    const cedula = req.params.cedula;
    Usuario.findAll({where: {cedula: cedula}})
        .then(data => {
            if (data.length===0) {
                console.log("se ha buscado un Usuario pero no existe");
                res.send(false);
            } else {
                console.log("se ha buscado un Usuario que sí existe", data);
                res.send(true);
            }
            
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener Usuario con cedula=" + cedula
            });
        });
};
exports.findAll = (req, res) => {
    const cedula = req.query.cedula;
    if (cedula) {
        Usuario.findAll({ include: [
            {
                model: db.Caja, as: 'Caja',
                // include: [{model: db.Producto, as: 'Producto'}]
            },
        ],
        where: {cedula: cedula} })
            .then(data => {
                console.log("se han buscado Usuarios", data);
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Ocurrio un error al obtener los Usuarios."
                });
            });
    } else {
        Usuario.findAll({ include: [
            {
                model: db.Caja, as: 'Caja',
                // include: [{model: db.Producto, as: 'Producto'}]
            },
        ]})
        .then(data => {
            console.log("se han buscado Usuarios", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener los Usuarios."
            });
        });
    }
};

exports.update = (req, res) => {
    const id = req.params.id;
  
    Usuario.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                console.log("se ha actualizado un Usuario con id", id);
                res.send({
                    message: "El Usuario se ha actualizado correctamente."
                });
            } else {
                res.send({
                    message: `Ocurrio un error. No se pudo actualizar Usuario con id= ${id}.!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error actualizando el Usuario con id= " + id
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;
  
    Usuario.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                console.log("se ha borrado el Usuario con id ", id);
                res.send({
                    message: "El Usuario fue borrado correctamente!"
                });
            } else {
                res.send({
                    message: `Ocurrió un error. No se pudo borrar el Usuario con id= ${id}.!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error borrando el Usuario con id= " + id
            });
        });
};