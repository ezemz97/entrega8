const { pool } = require('../controllers/db');

/**
 * Modelo para gestión de usuarios y autenticación con MySQL
 */
class AuthModel {

  /**
   * Buscar usuario por email
   * @param {string} email - Email del usuario
   * @returns {Promise<Object|null>} - Usuario encontrado o null
   */
  static async findUserByEmail(email) {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('Error en findUserByEmail:', error);
      throw error;
    }
  }

  /**
   * Crear nuevo usuario
   * @param {string} email - Email del usuario
   * @param {string} contrasena - Contraseña del usuario
   * @returns {Promise<Object>} - Usuario creado
   */
  static async createUser(email, contrasena) {
    try {
      // Verificar si el usuario ya existe
      const existingUser = await this.findUserByEmail(email);
      if (existingUser) {
        throw new Error('El email ya está registrado');
      }

      // Insertar nuevo usuario
      const [result] = await pool.query(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        [email, contrasena]
      );

      return {
        id: result.insertId,
        email: email,
        // No devolvemos la contraseña
      };
    } catch (error) {
      console.error('Error en createUser:', error);
      throw error;
    }
  }

  /**
   * Validar credenciales de usuario
   * @param {string} email - Email del usuario
   * @param {string} contrasena - Contraseña del usuario
   * @returns {Promise<Object|null>} - Usuario sin contraseña o null
   */
  static async validateCredentials(email, contrasena) {
    try {
      const user = await this.findUserByEmail(email);

      // Nota: En producción, las contraseñas deberían estar hasheadas (bcrypt).
      // Aquí comparamos texto plano según el código original, pero adaptado a la columna 'password' de la DB.
      if (!user || user.password !== contrasena) {
        return null;
      }

      // Retornar usuario sin la contraseña
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      console.error('Error en validateCredentials:', error);
      throw error;
    }
  }
}

module.exports = AuthModel;
