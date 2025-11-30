const fs = require('fs').promises;
const path = require('path');
const { pool } = require('./controllers/db');

async function seedProducts() {
    try {
        const sqlPath = path.join(__dirname, 'seed_products.sql');
        const sqlContent = await fs.readFile(sqlPath, 'utf8');

        // Split statements
        const statements = sqlContent.split(';').filter(s => s.trim().length > 0);

        const connection = await pool.getConnection();
        for (const stmt of statements) {
            await connection.query(stmt);
        }
        console.log('Productos insertados.');
        connection.release();
        process.exit(0);
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
}

seedProducts();
