class FacturacionArticuloDTO {
    constructor({
        idArticulo,
        precioUnidadCompra,
        precioTotalCompra,
        cantidadCompra,
    }) {
        this.idArticulo = idArticulo;
        this.precioUnidadCompra = precioUnidadCompra;
        this.precioTotalCompra = precioTotalCompra;
        this.cantidadCompra = cantidadCompra;
    }
    get getIdArticulo() {
        return this.idArticulo;
    }

    get getPrecioUnidadCompra() {
        return this.precioUnidadCompra;
    }

    get getPrecioTotalCompra() {
        return this.precioTotalCompra;
    }

    get getCantidadCompra() {
        return this.cantidadCompra;
    }

    set setIdArticulo(value) {
        this.idArticulo = value;
    }

    set setPrecioUnidadCompra(value) {
        this.precioUnidadCompra = value;
    }

    set setPrecioTotalCompra(value) {
        this.precioTotalCompra = value;
    }

    set setCantidadCompra(value) {
        this.cantidadCompra = value;
    }
}

module.exports = FacturacionArticuloDTO;