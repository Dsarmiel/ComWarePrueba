const FacturaRepository = require('../repositorys/factura_repository');
const facturaRepository = new FacturaRepository();
class FacturaController {
    async getAll(req, res, next) { 
        try {
            const facturaList = await facturaRepository.getAll();
            res.json(facturaList);
        } catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) { 
        try {
            const factura = await facturaRepository.getById(req.params.id);
            if (!factura) {
                res.status(404).json({ mensaje: 'Factura no encontrado' });
            }
            res.json(factura);
        } catch (error) {
            next(error);
        }
    }
    async getByFilter(req, res, next){
        try {
            const facturaList = await facturaRepository.getByFilter(req.body);
            res.json(facturaList);
        } catch (error) {
            next(error);
        }
    }
    async create(req, res, next) { 
        try {
            const facturaList = await facturaRepository.create(req.body);
            res.json(facturaList);
        } catch (error) {
            next(error);
        }
    }
    async update(req, res, next) { 
        try {
            const facturaFind = await facturaRepository.getById(req.params.id);
            if (!facturaFind) {
                res.status(404).json({ mensaje: 'Factura no encontrado' });
            }
            const facturaList = await facturaRepository.update(req.body);
            res.json(facturaList);
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new FacturaController();