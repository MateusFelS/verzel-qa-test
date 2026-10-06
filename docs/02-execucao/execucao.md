# Execução de Testes: Verzel Store (VZS-142 v2.3.0)

> **Ambiente:** https://verzel-store.qa-test-verzel-store.workers.dev/  
> **Executor:** Mateus Felipe dos Santos  
> **Data:** 06/10/2026  
> **Navegador:** Brave v1.95.104  
> **Teste de API:** Postman  
> **SO:** Windows 11  
> **Legenda:** ✅ Passou · ❌ Falhou · ⚠️ Observação · ⏳ Pendente

---

## Cupom de desconto

| ID | CA | Cenário | Pré-condição | Dados de Teste | Resultado Esperado | Resultado Obtido | Status | Prioridade |
|----|----|---------|--------------|----------------|---------------------|-------------------|--------|------------|
| CT-001 | CA01 | Aplicar cupom BEMVINDO10 | Carrinho com 1x P005 | Cupom: BEMVINDO10 | Desconto R$ 10,00, frete R$ 19,90, total R$ 109,90, mensagem "Cupom aplicado: 10% de desconto nos produtos." | Cupom aplicado com desconto de 10% corretamente | ✅ Passou | Alta |
| CT-002 | CA01 | Exemplo oficial da documentação (API) | Nenhuma | P002 x1 + P004 x2, cupom BEMVINDO10 | Subtotal 239,70 · desconto 23,97 · frete 0 · total 215,73 | Subtotal R$ 239,70, desconto R$ 23,97, frete R$ 0,00 e total R$ 215,73, conforme a documentação | ✅ Passou | Alta |
| CT-003 | CA02 | Cupom sem distinção de caixa e espaços nas pontas | Carrinho com 1x P005 | "BEMVINDO10", "bemvindo10", "BemVindo10", "  BEMVINDO10", "BEMVINDO10  ", "  bemvindo10  " | Todos aplicados, desconto R$ 10,00 | Todas as variações foram aplicadas, com desconto de R$ 10,00 em cada uma | ✅ Passou | Alta |
| CT-004 | CA02 | Espaço no meio do código | Carrinho com 1x P005 | "BEM VINDO10" | "Cupom inválido." e nenhum desconto | Exibiu "Cupom inválido." e nenhum desconto foi aplicado | ✅ Passou | Média |
| CT-005 | CA03 | Cupom inexistente | Carrinho com 1x P005 | Cupom inválido (ex.: XYZ123) | "Cupom inválido.", desconto R$ 0,00, total R$ 119,90 | Cupom não aplicado e mensagem "Cupom inválido." exibida | ✅ Passou | Alta |
| CT-006 | CA03 | Cupom vazio ou só com espaços | Carrinho com 1x P005 | "" e "   " | Nenhum desconto e nenhum erro inesperado | Cupom vazio não aplica e exibe "Informe um cupom." (caso "   " não testado). Obs. registrada em ambiguidades.md | ✅ Passou | Média |
| CT-007 | CA04 | Cupom expirado | Carrinho com 1x P005 | VERAO2026 | "Cupom expirado.", desconto R$ 0,00, total R$ 119,90 | Exibiu "Cupom expirado.", com desconto R$ 0,00 e total R$ 119,90 | ✅ Passou | Alta |
| CT-008 | CA04 | Expirado com variação de escrita | Carrinho com 1x P005 | "  verao2026 " | "Cupom expirado." (e não "Cupom inválido.") | Exibiu "Cupom expirado." (e não "Cupom inválido.") mesmo com variação de caixa e espaços | ✅ Passou | Média |
| CT-009 | CA05 | Segundo cupom sem remover o primeiro | BEMVINDO10 aplicado | Tentar aplicar VERAO2026 | Apenas um cupom permanece, sem somar descontos | Apenas um cupom permaneceu aplicado e os descontos não foram somados | ✅ Passou | Alta |
| CT-010 | CA05 | Remover cupom e aplicar outro | BEMVINDO10 aplicado | Remover, depois aplicar "bemvindo10" | Após remover: desconto R$ 0,00 e total R$ 119,90. Após reaplicar: desconto R$ 10,00 | Remoção do cupom e do desconto funcionou. Falta reaplicar | ✅ Passou | Alta |
| CT-011 | CA05 | Reaplicar o mesmo cupom | BEMVINDO10 aplicado em R$ 100,00 | BEMVINDO10 novamente | Desconto continua R$ 10,00 (sem duplicar) | Desconto permaneceu em R$ 10,00, sem duplicar | ✅ Passou | Baixa |
| CT-012 | CA01 | Recalcular desconto ao alterar quantidade | BEMVINDO10 aplicado a 1x P005 | Alterar quantidade para 3 | Subtotal 300,00 · desconto 30,00 · frete 0 · total 270,00 | Com 3 unidades: subtotal R$ 300,00, desconto R$ 30,00, frete R$ 0,00 e total R$ 270,00 | ✅ Passou | Alta |
| CT-013 | CA01 | Recalcular desconto ao remover item | P005 x1 + P008 x1 com BEMVINDO10 (desconto 15,00) | Remover P008 | Desconto recalculado para R$ 10,00 | Após remover P008, o desconto foi recalculado para R$ 10,00 | ✅ Passou | Média |

