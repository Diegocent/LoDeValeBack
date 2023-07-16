const db = require("../models");
const Cierre = db.Cierre;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    // Validate request
    if (req.body.UsuarioId == null) {
        res.status(400).send({
            message: "Debe ingresar el id del usuario"
        });
        return;
    }
    // crea una Cierre
    const cierre = {
        UsuarioId: req.body.UsuarioId,
        // total: req.body.total ? req.body.total : 0,  // si quiero poner como condicional se usa de esta manera para establecer por defecto
        monto_parcial: req.body.monto_parcial,
        monto_final: req.body.monto_final,
        en_caja: req.body.en_caja,
        fecha: req.body.fecha
    };
    // Guardamos a la base de datos
    Cierre.create(cierre)
        .then(data => {
            console.log("se ha creado un cierre ", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al guardar el cierre"
            });
        });
};

// encontrar por id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Cierre.findByPk(id, {
        include: [
            {
                model: db.Usuario, as: 'Usuario'
            }
        ]})
        .then(data => {
            console.log("se ha buscado un cierre", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err + ". Error al obtener cierre con id=" + id
            });
        });
};

// encontrar (de manera opcional cada uno) por ClienteId, UsuarioId
exports.findAll = (req, res) => {
    const usuario_id = req.query.UsuarioId;
    const fecha_inicio = req.query.FechaInicio;
    const fecha_fin = req.query.FechaFin;
    var condition = null;
    if(usuario_id){
        condition = { UsuarioId: usuario_id };
    }
    if(fecha_inicio && fecha_fin){
        condition={fecha: {
            [Op.lte]: fecha_fin,
            [Op.gte]: fecha_inicio
          }
        }
    }
    Cierre.findAll({ include: [
            {
                model: db.Usuario, as: 'Usuario'
            }],
        where: condition })
        .then(data => {
            console.log("se han buscado los cierres", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al obtener los cierres."
            });
        });
};

// actualizar cabecera
exports.update = (req, res) => {
    const id = req.params.id;
  
    Cierre.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                console.log("se ha actualizado el cierre con id ", id);
                res.send({
                    message: "El cierre se ha actualizado correctamente."
                });
            } else {
                res.send({
                    message: `Ocurrió un error. No se pudo actualizar Cabecera con id= ${id}.!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error actualizando El cierre con id= " + id
            });
        });
};
