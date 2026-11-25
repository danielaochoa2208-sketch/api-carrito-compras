import type { Request, Response, NextFunction } from 'express';
import * as servicio from '../services/productos.service.js';

// Consultar todos los productos
export async function obtenerProductos(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const productos = await servicio.listarProductos();
        res.status(200).json(productos);
    } catch (error) {
        next(error);
    }
}

// Consultar producto por ID
export async function obtenerProducto(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const id = Number(req.params.id);
        const producto = await servicio.buscarProducto(id);
        res.status(200).json(producto);
    } catch (error) {
        next(error);
    }
}

// Crear un producto
export async function crearProducto(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const producto = await servicio.registrarProducto(req.body);
        res.status(201).json(producto);
    } catch (error) {
        next(error);
    }
}

// Actualizar un producto
export async function actualizarProducto(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const id = Number(req.params.id);
        const producto = await servicio.modificarProducto(id, req.body);
        res.status(200).json(producto);
    } catch (error) {
        next(error);
    }
}

// Eliminar un producto
export async function eliminarProducto(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const id = Number(req.params.id);
        await servicio.borrarProducto(id);

        res.status(200).json({
            mensaje: 'Producto eliminado correctamente'
        });
    } catch (error) {
        next(error);
    }
}
