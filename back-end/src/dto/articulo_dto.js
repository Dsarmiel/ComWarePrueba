class ArticuloDTO {
  constructor({ nombre, descripcion, precio, cantidad, categoria }) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.cantidad = cantidad;
    this.categoria = categoria;
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
  get getCategoria() {
    return this.categoria;
  }
  set setCategoria(value) {
    this.categoria = value;
  }
}

module.exports = ArticuloDTO;