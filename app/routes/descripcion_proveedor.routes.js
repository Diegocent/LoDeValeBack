module.exports = app => {
    const descripcion_proveedor = require("../controllers/descripcion_proveedor.controller.js");
    var router = require("express").Router();
    router.post("/", descripcion_proveedor.create);
    router.get("/", descripcion_proveedor.findAll);
    router.get("/:id", descripcion_proveedor.findOne);  
    router.put('/:id', descripcion_proveedor.update);
    router.delete('/:id', descripcion_proveedor.delete);
    app.use('/api/descripcion_proveedor', router);
};