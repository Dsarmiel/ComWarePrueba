
const ArticuloDTO = require('../dto/articulo_dto');
const ArticulosRepository = require('../repositorys/articulos_repository');
const articulosRepository = new ArticulosRepository();

class ArticulosController {
    async getAll(req, res, next) {
        try {
            const articulosList = await articulosRepository.getAll();
            res.json(articulosList);
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const articulo = await articulosRepository.getById(req.params.id);
            if (!articulo) {
                res.status(404).json({ mensaje: 'Articulo no encontrado' });
            }
            res.json(articulo);
        } catch (error) {
            next(error);
        }
    }
    async getByFilter(req, res, next){
        try {
            const filtros = new ArticuloDTO(req.query)
            const articulosList = await articulosRepository.getByFilter(filtros);
            res.json(articulosList);
        } catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            const articuloCreate = await articulosRepository.create(req.body);
            res.status(201).json(articuloCreate);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const articuloFind = await articulosRepository.getById(req.params.id);
            if (!articuloFind) {
                res.status(404).json({ mensaje: 'Articulo no encontrado' });
            }
            const articuloCreate = await articulosRepository.update(req.params.id, req.body);
            res.json(articuloCreate);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ArticulosController();