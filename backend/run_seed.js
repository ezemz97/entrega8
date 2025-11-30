const fs = require('fs').promises;
const path = require('path');
const { pool } = require('./controllers/db');

async function seedDatabase() {
    try {
        const sqlPath = path.join(__dirname, 'seed_shipping.sql');
        const sqlContent = await fs.readFile(sqlPath, 'utf8');

        const connection = await pool.getConnection();
        await connection.query(sqlContent);
        console.log('Datos de envío insertados.');
        connection.release();
        process.exit(0);
    } catch (error) {
        console.error('Error seeding DB:', error);
        process.exit(1);
    }
}

seedDatabase();
