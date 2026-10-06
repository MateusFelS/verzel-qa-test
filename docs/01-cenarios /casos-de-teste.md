# Casos de Teste: Cupom de desconto e frete grátis (VZS-142 v2.3.0)

## Como ler este documento

- **ID**: CT-xxx, usado também nas planilhas de execução, nos bugs e na automação.
- **CA**: critério de aceite coberto (ou "Geral" para regras fora dos CAs).
- **Tipo**: `UI`, `API` ou `UI/API`.
- **Prioridade**: Alta (regra de negócio central), Média, Baixa.
- **Exploratório**: o resultado esperado depende de interpretação. Ver `ambiguidades.md`.

**Produtos usados:** P001 R$ 59,90 · P002 R$ 139,90 · P003 R$ 189,90 · P004 R$ 49,90 · P005 R$ 100,00 · P006 R$ 29,90 · P007 R$ 229,90 · P008 R$ 50,00
**Cupons:** BEMVINDO10 (10%, válido) · VERAO2026 (15%, expirado em 31/03/2026)

---

## 1. Cupom de desconto (CA01 a CA05)

### CT-001 | CA01 | UI/API | Alta
Aplicar o cupom BEMVINDO10 em um carrinho simples.

```gherkin
Cenário: Aplicar cupom válido BEMVINDO10
  Dado que o carrinho contém 1 unidade de "Mochila Urbana 20L" (P005)
  Quando o cliente aplica o cupom "BEMVINDO10"
  Então o subtotal é R$ 100,00
  E o desconto é R$ 10,00
  E o frete é R$ 19,90
  E o total é R$ 109,90
  E a mensagem é "Cupom aplicado: 10% de desconto nos produtos."
```

### CT-002 | CA01 | API | Alta
Reproduzir o exemplo oficial da documentação.

```gherkin
Cenário: Exemplo da documentação com dois produtos
  Dado que o carrinho contém 1 "Calça Jeans Slim" (P002) e 2 "Boné Aba Curva" (P004)
  Quando o cliente aplica o cupom "BEMVINDO10"
  Então o subtotal é R$ 239,70
  E o desconto é R$ 23,97
  E o frete é R$ 0,00
  E o total é R$ 215,73
```

### CT-003 | CA02 | UI/API | Alta
Código do cupom ignora maiúsculas/minúsculas e espaços nas pontas.

```gherkin
Esquema do Cenário: Variações válidas do código do cupom
  Dado que o carrinho contém 1 "Mochila Urbana 20L" (P005)
  Quando o cliente aplica o cupom "<digitado>"
  Então o cupom é aplicado
  E o desconto é R$ 10,00

  Exemplos:
    | digitado          |
    | "BEMVINDO10"      |
    | "bemvindo10"      |
    | "BemVindo10"      |
    | "  BEMVINDO10"    |
    | "BEMVINDO10  "    |
    | "  bemvindo10  "  |
```

### CT-004 | CA02 | UI/API | Média | Exploratório
Espaço no meio do código (o CA02 só fala de espaços no início e no fim).

```gherkin
Cenário: Espaço no meio do código
  Dado que o carrinho contém 1 "Mochila Urbana 20L" (P005)
  Quando o cliente aplica o cupom "BEM VINDO10"
  Então a mensagem é "Cupom inválido."
  E nenhum desconto é aplicado
```
> Interpretação assumida: apenas espaços nas pontas são ignorados.

### CT-005 | CA03 | UI/API | Alta
Cupom inexistente.

```gherkin
Esquema do Cenário: Cupom inexistente
  Dado que o carrinho contém 1 "Mochila Urbana 20L" (P005)
  Quando o cliente aplica o cupom "<codigo>"
  Então a mensagem é "Cupom inválido."
  E o desconto é R$ 0,00
  E o total é R$ 119,90

  Exemplos:
    | codigo       |
    | XYZ123       |
    | BEMVINDO     |
    | BEMVINDO100  |
    | BEMVINDO1O   |
```

### CT-006 | CA03 | UI/API | Média | Exploratório
Cupom vazio ou só com espaços (sem critério definido).

