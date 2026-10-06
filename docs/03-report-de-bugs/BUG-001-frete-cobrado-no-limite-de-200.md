# BUG-001 — Frete é cobrado quando o subtotal é exatamente R$ 200,00

## Informações

| Campo               | Valor                          |
| ------------------- | ------------------------------ |
| ID                  | BUG-001                        |
| Módulo              | Frete grátis                   |
| Funcionalidade      | Cálculo de frete               |
| Severidade          | Alta                           |
| Prioridade          | Alta                           |
| Ambiente            | Ambiente de QA da Verzel Store |
| Navegador           | Brave v1.95.104                |
| Sistema Operacional | Windows 11                     |
| Status              | Aberto                         |

---

## Descrição

Quando o subtotal do carrinho é exatamente R$ 200,00, a API cobra o frete de R$ 19,90, embora a regra definida para o sistema determine que o frete grátis deve ser aplicado a partir de R$ 200,00.

O comportamento esperado é que o limite de R$ 200,00 seja inclusivo.

## Pré-condições

* Carrinho vazio.
* Produtos disponíveis para inclusão no carrinho.

## Passos para reprodução

1. Adicionar 2 unidades do produto P005 ao carrinho.
2. Garantir que o subtotal seja exatamente R$ 200,00.
3. Consultar o cálculo do frete pela API.
4. Observar o valor do frete retornado.

## Resultado esperado

O sistema deve considerar o limite de R$ 200,00 como inclusivo, retornando `freteGratis: true` e frete de R$ 0,00.

## Resultado obtido

A API retornou frete de R$ 19,90 para um subtotal exatamente igual a R$ 200,00.

## Impacto

A regra de frete grátis é aplicada de forma inconsistente entre a interface e a API, podendo resultar em cobrança indevida de frete para pedidos que atingem exatamente o limite estabelecido.

## Evidência

- [Imagem](<img width="1600" height="933" alt="BUG-001-evidencia-frete-200" src="https://github.com/user-attachments/assets/ea04a601-f5b9-4e0e-b343-7afe996dbd34" />)
