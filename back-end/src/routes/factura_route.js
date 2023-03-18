const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/factura_controller')

router.get('/', facturaController.getAll);
router.get('/:id', facturaController.getById);
router.get('/filter', facturaController.getByFilter);
router.post('/', facturaController.create);
router.put('/:id', facturaController.update);

module.exports = router;