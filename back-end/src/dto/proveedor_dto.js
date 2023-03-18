class ProveedorDTO {
    constructor({nombreProveedor, direccion, telefono, email}) {
        this.nombreProveedor = nombreProveedor;
        this.direccion = direccion;
        this.telefono = telefono;
        this.email = email;
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

module.exports = ProveedorDTO;