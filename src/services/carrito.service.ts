import pool from '../config/database.js';
import type { Carrito } from '../models/carrito.model.js';

// Consultar el carrito
export async function listarCarrito() {
    const resultado = await pool.query(`
        SELECT
            c.id,
            c.producto_id,
            p.nombre,
            p.precio,
            c.cantidad,
            p.precio * c.cantidad AS subtotal
        FROM carrito c
        INNER JOIN productos p ON c.producto_id = p.id
        ORDER BY c.id
    `);

    return resultado.rows;
}

// Agregar producto al carrito
export async function agregarAlCarrito(carrito: Carrito) {
    const resultado = await pool.query(
        `INSERT INTO carrito (producto_id, cantidad)
         VALUES ($1, $2)
         ON CONFLICT (producto_id)
         DO UPDATE SET cantidad = carrito.cantidad + EXCLUDED.cantidad
         RETURNING *`,
        [carrito.producto_id, carrito.cantidad]
    );

    return resultado.rows[0];
}

// Actualizar cantidad
export async function modificarCantidad(id: number, cantidad: number) {
    const resultado = await pool.query(
        `UPDATE carrito
         SET cantidad = $1
         WHERE id = $2
         RETURNING *`,
        [cantidad, id]
    );

    return resultado.rows[0];
}

// Eliminar producto del carrito
export async function retirarProducto(id: number) {
    const resultado = await pool.query(
        'DELETE FROM carrito WHERE id = $1 RETURNING *',
        [id]
    );

    return resultado.rows[0];
}

// Calcular total
export async function calcularTotal() {
    const resultado = await pool.query(`
        SELECT COALESCE(
            SUM(p.precio * c.cantidad), 0
        ) AS total
        FROM carrito c
        INNER JOIN productos p ON c.producto_id = p.id
    `);

    return resultado.rows[0];
}

// Vaciar carrito
export async function limpiarCarrito() {
    await pool.query('DELETE FROM carrito');

    return {
        mensaje: 'Carrito vaciado correctamente'
    };
}