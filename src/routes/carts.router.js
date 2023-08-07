const express = require('express');
const router = express.Router();
const Contenedor = require('../services/contenedor.js')


const cartsJSON = new Contenedor("../data/carts.json");

// Ruta para crear un nuevo carrito
router.post('/api/carts', async (req, res) => {
    try {
      const newCart = {
        products: [],
      };
      // Guardar Carrito Nuevo
      const newCartId = await cartsJSON.save(newCart); 
      newCart.id = newCartId;
      res.json(newCart);
    } catch (error) {
      res.status(500).json({error: 'Error al crear el carrito.'});
    }
  });

// Ruta para obtener todos productos de un carrito
router.get('/api/carts/:cid', async (req, res) => {
  const cartId = parseInt(req.params.cid);
  try {
    const cart = await cartsJSON.getById(cartId);

    if (!cart) {
      return res.status(404).json({error: 'Carrito no encontrado'});
    }
    res.json(cart.products);
  } catch (error) {
    res.status(500).json({error: 'Error al obtener los productos del carrito.'});
  }
});

// Ruta para agregar un producto al carrito
router.post('/api/carts/:cid/product/:pid', async (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);
  const quantity = 1;

  try {
    const cart = await cartsJSON.getById(cartId);
    if (!cart) {
      return res.status(404).json({error: 'Carrito no encontrado'});
    }

    const existingProduct = cart.products.find((product) => product.product === productId);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cartsJSON.save(cart); // Guardamos
    res.json(cart.products);
  } catch (error) {
    res.status(500).json({error: 'Error al agregar el producto al carrito.'});
  }
});


module.exports = router;