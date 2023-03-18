class ArticuloDTO {
    constructor({nombre, descripcion, precio, cantidad}) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.cantidad = cantidad;
      }

      get getNombre() {
        return this.nombre;
      }
    
      set setNombre(value) {
        this.nombre = value;
      }
    
      get getDescripcion() {
        return this.descripcion;
      }
    
      set setDescripcion(value) {
        this.descripcion = value;
      }
    
      get getPrecio() {
        return this.precio;
      }
    
      set setPrecio(value) {
        this.precio = value;
      }
    
      get getCantidadDisponible() {
        return this.cantidad;
      }
    
      set setCantidadDisponible(value) {
        this.cantidad = value;
      }
}

module.exports = ArticuloDTO;