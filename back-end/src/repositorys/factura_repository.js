const FacturacionDTO = require('../dto/facturacion_dto')
const { poolDB, sql } = require('../config/database');
const FacturacionCreateDTO = require('../dto/factuacion_create_dto');
const FacturacionUpdateDTO = require('../dto/facturacion_update_dto');
const FacturacionFilterDTO = require('../dto/facturacion_filter_dto');
class FacturaRepository {
    async getAll() {
        try {
            const pool = await poolDB;
            const query = `
            SELECT  rf.*, 
            CONCAT('{ "id": "', CAST(pr.id_proveedor AS VARCHAR), '", "nombre": "', pr.nombre_proveedor, '" }') as proveedor, 
            CONCAT('{ "id": "', CAST(ar.id_articulo AS VARCHAR), '", "nombre": "', ar.nombre_articulo, '" }') as articulo 
            FROM registro_facturacion rf
            INNER JOIN proveedores pr ON pr.id_proveedor = rf.id_proveedor
            INNER JOIN articulos ar ON ar.id_articulo = rf.id_articulo
            `;
            const result = await pool.request().query(query);
            let facturacion = result.recordset.map((row) => new FacturacionDTO(row));
            console.log(facturacion)
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
            CONCAT('{ "id": "', CAST(pr.id_proveedor AS VARCHAR), '", "nombre": "', pr.nombre_proveedor, '" }') as proveedor, 
            CONCAT('{ "id": "', CAST(ar.id_articulo AS VARCHAR), '", "nombre": "', ar.nombre_articulo, '" }') as articulo 
            FROM registro_facturacion rf
            INNER JOIN proveedores pr ON pr.id_proveedor = rf.id_proveedor
            INNER JOIN articulos ar ON ar.id_articulo = rf.id_articulo
            WHERE rf.id_registro = @id_registro
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
    async getByFilter(filtrosDTO) {
        try {
            const pool = await poolDB;
            let whereList = [];
            const filtros = new FacturacionFilterDTO(filtrosDTO);
            let query = `
            SELECT  rf.*, 
            CONCAT('{ "id": "', CAST(pr.id_proveedor AS VARCHAR), '", "nombre": "', pr.nombre_proveedor, '" }') as proveedor, 
            CONCAT('{ "id": "', CAST(ar.id_articulo AS VARCHAR), '", "nombre": "', ar.nombre_articulo, '" }') as articulo 
            FROM registro_facturacion rf
            INNER JOIN proveedores pr ON pr.id_proveedor = rf.id_proveedor
            INNER JOIN articulos ar ON ar.id_articulo = rf.id_articulo
            `;
            if (filtros.idProveedor) {
                whereList.push(`rf.id_proveedor = ${filtros.idProveedor}`);
            }
            if (filtros.idArticulo) {
                whereList.push(`rf.id_articulo = ${filtros.idArticulo}`);
            }
            if (filtros.fechaCompra) {
                whereList.push(`rf.fecha_compra = '${filtros.fechaCompra}'`);
            }
            if (filtros.fechaEntrega) {
                whereList.push(`rf.fecha_entrega = '${filtros.fechaEntrega}'`);
            }
            if (filtros.precioUnidadCompra) {
                whereList.push(`rf.precio_unidad_compra = ${filtros.precioUnidadCompra}`);
            }
            if (filtros.precioUnidadCompra) {
                whereList.push(`rf.precio_unidad_compra = ${filtros.precioUnidadCompra}`);
            }
            if (filtros.precioTotalCompra) {
                whereList.push(`rf.precio_total_compra = ${filtros.precioTotalCompra}`);
            }
            if (filtros.cantidadCompra) {
                whereList.push(`rf.cantidad_compra = ${filtros.cantidadCompra}`);
            }
            if (whereList.length > 0) {
                query += ` WHERE ${whereList.join(' AND ')}`;
            }
            console.log(query)
            const result = await pool.request()
                .query(query);
            return result.recordset.map((row) => new FacturacionDTO(row));
        } catch (error) {
            throw error;
        }
    }
    async create(facturaToCreate) {
        try {
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
            let valuesInsertProveedorArticulo = await facturaCreate.articulos.map(articulo => `(${facturaCreate.idProveedor}, ${articulo.idArticulo})`).join(',');
            const queryFactura =
                `INSERT INTO registro_facturacion 
                (id_proveedor, id_articulo, fecha_compra, fecha_entrega, precio_unidad_compra, precio_total_compra, cantidad_compra) 
                VALUES ${valuesInsertFactura}`;
            const queryProveedorArticulo =
                `INSERT INTO proveedores_articulos  (id_proveedor, id_articulo) VALUES ${valuesInsertProveedorArticulo}`;
            let resultProveedorArticulo;
            const resultFactura = await pool.request().query(queryFactura)
                .then(async () => {
                    resultProveedorArticulo = await pool.request().query(queryProveedorArticulo);
                });
            return resultFactura
        } catch (error) {
            throw error;
        }

    }
    async update(id, factura) {
        try {
            const pool = await poolDB;
            const facturaUpdate = new FacturacionUpdateDTO(factura);
            const result = await pool
                .request()
                .input('id_proveedor', sql.Int, facturaUpdate.idProveedor)
                .input('id_articulo', sql.Int, facturaUpdate.idArticulo)
                .input('fecha_compra', sql.Date, facturaUpdate.fechaCompra)
                .input('fecha_entrega', sql.Date, facturaUpdate.fechaEntrega)
                .input('precio_unidad_compra', sql.Decimal, facturaUpdate.precioUnidadCompra)
                .input('precio_total_compra', sql.Decimal, facturaUpdate.precioTotalCompra)
                .input('cantidad_compra', sql.Int, facturaUpdate.cantidadCompra)
                .input('id_registro', sql.Int, id)
                .query(
                    `UPDATE registro_facturacion SET 
                    id_proveedor = @id_proveedor, 
                    id_articulo = @id_articulo, 
                    fecha_compra = @fecha_compra, 
                    fecha_entrega = @fecha_entrega,
                    precio_unidad_compra = @precio_unidad_compra,
                    precio_total_compra = @precio_total_compra,
                    cantidad_compra = @cantidad_compra
                    WHERE id_registro = @id_registro`
                );
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = FacturaRepository;