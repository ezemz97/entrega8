const path = require('path');
const fs = require('fs').promises;

/**
 * Modelo para productos de categorías
 */
class CatsProductsModel {
  /**
   * Obtiene productos de una categoría específica
   * @param {string} categoryId - ID de la categoría
   * @returns {Promise<Object>} - Datos de productos de la categoría
   */
  static async getByCategory(categoryId) {
    try {
      const filePath = path.join(__dirname, `../data/cats_products/${categoryId}.json`);
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error(`Error al leer productos de categoría ${categoryId}: ${error.message}`);
    }
  }
}

module.exports = CatsProductsModel;
