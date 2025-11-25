const fs = require('fs').promises;
const path = require('path');

/**
 * Modelo para gestión de usuarios y autenticación
 */
class AuthModel {
  static USERS_FILE = path.join(__dirname, '../data/users.json');

  /**
   * Cargar usuarios desde el archivo JSON
   * @returns {Promise<Array>} - Lista de usuarios
   */
  static async loadUsers() {
    try {
      const data = await fs.readFile(this.USERS_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      // Si el archivo no existe, retornar array vacío
      if (error.code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  /**
   * Guardar usuarios en el archivo JSON
   * @param {Array} users - Lista de usuarios
   */
  static async saveUsers(users) {
    const dataDir = path.dirname(this.USERS_FILE);
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(this.USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
  }

  /**
   * Buscar usuario por email
   * @param {string} email - Email del usuario
   * @returns {Promise<Object|null>} - Usuario encontrado o null
   */
  static async findUserByEmail(email) {
    const users = await this.loadUsers();
    return users.find(user => user.email === email) || null;
  }

  /**
   * Crear nuevo usuario
   * @param {string} email - Email del usuario
   * @param {string} contrasena - Contraseña del usuario
   * @returns {Promise<Object>} - Usuario creado
   */
  static async createUser(email, contrasena) {
    const users = await this.loadUsers();
    
    // Verificar si el usuario ya existe
    if (users.find(user => user.email === email)) {
      throw new Error('El email ya está registrado');
    }
    
    // Crear nuevo usuario
    const newUser = {
      id: Date.now().toString(),
      email: email,
      contrasena: contrasena,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    await this.saveUsers(users);
    
    return newUser;
  }

  /**
   * Validar credenciales de usuario
   * @param {string} email - Email del usuario
   * @param {string} contrasena - Contraseña del usuario
   * @returns {Promise<Object|null>} - Usuario sin contraseña o null
   */
  static async validateCredentials(email, contrasena) {
    const user = await this.findUserByEmail(email);
    
    if (!user || user.contrasena !== contrasena) {
      return null;
    }
    
    // Retornar usuario sin la contraseña
    const { contrasena: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

module.exports = AuthModel;
