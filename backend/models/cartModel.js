const path = require('path');
const fs = require('fs').promises;

/**
 * Modelo para carrito
 */
class CartModel {
  /**
   * Obtiene información del carrito
   * @returns {Promise<Object>} - Datos del carrito
   */
  static async get() {
    try {
      const filePath = path.join(__dirname, '../data/cart/buy.json');
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error(`Error al leer carrito: ${error.message}`);
    }
  }
}

module.exports = CartModel;
