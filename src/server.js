
const express = require('express');
const pedidoRoutes = require('./routes/pedidoRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        mensagem: 'API de Gerenciamento de Pedidos funcionando!'
    });
});

app.use('/pedidos', pedidoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
