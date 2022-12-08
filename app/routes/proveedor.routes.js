module.exports = app => {
    const proveedor = require("../controllers/proveedor.controller.js");
    var router = require("express").Router();
    router.post("/", proveedor.create);
    router.get("/", proveedor.findAll);
    router.get("/:id", proveedor.findOne);
    router.get("/ruc/:ruc", proveedor.findOneDocumento);
    router.put('/:id', proveedor.update);
    router.delete('/:id', proveedor.delete);
    app.use('/api/proveedor', router);
};