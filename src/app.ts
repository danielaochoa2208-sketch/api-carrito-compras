import express from 'express';
import productosRoutes from './routes/productos.routes.js';
import carritoRoutes from './routes/carrito.routes.js';
import { manejarError } from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        tienda: 'PetShop',
        mensaje: 'Bienvenido a nuestra tienda de productos para mascotas',
        estado: 'API funcionando correctamente'
    });
});

// Rutas de productos
app.use('/api/productos', productosRoutes);

// Rutas del carrito
app.use('/api/carrito', carritoRoutes);

// Rutas no encontradas
app.use((req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada'
    });
});

// Manejo de errores
app.use(manejarError);

export default app;
