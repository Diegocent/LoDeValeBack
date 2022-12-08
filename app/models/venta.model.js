module.exports = (sequelize, Sequelize) => {
    const Venta = sequelize.define("Venta", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha: {
            type: Sequelize.DATE,
        },
        monto: {
            type: Sequelize.INTEGER,
        }
    });
    return Venta;
};
