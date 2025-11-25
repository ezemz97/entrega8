const CatsProductsModel = require('../models/catsProductsModel');

/**
 * Controlador para productos de categorías
 */
class CatsProductsController {
  /**
   * Obtiene productos de una categoría específica
   */
  static async getCategoryProducts(req, res) {
    try {
      const { id } = req.params;
      const data = await CatsProductsModel.getByCategory(id);
      res.json(data);
    } catch (error) {
      console.error(`Error al obtener productos de categoría ${req.params.id}:`, error);
      res.status(404).json({ 
        error: 'Categoría no encontrada',
        message: error.message 
      });
    }
  }
}

module.exports = CatsProductsController;
