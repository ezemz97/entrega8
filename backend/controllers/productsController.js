const ProductsModel = require('../models/productsModel');

/**
 * Controlador para productos
 */
class ProductsController {
  /**
   * Obtiene información de un producto específico
   */
  static async getProduct(req, res) {
    try {
      const { id } = req.params;
      const data = await ProductsModel.getById(id);
      res.json(data);
    } catch (error) {
      console.error(`Error al obtener producto ${req.params.id}:`, error);
      res.status(404).json({ 
        error: 'Producto no encontrado',
        message: error.message 
      });
    }
  }
}

module.exports = ProductsController;
