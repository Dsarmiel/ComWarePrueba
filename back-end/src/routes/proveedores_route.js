const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedor_controller');

router.get('/', proveedorController.getAll);
router.get('/filter', proveedorController.getByFilter);
router.get('/:id', proveedorController.getById);
router.post('/', proveedorController.create);
router.put('/:id', proveedorController.update);

module.exports = router;