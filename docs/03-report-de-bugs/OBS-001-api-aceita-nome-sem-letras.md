# OBS-001 — API permite nome composto apenas por números

## Informações

| Campo               | Valor                          |
| ------------------- | ------------------------------ |
| ID                  | OBS-001                        |
| Módulo              | Pedido                         |
| Funcionalidade      | Validação do nome              |
| Severidade          | Média                          |
| Prioridade          | Média                          |
| Ambiente            | Ambiente de QA da Verzel Store |
| Navegador           | Brave v1.95.104                |
| Sistema Operacional | Windows 11                     |
| Status              | Observação                     |

---

## Descrição

A validação do nome permite o envio de um valor composto apenas por números e espaços. O valor `123 456` foi aceito e o pedido foi criado normalmente.

A documentação utilizada no teste exige nome e sobrenome, mas não define explicitamente que o campo deve conter letras. Por isso, o comportamento foi registrado como observação, e não como falha confirmada.

## Pré-condições

* Carrinho contendo pelo menos 1 item.
* Fluxo de criação de pedido disponível.

## Passos para reprodução

1. Iniciar um pedido com um item no carrinho.
2. Informar `123 456` no campo de nome.
3. Preencher os demais dados com valores válidos.
4. Finalizar o pedido.
5. Observar a validação do nome.

## Resultado esperado

O comportamento esperado não está definido de forma explícita quanto à exigência de letras no nome.

## Resultado obtido

O valor `123 456` foi aceito e o pedido foi criado.

## Impacto

Caso a regra de negócio exija nomes compostos por caracteres alfabéticos, a validação atual pode permitir dados inconsistentes no cadastro do pedido.

## Evidência
- [Imagem](https://github.com/user-attachments/assets/0a5f850b-557f-4430-a82e-ed4a16c9be3c)
