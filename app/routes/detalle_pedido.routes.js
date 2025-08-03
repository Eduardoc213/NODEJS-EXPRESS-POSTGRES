module.exports = app => {
    const detalle_pedido = require("../controllers/detalle_pedido.controller.js");
    var router = require("express").Router();
    // Create a new Detalle_Pedido
    router.post("/create", detalle_pedido.create);
    // Retrieve all Detalle_Pedidos
    router.get("/", detalle_pedido.findAll);
    // Retrieve all published Detalle_Pedidos

    // Retrieve a single Detalle_Pedido with id
    router.get("/:id", detalle_pedido.findOne);
    
    // Update a Detalle_Pedido with id
    router.put("/update/:id", detalle_pedido.update);
    // Delete a Detalle_Pedido with id
    router.delete("/delete/:id", detalle_pedido.delete);
    // Delete all Detalle_Pedidos
    router.delete("/delete/", detalle_pedido.deleteAll);
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/detalle_pedido/
    app.use("/api/detalle_pedido/", router);
};