```gherkin
Esquema do Cenário: Cupom vazio ou em branco
  Dado que o carrinho contém 1 "Mochila Urbana 20L" (P005)
  Quando o cliente aplica o cupom "<codigo>"
  Então nenhum desconto é aplicado
  E nenhum erro inesperado (500, tela quebrada) é exibido

  Exemplos:
    | codigo  |
    | ""      |
    | "   "   |
```
> Registrar se o sistema trata como "sem cupom" ou como "Cupom inválido." e documentar a interpretação.

### CT-007 | CA04 | UI/API | Alta
Cupom expirado.

```gherkin
Cenário: Cupom expirado
  Dado que o carrinho contém 1 "Mochila Urbana 20L" (P005)
  Quando o cliente aplica o cupom "VERAO2026"
  Então a mensagem é "Cupom expirado."
  E o desconto é R$ 0,00
  E o total é R$ 119,90
```

### CT-008 | CA04 | UI/API | Média
Cupom expirado é diferente de inexistente, mesmo com variação de caixa e espaços.

```gherkin
Cenário: Expirado com variação de escrita
  Dado que o carrinho contém 1 "Mochila Urbana 20L" (P005)
  Quando o cliente aplica o cupom "  verao2026 "
  Então a mensagem é "Cupom expirado." e não "Cupom inválido."
```

### CT-009 | CA05 | UI | Alta | Exploratório
Tentar aplicar um segundo cupom sem remover o primeiro.

```gherkin
Cenário: Segundo cupom sem remover o atual
  Dado que o cupom "BEMVINDO10" está aplicado
  Quando o cliente tenta aplicar o cupom "VERAO2026"
  Então apenas um cupom permanece aplicado
  E o desconto nunca é somado (máximo 10% sobre o subtotal)
```
> Registrar se a interface bloqueia a ação ou substitui o cupom. O CA05 diz que, para trocar, o cliente remove e aplica outro, então o esperado é bloquear.

### CT-010 | CA05 | UI | Alta
Trocar de cupom removendo o atual.

```gherkin
Cenário: Remover cupom e aplicar outro
  Dado que o carrinho contém 1 "Mochila Urbana 20L" (P005)
  E o cupom "BEMVINDO10" está aplicado
  Quando o cliente remove o cupom
  Então o desconto volta a R$ 0,00
  E o total volta a R$ 119,90
  Quando o cliente aplica o cupom "bemvindo10"
  Então o desconto é R$ 10,00
```

### CT-011 | CA05 | UI | Baixa
Aplicar o mesmo cupom duas vezes.

```gherkin
Cenário: Reaplicar o mesmo cupom
  Dado que o cupom "BEMVINDO10" está aplicado em um carrinho de R$ 100,00
  Quando o cliente aplica novamente "BEMVINDO10"
  Então o desconto continua R$ 10,00 (não é duplicado)
```

### CT-012 | CA01 | UI | Alta
Recalcular o desconto ao alterar a quantidade.

```gherkin
Cenário: Alterar quantidade com cupom aplicado
  Dado que o cupom "BEMVINDO10" está aplicado a 1 "Mochila Urbana 20L"
  Quando o cliente altera a quantidade para 3
  Então o subtotal é R$ 300,00
  E o desconto é R$ 30,00
  E o frete é R$ 0,00
  E o total é R$ 270,00
```

### CT-013 | CA01 | UI | Média
Recalcular o desconto ao remover um item.

```gherkin
Cenário: Remover item com cupom aplicado
  Dado que o carrinho contém 1 "Mochila Urbana 20L" e 1 "Garrafa Térmica 750ml"
  E o cupom "BEMVINDO10" está aplicado (desconto R$ 15,00)
  Quando o cliente remove a "Garrafa Térmica 750ml"
  Então o desconto é recalculado para R$ 10,00
```

---

## 2. Frete grátis (CA06 a CA09)

### CT-014 | CA06, CA07 | UI/API | Alta
Frete conforme o subtotal, sem cupom.

```gherkin
Esquema do Cenário: Frete e valor faltante sem cupom
  Dado que o carrinho contém <itens>
  Quando o carrinho é calculado
  Então o subtotal é R$ <subtotal>
  E o frete é R$ <frete>
  E o valor faltante é R$ <faltante>
  E o total é R$ <total>

  Exemplos:
    | itens            | subtotal | frete | faltante | total  |
    | 1x P001          | 59,90    | 19,90 | 140,10   | 79,80  |
    | 3x P001          | 179,70   | 19,90 | 20,30    | 199,60 |
    | P005+P008+P004   | 199,90   | 19,90 | 0,10     | 219,80 |
    | 2x P005          | 200,00   | 0,00  | 0,00     | 200,00 |
    | P005+2x P008     | 200,00   | 0,00  | 0,00     | 200,00 |
    | 1x P007          | 229,90   | 0,00  | 0,00     | 229,90 |
```

