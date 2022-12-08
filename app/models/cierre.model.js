module.exports = (sequelize, Sequelize) => {
    const Cierre = sequelize.define("Cierre", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        monto_parcial:{
            type: Sequelize.INTEGER,
        },
        monto_final:{
            type: Sequelize.INTEGER,
        },
        en_caja:{
            type: Sequelize.INTEGER,
        }
    });
    return Cierre;
};