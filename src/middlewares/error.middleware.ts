import type { Request, Response, NextFunction } from 'express';

export function manejarError(
    error: Error & { code?: string; status?: number },
    req: Request,
    res: Response,
    next: NextFunction
) {
    const mensaje = error.message;

    if (mensaje.includes('no encontrado')) {
        return res.status(404).json({
            error: mensaje
        });
    }

    if (mensaje.includes('obligatorio') ||
        mensaje.includes('mayor a cero') ||
        mensaje.includes('negativo')) {
        return res.status(400).json({
            error: mensaje
        });
    }

    if (error.code === '23503') {
        return res.status(409).json({
            error: 'El producto tiene registros relacionados'
        });
    }

    console.error(error);

    return res.status(500).json({
        error: 'Error interno del servidor'
    });
}
