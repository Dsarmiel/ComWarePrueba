class Articulo {
  constructor({id_articulo, nombre_articulo, descripcion, precio, cantidad_disponible, id_categoria}) {
    this.id_articulo = id_articulo;
    this.nombre_articulo = nombre_articulo;
    this.descripcion = descripcion;
    this.precio = precio;
    this.cantidad_disponible = cantidad_disponible;
    this.id_categoria = id_categoria
  }

  get getIdArticulo() {
    return this.id_articulo;
  }

  /**
   * @param {any} value
   */
  set setIdArticulo(value) {
    this.id_articulo = value;
  }

  get getNombreArticulo() {
    return this.nombre_articulo;
  }

  /**
   * @param {any} value
   */
  set setNombreArticulo(value) {
    this.nombre_articulo = value;
  }

  get getDescripcion() {
    return this.descripcion;
  }

  /**
   * @param {any} value
   */
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
  get getIdCategoria(){
    return this.id_categoria;
  }
  set getIdCategoria(value){
    this.id_categoria = value;
  }
}

module.exports = Articulo;
