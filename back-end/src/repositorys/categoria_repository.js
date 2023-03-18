const { poolDB, sql } = require('../config/database');
const CategoriaDTO = require('../dto/categoria_dto');
const Categoria = require('../models/categoria_model');
class CategoriaRepository {
    async getAll() {
        try {
            const pool = await poolDB;
            const result = await pool.request().query("SELECT * FROM categorias");
            return result.recordset.map((row) => new Categoria(row));
        } catch (error) {
            throw error;
        }
    }
    async getById(id) {
        try {
            const pool = await poolDB;
            const result = await pool
                .request()
                .input('id_categoria', sql.Int, id)
                .query("SELECT * FROM categorias WHERE id_categoria = @id_categoria");
            const itemFind = result.recordset[0];
            return new Categoria(itemFind);
        } catch (error) {
            throw error;
        }
    }
    async create(categoriaDto) {
        try {
            const pool = await poolDB;
            const categoria = new CategoriaDTO(categoriaDto)
            const result = await pool
                .request()
                .input('nombre_categoria', sql.VarChar, categoria.nombreCategoria)
                .query(
                    'INSERT INTO categorias (nombre_categoria) VALUES (@nombre_categoria)'
                );
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }
    async update(id, categoriaDto) {
        try {
            const pool = await poolDB;
            const result = await pool
            const categoria = new CategoriaDTO(categoriaDto)
                .request()
                .input('nombre_categoria', sql.VarChar, categoria.nombreCategoria)
                .input('id_categoria', sql.Int, id)
                .query(
                    'UPDATE categorias SET nombre_categoria = @nombre_categoria WHERE id_categoria = @id_categoria'
                );
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CategoriaRepository;