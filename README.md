
# API de Gerenciamento de Pedidos

## 1. Descrição

API REST desenvolvida em Node.js e Express para cadastrar, listar, consultar e atualizar pedidos. Os dados são armazenados em um banco de dados SQLite.

## 2. Tecnologias utilizadas

- Node.js
- Express
- SQLite
- Jest
- Postman

## 3. Arquitetura do projeto

- `src/server.js`: inicialização do servidor.
- `src/routes/`: definição das rotas HTTP.
- `src/controllers/`: tratamento das requisições e respostas.
- `src/services/`: regras de negócio e validações.
- `src/database/`: conexão e arquivo do banco SQLite.
- `src/__tests__/`: testes automatizados.
- `evidencias/`: capturas de tela dos testes manuais.

## 4. Como executar

1. Instale o Node.js.
2. Abra o terminal na pasta do projeto.
3. Instale as dependências:

   `npm install`

4. Inicie a API:

   `npm start`

5. Acesse `http://localhost:3000`.

O banco de dados e a tabela são criados pela aplicação quando a conexão é inicializada.

## 5. Endpoints

| Método | Rota | Descrição | Resposta esperada |
|---|---|---|---|
| POST | `/pedidos` | Cadastrar pedido | 201 |
| GET | `/pedidos` | Listar pedidos | 200 |
| GET | `/pedidos/:id` | Consultar pedido | 200 ou 404 |
| PATCH | `/pedidos/:id/status` | Atualizar status | 200, 400 ou 404 |

## 6. Exemplo de cadastro

Requisição `POST /pedidos`:

```json
{
  "cliente": "Maria Silva",
  "tipo": "entrega",
  "valor": 100,
  "prioridade": "alta"
}
```

O pedido é criado inicialmente com o status `recebido`.

## 7. Validações

- O cliente é obrigatório e não pode conter somente espaços.
- O tipo deve ser `entrega` ou `retirada`.
- O valor deve ser numérico e maior que zero.
- A prioridade deve ser `baixa`, `normal` ou `alta`.
- Pedidos inexistentes retornam 404.
- Dados inválidos retornam 400.
- Erros inesperados retornam 500.

## 8. Fluxo de status

- `recebido` → `em_preparacao` ou `cancelado`
- `em_preparacao` → `enviado` ou `cancelado`
- `enviado` → `entregue`
- `entregue` e `cancelado` são estados finais.

## 9. Testes automatizados

Execute:

`npm test`

Os testes verificam cadastro, listagem, validação, consulta e atualização de status.

## 10. Evidências

As capturas dos testes manuais estão na pasta `evidencias/`.

