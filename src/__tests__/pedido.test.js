
const pedidoService = require('../services/pedidoService');
const db = require('../database/conexao');

beforeEach(() => {
    db.exec('DELETE FROM pedidos');
    db.exec("DELETE FROM sqlite_sequence WHERE name = 'pedidos'");
});

afterAll(() => {
    db.close();
});

describe('Testes do serviço de pedidos', () => {
    test('deve cadastrar um pedido válido', () => {
        const pedido = pedidoService.cadastrarPedido({
            cliente: 'Maria Silva',
            tipo: 'entrega',
            valor: 100,
            prioridade: 'alta'
        });

        expect(pedido.id).toBeDefined();
        expect(pedido.cliente).toBe('Maria Silva');
        expect(pedido.status).toBe('recebido');
    });

    
test('deve listar os pedidos cadastrados', () => {
    pedidoService.cadastrarPedido({
        cliente: 'João Silva',
        tipo: 'retirada',
        valor: 50,
        prioridade: 'normal'
    });

    const pedidos = pedidoService.listarPedidos();

    expect(pedidos.length).toBeGreaterThan(0);

    expect(
        pedidos.some(pedido => pedido.cliente === 'João Silva')
    ).toBe(true);
});

    test('deve rejeitar cliente vazio', () => {
        expect(() => {
            pedidoService.cadastrarPedido({
                cliente: '   ',
                tipo: 'entrega',
                valor: 100,
                prioridade: 'alta'
            });
        }).toThrow('O cliente é obrigatório.');
    });

    test('deve rejeitar valor igual a zero', () => {
        expect(() => {
            pedidoService.cadastrarPedido({
                cliente: 'Maria Silva',
                tipo: 'entrega',
                valor: 0,
                prioridade: 'alta'
            });
        }).toThrow('O valor deve ser numérico e maior que zero.');
    });

    test('deve retornar null para pedido inexistente', () => {
        const pedido = pedidoService.buscarPedidoPorId(999999);

        expect(pedido).toBeUndefined();
    });

    test('deve atualizar o status de um pedido', () => {
        const pedido = pedidoService.cadastrarPedido({
            cliente: 'Carlos Souza',
            tipo: 'entrega',
            valor: 80,
            prioridade: 'baixa'
        });

        const atualizado = pedidoService.atualizarStatus(
            pedido.id,
            'em_preparacao'
        );

        expect(atualizado.status).toBe('em_preparacao');
    });
});