### CT-015 | CA06 | UI/API | Alta
Limite de R$ 200,00 é inclusivo (valor de fronteira).

```gherkin
Cenário: Subtotal exatamente R$ 200,00
  Dado que o carrinho contém 2 "Mochila Urbana 20L" (P005)
  Quando o carrinho é calculado
  Então "freteGratis" é verdadeiro
  E o frete é R$ 0,00
```

### CT-016 | CA07 | UI/API | Alta
Logo abaixo do limite (R$ 199,90) ainda cobra frete.

```gherkin
Cenário: Subtotal R$ 199,90
  Dado que o carrinho contém P005, P008 e P004 (1 unidade de cada)
  Quando o carrinho é calculado
  Então "freteGratis" é falso
  E o frete é R$ 19,90
  E o valor faltante é R$ 0,10
```

### CT-017 | CA07 | UI | Alta
O carrinho informa quanto falta.

```gherkin
Cenário: Mensagem de valor faltante
  Dado que o carrinho contém 1 "Camiseta Essencial" (P001)
  Quando o cliente visualiza o carrinho
  Então a interface informa que faltam R$ 140,10 para o frete grátis
```

### CT-018 | CA07 | UI | Média
O aviso desaparece ao atingir o limite.

```gherkin
Cenário: Atingir o frete grátis alterando a quantidade
  Dado que o carrinho contém 1 "Camiseta Essencial" (P001)
  Quando o cliente altera a quantidade para 4
  Então o subtotal é R$ 239,60
  E o frete é R$ 0,00
  E a interface não exibe valor faltante
```

### CT-019 | CA08 | UI/API | Alta
Frete grátis considera o subtotal antes do desconto.

```gherkin
Esquema do Cenário: Frete com cupom aplicado
  Dado que o carrinho contém <itens>
  E o cupom "BEMVINDO10" é aplicado
  Quando o carrinho é calculado
  Então o subtotal é R$ <subtotal>
  E o desconto é R$ <desconto>
  E o frete é R$ <frete>
  E o valor faltante é R$ <faltante>
  E o total é R$ <total>

  Exemplos:
    | itens          | subtotal | desconto | frete | faltante | total  |
    | 1x P005        | 100,00   | 10,00    | 19,90 | 100,00   | 109,90 |
    | P005+P008+P004 | 199,90   | 19,99    | 19,90 | 0,10     | 199,81 |
    | 2x P005        | 200,00   | 20,00    | 0,00  | 0,00     | 180,00 |
    | 1x P007        | 229,90   | 22,99    | 0,00  | 0,00     | 206,91 |
```

### CT-020 | CA08 | UI | Alta
Desconto não "cancela" o frete grátis.

```gherkin
Cenário: Total abaixo de R$ 200,00 após o cupom
  Dado que o carrinho contém 2 "Mochila Urbana 20L" (P005)
  Quando o cliente aplica o cupom "BEMVINDO10"
  Então o total é R$ 180,00
  E o frete continua R$ 0,00
  E a interface não exibe valor faltante
```

### CT-021 | CA09 | UI/API | Alta
Desconto não incide sobre o frete.

```gherkin
Cenário: Frete preservado com cupom
  Dado que o carrinho contém 1 "Mochila Urbana 20L" (P005)
  Quando o cliente aplica o cupom "BEMVINDO10"
  Então o frete é R$ 19,90 (e não R$ 17,91)
  E o total é R$ 109,90
```

---

## 3. Quantidade máxima e arredondamento (CA10, CA11)

### CT-022 | CA10 | API | Alta
Limite de quantidade na API de cálculo, incluindo valores inválidos.

