const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoria_controller')

router.get('/', categoriaController.getAll);
router.get('/:id', categoriaController.getById);
router.post('/', categoriaController.create);
router.put('/:id', categoriaController.update);

module.exports = router;