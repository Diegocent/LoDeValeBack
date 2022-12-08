module.exports = app => {
    const venta = require("../controllers/venta.controller.js");
    var router = require("express").Router();
    router.post("/", venta.create);
    router.get("/", venta.findAll);
    router.get("/:id", venta.findOne);
    router.put('/:id', venta.update);
    router.delete('/:id', venta.delete);
    app.use('/api/venta', router);
};