```gherkin
Esquema do Cenário: Quantidade em POST /api/carrinho/calcular
  Quando envio 1 item "P001" com quantidade <qtd>
  Então o status é <status>
  E o código de erro é "<codigo>"

  Exemplos:
    | qtd   | status | codigo                     |
    | 1     | 200    |                            |
    | 5     | 200    |                            |
    | 6     | 422    | QUANTIDADE_MAXIMA_EXCEDIDA |
    | 100   | 422    | QUANTIDADE_MAXIMA_EXCEDIDA |
    | 0     | 422    | QUANTIDADE_INVALIDA        |
    | -1    | 422    | QUANTIDADE_INVALIDA        |
    | 2.5   | 422    | QUANTIDADE_INVALIDA        |
    | "2"   | 422    | QUANTIDADE_INVALIDA        |
    | null  | 422    | QUANTIDADE_INVALIDA        |
```

### CT-023 | CA10 | API | Alta
A mesma regra vale na API de pedidos.

```gherkin
Cenário: 6 unidades em POST /api/pedidos
  Quando envio um pedido com cliente válido e 6 unidades de "P001"
  Então o status é 422
  E o código é "QUANTIDADE_MAXIMA_EXCEDIDA"
  E o campo é "itens[0].quantidade"
```

### CT-024 | CA10 | UI | Alta
Botão de aumentar no limite.

```gherkin
Cenário: Aumentar além de 5 pelo botão
  Dado que o carrinho contém 5 "Camiseta Essencial"
  Quando o cliente tenta aumentar a quantidade
  Então a quantidade permanece 5
  E a interface informa o limite de 5 unidades por produto
```

### CT-025 | CA10 | UI | Alta
Digitar quantidade acima do limite no campo.

```gherkin
Esquema do Cenário: Digitar quantidade inválida
  Dado que o carrinho contém 1 "Camiseta Essencial"
  Quando o cliente digita "<valor>" no campo de quantidade
  Então a quantidade não é aceita como "<valor>"

  Exemplos:
    | valor |
    | 6     |
    | 99    |
    | 0     |
    | -1    |
    | 2.5   |
    | abc   |
```

### CT-026 | CA10 | UI | Média
Adicionar pela vitrine um produto que já está no limite.

```gherkin
Cenário: Adicionar pela vitrine com 5 unidades no carrinho
  Dado que o carrinho contém 5 "Camiseta Essencial"
  Quando o cliente adiciona "Camiseta Essencial" novamente pela vitrine
  Então a quantidade permanece 5
```

### CT-027 | CA10 | UI | Baixa
O limite é por produto, não por carrinho.

```gherkin
Cenário: Limite por produto
  Quando o cliente adiciona 5 "Camiseta Essencial" e 5 "Boné Aba Curva"
  Então ambos os itens são aceitos
```

### CT-028 | CA11 | API | Alta
Valores monetários com no máximo 2 casas decimais.

```gherkin
Esquema do Cenário: Arredondamento com cupom
  Dado que o carrinho contém <itens>
  E o cupom "BEMVINDO10" é aplicado
  Quando o carrinho é calculado
  Então subtotal = <subtotal>, desconto = <desconto> e total = <total>
  E nenhum valor monetário tem mais de 2 casas decimais

  Exemplos:
    | itens   | subtotal | desconto | total  |
    | 3x P001 | 179.7    | 17.97    | 181.63 |
    | 3x P002 | 419.7    | 41.97    | 377.73 |
    | 3x P006 | 89.7     | 8.97     | 100.63 |
    | 3x P004 | 149.7    | 14.97    | 154.63 |
    | 5x P003 | 949.5    | 94.95    | 854.55 |
    | 5x P001 | 299.5    | 29.95    | 269.55 |
```
> Com os preços atuais, 10% nunca gera 3ª casa decimal. O risco real é imprecisão de ponto flutuante (ex.: `59.9 * 3 = 179.70000000000002` em JS). Verificar a resposta bruta do JSON.

### CT-029 | CA11 | UI | Média
Formatação na interface.

```gherkin
Cenário: Formato monetário brasileiro
  Dado que o carrinho contém 3 "Camiseta Essencial" (P001)
  Quando o cliente visualiza o carrinho
  Então o subtotal é exibido como "R$ 179,70"
  E todos os valores têm exatamente 2 casas decimais
```

---

## 4. Pedido e regras pré-existentes (Geral)

### CT-030 | Geral, CA01 | API/UI | Alta
Pedido válido com cupom.

