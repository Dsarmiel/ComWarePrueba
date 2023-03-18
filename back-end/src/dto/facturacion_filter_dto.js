class FacturacionFilterDTO {
    constructor({
        idRegistro,
        idProveedor,
        idArticulo,
        fechaCompra,
        fechaEntrega,
        precioUnidadCompra,
        precioTotalCompra,
        cantidadCompra,
      }) {
        this.idProveedor = idProveedor;
        this.idArticulo = idArticulo;
        this.fechaCompra = fechaCompra;
        this.fechaEntrega = fechaEntrega;
        this.precioUnidadCompra = precioUnidadCompra;
        this.precioTotalCompra = precioTotalCompra;
        this.cantidadCompra = cantidadCompra;
      }
    
      get getIdProveedor() {
        return this.idProveedor;
      }
    
      set setIdProveedor(value) {
        this.idProveedor = value;
      }
    
      get getIdArticulo() {
        return this.idArticulo;
      }
    
      set setIdArticulo(value) {
        this.idArticulo = value;
      }
    
      get getFechaCompra() {
        return this.fechaCompra;
      }
    
      set setFechaCompra(value) {
        this.fechaCompra = value;
      }
    
      get getFechaEntrega() {
        return this.fechaEntrega;
      }
    
      set setFechaEntrega(value) {
        this.fechaEntrega = value;
      }
    
      get getPrecioUnidadCompra() {
        return this.precioUnidadCompra;
      }
    
      set setPrecioUnidadCompra(value) {
        this.precioUnidadCompra = value;
      }
    
      get getPrecioTotalCompra() {
        return this.precioTotalCompra;
      }
    
      set setPrecioTotalCompra(value) {
        this.precioTotalCompra = value;
      }
    
      get getCantidadCompra() {
        return this.cantidadCompra;
      }
    
      set setCantidadCompra(value) {
        this.cantidadCompra = value;
      }
}

module.exports = FacturacionFilterDTO;