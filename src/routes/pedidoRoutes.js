
const express = require('express');
const router = express.Router();

const pedidoController = require('../controllers/pedidoController');

router.post('/', pedidoController.cadastrar);

router.get('/', pedidoController.listar);

router.get('/:id', pedidoController.buscarPorId);

router.patch('/:id/status', pedidoController.atualizarStatus);

module.exports = router;