---

## Frete grátis

| ID | CA | Cenário | Pré-condição | Dados de Teste | Resultado Esperado | Resultado Obtido | Status | Prioridade |
|----|----|---------|--------------|----------------|---------------------|-------------------|--------|------------|
| CT-014 | CA06, CA07 | Frete conforme o subtotal, sem cupom | Carrinho vazio | 1x P001 · 3x P001 · P005+P008+P004 · 2x P005 · 1x P007 | Frete R$ 19,90 abaixo de R$ 200,00 e R$ 0,00 a partir dele (ver tabela da Parte 1) | Frete grátis a partir de R$ 200 funcionou corretamente | ✅ Passou | Alta |
| CT-015 | CA06 | Limite de R$ 200,00 é inclusivo | Carrinho vazio | 2x P005 (subtotal R$ 200,00) | freteGratis verdadeiro e frete R$ 0,00 | Na UI, frete grátis a partir de R$ 200 funcionou corretamente. Na API, com subtotal de exatamente R$ 200,00, o frete foi cobrado (R$ 19,90) em vez de R$ 0,00 | ❌ Falhou | Alta |
| CT-016 | CA07 | Subtotal R$ 199,90 ainda cobra frete | Carrinho vazio | P005 + P008 + P004 (1x cada) | Frete R$ 19,90 · faltante R$ 0,10 | Frete de R$ 19,90 cobrado e faltante de R$ 0,10 informado | ✅ Passou | Alta |
| CT-017 | CA07 | Carrinho informa quanto falta | Carrinho com 1x P001 | Abrir o carrinho | Aviso de que faltam R$ 140,10 | Carrinho exibiu o aviso de que faltam R$ 140,10 | ✅ Passou | Alta |
| CT-018 | CA07 | Aviso some ao atingir o limite | Carrinho com 1x P001 | Alterar quantidade para 4 | Subtotal 239,60 · frete 0 · sem aviso de faltante | Com 4 unidades: subtotal R$ 239,60, frete R$ 0,00 e aviso de faltante removido | ✅ Passou | Média |
| CT-019 | CA08 | Frete grátis usa o subtotal antes do desconto | Carrinho vazio | 1x P005 · P005+P008+P004 · 2x P005 · 1x P007, todos com BEMVINDO10 | Ver tabela da Parte 1 (ex.: 2x P005 → desconto 20,00, frete 0, total 180,00) | Valores de desconto, frete e total conforme a tabela da Parte 1, com o frete calculado sobre o subtotal antes do desconto | ✅ Passou | Alta |
| CT-020 | CA08 | Desconto não cancela o frete grátis | Carrinho com 2x P005 | Aplicar BEMVINDO10 | Total R$ 180,00, frete R$ 0,00, sem aviso de faltante | Total R$ 180,00, frete R$ 0,00 e sem aviso de faltante | ✅ Passou | Alta |
| CT-021 | CA09 | Desconto não incide sobre o frete | Carrinho com 1x P005 | Aplicar BEMVINDO10 | Frete R$ 19,90 (não 17,91) e total R$ 109,90 | Frete permaneceu em R$ 19,90 e total ficou em R$ 109,90 | ✅ Passou | Alta |

---

## Quantidade máxima e arredondamento

