const Articulo = require('../models/articulo_model');
    const { poolDB, sql } = require('../config/database');


class ArticulosRepository {
    async getAll() {
        try {
            const pool = await poolDB;
            const result = await pool.request().query("SELECT * FROM articulos");
            return result.recordset.map((row) => new Articulo(row));
        } catch (error) {
            throw error;
        }
    }
    async getById(id) {
        try {
            const pool = await poolDB;
            const result = await pool
                .request()
                .input('id_articulo', sql.Int, id)
                .query("SELECT * FROM articulos WHERE id_articulo = @id_articulo");
            const itemFind = result.recordset[0];
            return new Articulo(itemFind);
        } catch (error) {
            throw error;
        }
    }
    async getByFilter(filtros) {
        try {
            const pool = await poolDB;
            const whereList = [];
            let query = "SELECT * FROM articulos";
            if (filtros.nombre) {
                whereList.push(`nombre_articulo LIKE '%${filtros.nombre}%'`);
            }
            if (filtros.descripcion) {
                whereList.push(`descripcion LIKE '%${filtros.descripcion}%'`);
            }
            if (filtros.precio) {
                whereList.push(`precio = '${filtros.precio}'`);
            }
            if (filtros.cantidad) {
                whereList.push(`cantidad_disponible = '${filtros.cantidad}'`);
            }
            if (whereList.length > 0) {
                query += ` WHERE ${whereList.join(' AND ')}`;
            }
            const result = await pool.request().query(query);
            return result.recordset.map((row) => new Articulo(row));
        } catch (error) {
            throw error;
        }
    }
    async create(articulo) {
        try {
            const pool = await poolDB;
            const result = await pool
                .request()
                .input('nombre_articulo', sql.VarChar, articulo.nombre)
                .input('descripcion', sql.VarChar, articulo.descripcion)
                .input('precio', sql.Decimal, articulo.precio)
                .input('cantidad_disponible', sql.Int, articulo.cantidad)
                .query(
                    'INSERT INTO articulos (nombre_articulo, descripcion, precio, cantidad_disponible) VALUES (@nombre_articulo, @descripcion, @precio, @cantidad_disponible)'
                );
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }
    async update(id, articulo) {
        try {
            const pool = await poolDB;
            const result = await pool
                .request()
                .input('nombre_articulo', sql.VarChar, articulo.nombre)
                .input('descripcion', sql.VarChar, articulo.descripcion)
                .input('precio', sql.Decimal, articulo.precio)
                .input('cantidad_disponible', sql.Int, articulo.cantidad)
                .input('id_articulo', sql.Int, id)
                .query(
                    'UPDATE articulos SET nombre_articulo = @nombre_articulo, descripcion = @descripcion, precio = @precio, cantidad_disponible = @cantidad_disponible WHERE id_articulo = @id_articulo'
                );
            return result.recordset;
        } catch (error) {
            throw error;
        }

    }
    async delete(id) {
        try {
            const pool = await poolDB;
            const result = await pool
                .request()
                .input('id_articulo', sql.Int, id)
                .query("DELETE FROM articulos WHERE id_articulo = @id_articulo");
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ArticulosRepository;