const UserCartModel = require('../models/userCartModel');

/**
 * Controlador para carrito de usuario
 */
class UserCartController {
  /**
   * Obtiene el carrito de un usuario específico
   */
  static async getUserCart(req, res) {
    try {
      const { id } = req.params;
      const data = await UserCartModel.getByUserId(id);
      res.json(data);
    } catch (error) {
      console.error(`Error al obtener carrito del usuario ${req.params.id}:`, error);
      res.status(404).json({ 
        error: 'Carrito de usuario no encontrado',
        message: error.message 
      });
    }
  }
}

module.exports = UserCartController;