| ID | CA | Cenário | Pré-condição | Dados de Teste | Resultado Esperado | Resultado Obtido | Status | Prioridade |
|----|----|---------|--------------|----------------|---------------------|-------------------|--------|------------|
| CT-022 | CA10 | Quantidade na API de cálculo | Nenhuma | quantidade: 1, 5, 6, 100, 0, -1, 2.5, "2", null | 1 e 5 retornam 200. 6 e 100 retornam 422 QUANTIDADE_MAXIMA_EXCEDIDA. Os demais retornam 422 QUANTIDADE_INVALIDA | Os demais valores se comportaram conforme o esperado, porém as quantidades 6 e 100 foram aceitas, sem retornar 422 QUANTIDADE_MAXIMA_EXCEDIDA. A API não limita a quantidade a 5 (limite aplicado apenas na UI) | ❌ Falhou | Alta |
| CT-023 | CA10 | Mesma regra na API de pedidos | Nenhuma | Pedido válido com 6x P001 | 422 QUANTIDADE_MAXIMA_EXCEDIDA, campo itens[0].quantidade | O pedido com 6x P001 foi aceito, sem retornar 422 QUANTIDADE_MAXIMA_EXCEDIDA. A API de pedidos também não limita a quantidade a 5 | ❌ Falhou | Alta |
| CT-024 | CA10 | Botão "+" no limite | 5x P001 no carrinho | Clicar em "+" | Quantidade permanece 5 e a interface informa o limite | Quantidade permaneceu em 5 e a interface informou o limite | ✅ Passou | Alta |
| CT-025 | CA10 | Adicionar pela vitrine com 5 no carrinho | 5x P001 no carrinho | Adicionar P001 pela vitrine | Botão "Adicionar ao carrinho" é bloqueado e mensagem "Limite de 5 unidades atingido." é exibida | Botão "Adicionar ao carrinho" bloqueado e mensagem "Limite de 5 unidades atingido." exibida | ✅ Passou | Média |
| CT-026 | CA10 | Limite é por produto | Carrinho vazio | 5x P001 + 5x P004 | Ambos aceitos | 5x P001 e 5x P004 aceitos no mesmo carrinho | ✅ Passou | Baixa |
| CT-027 | CA11 | Arredondamento com cupom (API) | Nenhuma | 3x P001 · 3x P002 · 3x P006 · 3x P004 · 5x P003 · 5x P001, com BEMVINDO10 | Valores iguais aos da Parte 1, sem mais de 2 casas decimais no JSON | Valores iguais aos da Parte 1, sem mais de 2 casas decimais no JSON | ✅ Passou | Alta |
| CT-028 | CA11 | Formato monetário na interface | Carrinho com 3x P001 | Abrir o carrinho | Subtotal "R$ 179,70" e todos os valores com 2 casas | Subtotal exibido como "R$ 179,70" e todos os valores com 2 casas decimais | ✅ Passou | Média |

---

## Pedido e regras pré-existentes

