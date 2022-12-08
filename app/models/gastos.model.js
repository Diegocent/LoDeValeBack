module.exports = (sequelize, Sequelize) => {
    const Gastos = sequelize.define("Gastos", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion: {
            type: Sequelize.STRING,
        },
        monto:{
            type: Sequelize.INTEGER,
        },
        fecha: {
            type: Sequelize.DATE,
        }
    });
    return Gastos;
};
