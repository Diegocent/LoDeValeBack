module.exports = (sequelize, Sequelize) => {
    const DescripcionCompra = sequelize.define("DescripcionCompra", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        monto_unitario: {
            type: Sequelize.INTEGER,
        },
        cantidad:{
            type: Sequelize.DECIMAL,
        },
        monto_total: {
            type: Sequelize.INTEGER,
        }
    });
    return DescripcionCompra;
};