| ID | CA | Cenário | Pré-condição | Dados de Teste | Resultado Esperado | Resultado Obtido | Status | Prioridade |
|----|----|---------|--------------|----------------|---------------------|-------------------|--------|------------|
| CT-029 | Geral, CA01 | Pedido válido com cupom | Carrinho com 1x P005 | Maria Silva, maria@exemplo.com, 01310-100, BEMVINDO10 | Status 201, número VZ-000000, desconto 10, total 109,90, CEP "01310100" | Pedido criado com status 201, número no formato VZ-000000, desconto R$ 10,00, total R$ 109,90 e CEP normalizado para "01310100" | ✅ Passou | Alta |
| CT-030 | Geral | Pedido válido sem cupom | Carrinho com 1x P005 | Dados válidos, sem cupom | Status 201, desconto 0, total 119,90 | Compra finalizada normalmente com dados corretos (UI) | ✅ Passou | Alta |
| CT-031 | CA03 | Pedido com cupom inexistente (API) | Nenhuma | cupom: XYZ123 | 422 CUPOM_INVALIDO | A API retornou status 200 em vez de 422 CUPOM_INVALIDO. A resposta informa que o cupom não foi aplicado, mas o pedido não é rejeitado | ❌ Falhou | Alta |
| CT-032 | CA04 | Pedido com cupom expirado (API) | Nenhuma | cupom: VERAO2026 | 422 CUPOM_EXPIRADO | A API retornou status 200 em vez de 422 CUPOM_EXPIRADO. A resposta informa que o cupom não foi aplicado, mas o pedido não é rejeitado | ❌ Falhou | Alta |
| CT-033 | CA02 | Normalização do cupom no pedido (API) | Nenhuma | cupom: "  bemvindo10 " | 201 e desconto 10 | Pedido criado com status 201 e desconto de R$ 10,00, mesmo com o cupom enviado com espaços e em minúsculas | ✅ Passou | Média |
| CT-034 | Geral | Validação do nome | Carrinho com 1 item | "Maria Silva", "Maria Souza Lima", "Maria", "", "   Maria", "123 456" | Os dois primeiros aceitos, os demais rejeitados | Os valores previstos se comportaram como esperado. Porém "123 456" foi aceito e o pedido foi criado com esse nome, sem exigir letras (mesmo comportamento do CT-054 na UI) | ⚠️ Observação | Média |
| CT-035 | Geral | Validação do e-mail | Carrinho com 1 item | maria@exemplo.com, maria@exemplo, mariaexemplo.com, @exemplo.com, maria@, "" | Só o primeiro aceito | E-mail aceitou apenas valores corretos (UI). API não testada | ✅ Passou | Alta |
| CT-036 | Geral | Validação do CEP | Carrinho com 1 item | 01310-100, 01310100, 0131-0100, 1310100, 013101000, 0131010a, "" | Só os dois primeiros aceitos | CEP aceitou apenas valores corretos (UI). API não testada | ✅ Passou | Alta |
| CT-037 | Geral | Vários dados inválidos de uma vez (API) | Nenhuma | nome "Maria", e-mail "x", CEP "123" | 422 DADOS_INVALIDOS com 3 campos em "campos" | A API retornou 422 DADOS_INVALIDOS com os 3 campos (nome, e-mail e CEP) listados em "campos" | ✅ Passou | Média |
| CT-038 | Geral | Sem etapa de pagamento online | Carrinho com 1 item | Finalizar a compra | Não existe pagamento online | Não existe etapa de pagamento online. A compra é finalizada sem solicitar dados de pagamento | ✅ Passou | Baixa |

---

## Contrato da API e erros

| ID | CA | Cenário | Pré-condição | Dados de Teste | Resultado Esperado | Resultado Obtido | Status | Prioridade |
|----|----|---------|--------------|----------------|---------------------|-------------------|--------|------------|
| CT-039 | API | Listar produtos | Nenhuma | GET /api/produtos | 200 com 8 produtos (id, nome, descricao, categoria, preco) e preços conforme a tabela | GET /api/produtos retornou 200 com 8 produtos (id, nome, descricao, categoria, preco) e preços conforme a tabela | ✅ Passou | Média |
| CT-040 | API | Consultar produto por id | Nenhuma | P001, P008, P999, p001 | 200, 200, 404 e 404 (p001 não definido na doc) | P001 e P008 retornaram 200. P999 e p001 retornaram 404 | ✅ Passou | Média |
| CT-041 | API | Rota inexistente | Nenhuma | GET /api/xyz | 404 ROTA_NAO_ENCONTRADA | GET /api/xyz retornou 404 ROTA_NAO_ENCONTRADA | ✅ Passou | Baixa |
| CT-042 | API | Método não permitido | Nenhuma | GET /api/carrinho/calcular | 405 METODO_NAO_PERMITIDO | GET /api/carrinho/calcular retornou 405 METODO_NAO_PERMITIDO | ✅ Passou | Baixa |
| CT-043 | API | JSON malformado | Nenhuma | POST com corpo "{ itens: " | 400 JSON_INVALIDO | O corpo "{ itens: " retornou 400 JSON_INVALIDO | ✅ Passou | Média |
| CT-044 | API | JSON válido, mas inadequado | Nenhuma | {}, itens vazio, item string, produto inexistente, item duplicado, [1,2,3] | ITENS_OBRIGATORIOS (x2), ITEM_INVALIDO, PRODUTO_NAO_ENCONTRADO, ITEM_DUPLICADO (todos 422) e JSON_INVALIDO (400) | Retornos conforme o esperado: ITENS_OBRIGATORIOS (x2), ITEM_INVALIDO, PRODUTO_NAO_ENCONTRADO e ITEM_DUPLICADO (todos 422) e JSON_INVALIDO (400) | ✅ Passou | Alta |
| CT-045 | API | Cálculo não grava estado | Nenhuma | Mesma requisição duas vezes | Respostas idênticas | As duas requisições idênticas retornaram respostas iguais, sem gravar estado | ✅ Passou | Média |
| CT-046 | CA03, CA04 | Cupom inválido/expirado no cálculo | Nenhuma | XYZ123 e VERAO2026 em /calcular | 200, aplicado=false, mensagens "Cupom inválido." e "Cupom expirado.", desconto 0 | /calcular retornou 200 com aplicado=false, mensagens "Cupom inválido." e "Cupom expirado." e desconto 0 | ✅ Passou | Alta |

