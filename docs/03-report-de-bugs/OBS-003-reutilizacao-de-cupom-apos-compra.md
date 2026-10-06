# OBS-003 — Cupom pode ser reaplicado após uma compra

## Informações

| Campo               | Valor                          |
| ------------------- | ------------------------------ |
| ID                  | OBS-003                        |
| Módulo              | Cupom de desconto              |
| Funcionalidade      | Reutilização de cupom          |
| Severidade          | Baixa                          |
| Prioridade          | Baixa                          |
| Ambiente            | Ambiente de QA da Verzel Store |
| Navegador           | Brave v1.95.104                |
| Sistema Operacional | Windows 11                     |
| Status              | Observação                     |

---

## Descrição

Após finalizar uma compra utilizando o cupom `BEMVINDO10`, foi possível iniciar uma nova compra e aplicar novamente o mesmo cupom.

A documentação não estabelece uma regra de uso único para o cupom. Portanto, não é possível classificar o comportamento como falha sem uma definição adicional da regra de negócio.

## Pré-condições

* Compra anterior finalizada utilizando `BEMVINDO10`.
* Possibilidade de iniciar uma nova compra.

## Passos para reprodução

1. Aplicar o cupom `BEMVINDO10` em uma compra.
2. Finalizar a compra.
3. Iniciar uma nova compra.
4. Adicionar um produto ao carrinho.
5. Aplicar novamente o cupom `BEMVINDO10`.
6. Observar o resultado.

## Resultado esperado

Não há uma regra de uso único definida na documentação. Portanto, o comportamento esperado não está especificado.

## Resultado obtido

O cupom `BEMVINDO10` pôde ser aplicado novamente após a finalização da compra anterior.

## Impacto

Se a regra de negócio posteriormente determinar que o cupom deve ser utilizado apenas uma vez por cliente ou pedido, será necessário implementar uma validação para impedir a reutilização.

## Observação

O comportamento pode ser intencional no ambiente de teste, e a documentação atual não fornece base suficiente para classificá-lo como bug.

## Evidência

- [Vídeo](https://github.com/user-attachments/assets/43a8649c-d814-4fe9-b4bc-dbd39eca7cfe)
