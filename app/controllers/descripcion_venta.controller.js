const db = require("../models");
const DescripcionVenta = db.DescripcionVenta;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    // Validate request
    if (!req.body.VentaId) {
        res.status(400).send({
            message: "Debe ingresar el id de la Venta"
        });
        return;
    }
    if (!req.body.ProductoId) {
        res.status(400).send({
            message: "Debe ingresar el id del Producto"
        });
        return;
    }
    // crea una descripcion_venta
    const descripcion_venta = {
        VentaId: req.body.VentaId,
        ProductoId: req.body.ProductoId,
        cantidad: req.body.cantidad,
        monto_unitario: req.body.monto_unitario,
        monto_total: req.body.monto_total
    };
    // Guardamos a la base de datos
    DescripcionVenta.create(descripcion_venta)
        .then(data => {
            console.log("se ha creado una descripcion_venta", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al guardar la descripcion_venta"
            });
        });
};

// encontrar por id
exports.findOne = (req, res) => {
    const id = req.params.id;
    DescripcionVenta.findByPk(id, {
        include: [
            {
                model: db.Venta, as: 'Venta'
                // ,include: [{model: db.Producto, as: 'Producto'}] si quisiera buscar algo mas adentro usaria eso
            },
            {
                model: db.Producto, as: 'Producto'
            }
        ]})
        .then(data => {
            console.log("se ha buscado una descripcion_venta", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err + ". Error al obtener descripcion_venta con id=" + id
            });
        });
};

// encontrar (de manera opcional cada uno) por VentaId, ProductoId
exports.findAll = (req, res) => {
    const venta_id = req.query.VentaId;
    const producto_id = req.query.ProductoId;

    var condition = null;

    if(venta_id){
        condition = { VentaId: venta_id };
    }
    if(producto_id){
        condition = { ProductoId: producto_id };
    }

    if(venta_id && producto_id){
        condition = { [Op.and]: [ //esta operacion Op.and sirva para poner como condiciones del tipo "Y" se deben cumplir ambas
                {VentaId:  venta_id },
                {ProductoId:  producto_id },
            ]};
    }


    DescripcionVenta.findAll({ include: [
            {
                model: db.Venta, as: 'Venta',
                // include: [{model: db.Producto, as: 'Producto'}]
            },
            {
                model: db.Producto, as: 'Producto'
            }],
        where: condition })
        .then(data => {
            console.log("se han buscado las cabeceras", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al obtener las Cabeceras."
            });
        });
};

// actualizar cabecera
exports.update = (req, res) => {
    const id = req.params.id;
  
    DescripcionVenta.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                console.log("se ha actualizado La descripcion con id ", id);
                res.send({
                    message: "La descripcion se ha actualizado correctamente."
                });
            } else {
                res.send({
                    message: `Ocurrió un error. No se pudo actualizar Cabecera con id= ${id}.!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error actualizando La descripcion con id= " + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
  
    DescripcionVenta.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                console.log("se ha borrado La descripcion con id ", id);
                res.send({
                    message: "La descripcion fue borrada correctamente!"
                });
            } else {
                res.send({
                    message: `Ocurrió un error. No se pudo borrar La descripcion con id= ${id}.!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error borrando la categoría con id= " + id
            });
        });
};
