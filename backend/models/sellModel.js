const path = require('path');
const fs = require('fs').promises;

/**
 * Modelo para publicación de productos
 */
class SellModel {
  /**
   * Obtiene información de publicación
   * @returns {Promise<Object>} - Datos de publicación
   */
  static async getPublishInfo() {
    try {
      const filePath = path.join(__dirname, '../data/sell/publish.json');
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error(`Error al leer información de publicación: ${error.message}`);
    }
  }
}

module.exports = SellModel;
