const db = require("../models");
const Compra = db.Compra;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    // Validate request
    if (!req.body.ProveedorId) {
        res.status(400).send({
            message: "Debe ingresar el id de la mesa"
        });
        return;
    }
    // crea una Compra
    const compra = {
        ProveedorId:req.body.ProveedorId,
        // total: req.body.total ? req.body.total : 0,  // si quiero poner como condicional se usa de esta manera para establecer por defecto
        monto: req.body.monto,
        fecha: req.body.fecha
    };
    // Guardamos a la base de datos
    Compra.create(compra)
        .then(data => {
            console.log("se ha creado una Compra", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al guardar la Compra"
            });
        });
};

// encontrar por id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Compra.findByPk(id, {
        include: [
            {
                model: db.Proveedor, as: 'Proveedor'
                // ,include: [{model: db.Producto, as: 'Producto'}] si quisiera buscar algo mas adentro usaria eso
            }
        ]})
        .then(data => {
            console.log("se ha buscado una Compra", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err + ". Error al obtener Compra con id=" + id
            });
        });
};

// encontrar (de manera opcional cada uno) por ClienteId, UsuarioId
exports.findAll = (req, res) => {
    const proveedor_id = req.query.ProveedorId;
    const fecha_inicio = req.query.FechaInicio;
    const fecha_fin = req.query.FechaFin;

    var condition = null;

    if(proveedor_id){
        condition = { ProveedorId: proveedor_id };
    }
    if(fecha_inicio && fecha_fin){
        condition={fecha: {
            [Op.lte]: fecha_fin,
            [Op.gte]: fecha_inicio
          }
    }
}

    Compra.findAll({ include: [
            {
                model: db.Proveedor, as: 'Proveedor',
                // include: [{model: db.Producto, as: 'Producto'}]
            }],
        where: condition })
        .then(data => {
            console.log("se han buscado las Compras", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al obtener las Compras."
            });
        });
};

// actualizar cabecera
exports.update = (req, res) => {
    const id = req.params.id;
  
    Compra.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                console.log("se ha actualizado La Compra con id ", id);
                res.send({
                    message: "La Compra se ha actualizado correctamente."
                });
            } else {
                res.send({
                    message: `Ocurrió un error. No se pudo actualizar Cabecera con id= ${id}.!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error actualizando La Compra con id= " + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Compra.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                console.log("se ha borrado La Compra con id ", id);
                res.send({
                    message: "La Compra fue borrada correctamente!"
                });
            } else {
                res.send({
                    message: `Ocurrió un error. No se pudo borrar La Compra con id= ${id}.!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error borrando la categoría con id= " + id
            });
        });
};
