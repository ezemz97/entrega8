const CartModel = require('../models/cartModel');

/**
 * Controlador para carrito
 */
class CartController {
  /**
   * Obtiene información del carrito
   */
  static async getCart(req, res) {
    try {
      const data = await CartModel.get();
      res.json(data);
    } catch (error) {
      console.error('Error al obtener carrito:', error);
      res.status(500).json({ 
        error: 'Error al cargar el carrito',
        message: error.message 
      });
    }
  }
}

module.exports = CartController;
