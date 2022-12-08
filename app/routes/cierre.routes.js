module.exports = app => {
    const cierre = require("../controllers/cierre.controller.js");
    var router = require("express").Router();
    router.post("/", cierre.create);
    router.get("/", cierre.findAll);
    router.get("/:id", cierre.findOne);
    router.put('/:id', cierre.update);
    app.use('/api/cierre', router);
};