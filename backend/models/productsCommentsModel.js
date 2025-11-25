const path = require('path');
const fs = require('fs').promises;

/**
 * Modelo para comentarios de productos
 */
class ProductsCommentsModel {
  /**
   * Obtiene comentarios de un producto específico
   * @param {string} productId - ID del producto
   * @returns {Promise<Array>} - Lista de comentarios
   */
  static async getByProductId(productId) {
    try {
      const filePath = path.join(__dirname, `../data/products_comments/${productId}.json`);
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error(`Error al leer comentarios del producto ${productId}: ${error.message}`);
    }
  }
}

module.exports = ProductsCommentsModel;
