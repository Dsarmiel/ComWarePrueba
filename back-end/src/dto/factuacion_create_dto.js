class FacturacionCreateDTO {
    constructor({
        idProveedor,
        fechaCompra,
        fechaEntrega,
        articulos,
    }) {
        this.idProveedor = idProveedor;
        this.fechaCompra = fechaCompra;
        this.fechaEntrega = fechaEntrega;
        this.articulos = articulos;
    }
    get getIdProveedor() {
        return this.idProveedor;
    }
    get getFechaCompra() {
        return this.fechaCompra;
    }
    get getFechaEntrega() {
        return this.fechaEntrega;
    }
    get getArticulos() {
        return this.articulos;
    }
    set setIdProveedor(value) {
        this.idProveedor = value;
    }
    set setFechaCompra(value) {
        this.fechaCompra = value;
    }
    set setFechaEntrega(value) {
        this.fechaEntrega = value;
    }
    set setArticulos(value) {
        this.articulos = value;
    }
}
module.exports = FacturacionCreateDTO;