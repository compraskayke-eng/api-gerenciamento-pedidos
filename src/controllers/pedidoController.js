
const pedidoService = require('../services/pedidoService');

function listar(req, res) {
    try {
        const pedidos = pedidoService.listarPedidos();
        return res.status(200).json(pedidos);
    } catch (erro) {
        return res.status(500).json({
            erro: 'Erro interno do servidor.'
        });
    }
}

function buscarPorId(req, res) {
    try {
        const pedido = pedidoService.buscarPedidoPorId(req.params.id);

        if (!pedido) {
            return res.status(404).json({
                erro: 'Pedido não encontrado.'
            });
        }

        return res.status(200).json(pedido);
    } catch (erro) {
        return res.status(500).json({
            erro: 'Erro interno do servidor.'
        });
    }
}

function cadastrar(req, res) {
    try {
        const pedido = pedidoService.cadastrarPedido(req.body);
        return res.status(201).json(pedido);
    } catch (erro) {
        const status = erro.statusCode || 500;

        return res.status(status).json({
            erro: status === 500
                ? 'Erro interno do servidor.'
                : erro.message
        });
    }
}

function atualizarStatus(req, res) {
    try {
        const pedido = pedidoService.atualizarStatus(
            req.params.id,
            req.body?.status
        );

        if (!pedido) {
            return res.status(404).json({
                erro: 'Pedido não encontrado.'
            });
        }

        return res.status(200).json(pedido);
    } catch (erro) {
        const status = erro.statusCode || 500;

        return res.status(status).json({
            erro: status === 500
                ? 'Erro interno do servidor.'
                : erro.message
        });
    }
}

module.exports = {
    listar,
    buscarPorId,
    cadastrar,
    atualizarStatus
};
