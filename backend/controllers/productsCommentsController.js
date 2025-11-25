const ProductsCommentsModel = require('../models/productsCommentsModel');

/**
 * Controlador para comentarios de productos
 */
class ProductsCommentsController {
  /**
   * Obtiene comentarios de un producto específico
   */
  static async getProductComments(req, res) {
    try {
      const { id } = req.params;
      const data = await ProductsCommentsModel.getByProductId(id);
      res.json(data);
    } catch (error) {
      console.error(`Error al obtener comentarios del producto ${req.params.id}:`, error);
      res.status(404).json({ 
        error: 'Comentarios no encontrados',
        message: error.message 
      });
    }
  }
}

module.exports = ProductsCommentsController;
