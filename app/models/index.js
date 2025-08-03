// Cargamos el archivo de configuración que contiene los datos de conexión a la base de datos
const dbConfig = require("../config/db.config.js");

// Importamos Sequelize, el ORM que nos permite trabajar con PostgreSQL como objetos JS
const Sequelize = require("sequelize");

// Creamos una instancia de Sequelize con los parámetros de conexión, incluyendo SSL para NeonDB
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,            // Dirección del servidor (host) de la base de datos
  dialect: dbConfig.dialect,      // El tipo de base de datos, en este caso 'postgres'

  // Configuraciones específicas del dialecto (PostgreSQL), incluyendo la conexión segura SSL, Para Neon Debemos trabajarlo asi, anteriormente lo deje en el Pool y envio la correcion
  dialectOptions: {
    ssl: {
      require: true,              // Indica que la conexión debe usar SSL obligatoriamente
      rejectUnauthorized: false   // Acepta certificados autofirmados o no verificados (útil en entornos no productivos)
    }
  },

  // Configuración del pool de conexiones para optimizar el rendimiento
  pool: {
    max: dbConfig.pool.max,       // Máximo de conexiones simultáneas
    min: dbConfig.pool.min,       // Mínimo de conexiones
    acquire: dbConfig.pool.acquire, // Tiempo máximo para obtener una conexión antes de lanzar error
    idle: dbConfig.pool.idle      // Tiempo que una conexión puede estar inactiva antes de ser liberada
  }
});

// Creamos un objeto `db` que exportaremos para acceder a Sequelize y los modelos desde otras partes del proyecto
const db = {};

// Asignamos la clase Sequelize al objeto `db`, útil si se requiere usar métodos del ORM manualmente
db.Sequelize = Sequelize;

// Asignamos la instancia de conexión Sequelize con los parámetros definidos
db.sequelize = sequelize;

// Importamos el modelo de cliente desde la carpeta 'models' y lo registramos en el objeto `db`
// Le pasamos la instancia de conexión `sequelize` y la clase `Sequelize` como argumentos
db.clientes = require("./cliente.model.js")(sequelize, Sequelize);

// Aquí puedes seguir importando otros modelos de forma similar
// Ejemplo: db.productos = require("./producto.model.js")(sequelize, Sequelize);



// Importamos los modelos cliente, detalle_pedido, productos y pedidos desde la carpeta 'models' 
// y lo registramos en el objeto `db`

db.producto = require("./producto.model.js")(sequelize, Sequelize);
db.detallePedido = require("./detalle_pedido.model.js")(sequelize, Sequelize);
db.cliente = require("./cliente.model.js")(sequelize, Sequelize);
db.pedidos = require("./pedidos.model.js")(sequelize, Sequelize);
// Definimos las relaciones entre los modelos, si es necesario
const Cliente = db.cliente;
const Pedido = db.pedidos;
const Producto = db.producto;
const DetallePedido = db.detallePedido;

// Definimos las relaciones entre los modelos

//Clientes
//un cliente puede tener muchos pedidos
Cliente.hasMany(Pedido, { foreignKey: 'id_cliente' });
//un pedido pertenece a un cliente
Pedido.belongsTo(Cliente, { foreignKey: 'id_cliente' });

//Pedidos
//un pedido puede tener muchos detalles
Pedido.hasMany(DetallePedido, { foreignKey: 'id_pedido' });
//un detalle pertenece a un pedido
DetallePedido.belongsTo(Pedido, { foreignKey: 'id_pedido' });

//Productos
//un producto puede estar en muchos detalles
Producto.hasMany(DetallePedido, { foreignKey: 'id_producto' });
//un detalle pertenece a un producto
DetallePedido.belongsTo(Producto, { foreignKey: 'id_producto' });

// DetallePedido
// un detalle pertenece a un pedido y a un producto
DetallePedido.belongsTo(Pedido, { foreignKey: 'id_pedido' });
DetallePedido.belongsTo(Producto, { foreignKey: 'id_producto' });
// un producto puede estar en muchos detalles de pedidos
Producto.hasMany(DetallePedido, { foreignKey: 'id_producto' });
DetallePedido.belongsTo(Producto, { foreignKey: 'id_producto' });




// Exportamos el objeto `db` para que pueda ser usado por otros módulos (por ejemplo, en el `server.js`)
module.exports = db;