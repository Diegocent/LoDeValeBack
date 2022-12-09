const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();


const db = require("./app/models");

db.sequelize.sync();

// //desarrollo
// var corsOptions = {

//     origin: "http://localhost:4200"

// };
//produccion
var corsOptions = {

    origin: "http://lodevale-app.s3-website-us-east-1.amazonaws.com"

};

app.use(cors(corsOptions));

// parse requests of content-type - application/json

app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: true }));

// simple route

app.get("/", (req, res) => {

    res.json({ message: "Este es el sistema LodeVale" });

});

// set port, listen for requests

const PORT = process.env.PORT || 9090;

require("./app/routes/cliente.routes")(app);
require("./app/routes/producto.routes")(app);
require("./app/routes/caja.routes")(app);
require("./app/routes/descripcion_proveedor.routes")(app);
require("./app/routes/descripcion_venta.routes")(app);
require("./app/routes/gastos.routes")(app);
require("./app/routes/proveedor.routes")(app);
require("./app/routes/usuario.routes")(app);
require("./app/routes/venta.routes")(app);
require("./app/routes/compra.routes")(app);
require("./app/routes/descripcion_compra.routes")(app);
require("./app/routes/cierre.routes")(app);




app.listen(PORT, () => {

    console.log('Servidor corriendo en puerto 9090.');

});
