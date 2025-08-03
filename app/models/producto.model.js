//Utilizamos module.export para exportar objetos para que puedan ser utilizados en otras clases
module.exports = (sequelize, Sequelize) => {
// usamos el sequelize.defina para "definir" el nombre de la entity en la BD, en este caso "cliente"
// Usamos type.Sequelize para definir el tipo de datos de cada atributo de la entidad 
    const Producto = sequelize.define("Producto", {
        id_producto: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        precio: {
            type: Sequelize.FLOAT
        },
        stock: {
            type: Sequelize.INTEGER
        }
    }, {
        timestamps: false // evita que agregue createdAt y updatedAt automáticamente
    });

    return Producto;
};