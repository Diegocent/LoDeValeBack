module.exports = (sequelize, Sequelize) => {
    const DescripcionProveedor = sequelize.define("DescripcionProveedor", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        precio_compra: {
            type: Sequelize.INTEGER
        }
    });
    return DescripcionProveedor;
};