const FacturacionDTO = require('../dto/facturacion_dto')
const { poolDB, sql } = require('../config/database');
const FacturacionCreateDTO = require('../dto/factuacion_create_dto');
const FacturacionUpdateDTO = require('../dto/facturacion_update_dto');
class FacturaRepository {
    async getAll() {
        try {
            const pool = await poolDB;
            const query = `
            SELECT  rf.*, 
            JSON_OBJECT('id', pr.id_proveedor, 'nombre', pr.nombre) as proveedor,
            JSON_OBJECT('id', ar.id_articulo, 'nombre', ar.nombre) as articulo
            FROM registro_facturacion rf
            INNER JOIN proveedores pr ON pr.id_proveedor = rf.id_proveedor
            INNER JOIN articulos ar ON ar.id_articulo = rf.id_articulo
            `;
            const result = await pool.request().query(query);
            return result.recordset.map((row) => new FacturacionDTO(row));
        } catch (error) {
            throw error;
        }
    }
    async getById(id) {
        try {
            const pool = await poolDB;
            const query = `
            SELECT  rf.*, 
            JSON_OBJECT('id', pr.id_proveedor, 'nombre', pr.nombre) as proveedor,
            JSON_OBJECT('id', ar.id_articulo, 'nombre', ar.nombre) as articulo
            FROM registro_facturacion rf
            INNER JOIN proveedores pr ON pr.id_proveedor = rf.id_proveedor
            INNER JOIN articulos ar ON ar.id_articulo = rf.id_articulo
            WHERE id_registro = @id_registro
            `;
            const result = await pool.request()
                .input('id_registro', sql.Int, id)
                .query(query);
            const itemFind = result.recordset[0];
            return new FacturacionDTO(itemFind);
        } catch (error) {
            throw error;
        }
    }
    async getByFilter(filtros) {
        try {
            const pool = await poolDB;
            const whereList = [];
            const query = `
            SELECT  rf.*, 
            JSON_OBJECT('id', pr.id_proveedor, 'nombre', pr.nombre) as proveedor,
            JSON_OBJECT('id', ar.id_articulo, 'nombre', ar.nombre) as articulo
            FROM registro_facturacion rf
            INNER JOIN proveedores pr ON pr.id_proveedor = rf.id_proveedor
            INNER JOIN articulos ar ON ar.id_articulo = rf.id_articulo
            `;
            if (filtros.id_proveedor) {
                whereList.push(`id_proveedor = '${filtros.id_proveedor}'`);
            }
            if (filtros.id_articulo) {
                whereList.push(`id_articulo = '${filtros.id_articulo}'`);
            }
            if (filtros.fecha_compra) {
                whereList.push(`fecha_compra = '${filtros.fecha_compra}'`);
            }
            if (filtros.fecha_entrega) {
                whereList.push(`fecha_entrega = '${filtros.fecha_entrega}'`);
            }
            if (filtros.precio_unidad_compra) {
                whereList.push(`precio_unidad_compra = '${filtros.precio_unidad_compra}'`);
            }
            if (filtros.precio_unidad_compra) {
                whereList.push(`precio_unidad_compra = '${filtros.precio_unidad_compra}'`);
            }
            if (filtros.precio_total_compra) {
                whereList.push(`precio_total_compra = '${filtros.precio_total_compra}'`);
            }
            if (filtros.cantidad_compra) {
                whereList.push(`cantidad_compra = '${filtros.cantidad_compra}'`);
            }
            if (whereList.length > 0) {
                query += ` WHERE ${whereList.join(' AND ')}`;
            }
            const result = await pool.request()
                .query(query);
            return result.recordset.map((row) => new Proveedor(row));
        } catch (error) {
            throw error;
        }
    }
    async create(facturaToCreate) {
        try{
            const pool = await poolDB;
            const facturaCreate = new FacturacionCreateDTO(facturaToCreate);
            let valuesInsertFactura = await facturaCreate.articulos.map(articulo =>
                `(
                    ${facturaCreate.idProveedor}, ${articulo.idArticulo},
                    '${facturaCreate.fechaCompra}', '${facturaCreate.fechaEntrega}',
                    ${articulo.precioUnidadCompra},  ${articulo.precioTotalCompra},
                    ${articulo.cantidadCompra}
                )`
            ).join(',');
            let valuesInsertProveedorArticulo = await facturaCreate.articulos.map(articulo => `('${facturaCreate.idProveedor}, ${articulo.idArticulo})`).join(',');
            const queryFactura =
                `INSERT INTO registro_facturacion 
                (id_proveedor, id_articulo, fecha_compra, fecha_entrega, precio_unidad_compra, precio_total_compra, cantidad_compra) 
                VALUES ${valuesInsertFactura}`;
            const queryProveedorArticulo = 
            `INSERT INTO proveedores_articulos  (id_proveedor, id_articulo) VALUES ${valuesInsertProveedorArticulo}`;
            let resultProveedorArticulo;
            const resultFactura = await pool.request().query(queryFactura)
            .then(async ()=>{
                resultProveedorArticulo = await pool.request().query(queryProveedorArticulo);
            });
            return resultFactura.recordset
        }catch (error) {
            throw error;
        }

    }
    async update(id, factura) {
        try{
            const facturaUpdate = new FacturacionUpdateDTO(factura);
            const result = await pool
                .request()
                .input('id_proveedor', sql.Int, facturaUpdate.idProveedor)
                .input('id_articulo', sql.Int, articulo.idArticulo)
                .input('fecha_compra', sql.Date, articulo.fechaCompra)
                .input('fecha_entrega', sql.Date, articulo.fechaEntrega)
                .input('precio_unidad_compra', sql.Decimal, precioUnidadCompra)
                .input('precio_total_compra', sql.Decimal, precioTotalCompra)
                .input('cantidad_compra', sql.Int, cantidadCompra)
                .input('id_registro', sql.Int, id)
                .query(
                    `UPDATE registro_facturacion SET 
                    id_proveedor = @id_proveedor, 
                    id_articulo = @id_articulo, 
                    fecha_compra = @fecha_compra, 
                    fecha_entrega = @fecha_entrega,
                    precio_unidad_compra = @precio_unidad_compra,
                    precio_total_compra = @precio_total_compra,
                    cantidad_compra = @cantidad_compra,
                    WHERE id_registro = @id_registro`
                );
            return result.recordset;
        }catch(error){
            throw error;
        }
    }
    async delete(id) {
        try {
            const pool = await poolDB;
            const result = await pool
                .request()
                .input('id_registro', sql.Int, id)
                .query("DELETE FROM registro_facturacion WHERE id_registro = @id_registro");
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = FacturaRepository;