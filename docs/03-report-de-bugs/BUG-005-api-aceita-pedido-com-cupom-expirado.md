# BUG-005 — Pedido com cupom expirado é aceito pela API

## Informações

| Campo               | Valor                          |
| ------------------- | ------------------------------ |
| ID                  | BUG-005                        |
| Módulo              | Pedido                         |
| Funcionalidade      | Validação de cupom expirado    |
| Severidade          | Alta                           |
| Prioridade          | Alta                           |
| Ambiente            | Ambiente de QA da Verzel Store |
| Navegador           | Brave v1.95.104                |
| Sistema Operacional | Windows 11                     |
| Status              | Aberto                         |

---

## Descrição

A API permite a criação de um pedido quando é informado o cupom expirado `VERAO2026`. O comportamento esperado é que o pedido seja rejeitado com o erro `CUPOM_EXPIRADO`.

## Pré-condições

* Acesso à API de criação de pedidos.
* Cupom `VERAO2026` disponível para teste.

## Passos para reprodução

1. Criar uma requisição de pedido.
2. Informar o cupom `VERAO2026`.
3. Enviar a requisição.
4. Observar o status HTTP e a resposta retornada.

## Resultado esperado

A API deve retornar status 422 com o erro `CUPOM_EXPIRADO`, impedindo a criação do pedido.

## Resultado obtido

A API retornou status 200. A resposta informou que o cupom não foi aplicado, porém o pedido não foi rejeitado.

## Impacto

A API permite a criação do pedido mesmo diante de um cupom expirado, não aplicando a validação esperada para impedir a continuidade desse cenário.

## Evidência

- [Imagem](https://github.com/user-attachments/assets/54ac01ff-9ce7-4918-8e9b-54b49ec81164)
