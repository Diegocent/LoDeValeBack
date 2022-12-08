const db = require("../models");
const Venta = db.Venta;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    // Validate request
    if (!req.body.ClienteId) {
        res.status(400).send({
            message: "Debe ingresar el id del cliente"
        });
        return;
    }
    if (!req.body.UsuarioId) {
        res.status(400).send({
            message: "Debe ingresar el id del usuario"
        });
        return;
    }
    // crea una venta
    const venta = {
        ClienteId: req.body.ClienteId,
        UsuarioId: req.body.UsuarioId,
        // total: req.body.total ? req.body.total : 0,  // si quiero poner como condicional se usa de esta manera para establecer por defecto
        monto: req.body.monto,
        fecha: req.body.fecha
    };
    // Guardamos a la base de datos
    Venta.create(venta)
        .then(data => {
            console.log("se ha creado una venta", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al guardar la venta"
            });
        });
};

// encontrar por id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Venta.findByPk(id, {
        include: [
            {
                model: db.Cliente, as: 'Cliente'
                // ,include: [{model: db.Producto, as: 'Producto'}] si quisiera buscar algo mas adentro usaria eso
            },
            {
                model: db.Usuario, as: 'Usuario'
            }
        ]})
        .then(data => {
            console.log("se ha buscado una venta", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err + ". Error al obtener venta con id=" + id
            });
        });
};

// encontrar (de manera opcional cada uno) por ClienteId, UsuarioId
exports.findAll = (req, res) => {
    const cliente_id = req.query.ClienteId;
    const usuario_id = req.query.UsuarioId;
    const fecha_inicio = req.query.FechaInicio;
    const fecha_fin = req.query.FechaFin;

    var condition = null;

    if(cliente_id){
        condition = { ClienteId: cliente_id };
    }
    if(usuario_id){
        condition = { UsuarioId: usuario_id };
    }

    if(cliente_id && usuario_id){
        condition = { [Op.and]: [ //esta operacion Op.and sirva para poner como condiciones del tipo "Y" se deben cumplir ambas
                {ClienteId:  cliente_id },
                {UsuarioId:  usuario_id },
            ]};
    }

    if(fecha_inicio && fecha_fin){
        condition={fecha: {
            [Op.lte]: fecha_fin,
            [Op.gte]: fecha_inicio
          }
    }
}

    Venta.findAll({ include: [
            {
                model: db.Cliente, as: 'Cliente',
                // include: [{model: db.Producto, as: 'Producto'}]
            },
            {
                model: db.Usuario, as: 'Usuario'
            }],
        where: condition })
        .then(data => {
            console.log("se han buscado las ventas", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al obtener las ventas."
            });
        });
};

// actualizar cabecera
exports.update = (req, res) => {
    const id = req.params.id;
  
    Venta.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                console.log("se ha actualizado La venta con id ", id);
                res.send({
                    message: "La venta se ha actualizado correctamente."
                });
            } else {
                res.send({
                    message: `Ocurrió un error. No se pudo actualizar Cabecera con id= ${id}.!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error actualizando La venta con id= " + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Venta.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                console.log("se ha borrado La venta con id ", id);
                res.send({
                    message: "La venta fue borrada correctamente!"
                });
            } else {
                res.send({
                    message: `Ocurrió un error. No se pudo borrar La venta con id= ${id}.!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error borrando la categoría con id= " + id
            });
        });
};
