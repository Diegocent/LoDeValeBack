const db = require("../models");
const DescripcionCompra = db.DescripcionCompra;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    // Validate request
    if (!req.body.CompraId) {
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
    // crea una descripcion_compra
    const descripcion_compra = {
        CompraId: req.body.CompraId,
        ProductoId: req.body.ProductoId,
        cantidad: req.body.cantidad,
        monto_unitario: req.body.monto_unitario,
        monto_total: req.body.monto_total
    };
    // Guardamos a la base de datos
    DescripcionCompra.create(descripcion_compra)
        .then(data => {
            console.log("se ha creado una descripcion_compra", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al guardar la descripcion_compra"
            });
        });
};

// encontrar por id
exports.findOne = (req, res) => {
    const id = req.params.id;
    DescripcionCompra.findByPk(id, {
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
            console.log("se ha buscado una descripcion_compra", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err + ". Error al obtener descripcion_compra con id=" + id
            });
        });
};

// encontrar (de manera opcional cada uno) por CompraId, ProductoId
exports.findAll = (req, res) => {
    const compra_id = req.query.CompraId;
    const producto_id = req.query.ProductoId;

    var condition = null;

    if(compra_id){
        condition = { CompraId: compra_id };
    }
    if(producto_id){
        condition = { ProductoId: producto_id };
    }

    if(compra_id && producto_id){
        condition = { [Op.and]: [ //esta operacion Op.and sirva para poner como condiciones del tipo "Y" se deben cumplir ambas
                {CompraId:  compra_id },
                {ProductoId:  producto_id },
            ]};
    }


    DescripcionCompra.findAll({ include: [
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
  
    DescripcionCompra.update(req.body, { where: { id: id } })
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
  
    DescripcionCompra.destroy({ where: { id: id } })
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
