# OBS-002 — Campo de nome aceita valores sem letras na interface

## Informações

| Campo               | Valor                          |
| ------------------- | ------------------------------ |
| ID                  | OBS-002                        |
| Módulo              | Checkout                       |
| Funcionalidade      | Validação do nome              |
| Severidade          | Média                          |
| Prioridade          | Média                          |
| Ambiente            | Ambiente de QA da Verzel Store |
| Navegador           | Brave v1.95.104                |
| Sistema Operacional | Windows 11                     |
| Status              | Observação                     |

---

## Descrição

O campo de nome completo da interface aceita valores que não possuem letras. Durante o teste, `123 233` e `@@@ ###` foram aceitos como nome e sobrenome.

A documentação informa apenas que o campo deve conter nome e sobrenome, sem especificar explicitamente uma regra de composição por letras. Por esse motivo, o comportamento foi registrado como observação.

## Pré-condições

* Produto adicionado ao carrinho.
* Checkout disponível.

## Passos para reprodução

1. Adicionar um produto ao carrinho.
2. Avançar para o checkout.
3. Informar `123 233` no campo de nome completo.
4. Observar a validação.
5. Repetir com `@@@ ###`.

## Resultado esperado

A documentação não define explicitamente se valores sem letras devem ser rejeitados.

## Resultado obtido

Os valores `123 233` e `@@@ ###` foram aceitos pelo campo de nome completo.

## Impacto

Caso exista uma regra de negócio que exija nomes compostos por caracteres alfabéticos, a validação atual pode permitir dados inconsistentes.

## Evidência

- [Vídeo](https://github.com/user-attachments/assets/0c74f744-a679-4452-a36f-d75c3c92e9ff)
