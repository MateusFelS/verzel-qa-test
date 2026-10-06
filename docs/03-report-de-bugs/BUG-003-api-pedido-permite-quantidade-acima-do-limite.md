# BUG-003 — API de pedidos permite quantidade de produto acima do limite máximo

## Informações

| Campo               | Valor                             |
| ------------------- | --------------------------------- |
| ID                  | BUG-003                           |
| Módulo              | Pedido                            |
| Funcionalidade      | Validação da quantidade dos itens |
| Severidade          | Alta                              |
| Prioridade          | Alta                              |
| Ambiente            | Ambiente de QA da Verzel Store    |
| Navegador           | Brave v1.95.104                   |
| Sistema Operacional | Windows 11                        |
| Status              | Aberto                            |

---

## Descrição

A API de criação de pedidos também permite que um pedido seja enviado com quantidade superior ao limite máximo de 5 unidades por produto.

## Pré-condições

* API de criação de pedidos disponível.
* Produto P001 disponível.

## Passos para reprodução

1. Criar uma requisição de pedido contendo o produto P001.
2. Informar quantidade igual a 6 para o produto.
3. Enviar a requisição.
4. Observar a resposta da API.

## Resultado esperado

A API deve rejeitar o pedido e retornar status 422 com o erro `QUANTIDADE_MAXIMA_EXCEDIDA`, indicando o campo `itens[0].quantidade`.

## Resultado obtido

O pedido contendo 6 unidades de P001 foi aceito, sem retorno de `QUANTIDADE_MAXIMA_EXCEDIDA`.

## Impacto

A validação do limite máximo não é aplicada na API de pedidos, permitindo a criação de pedidos que ultrapassam a regra de quantidade estabelecida para cada produto.

## Evidência

- [Imagem](https://github.com/user-attachments/assets/a53bae58-a946-485c-81da-d55a4f5000df)
