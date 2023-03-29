class FacturacionDTO {
    constructor({
        id_registro,
        fecha_compra,
        fecha_entrega,
        precio_unidad_compra,
        precio_total_compra,
        cantidad_compra,
        proveedor,
        articulo
    }) {
        this.id_registro = id_registro;
        this.fecha_compra = fecha_compra;
        this.fecha_entrega = fecha_entrega;
        this.precio_unidad_compra = precio_unidad_compra;
        this.precio_total_compra = precio_total_compra;
        this.cantidad_compra = cantidad_compra
        this.proveedor = JSON.parse(proveedor);
        this.articulo = JSON.parse(articulo);
    }
    get getIdRegistro() {
        return this.id_registro;
    }

    get getFechaCompra() {
        return this.fecha_compra;
    }

    get getFechaEntrega() {
        return this.fecha_entrega;
    }

    get getPrecioUnidadCompra() {
        return this.precio_unidad_compra;
    }

    get getPrecioTotalCompra() {
        return this.precio_total_compra;
    }

    get getCantidadCompra() {
        return this.cantidad_compra;
    }

    get getProveedor() {
        return this.proveedor;
    }

    get getArticulo() {
        return this.articulo;
    }

    set setIdRegistro(value) {
        this.id_registro = value;
    }

    set setFechaCompra(value) {
        this.fecha_compra = value;
    }

    set setFechaEntrega(value) {
        this.fecha_entrega = value;
    }

    set setPrecioUnidadCompra(value) {
        this.precio_unidad_compra = value;
    }

    set setPrecioTotalCompra(value) {
        this.precio_total_compra = value;
    }

    set setCantidadCompra(value) {
        this.cantidad_compra = value;
    }

    set setProveedor(value) {
        this.proveedor = value;
    }

    set setArticulo(value) {
        this.articulo = value;
    }
}

module.exports = FacturacionDTO;