```gherkin
Cenário: Confirmar pedido com cupom
  Dado que o carrinho contém 1 "Mochila Urbana 20L" (P005)
  Quando confirmo o pedido com nome "Maria Silva", e-mail "maria@exemplo.com", CEP "01310-100" e cupom "BEMVINDO10"
  Então o status é 201
  E o número segue o formato "VZ-" mais 6 dígitos
  E subtotal = 100, desconto = 10, frete = 19.9, total = 109.9
  E o CEP retornado é "01310100"
```

### CT-031 | Geral | API/UI | Alta
Pedido válido sem cupom.

```gherkin
Cenário: Confirmar pedido sem cupom
  Quando confirmo o pedido sem informar cupom
  Então o status é 201
  E o desconto é 0 e o total é 119.9
```

### CT-032 | CA03 | API | Alta
Cupom inexistente em pedido gera erro (diferente do cálculo).

```gherkin
Cenário: Pedido com cupom inexistente
  Quando confirmo o pedido com o cupom "XYZ123"
  Então o status é 422
  E o código é "CUPOM_INVALIDO"
```

### CT-033 | CA04 | API | Alta
Cupom expirado em pedido.

```gherkin
Cenário: Pedido com cupom expirado
  Quando confirmo o pedido com o cupom "VERAO2026"
  Então o status é 422
  E o código é "CUPOM_EXPIRADO"
```

### CT-034 | CA02 | API | Média
Normalização do cupom também no pedido.

```gherkin
Cenário: Cupom com caixa e espaços no pedido
  Quando confirmo o pedido com o cupom "  bemvindo10 "
  Então o status é 201
  E o desconto é 10
```

### CT-035 | Geral | API/UI | Alta
Nome precisa ter nome e sobrenome.

```gherkin
Esquema do Cenário: Validação do nome
  Quando confirmo o pedido com o nome "<nome>"
  Então o resultado é "<resultado>"

  Exemplos:
    | nome               | resultado |
    | Maria Silva        | aceito    |
    | Maria Souza Lima   | aceito    |
    | Maria              | rejeitado |
    | ""                 | rejeitado |
    | "   Maria"         | rejeitado |
```

### CT-036 | Geral | API/UI | Alta
E-mail com formato válido.

```gherkin
Esquema do Cenário: Validação do e-mail
  Quando confirmo o pedido com o e-mail "<email>"
  Então o resultado é "<resultado>"

  Exemplos:
    | email              | resultado |
    | maria@exemplo.com  | aceito    |
    | maria@exemplo      | rejeitado |
    | mariaexemplo.com   | rejeitado |
    | @exemplo.com       | rejeitado |
    | maria@             | rejeitado |
    | ""                 | rejeitado |
```

### CT-037 | Geral | API/UI | Alta
CEP com 8 dígitos, com ou sem hífen.

```gherkin
Esquema do Cenário: Validação do CEP
  Quando confirmo o pedido com o CEP "<cep>"
  Então o resultado é "<resultado>"

  Exemplos:
    | cep         | resultado |
    | 01310-100   | aceito    |
    | 01310100    | aceito    |
    | 0131-0100   | rejeitado |
    | 1310100     | rejeitado |
    | 013101000   | rejeitado |
    | 0131010a    | rejeitado |
    | ""          | rejeitado |
```

### CT-038 | Geral | API | Média
Detalhes por campo em DADOS_INVALIDOS.

```gherkin
Cenário: Vários dados inválidos de uma vez
  Quando envio nome "Maria", e-mail "x" e CEP "123"
  Então o status é 422
  E o código é "DADOS_INVALIDOS"
  E "campos" lista os 3 campos inválidos
```

### CT-039 | Geral | UI | Baixa
Não existe pagamento online.

```gherkin
Cenário: Fluxo sem etapa de pagamento
  Quando o cliente finaliza a compra
  Então não existe etapa de pagamento online
```

---

## 5. Contrato da API e erros

### CT-040 | API | Média
```gherkin
Cenário: Listar produtos
  Quando faço GET em "/api/produtos"
  Então o status é 200
  E a lista tem 8 produtos com id, nome, descricao, categoria e preco
  E os preços batem com a tabela de dados de teste
```

### CT-041 | API | Média
```gherkin
Esquema do Cenário: Consultar produto por id
  Quando faço GET em "/api/produtos/<id>"
  Então o status é <status>

  Exemplos:
    | id   | status |
    | P001 | 200    |
    | P008 | 200    |
    | P999 | 404    |
    | p001 | 404    |
```
> `p001` em minúsculas: a documentação não define. Registrar o comportamento observado.

