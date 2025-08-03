//Utilizamos module.export para exportar objetos para que puedan ser utilizados en otras clases
module.exports = (sequelize, Sequelize) => {
// usamos el sequelize.defina para "definir" el nombre de la entity en la BD, en este caso "Detalle Pedido"
// Usamos type.Sequelize para definir el tipo de datos de cada atributo de la entidad
    const DetallePedido = sequelize.define("Detalle_Pedido", {
        id_detalle: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_pedido: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Pedidos',   // nombre de la tabla referenciada
                key: 'id_pedido'    // columna PK de esa tabla
            }
        },
        id_producto: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Productos',   // nombre de la tabla referenciada
                key: 'id_producto'    // columna PK de esa tabla
            }
        },
        cantidad: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        subTotal: {
            type: Sequelize.FLOAT
        },
    }, {
        timestamps: false // evita que agregue createdAt y updatedAt automáticamente
    });

    return DetallePedido;
};