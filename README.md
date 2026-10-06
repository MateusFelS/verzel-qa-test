# Teste técnico QA Júnior – Verzel

Validação da entrega **cupom de desconto e frete grátis** da Verzel Store (loja fictícia), feita como seria no dia a dia de um time de desenvolvimento: levantamento de cenários, execução manual/exploratória, report de bugs e automação com Playwright.

| Recurso | Link |
| --- | --- |
| Loja | https://verzel-store.qa-test-verzel-store.workers.dev/ |
| Documentação da entrega | https://verzel-store.qa-test-verzel-store.workers.dev/documentacao |
| API | https://verzel-store.qa-test-verzel-store.workers.dev/api |

[![Playwright Tests](https://github.com/MateusFelS/verzel-qa-test/actions/workflows/testes.yml/badge.svg)](https://github.com/MateusFelS/verzel-qa-test/actions) 

---

## Onde encontrar cada entrega

| Entrega | Onde está |
| --- | --- |
| Cenários de teste (Gherkin) | [`docs/01-cenarios/casos-de-teste.md`](docs/01-cenarios/casos-de-teste.md) |
| Execução dos testes (manuais e exploratórios) com o resultado de cada cenário | [`docs/02-execucao/execucao.md`](docs/02-execucao/execucao.md) |
| Report de bugs e observações | [`docs/03-report-de-bugs/`](docs/03-report-de-bugs/) |
| Evidências da execução | Estão dentro dos respectivos reportes de bugs |
| Automação com Playwright (3 cenários) | [`automacao-verzel/`](automacao-verzel/) |
| Pipeline de CI (GitHub Actions) | [`.github/workflows/`](.github/workflows/) |

## Estrutura do repositório

```
.
├── .github/workflows/     # GitHub Actions: roda os testes automatizados
├── automacao-verzel/      # Projeto Playwright (3 cenários automatizados)
├── docs/
│   ├── 01-cenarios/       # Cenários em Gherkin
│   ├── 02-execucao/       # Resultado da execução dos testes
│   └── 03-report-de-bugs/ # Bugs e observações encontrados
└── README.md
```

---

## Como rodar a automação

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior (inclui o `npm`)
- [Git](https://git-scm.com/)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/MateusFelS/verzel-qa-test.git

# 2. Entre na pasta da automação
cd verzel-qa-test/automacao-verzel

# 3. Instale as dependências
npm install

# 4. Instale os navegadores usados pelo Playwright
npx playwright install

# 5. Rode os testes
npx playwright test
```

### Comandos úteis

```bash
npx playwright test --headed        # roda com o navegador visível
npx playwright test --ui            # abre a interface interativa do Playwright
npx playwright test --debug         # roda em modo debug, passo a passo
npx playwright show-report          # abre o relatório HTML da última execução
```

> Os testes rodam contra a loja online listada acima, então é preciso ter conexão com a internet. O ambiente é compartilhado com outros candidatos, mas cada pessoa tem o próprio carrinho, então os testes não interferem uns nos outros.

### Cenários automatizados

<!-- AJUSTAR: liste os 3 cenários e o arquivo de cada um. Exemplo: -->

| # | Cenário | Arquivo |
| --- | --- | --- |
| 1 | _(descreva o cenário)_ | `tests/...spec.ts` |
| 2 | _(descreva o cenário)_ | `tests/...spec.ts` |
| 3 | _(descreva o cenário)_ | `tests/...spec.ts` |

---

## Integração contínua (GitHub Actions)

Os testes automatizados também rodam no GitHub Actions a cada push/pull request. Todos os 3 cenários passaram na última execução. O resultado pode ser conferido na aba [Actions](https://github.com/MateusFelS/verzel-qa-test/actions) do repositório.

---

## Abordagem de teste

- **Cenários:** levantados a partir da documentação da entrega e escritos em Gherkin (`Dado / Quando / Então`).
- **Execução:** testes manuais e exploratórios, com resultado (passou/falhou) registrado para cada cenário.
- **Bugs:** cada bug foi reportado com descrição, passos para reproduzir, resultado esperado × obtido e evidência. Itens que não são defeitos, mas merecem atenção, ficaram como **observações**.
- **Automação:** Playwright cobrindo 3 cenários, executados localmente e no CI.
- **Fora do escopo** (conforme as regras do teste): testes de carga, estresse e segurança, por se tratar de ambiente compartilhado.

## Resumo dos resultados

<!-- AJUSTAR: preencha com os números reais, por exemplo:
- Cenários executados: 55 (47 passaram, 5 falharam, 3 observações)
- Bugs encontrados: 5
- Observações: 3
Detalhes em docs/02-execucao/execucao.md e docs/03-report-de-bugs/
-->

## Autor

**Mateus Santos** – [GitHub](https://github.com/MateusFelS)
