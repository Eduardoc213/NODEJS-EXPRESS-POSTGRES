// importamos db los modelos en este caso si tenemos uno o mas, se puede referenciar db."nombreModelo".   
const db = require("../models");
const Pedidos = db.pedidos;
const Op = db.Sequelize.Op; 

// Create and Save a new Pedido
exports.create = (req, res) => {
    // Validamos que dentro del  request no venga vacio el id_cliente, de lo contrario returna error
    if (!req.body.id_cliente) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Pedido, definiendo una variable con la estructura del reques para luego solo ser enviada como parametro mas adelante. 
    const pedido = {
        id_pedido: req.body.id_pedido,
        id_cliente: req.body.id_cliente,
        fecha: req.body.fecha,
        total: req.body.total,
        // utilizando ? nos ayuda a indicar que el paramatro puede ser opcional dado que si no viene, le podemos asignar un valor default
        
    };

    // Save a new Pedido into the database
    Pedidos.create(pedido)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Pedido."
            });
        });
};

// Retrieve all Pedidos from the database.
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Pedidos.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Pedidos." + " " + err.message
            });
        });
};

// Find a single Pedido with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Pedidos.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Pedido with id=" + id + " " + err.message
            });
        });
};
// Find a single Pedido with an id_cliente
exports.findByCliente = (req, res) => {
    const id_cliente = req.params.id_cliente;

    Pedidos.findAll({ where: { id_cliente: id_cliente } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Pedido with id_cliente=" + id_cliente + " " + err.message
            });
        });
};

// Update a Pedido by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Pedidos.update(req.body, {
        where: { id_pedido: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Pedido was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Pedido with id=${id}. Maybe Pedido was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Pedido with id=" + id + " " + err.message
            });
        });
};

// Delete a Pedido with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    // utilizamos el metodo destroy para eliminar el objeto mandamos la condicionante where id = parametro que recibimos 
    Pedidos.destroy({
        where: { id_pedido: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Pedido was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Pedido with id=${id}. El pedido no fue encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Pedido with id=" + id + " " + err.message
            });
        });
};

// Delete all Pedidos from the database.
exports.deleteAll = (req, res) => {
    Pedidos.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Pedidos were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Pedidos."
            });
        });
};