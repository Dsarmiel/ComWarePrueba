class Proveedor {
  constructor({idProveedor, nombreProveedor, direccion, telefono, email}) {
    this.idProveedor = idProveedor;
    this.nombreProveedor = nombreProveedor;
    this.direccion = direccion;
    this.telefono = telefono;
    this.email = email;
  }

  get getIdProveedor() {
    return this.idProveedor;
  }

  set setIdProveedor(value) {
    this.idProveedor = value;
  }

  get getNombreProveedor() {
    return this.nombreProveedor;
  }

  set setNombreProveedor(value) {
    this.nombreProveedor = value;
  }

  get getDireccion() {
    return this.direccion;
  }

  set setDireccion(value) {
    this.direccion = value;
  }

  get getTelefono() {
    return this.telefono;
  }

  set setTelefono(value) {
    this.telefono = value;
  }

  get getEmail() {
    return this.email;
  }

  set setEmail(value) {
    this.email = value;
  }
}

module.exports = Proveedor;