import { Router } from 'express';
import * as controlador from '../controllers/carrito.controller.js';

const router = Router();

// Consultar el carrito
router.get('/', controlador.obtenerCarrito);

// Consultar el total
router.get('/total', controlador.obtenerTotal);

// Agregar producto
router.post('/', controlador.agregarProducto);

// Actualizar cantidad
router.put('/:id', controlador.actualizarCantidad);

// Eliminar producto
router.delete('/:id', controlador.eliminarProducto);

// Vaciar carrito
router.delete('/', controlador.vaciarCarrito);

export default router;