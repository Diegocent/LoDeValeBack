const db = require("../models");
const DescripcionProveedor = db.DescripcionProveedor;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    // Validate request
    if (!req.body.ProveedorId) {
        res.status(400).send({
            message: "Debe ingresar el id de la mesa"
        });
        return;
    }
    if (!req.body.ProductoId) {
        res.status(400).send({
            message: "Debe ingresar el id del cliente"
        });
        return;
    }
    // crea una descripcion_proveedor
    const descripcion_proveedor = {
        ProveedorId: req.body.ProveedorId,
        ProductoId: req.body.ProductoId,
        // total: req.body.total ? req.body.total : 0,  // si quiero poner como condicional se usa de esta manera para establecer por defecto
        precio_compra: req.body.precio_compra
    };
    // Guardamos a la base de datos
    DescripcionProveedor.create(descripcion_proveedor)
        .then(data => {
            console.log("se ha creado una descripcion_proveedor", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al guardar la descripcion_proveedor"
            });
        });
};

// encontrar por id
exports.findOne = (req, res) => {
    const id = req.params.id;
    DescripcionProveedor.findByPk(id, {
        include: [
            {
                model: db.Proveedor, as: 'Proveedor'
                // ,include: [{model: db.Producto, as: 'Producto'}] si quisiera buscar algo mas adentro usaria eso
            },
            {
                model: db.Producto, as: 'Producto'
            }
        ]})
        .then(data => {
            console.log("se ha buscado una descripcion_proveedor", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err + ". Error al obtener descripcion_proveedor con id=" + id
            });
        });
};

// encontrar (de manera opcional cada uno) por ProveedorId, ProductoId
exports.findAll = (req, res) => {
    const proveedor_id = req.query.ProveedorId;
    const producto_id = req.query.ProductoId;

    var condition = null;

    if(proveedor_id){
        condition = { ProveedorId: proveedor_id };
    }
    if(producto_id){
        condition = { ProductoId: producto_id };
    }

    if(proveedor_id && producto_id){
        condition = { [Op.and]: [ //esta operacion Op.and sirva para poner como condiciones del tipo "Y" se deben cumplir ambas
                {ProveedorId:  proveedor_id },
                {ProductoId:  producto_id },
            ]};
    }


    DescripcionProveedor.findAll({ include: [
            {
                model: db.Proveedor, as: 'Proveedor',
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
  
    DescripcionProveedor.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                console.log("se ha actualizado La descripcion con id ", id);
                res.send({
                    message: "La descripcion se ha actualizado correctamente."
                });
            } else {
                res.send({
                    message: `Ocurrió un error. No se pudo actualizar la descripcion con id con id= ${id}.!`
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
  
    DescripcionProveedor.destroy({ where: { id: id } })
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
