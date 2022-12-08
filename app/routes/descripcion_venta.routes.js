module.exports = app => {
    const descripcion_venta = require("../controllers/descripcion_venta.controller.js");
    var router = require("express").Router();
    router.post("/", descripcion_venta.create);
    router.get("/", descripcion_venta.findAll);
    router.get("/:id", descripcion_venta.findOne);
    router.put('/:id', descripcion_venta.update);
    router.delete('/:id', descripcion_venta.delete);
    app.use('/api/descripcion_venta', router);
};