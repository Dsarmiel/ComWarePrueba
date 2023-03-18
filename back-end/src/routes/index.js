const express = require('express');
const router = express.Router();
const articuloRoutes = require('./articulos_route');
const facturaRoute = require('./factura_route');
const proveedoresRoute = require('./proveedores_route');
const categoriasRoute = require('./categorias_route');

router.use('/articulos', articuloRoutes);
router.use('/facturacion', facturaRoute);
router.use('/proveedores', proveedoresRoute);
router.use('/categorias', categoriasRoute)

module.exports = router;