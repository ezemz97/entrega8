const CatsModel = require('../models/catsModel');

/**
 * Controlador para categorías
 */
class CatsController {
  /**
   * Obtiene todas las categorías
   */
  static async getCategories(req, res) {
    try {
      const data = await CatsModel.getAll();
      res.json(data);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      res.status(500).json({ 
        error: 'Error al cargar las categorías',
        message: error.message 
      });
    }
  }
}

module.exports = CatsController;
