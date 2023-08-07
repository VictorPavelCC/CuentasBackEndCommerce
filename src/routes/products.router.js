const express = require('express');
const router = express.Router();
const Contenedor = require('../services/contenedor.js')



const productsJSON = new Contenedor("../data/products.json")


// Ruta para obtener todos los productos
router.get('/api/products', async (req, res) => {
    try{
        const allProducts = await productsJSON.getAll()
        res.json(allProducts)
    } catch (error) {
        res.status(500).json({error: 'Error al obtener los productos'})
    }
});

// Ruta para obtener un producto
router.get('/api/products/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);
    
    try{
        const product = await productsJSON.getByid(pid)
        if(!product){
            return res.status(404).json({error: 'Producto no encontrado.'})
        }
        return res.json(product);
    } catch (error) {
        res.status(500).json({error: 'Error al obtener el producto.'})
    }
});

// Ruta para agregar un nuevo producto
router.post('/api/products', async (req, res) => {

    const newProduct = req.body;

    if (
        !newProduct.title ||
        !newProduct.price ||
        !newProduct.description ||
        !newProduct.code ||
        !newProduct.stock ||
        !newProduct.category) {
        return res.status(400).json({error: 'Debe proporcionar todos los campos (title, price, description, code, stock, category).'});
    }

    try{
        await productsJSON.save(newProduct)
        res.json({message: 'producto agregado correctamente'})
    } catch (error){
        console.error(error)
        res.status(500).json({error: 'Error al guardar el producto.'});
    }   
});

// Ruta para actualizar campos de un producto por su ID (PUT /:pid)
router.put('/api/products/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);
    const updateFields = req.body;

    // Validamos de Campos
    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({error: 'Debe proporcionar al menos un campo para actualizar.'});
    }

    const product = await productsJSON.getById(pid);

    if (!product) {
        return res.status(404).json({error: 'Producto no encontrado.'});
    }

    // Actualizacion de producto
    for (const key in updateFields) {
        if (key !== 'id') { 
            product[key] = updateFields[key];
        }
    }

    try {
        await productsJSON.save(product);
        return res.json(product);
    } catch (error) {
        return res.status(500).json({error: 'Error al actualizar el producto.'});
    }
});

// Ruta para eliminar un producto por su ID (DELETE /:pid)
router.delete('/api/products/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);

    try{
        const product = await productsJSON.getById(pid)
        if(!product){
            return res.status(404).json({error: 'Producto no encontrado.'})
        }
        await productsJSON.deleteById(pid);
        res.json({message: 'Producto eliminado correctamente'})

    } catch (error){
        res.status(500).json({error: 'Error al eliminar el producto.'})
    }

});

module.exports = router;