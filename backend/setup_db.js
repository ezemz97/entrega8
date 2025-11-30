const fs = require('fs').promises;
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
    try {
        const sqlPath = path.join(__dirname, 'ecommerce.sql');
        const sqlContent = await fs.readFile(sqlPath, 'utf8');

        // Split by semicolon to get individual statements, filtering empty ones
        const statements = sqlContent
            .split(';')
            .map(stmt => stmt.trim())
            .filter(stmt => stmt.length > 0);

        // Create connection WITHOUT database to allow creating it
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || "localhost",
            user: process.env.DB_USER || "root",
            password: process.env.DB_PASS || ""
        });

        console.log('Ejecutando script SQL...');

        for (const statement of statements) {
            try {
                await connection.query(statement);
            } catch (err) {
                // Ignore "database exists" or "table exists" errors if using IF NOT EXISTS
                console.warn(`Advertencia al ejecutar: ${statement.substring(0, 50)}... \nError: ${err.message}`);
            }
        }

        console.log('Base de datos configurada correctamente.');
        await connection.end();
        process.exit(0);
    } catch (error) {
        console.error('Error fatal al configurar DB:', error);
        process.exit(1);
    }
}

setupDatabase();
