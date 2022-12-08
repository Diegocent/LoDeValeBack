module.exports = app => {
    const compra = require("../controllers/compra.controller.js");
    var router = require("express").Router();
    router.post("/", compra.create);
    router.get("/", compra.findAll);
    router.get("/:id", compra.findOne);
    router.put('/:id', compra.update);
    router.delete('/:id', compra.delete);
    app.use('/api/compra', router);
};