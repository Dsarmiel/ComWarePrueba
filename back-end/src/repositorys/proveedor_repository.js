const Proveedor = require('../models/proveedor_model')
const { poolDB, sql } = require('../config/database')

class ProveedorRepository {
    async getAll() { 
        try {
            const pool = await poolDB;
            const result = await pool.request().query("SELECT * FROM proveedores");
            return result.recordset.map((row) => new Proveedor(row));
        } catch (error) {
            throw error;
        }
    }
    async getById(id) { 
        try {
            const pool = await poolDB;
            const result = await pool
                .request()
                .input('id_proveedor', sql.Int, id)
                .query("SELECT * FROM proveedores WHERE id_proveedor = @id_proveedor");
            const itemFind = result.recordset[0];
            return new Proveedor(itemFind);
        } catch (error) {
            throw error;
        }
    }
    async getByFilter(filtros){
        try {
            const pool = await poolDB;
            const whereList = [];
            let query = "SELECT * FROM proveedores";
            if (filtros.nombreProveedor) {
                whereList.push(`nombre_proveedor LIKE '%${filtros.nombreProveedor}%'`);
            }
            if (filtros.direccion) {
                whereList.push(`direccion LIKE '%${filtros.direccion}%'`);
            }
            if (filtros.telefono) {
                whereList.push(`telefono = '${filtros.telefono}'`);
            }
            if (filtros.email) {
                whereList.push(`email LIKE '%${filtros.email}%'`);
            }
            if (whereList.length > 0) {
                query += ` WHERE ${whereList.join(' AND ')}`;
            }
            const result = await pool.request().query(query);
            return result.recordset.map((row) => new Proveedor(row));
        } catch (error) {
            throw error;
        }
    }
    async create(proveedor) { 
        try {
            const pool = await poolDB;
            const result = await pool
                .request()
                .input('nombre_proveedor', sql.VarChar, proveedor.nombreProveedor)
                .input('direccion', sql.VarChar, proveedor.direccion)
                .input('telefono', sql.Numeric, proveedor.telefono)
                .input('email', sql.VarChar, proveedor.email)
                .query(
                    'INSERT INTO proveedores (nombre_proveedor, direccion, telefono, email) VALUES (@nombre_proveedor, @direccion, @telefono, @email)'
                );
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }
    async update(id, proveedor) {
        try {
            const pool = await poolDB;
            const result = await pool
                .request()
                .input('id_proveedor', sql.Int, id)
                .input('nombre_proveedor', sql.VarChar, proveedor.nombreProveedor)
                .input('direccion', sql.VarChar, proveedor.direccion)
                .input('telefono', sql.Numeric, proveedor.telefono)
                .input('email', sql.VarChar, proveedor.email)
                .query(
                    'INSERT proveedores SET nombre_proveedor = @nombre_proveedor, direccion = @direccion, telefono = @telefono, email = @email WHERE id_proveedor = @id_proveedor"'
                );
            return result.recordset;
        } catch (error) {
            throw error;
        }
     }
    async delete() {
        try {
            const pool = await poolDB;
            const result = await pool
                .request()
                .input('id_proveedor', sql.Int, id)
                .query("DELETE FROM proveedores WHERE id_proveedor = @id_proveedor");
            return result.recordset;
        } catch (error) {
            throw error;
        }
     }
}

module.exports = ProveedorRepository;