---

## Carrinho e checkout

| ID | CA | Cenário | Pré-condição | Dados de Teste | Resultado Esperado | Resultado Obtido | Status | Prioridade |
|----|----|---------|--------------|----------------|---------------------|-------------------|--------|------------|
| CT-047 | Geral | Adicionar produto pela vitrine | Carrinho vazio | Clicar em adicionar em P001 | Produto no carrinho com quantidade 1 | Botão de adicionar funciona corretamente | ✅ Passou | Alta |
| CT-048 | Geral | Produtos e preços corretos no carrinho | Produtos adicionados | P001 e P004 | Itens escolhidos, preços 59,90 e 49,90, total da linha correto | Produtos e preços corretos no carrinho | ✅ Passou | Alta |
| CT-049 | Geral | Botões "+" e "−" | 2x P001 no carrinho | "+" uma vez, "−" duas vezes | 3 un. (R$ 179,70), depois 1 un. (R$ 59,90), resumo acompanha | Botões alteram a quantidade e o preço acompanha corretamente | ✅ Passou | Alta |
| CT-050 | Geral | "−" com quantidade 1 | 1x P001 no carrinho | Clicar em "−" | Item removido ou botão desabilitado, nunca quantidade 0 ou negativa | Ao clicar em "−" com quantidade 1, a quantidade não chegou a 0 nem ficou negativa | ✅ Passou | Média |
| CT-051 | Geral | Soma do resumo do pedido | Itens variados | Visualizar o resumo | total = subtotal − desconto + frete | Soma do resumo correta, incluindo o frete | ✅ Passou | Alta |
| CT-052 | Geral | Remover itens um a um e esvaziar | 3 produtos diferentes | Remover item a item | Resumo recalculado a cada remoção e estado vazio ao final | Remoção individual e esvaziar o carrinho funcionam corretamente | ✅ Passou | Alta |
| CT-053 | Geral | Campos obrigatórios do checkout | 1 item no carrinho | Finalizar com nome, e-mail e CEP vazios | Compra não finalizada e mensagem de erro por campo | Campos obrigatórios não aceitam vazio e exibem mensagem de erro | ✅ Passou | Alta |
| CT-054 | Geral | Nome sem letras | 1 item no carrinho | "123 233", "@@@ ###", "J0ão S1lva", "Maria  Silva" | Registrar se aceita ou rejeita (a doc só exige nome e sobrenome) | O campo nome completo aceitou os valores "123 233" e "@@@ ###" como nome e sobrenome, sem exigir letras. "J0ão S1lva" e "Maria  Silva" não foram testados | ⚠️ Observação | Média |
| CT-055 | Geral, CA05 | Cupom após finalizar a compra | Pedido confirmado com BEMVINDO10 | Nova compra com o mesmo cupom | Sem regra de uso único na doc, então reaplicar é esperado | O cupom pôde ser aplicado novamente após a compra. Provavelmente por ser ambiente de teste e a documentação não prever uso único, mas vale registrar como ponto de atenção para a regra de negócio. Obs. registrada em ambiguidades.md | ⚠️ Observação | Baixa |

---

## Resumo da execução

| Status | Quantidade |
|---|---|
| ✅ Passou | 47 |
| ❌ Falhou | 5 |
| ⚠️ Observação | 3 |
| ⏳ Pendente | 0 |
| **Total** | **55** |
