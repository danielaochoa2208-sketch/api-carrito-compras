import type { Request, Response, NextFunction } from 'express';
import * as servicio from '../services/carrito.service.js';

// Consultar el carrito
export async function obtenerCarrito(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const carrito = await servicio.listarCarrito();
        res.status(200).json(carrito);
    } catch (error) {
        next(error);
    }
}

// Agregar producto al carrito
export async function agregarProducto(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { producto_id, cantidad } = req.body;

        const resultado = await servicio.agregarAlCarrito({
            producto_id,
            cantidad
        });

        res.status(201).json(resultado);
    } catch (error) {
        next(error);
    }
}

// Actualizar cantidad
export async function actualizarCantidad(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const id = Number(req.params.id);
        const { cantidad } = req.body;

        const resultado = await servicio.modificarCantidad(id, cantidad);
        res.status(200).json(resultado);
    } catch (error) {
        next(error);
    }
}

// Eliminar producto del carrito
export async function eliminarProducto(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const id = Number(req.params.id);
        const resultado = await servicio.retirarProducto(id);

        if (!resultado) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado en el carrito'
            });
        }

        res.status(200).json({
            mensaje: 'Producto retirado del carrito'
        });
    } catch (error) {
        next(error);
    }
}

// Consultar total
export async function obtenerTotal(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const total = await servicio.calcularTotal();
        res.status(200).json(total);
    } catch (error) {
        next(error);
    }
}

// Vaciar carrito
export async function vaciarCarrito(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const resultado = await servicio.limpiarCarrito();
        res.status(200).json(resultado);
    } catch (error) {
        next(error);
    }
}
