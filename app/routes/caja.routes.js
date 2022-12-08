module.exports = app => {
    const caja = require("../controllers/caja.controller.js");
    var router = require("express").Router();
    router.post("/", caja.create);
    router.get("/", caja.findAll);
    router.get("/:id", caja.findOne);
    router.put('/:id', caja.update);
    router.delete('/:id', caja.delete);
    app.use('/api/caja', router);
};