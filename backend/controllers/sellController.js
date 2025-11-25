const SellModel = require('../models/sellModel');

/**
 * Controlador para publicación de productos
 */
class SellController {
  /**
   * Obtiene información de publicación
   */
  static async getPublishInfo(req, res) {
    try {
      const data = await SellModel.getPublishInfo();
      res.json(data);
    } catch (error) {
      console.error('Error al obtener información de publicación:', error);
      res.status(500).json({ 
        error: 'Error al cargar información de publicación',
        message: error.message 
      });
    }
  }
}

module.exports = SellController;
