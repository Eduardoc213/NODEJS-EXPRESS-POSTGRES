module.exports = app => {
    const pedidos = require("../controllers/pedidos.controller.js");
    var router = require("express").Router();
    // Create a new Pedido
    router.post("/create", pedidos.create);
    // Retrieve all Pedidos
    router.get("/", pedidos.findAll);
    // Retrieve all published Pedidos

    // Retrieve a single Pedido with id
    router.get("/:id", pedidos.findOne);
    // Retrieve all Pedidos by cliente id
    router.get("/cliente/:id_cliente", pedidos.findByCliente);
    // Update a Pedido with id
    router.put("/update/:id", pedidos.update);
    // Delete a Pedido with id
    router.delete("/delete/:id", pedidos.delete);
    // Delete all Pedidos
    //router.delete("/delete/", pedidos.deleteAll);
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/pedidos/
    app.use("/api/pedidos", router);
};