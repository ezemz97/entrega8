const jwt = require('jsonwebtoken');
const AuthModel = require('../models/authModel');

/**
 * Controlador para autenticación (login)
 */
class AuthController {
  /**
   * Procesar login de usuario
   */
  static async login(req, res) {
    try {
      const { email, contrasena } = req.body;

      // Validar que se recibieron los campos necesarios
      if (!email || !contrasena) {
        return res.status(400).json({
          status: 'error',
          message: 'Email y contraseña son requeridos'
        });
      }

      // Validar credenciales
      const usuarioValido = await AuthModel.validateCredentials(email, contrasena);

      if (!usuarioValido) {
        return res.status(401).json({
          status: 'error',
          message: 'Email o contraseña incorrectos'
        });
      }

      // Generar token JWT
      const token = jwt.sign(
        { 
          email: usuarioValido.email,
          userId: usuarioValido.id || usuarioValido.email 
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Devolver el token
      res.json({
        status: 'ok',
        message: 'Login exitoso',
        token: token,
        user: {
          email: usuarioValido.email,
          id: usuarioValido.id
        }
      });

    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({
        status: 'error',
        message: 'Error al procesar el login'
      });
    }
  }
}

module.exports = AuthController;
