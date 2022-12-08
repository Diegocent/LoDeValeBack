module.exports = app => {
    const usuario = require("../controllers/usuario.controller.js");
    var router = require("express").Router();
    router.post("/", usuario.create); // crear usuario
    router.get("/", usuario.findAll); // encontrar usuario por nombre
    router.get("/:id", usuario.findOne); // encontrar usuario por id
    router.put('/:id', usuario.update); // actualizar usuario
    router.delete('/:id', usuario.delete);
    app.use('/api/usuario', router);
};
