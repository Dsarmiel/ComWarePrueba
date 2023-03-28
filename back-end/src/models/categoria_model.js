class Categoria {
    constructor({ id_categoria, nombre_categoria }) {
        this.idCategoria = id_categoria;
        this.nombreCategoria = nombre_categoria;
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