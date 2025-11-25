const path = require('path');
const fs = require('fs').promises;

/**
 * Modelo para carrito de usuario
 */
class UserCartModel {
  /**
   * Obtiene el carrito de un usuario específico
   * @param {string} userId - ID del usuario
   * @returns {Promise<Object>} - Carrito del usuario
   */
  static async getByUserId(userId) {
    try {
      const filePath = path.join(__dirname, `../data/user_cart/${userId}.json`);
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error(`Error al leer carrito del usuario ${userId}: ${error.message}`);
    }
  }
}

module.exports = UserCartModel;
