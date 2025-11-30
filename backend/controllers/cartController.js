const CartModel = require('../models/cartModel');
const { pool } = require('./db');

/**
 * Controlador para carrito
 */
class CartController {
  /**
   * Obtiene información del carrito
   */
  static async getCart(req, res) {
    try {
      const data = await CartModel.get();
      res.json(data);
    } catch (error) {
      console.error('Error al obtener carrito:', error);
      res.status(500).json({
        error: 'Error al cargar el carrito',
        message: error.message
      });
    }
  }

  /**
   * Crea una nueva orden de compra (carrito)
   */
  static async createCart(req, res) {
    const userId = req.user ? req.user.userId : null; // req.user viene del middleware auth
    const {
      items = [],
      shippingTypeId,
      address = {},
      paymentMethod,
      paymentData = {}
    } = req.body;

    if (!userId) {
      return res.status(401).json({
        status: 'error',
        message: 'Usuario no identificado'
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'El carrito no puede estar vacío'
      });
    }

    if (!shippingTypeId) {
      return res.status(400).json({
        status: 'error',
        message: 'Tipo de envío no especificado'
      });
    }

    if (!paymentMethod) {
      return res.status(400).json({
        status: 'error',
        message: 'Forma de pago no especificada'
      });
    }

    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      // 1. Calcular subtotal
      let subtotal = 0;
      // Validar precios y stock podría hacerse aquí consultando la tabla products
      for (const it of items) {
        subtotal += Number(it.unitCost) * Number(it.count);
      }

      // 2. Obtener costo de envío
      const [shipRows] = await connection.query("SELECT rate FROM shipping_types WHERE id = ?", [shippingTypeId]);

      // Si no existe el tipo de envío, usar un default o error. 
      // Asumiremos rate 0 si no se encuentra para no romper, o lanzar error.
      let ratePercent = 0;
      if (shipRows.length > 0) {
        ratePercent = Number(shipRows[0].rate || 0);
      } else {
        // Opcional: lanzar error si el shipping type es inválido
        // throw new Error("Tipo de envío inválido");
      }

      const shippingCost = +(subtotal * (ratePercent / 100)).toFixed(2);
      const total = +(subtotal + shippingCost).toFixed(2);

      // 3. Insertar carrito (orden)
      const [cartResult] = await connection.query(
        "INSERT INTO carts (user_id, subtotal, shipping_cost, total, shipping_type_id) VALUES (?, ?, ?, ?, ?)",
        [userId, subtotal, shippingCost, total, shippingTypeId]
      );

      const cartId = cartResult.insertId;

      // 4. Insertar items del carrito
      // Nota: el frontend envía 'unitCost' y 'count', la DB espera 'price' y 'quantity'
      for (const it of items) {
        await connection.query(
          "INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
          [cartId, it.id, it.count, it.unitCost]
        );
      }

      // 5. Insertar dirección
      await connection.query(
        `INSERT INTO addresses (cart_id, departamento, localidad, calle, numero, esquina)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          cartId,
          address.departamento || null,
          address.localidad || null,
          address.calle || null,
          address.numero || null,
          address.esquina || null
        ]
      );

      // 6. Insertar pago (registro simplificado)
      await connection.query(
        "INSERT INTO payments (cart_id, method, details) VALUES (?, ?, ?)",
        [cartId, paymentMethod, JSON.stringify(paymentData || {})]
      );

      await connection.commit();

      res.status(201).json({
        status: 'ok',
        message: 'Compra realizada con éxito',
        cartId,
        total
      });

    } catch (error) {
      await connection.rollback();
      console.error('Error al crear carrito:', error);
      res.status(500).json({
        status: 'error',
        message: 'Error al procesar la compra',
        error: error.message
      });
    } finally {
      connection.release();
    }
  }
}

module.exports = CartController;