### CT-042 | API | Baixa
```gherkin
Cenário: Rota inexistente
  Quando faço GET em "/api/xyz"
  Então o status é 404
  E o código é "ROTA_NAO_ENCONTRADA"
```

### CT-043 | API | Baixa
```gherkin
Cenário: Método não permitido
  Quando faço GET em "/api/carrinho/calcular"
  Então o status é 405
  E o código é "METODO_NAO_PERMITIDO"
```

### CT-044 | API | Média
```gherkin
Cenário: JSON malformado
  Quando faço POST em "/api/carrinho/calcular" com o corpo "{ itens: "
  Então o status é 400
  E o código é "JSON_INVALIDO"
```

### CT-045 | API | Alta
```gherkin
Esquema do Cenário: Corpo com JSON válido, mas inadequado
  Quando faço POST em "/api/carrinho/calcular" com o corpo <corpo>
  Então o status é <status> e o código é "<codigo>"

  Exemplos:
    | corpo                                                                                  | status | codigo                 |
    | {}                                                                                     | 422    | ITENS_OBRIGATORIOS     |
    | {"itens": []}                                                                          | 422    | ITENS_OBRIGATORIOS     |
    | {"itens": ["P001"]}                                                                    | 422    | ITEM_INVALIDO          |
    | {"itens": [{"produtoId":"P999","quantidade":1}]}                                       | 422    | PRODUTO_NAO_ENCONTRADO |
    | {"itens": [{"produtoId":"P001","quantidade":1},{"produtoId":"P001","quantidade":2}]}   | 422    | ITEM_DUPLICADO         |
    | [1,2,3]                                                                                | 400    | JSON_INVALIDO          |
```
> `[1,2,3]` é JSON válido, mas não é um objeto. A doc diz que o 400 vale para "não é um objeto JSON válido".

### CT-046 | API | Média
```gherkin
Cenário: Cálculo não grava estado
  Quando calculo o mesmo carrinho duas vezes seguidas
  Então as duas respostas são idênticas
```

### CT-047 | CA03, CA04 | API | Alta
Cupom inválido/expirado no cálculo não gera erro.

```gherkin
Esquema do Cenário: Cupom problemático em /api/carrinho/calcular
  Quando calculo um carrinho com o cupom "<codigo>"
  Então o status é 200
  E "cupom.aplicado" é falso
  E "cupom.mensagem" é "<mensagem>"
  E o desconto é 0

  Exemplos:
    | codigo     | mensagem          |
    | XYZ123     | Cupom inválido.   |
    | VERAO2026  | Cupom expirado.   |
```

---

## 6. Carrinho e checkout (casos adicionais, derivados do teste exploratório)

### CT-048 | Geral | UI | Alta
Botão de adicionar produto ao carrinho.

```gherkin
Cenário: Adicionar produto pela vitrine
  Dado que o carrinho está vazio
  Quando o cliente clica em adicionar em "Camiseta Essencial"
  Então o produto aparece no carrinho com quantidade 1
  E o contador do carrinho (se existir) é atualizado
```

### CT-049 | Geral | UI | Alta
Conteúdo do carrinho.

```gherkin
Cenário: Produtos e preços corretos no carrinho
  Dado que o cliente adicionou "Camiseta Essencial" e "Boné Aba Curva"
  Quando o cliente abre o carrinho
  Então os itens exibidos são os escolhidos
  E cada preço unitário é igual ao da tabela (R$ 59,90 e R$ 49,90)
  E o total de cada linha é preço unitário vezes quantidade
```

### CT-050 | Geral | UI | Alta
Botões de mais e menos.

```gherkin
Cenário: Alterar quantidade com + e -
  Dado que o carrinho contém 2 "Camiseta Essencial"
  Quando o cliente clica em "+"
  Então a quantidade é 3 e o total da linha é R$ 179,70
  Quando o cliente clica em "-" duas vezes
  Então a quantidade é 1 e o total da linha é R$ 59,90
  E o resumo do pedido acompanha cada alteração
```

### CT-051 | Geral | UI | Média | Exploratório
Botão "-" quando a quantidade é 1.

