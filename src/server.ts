import app from './app.js';
import pool from './config/database.js';

const PORT = Number(process.env.PORT || 4000);

async function iniciarServidor() {
    try {
        await pool.query('SELECT 1');

        console.log('Conexión exitosa a PostgreSQL');

        app.listen(PORT, () => {
            console.log(`Servidor funcionando en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Error de conexión:', error);
        process.exit(1);
    }
}

iniciarServidor();
