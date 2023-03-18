class Articulo {
  constructor({id_articulo, nombre_articulo, descripcion, precio, cantidad_disponible}) {
    this.id_articulo = id_articulo;
    this.nombre_articulo = nombre_articulo;
    this.descripcion = descripcion;
    this.precio = precio;
    this.cantidad_disponible = cantidad_disponible;
  }

  get getIdArticulo() {
    return this.id_articulo;
  }

  set setIdArticulo(value) {
    this.id_articulo = value;
  }

  get getNombreArticulo() {
    return this.nombre_articulo;
  }

  set setNombreArticulo(value) {
    this.nombre_articulo = value;
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
    return this.cantidad_disponible;
  }

  set setCantidadDisponible(value) {
    this.cantidad_disponible = value;
  }
}

module.exports = Articulo;
