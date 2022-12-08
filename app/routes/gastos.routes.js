module.exports = app => {
    const gastos = require("../controllers/gastos.controller.js");
    var router = require("express").Router();
    router.post("/", gastos.create);
    router.get("/", gastos.findAll);
    router.get("/:id", gastos.findOne);
    router.put('/:id', gastos.update);
    router.delete('/:id', gastos.delete);
    app.use('/api/gastos', router);
};