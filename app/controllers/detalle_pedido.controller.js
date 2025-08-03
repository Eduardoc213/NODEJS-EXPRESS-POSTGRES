// importamos db los modelos en este caso si tenemos uno o mas, se puede referenciar db."nombreModelo".   
const db = require("../models");
const Detalle_Pedido = db.detallePedido;
const Op = db.Sequelize.Op; 

// Create and Save a new Detalle_Pedido
exports.create = (req, res) => {
    console.log("Creando detalle pedido:", req.body);  
    // Validamos que dentro del  request no venga vacio el id_pedido, de lo contrario returna error
    if (!req.body.id_pedido) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Detalle_Pedido, definiendo una variable con la estructura del reques para luego solo ser enviada como parametro mas adelante. 
    const detalle_pedido = {
        id_detalle: req.body.id_detalle,
        id_pedido: req.body.id_pedido,
        id_producto: req.body.id_producto,
        cantidad: req.body.cantidad,
        subTotal: req.body.subTotal,
        // utilizando ? nos ayuda a indicar que el paramatro puede ser opcional dado que si no viene, le podemos asignar un valor default
        
    };

    // Save a new Detalle_Pedido into the database
    Detalle_Pedido.create(detalle_pedido)
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

// Retrieve all Detalle_Pedidos from the database.
exports.findAll = (req, res) => {
    const id_detalle = req.query.id_detalle;
    var condition = id_detalle ? { id_detalle: { [Op.iLike]: `%${id_detalle}%` } } : null;

    Detalle_Pedido.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Detalle_Pedidos." + " " + err.message
            });
        });
};

// Find a single Detalle_Pedido with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Detalle_Pedido.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Detalle_Pedido with id=" + id + " " + err.message
            });
        });
};


// Update a Detalle_Pedido by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Detalle_Pedido.update(req.body, {
        where: { id_detalle: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Detalle_Pedido was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Detalle_Pedido with id=${id}. Maybe Detalle_Pedido was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Detalle_Pedido with id=" + id + " " + err.message
            });
        });
};

// Delete a Detalle_Pedido with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    // utilizamos el metodo destroy para eliminar el objeto mandamos la condicionante where id = parametro que recibimos 
    Detalle_Pedido.destroy({
        where: { id_detalle: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Detalle_Pedido was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Detalle_Pedido with id=${id}. El Detalle_Pedido no fue encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Detalle_Pedido with id=" + id + " " + err.message
            });
        });
};

// Delete all Detalle_Pedidos from the database.
exports.deleteAll = (req, res) => {
    Detalle_Pedido.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Detalle_Pedidos were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Detalle_Pedidos."
            });
        });
};