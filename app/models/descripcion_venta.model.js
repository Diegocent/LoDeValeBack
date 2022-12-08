module.exports = (sequelize, Sequelize) => {
    const DescripcionVenta = sequelize.define("DescripcionVenta", {
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
    return DescripcionVenta;
};
