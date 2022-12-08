module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("Usuario", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cedula: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        apellido: {
            type: Sequelize.STRING
        }, 
        contraseña: {
            type: Sequelize.STRING
        }
    });
    return Usuario;
};