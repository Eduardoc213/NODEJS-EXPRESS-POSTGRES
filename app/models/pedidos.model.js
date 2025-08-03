//Utilizamos module.export para exportar objetos para que puedan ser utilizados en otras clases
module.exports = (sequelize, Sequelize) => {
// usamos el sequelize.defina para "definir" el nombre de la entity en la BD, en este caso "Pedido"
// Usamos type.Sequelize para definir el tipo de datos de cada atributo de la entidad 
    const Pedido = sequelize.define("Pedido", {
        id_pedido: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_cliente: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Clientes',   // nombre de la tabla referenciada
                key: 'id_cliente'    // columna PK de esa tabla
            }
        },
        fecha: {
            type: Sequelize.DATE
        },
        total: {
            type: Sequelize.FLOAT
        },
    }, {
        timestamps: false // evita que agregue createdAt y updatedAt automáticamente
    });

    return Pedido;
};