# BUG-004 — Pedido com cupom inexistente é aceito pela API

## Informações

| Campo               | Valor                          |
| ------------------- | ------------------------------ |
| ID                  | BUG-004                        |
| Módulo              | Pedido                         |
| Funcionalidade      | Validação de cupom             |
| Severidade          | Alta                           |
| Prioridade          | Alta                           |
| Ambiente            | Ambiente de QA da Verzel Store |
| Navegador           | Brave v1.95.104                |
| Sistema Operacional | Windows 11                     |
| Status              | Aberto                         |

---

## Descrição

A API permite a criação de um pedido mesmo quando é informado um cupom inexistente. De acordo com o contrato esperado, o pedido deveria ser rejeitado com o erro `CUPOM_INVALIDO`.

## Pré-condições

* Acesso à API de criação de pedidos.
* Dados de pedido disponíveis para envio.

## Passos para reprodução

1. Criar uma requisição de pedido.
2. Informar o cupom `XYZ123`.
3. Enviar a requisição.
4. Observar o status HTTP e a resposta retornada.

## Resultado esperado

A API deve retornar status 422 com o erro `CUPOM_INVALIDO`, impedindo a criação do pedido.

## Resultado obtido

A API retornou status 200. A resposta informou que o cupom não foi aplicado, porém o pedido não foi rejeitado.

## Impacto

A API permite a continuidade do fluxo de criação do pedido mesmo diante de um cupom inválido, contrariando o comportamento definido para a validação desse cenário.

## Evidência

- [Imagem](https://github.com/user-attachments/assets/7f240389-53fd-4842-8360-b1d81449d665)
