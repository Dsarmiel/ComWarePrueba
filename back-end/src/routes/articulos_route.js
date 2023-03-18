const express = require('express');
const router = express.Router();
const articuloController = require('../controllers/articulos_controller')

router.get('/', articuloController.getAll);
router.get('/filter', articuloController.getByFilter);
router.get('/:id', articuloController.getById);
router.post('/', articuloController.create);
router.put('/:id', articuloController.update);
router.delete('/:id', articuloController.delete);

module.exports = router;