class Categoria {
    constructor({ idCategoria, nombreCategoria }) {
        this.idCategoria = idCategoria;
        this.nombreCategoria = nombreCategoria;
    }
    get getIdCategoria() {
        return this.idCategoria;
    }
    set setIdCategoria(idCategoria) {
        this.idCategoria = idCategoria;
    }
    get getNombreCategoria() {
        return this.idCategoria;
    }
    set setNomebreCategoria(nombreCategoria) {
        this.nombreCategoria = nombreCategoria;
    }
}

module.exports = Categoria;