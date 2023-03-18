const express = require('express');
const router = express.Router();
const articuloRoutes = require('./articulos_route');
const facturaRoute = require('./factura_route');
const proveedoresRoute = require('./proveedores_route');

router.use('/articulos', articuloRoutes);
router.use('/facturacion', facturaRoute);
router.use('/proveedores', proveedoresRoute);

module.exports = router;