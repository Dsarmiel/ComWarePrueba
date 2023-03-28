const ProveedorDTO = require('../dto/proveedor_dto');
const ProveedorRepository = require('../repositorys/proveedor_repository')
const proveedorRepository = new ProveedorRepository();
class ProveedorController {
    async getAll(req, res, next) {
        try {
            const proveedorList = await proveedorRepository.getAll();
            res.json(proveedorList);
        } catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        try {
            const proveedor = await proveedorRepository.getById(req.params.id);
            if (!proveedor) {
                res.status(404).json({ mensaje: 'Proveedor no encontrado' });
            }
            res.json(proveedor);
        } catch (error) {
            next(error);
        }
    }
    async getByFilter(req, res, next) {
        try {
            const filtros = new ProveedorDTO(req.query)
            const proveedorList = await proveedorRepository.getByFilter(filtros);
            res.json(proveedorList);
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            const proveedorCreated = await proveedorRepository.create(req.body);
            res.status(201).json(proveedorCreated);
        } catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const proveedorFind = await proveedorRepository.getById(req.params.id);
            if (!proveedorFind) {
                res.status(404).json({ mensaje: 'Proveedor no encontrado' });
            }
            const proveedorUpdate = await proveedorRepository.update(req.params.id, req.body);
            res.json(proveedorUpdate);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ProveedorController();