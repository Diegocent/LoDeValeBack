module.exports = (sequelize, Sequelize) => {
    const Caja = sequelize.define("Caja", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        numero: {
            type: Sequelize.INTEGER,
        },
        en_caja:{
            type: Sequelize.INTEGER,
        },
        ingreso_diario: {
            type: Sequelize.INTEGER,
        },
        fecha: {
            type: Sequelize.DATE,
        }
    });
    return Caja;
};
