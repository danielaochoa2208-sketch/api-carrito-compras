import pool from '../config/database.js';
import type { Producto } from '../models/producto.model.js';

// Validar los datos del producto
function validarProducto(producto: Producto) {
    if (!producto.nombre || !producto.nombre.trim()) {
        throw new Error('El nombre es obligatorio');
    }

    if (!producto.categoria || !producto.categoria.trim()) {
        throw new Error('La categoría es obligatoria');
    }

    if (producto.precio <= 0) {
        throw new Error('El precio debe ser mayor a cero');
    }

    if (producto.stock < 0) {
        throw new Error('El stock no puede ser negativo');
    }
}

// Consultar todos los productos
export async function listarProductos() {
    const resultado = await pool.query(
        'SELECT * FROM productos ORDER BY id'
    );

    return resultado.rows;
}

// Buscar producto por ID
export async function buscarProducto(id: number) {
    const resultado = await pool.query(
        'SELECT * FROM productos WHERE id = $1',
        [id]
    );

    if (resultado.rowCount === 0) {
        throw new Error('Producto no encontrado');
    }

    return resultado.rows[0];
}

// Registrar producto
export async function registrarProducto(producto: Producto) {
    validarProducto(producto);

    const resultado = await pool.query(
        `INSERT INTO productos (nombre, categoria, precio, stock)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [producto.nombre, producto.categoria, producto.precio, producto.stock]
    );

    return resultado.rows[0];
}

// Actualizar producto
export async function modificarProducto(id: number, producto: Producto) {
    validarProducto(producto);

    const resultado = await pool.query(
        `UPDATE productos
         SET nombre = $1, categoria = $2, precio = $3, stock = $4
         WHERE id = $5
         RETURNING *`,
        [producto.nombre, producto.categoria, producto.precio, producto.stock, id]
    );

    if (resultado.rowCount === 0) {
        throw new Error('Producto no encontrado');
    }

    return resultado.rows[0];
}

// Eliminar producto
export async function borrarProducto(id: number) {
    const resultado = await pool.query(
        'DELETE FROM productos WHERE id = $1 RETURNING *',
        [id]
    );

    if (resultado.rowCount === 0) {
        throw new Error('Producto no encontrado');
    }

    return resultado.rows[0];
}