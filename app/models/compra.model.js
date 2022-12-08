module.exports = (sequelize, Sequelize) => {
    const Compra = sequelize.define("Compra", {
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
    return Compra;
};