```gherkin
Cenário: Diminuir a partir de 1 unidade
  Dado que o carrinho contém 1 "Camiseta Essencial"
  Quando o cliente clica em "-"
  Então o item é removido OU o botão está desabilitado
  E a quantidade nunca fica em 0 ou negativa
```
> Registrar o comportamento observado em `ambiguidades.md`.

### CT-052 | Geral | UI | Alta
Soma do resumo do pedido.

```gherkin
Cenário: Resumo do pedido confere com a fórmula
  Dado que o carrinho contém itens variados
  Quando o cliente visualiza o resumo do pedido
  Então total = subtotal - desconto + frete
  E o subtotal é a soma de preço unitário vezes quantidade de cada item
```

### CT-053 | Geral | UI | Alta
Remoção de itens.

```gherkin
Cenário: Remover itens um a um e esvaziar o carrinho
  Dado que o carrinho contém 3 produtos diferentes
  Quando o cliente remove os itens um a um
  Então o resumo é recalculado a cada remoção
  E, ao remover o último, o carrinho exibe o estado vazio
  E o frete e o cupom não deixam valores residuais
```

### CT-054 | Geral | UI | Alta
Campos obrigatórios do checkout.

```gherkin
Esquema do Cenário: Campo obrigatório vazio
  Dado que o carrinho contém 1 "Mochila Urbana 20L"
  Quando o cliente tenta finalizar com o campo "<campo>" vazio
  Então a compra não é finalizada
  E uma mensagem de erro é exibida para o campo "<campo>"

  Exemplos:
    | campo |
    | nome  |
    | e-mail|
    | CEP   |
```

### CT-055 | Geral | UI/API | Média | Exploratório
Nome com caracteres que não são letras.

```gherkin
Esquema do Cenário: Nome sem letras
  Quando o cliente informa o nome "<nome>"
  Então registrar se o sistema aceita ou rejeita

  Exemplos:
    | nome        |
    | 123 233     |
    | @@@ ###     |
    | J0ão S1lva  |
    | Maria  Silva|
```
> A documentação só exige "nome e sobrenome". Interpretação defensável: duas palavras bastam. Interpretação de negócio: deveria conter letras.

### CT-056 | Geral, CA05 | UI | Baixa | Exploratório
Estado do carrinho e do cupom depois de finalizar a compra.

```gherkin
Cenário: Após confirmar o pedido
  Dado que o pedido foi confirmado com o cupom "BEMVINDO10"
  Então o carrinho é esvaziado
  E o cupom pode ser aplicado novamente em uma nova compra
```
> Não há regra de uso único na documentação, e os pedidos não são armazenados. Comportamento esperado neste ambiente.

---

## 7. Matriz de rastreabilidade

| CA | Descrição resumida | Casos de teste |
|---|---|---|
| CA01 | BEMVINDO10 = 10% sobre o subtotal | CT-001, 002, 012, 013, 030 |
| CA02 | Código sem distinção de caixa e sem espaços nas pontas | CT-003, 004, 008, 034 |
| CA03 | Cupom inexistente: "Cupom inválido." | CT-005, 006, 032, 047 |
| CA04 | Cupom expirado: "Cupom expirado." | CT-007, 008, 033, 047 |
| CA05 | Um cupom por vez | CT-009, 010, 011, 056 |
| CA06 | Frete grátis a partir de R$ 200,00 (inclusive) | CT-014, 015 |
| CA07 | Frete R$ 19,90 e valor faltante | CT-014, 016, 017, 018 |
| CA08 | Frete usa o subtotal antes do desconto | CT-019, 020 |
| CA09 | Desconto não incide sobre o frete | CT-021 |
| CA10 | Máximo 5 unidades por produto (UI e API) | CT-022, 023, 024, 025, 026, 027 |
| CA11 | Arredondamento em 2 casas | CT-028, 029 |
| Geral | Pedido e regras pré-existentes (nome, e-mail, CEP, pagamento) | CT-030, 031, 035, 036, 037, 038, 039 |
| Geral | Carrinho e checkout (vitrine, +/−, resumo, remoção, obrigatórios) | CT-048, 049, 050, 051, 052, 053, 054, 055 |
| Geral | Contrato da API e códigos de erro | CT-040 a 047 |

**Total: 56 casos.**

| Tipo | Quantidade |
|---|---|
| Somente UI | 22 |
| Somente API | 16 |
| UI e API | 18 |
