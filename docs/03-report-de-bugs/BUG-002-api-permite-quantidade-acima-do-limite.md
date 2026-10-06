# BUG-002 — API permite quantidade de produto acima do limite máximo

## Informações

| Campo               | Valor                          |
| ------------------- | ------------------------------ |
| ID                  | BUG-002                        |
| Módulo              | Quantidade máxima              |
| Funcionalidade      | Cálculo de quantidade pela API |
| Severidade          | Alta                           |
| Prioridade          | Alta                           |
| Ambiente            | Ambiente de QA da Verzel Store |
| Navegador           | Brave v1.95.104                |
| Sistema Operacional | Windows 11                     |
| Status              | Aberto                         |

---

## Descrição

A API de cálculo permite quantidades superiores ao limite máximo de 5 unidades por produto. As quantidades 6 e 100 foram aceitas, embora a regra estabeleça que valores acima de 5 devem retornar o erro `QUANTIDADE_MAXIMA_EXCEDIDA`.

Na interface, o limite de 5 unidades é respeitado.

## Pré-condições

* Acesso ao endpoint de cálculo da API.
* Produto disponível para inclusão no carrinho.

## Passos para reprodução

1. Enviar uma requisição de cálculo contendo um produto com quantidade 6.
2. Observar a resposta da API.
3. Repetir o teste utilizando quantidade 100.
4. Observar os retornos.

## Resultado esperado

Quantidades superiores a 5 devem ser rejeitadas pela API, retornando status 422 com o erro `QUANTIDADE_MAXIMA_EXCEDIDA`.

## Resultado obtido

As quantidades 6 e 100 foram aceitas pela API, sem retorno de `QUANTIDADE_MAXIMA_EXCEDIDA`.

## Impacto

A regra de quantidade máxima é aplicada apenas na interface, permitindo que requisições diretas à API contornem uma restrição de negócio existente na UI.

## Evidência

- [Imagem](https://github.com/user-attachments/assets/c14cd614-07a5-41fa-a5bb-10b23dbb52f3)
