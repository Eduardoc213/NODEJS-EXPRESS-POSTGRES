module.exports = app => {
    const producto = require("../controllers/producto.controller.js");
    var router = require("express").Router();
    // Create a new Product
    router.post("/create", producto.create);
    // Retrieve all Products
    router.get("/", producto.findAll);
    // Retrieve all published Products

    // Retrieve a single Product with id
    router.get("/:id", producto.findOne);

    // Update a Product with id
    router.put("/update/:id", producto.update);
    // Delete a Product with id
    router.delete("/delete/:id", producto.delete);
    // Delete all Products
    //router.delete("/delete/", producto.deleteAll);
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/cliente/
    app.use("/api/producto", router);
};