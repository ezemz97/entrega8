const path = require('path');
const fs = require('fs').promises;

/**
 * Modelo para productos
 */
class ProductsModel {
  /**
   * Obtiene información de un producto específico
   * @param {string} productId - ID del producto
   * @returns {Promise<Object>} - Información del producto
   */
  static async getById(productId) {
    try {
      const filePath = path.join(__dirname, `../data/products/${productId}.json`);
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error(`Error al leer producto ${productId}: ${error.message}`);
    }
  }
}

module.exports = ProductsModel;
