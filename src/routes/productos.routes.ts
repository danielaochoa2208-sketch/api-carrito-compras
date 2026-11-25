import { Router } from 'express';
import * as controlador from '../controllers/productos.controller.js';

const router = Router();

// Consultar todos los productos
router.get('/', controlador.obtenerProductos);

// Consultar producto por ID
router.get('/:id', controlador.obtenerProducto);

// Registrar producto
router.post('/', controlador.crearProducto);

// Actualizar producto
router.put('/:id', controlador.actualizarProducto);

// Eliminar producto
router.delete('/:id', controlador.eliminarProducto);

export default router;