const path = require('path');
const fs = require('fs').promises;

/**
 * Modelo para categorías
 */
class CatsModel {
  /**
   * Obtiene todas las categorías
   * @returns {Promise<Array>} - Lista de categorías
   */
  static async getAll() {
    try {
      const filePath = path.join(__dirname, '../data/cats/cat.json');
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error(`Error al leer categorías: ${error.message}`);
    }
  }
}

module.exports = CatsModel;
