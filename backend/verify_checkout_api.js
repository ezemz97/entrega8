const http = require('http');

const BACKEND_PORT = 3000;
const BACKEND_HOST = 'localhost';

function request(options, data) {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    resolve({ statusCode: res.statusCode, body: JSON.parse(body) });
                } catch (e) {
                    resolve({ statusCode: res.statusCode, body });
                }
            });
        });

        req.on('error', reject);

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

async function runTest() {
    try {
        console.log('--- Starting API Verification ---');

        // 1. Register
        const email = `test_${Date.now()}@example.com`;
        const contrasena = 'password123';
        console.log(`1. Registering user: ${email}`);

        let registerRes = await request({
            hostname: BACKEND_HOST,
            port: BACKEND_PORT,
            path: '/register',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, {
            email,
            contrasena,
            name: 'Test User'
        });

        if (registerRes.statusCode !== 200 && registerRes.statusCode !== 201) {
            console.error('Registration failed:', registerRes.statusCode, registerRes.body);
        } else {
            console.log('   Registration successful');
        }

        // 2. Login
        console.log('2. Logging in...');
        const loginRes = await request({
            hostname: BACKEND_HOST,
            port: BACKEND_PORT,
            path: '/login',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, {
            email,
            contrasena
        });

        if (loginRes.statusCode !== 200) {
            throw new Error(`Login failed: ${loginRes.statusCode} ${JSON.stringify(loginRes.body)}`);
        }
        console.log('   Login successful');
        const token = loginRes.body.token;

        // 3. Checkout
        console.log('3. Sending Checkout Request...');
        const checkoutPayload = {
            items: [
                { id: 1, count: 2, unitCost: 1500, currency: 'USD', name: 'Test Product', image: 'img.jpg' }
            ],
            shippingTypeId: 1,
            paymentMethod: 'tarjeta',
            paymentData: {
                numeroTarjeta: '1234567890123456',
                titular: 'Test Owner',
                vencimiento: '12/25',
                cvv: '123'
            },
            address: {
                departamento: 'Montevideo',
                localidad: 'Montevideo',
                calle: 'Test St',
                numero: '123',
                esquina: 'Corner St'
            }
        };

        const checkoutRes = await request({
            hostname: BACKEND_HOST,
            port: BACKEND_PORT,
            path: '/api/cart',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }, checkoutPayload);

        console.log(`   Checkout Response: ${checkoutRes.statusCode}`);
        console.log(`   Body: ${JSON.stringify(checkoutRes.body)}`);

        if (checkoutRes.statusCode === 200) {
            console.log('--- VERIFICATION SUCCESSFUL ---');
        } else {
            console.error('--- VERIFICATION FAILED ---');
        }

    } catch (error) {
        console.error('Test Error:', error);
    }
}

runTest();
