module.exports = app => {
    const descripcion_compra = require("../controllers/descripcion_compra.controller.js");
    var router = require("express").Router();
    router.post("/", descripcion_compra.create);
    router.get("/", descripcion_compra.findAll);
    router.get("/:id", descripcion_compra.findOne);
    router.put('/:id', descripcion_compra.update);
    router.delete('/:id', descripcion_compra.delete);
    app.use('/api/descripcion_compra', router);
};