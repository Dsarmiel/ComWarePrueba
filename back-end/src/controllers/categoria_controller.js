const CategoriaRepository = require("../repositorys/categoria_repository");

const categoriaRepository = new CategoriaRepository();

class CategoriaController {
    async getAll(req, res, next) {
        try {
            const categoriaList = await categoriaRepository.getAll();
            res.json(categoriaList);
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const categoria = await categoriaRepository.getById(req.params.id);
            if (!categoria) {
                res.status(404).json({ mensaje: 'Categoria no encontrado' });
            }
            res.json(categoria);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const categoriaList = await categoriaRepository.create(req.body);
            res.json(categoriaList);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const categoriaFind = await categoriaRepository.getById(req.params.id);
            if (!categoriaFind) {
                res.status(404).json({ mensaje: 'Categoria no encontrado' });
            }
            const categoriaCreate = await categoriaRepository.update(req.params.id, req.body);
            res.json(categoriaCreate);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CategoriaController();