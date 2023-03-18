class CategoriaDTO {
    constructor({ nombreCategoria }) {
        this.nombreCategoria = nombreCategoria;
    }
    get getNombreCategoria() {
        return this.idCategoria;
    }
    set setNomebreCategoria(nombreCategoria) {
        this.nombreCategoria = nombreCategoria;
    }
}

module.exports = CategoriaDTO;