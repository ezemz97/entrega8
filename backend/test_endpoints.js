const axios = require('axios');

const API_URL = 'http://localhost:3000';

async function testEndpoints() {
    try {
        const email = `test${Date.now()}@example.com`;
        const password = 'password123';

        console.log(`1. Registrando usuario: ${email}`);
        try {
            await axios.post(`${API_URL}/register`, {
                email,
                contrasena: password
            });
            console.log('   ✅ Registro exitoso');
        } catch (error) {
            console.error('   ❌ Error en registro:', error.response?.data || error.message);
            return;
        }

        console.log('2. Iniciando sesión');
        let token;
        let userId;
        try {
            const loginRes = await axios.post(`${API_URL}/login`, {
                email,
                contrasena: password
            });
            token = loginRes.data.token;
            userId = loginRes.data.user.id;
            console.log('   ✅ Login exitoso. Token recibido.');
        } catch (error) {
            console.error('   ❌ Error en login:', error.response?.data || error.message);
            return;
        }

        console.log('3. Creando carrito');
        try {
            const cartData = {
                items: [
                    { id: 1, count: 2, unitCost: 100 },
                    { id: 2, count: 1, unitCost: 50 }
                ],
                shippingTypeId: 1, // Asumiendo que existe ID 1 en shipping_types (Standard)
                paymentMethod: 'credit_card',
                address: {
                    calle: 'Test St',
                    numero: '123'
                }
            };

            // Primero necesitamos asegurarnos que existan shipping_types
            // Pero asumiendo que el script SQL insertó algunos o que la DB ya tiene datos.
            // Si falla por shippingTypeId, tendremos que insertar uno.

            const cartRes = await axios.post(`${API_URL}/api/cart`, cartData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('   ✅ Carrito creado exitosamente:', cartRes.data);
        } catch (error) {
            console.error('   ❌ Error al crear carrito:', error.response?.data || error.message);
        }

    } catch (error) {
        console.error('Error general:', error.message);
    }
}

testEndpoints();
