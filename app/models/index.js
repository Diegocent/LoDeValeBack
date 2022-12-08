const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {

    host: dbConfig.HOST,

    dialect: dbConfig.dialect,

    operatorsAliases: false,

    pool: {

        max: dbConfig.pool.max,

        min: dbConfig.pool.min,

        acquire: dbConfig.pool.acquire,

        idle: dbConfig.pool.idle

    }

});

const db = {};

db.Sequelize = Sequelize;

db.sequelize = sequelize;

// aqui estan los modelos para los elementos utilizados
db.Usuario = require("./usuario.model.js")(sequelize, Sequelize);
db.Caja = require("./caja.model.js")(sequelize, Sequelize);
db.DescripcionProveedor = require("./descripcion_proveedor.model.js")(sequelize, Sequelize);
db.DescripcionVenta = require("./descripcion_venta.model.js")(sequelize, Sequelize);
db.Cliente = require("./cliente.model.js")(sequelize, Sequelize);
db.Producto = require("./producto.model.js")(sequelize, Sequelize);
db.Proveedor = require("./proveedor.model.js")(sequelize, Sequelize);
db.Venta = require("./venta.model.js")(sequelize, Sequelize);
db.gastos = require("./gastos.model.js")(sequelize, Sequelize);
db.Compra = require("./compra.model.js")(sequelize, Sequelize);
db.Cierre = require("./cierre.model.js")(sequelize, Sequelize);
db.DescripcionCompra = require("./descripcion_compra.model.js")(sequelize, Sequelize);

// claves foraneas
db.Producto.hasMany(db.DescripcionProveedor, { as: "DescripcionProveedor" });
db.DescripcionProveedor.belongsTo(db.Producto, {
  foreignKey: "ProductoId",
  as: "Producto",
});

db.Caja.hasMany(db.Usuario, { as: "Usuario" });
db.Usuario.belongsTo(db.Caja, {
  foreignKey: "CajaId",
  as: "Caja",
});

db.Proveedor.hasMany(db.DescripcionProveedor, { as: "DescripcionProveedor" });
db.DescripcionProveedor.belongsTo(db.Proveedor, {
  foreignKey: "ProveedorId",
  as: "Proveedor",
});

db.Usuario.hasMany(db.Venta, { as: "Venta" });
db.Venta.belongsTo(db.Usuario, {
  foreignKey: "UsuarioId",
  as: "Usuario",
});

db.Cliente.hasMany(db.Venta, { as: "Venta" });
db.Venta.belongsTo(db.Cliente, {
  foreignKey: "ClienteId",
  as: "Cliente",
});

db.Venta.hasMany(db.DescripcionVenta, { as: "DescripcionVenta" });
db.DescripcionVenta.belongsTo(db.Venta, {
  foreignKey: "VentaId",
  as: "Venta",
});

db.Producto.hasMany(db.DescripcionVenta, { as: "DescripcionVenta" });
db.DescripcionVenta.belongsTo(db.Producto, {
  foreignKey: "ProductoId",
  as: "Producto",
});

db.Compra.hasMany(db.DescripcionCompra, { as: "DescripcionCompra" });
db.DescripcionCompra.belongsTo(db.Compra, {
  foreignKey: "CompraId",
  as: "Compra",
});

db.Producto.hasMany(db.DescripcionCompra, { as: "DescripcionCompra" });
db.DescripcionCompra.belongsTo(db.Producto, {
  foreignKey: "ProductoId",
  as: "Producto",
});

db.Proveedor.hasMany(db.Compra, { as: "Compra" });
db.Compra.belongsTo(db.Proveedor, {
  foreignKey: "ProveedorId",
  as: "Proveedor",
});

db.Usuario.hasMany(db.Cierre, { as: "Cierre" });
db.Cierre.belongsTo(db.Usuario, {
  foreignKey: "UsuarioId",
  as: "Usuario",
});
module.exports = db;
