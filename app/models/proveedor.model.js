module.exports = (sequelize, Sequelize) => {
    const Proveedor = sequelize.define("Proveedor", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ruc: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        empresa: {
            type: Sequelize.STRING
        }
    });
    return Proveedor;
};