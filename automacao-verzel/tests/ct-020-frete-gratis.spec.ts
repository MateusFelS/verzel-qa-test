import { test, expect } from '@playwright/test';

test('CT-020 - desconto não cancela frete grátis', async ({ page }) => {

  await page.goto('/');

  // Adicionar P005 - Mochila Urbana 20L
  await page.locator('.produto-corpo:has(#nome-P005)')
    .getByRole('button', { name: 'Adicionar ao carrinho' })
    .click();

  // Abrir carrinho
  await page.getByRole('link', { name: 'Carrinho' }).click();

  // Aumentar quantidade de 1 para 3
  const botaoAumentar = page.locator(
    '[aria-label="Aumentar quantidade de Mochila Urbana 20L"]'
  );

  await botaoAumentar.click();
  await botaoAumentar.click();

  // Validar quantidade
  await expect(
    page.getByRole('status', { name: 'Quantidade de Mochila Urbana 20L' })
  ).toHaveText('3');

  // Validar cálculo antes do cupom
  await expect(page.locator('[data-valor="subtotal"]'))
    .toHaveText('R$ 300,00');

  await expect(page.locator('[data-valor="frete"]'))
    .toHaveText('Grátis');

  // Aplicar cupom
  await page.locator('#campo-cupom').fill('BEMVINDO10');

  await page.getByRole('button', { name: 'Aplicar cupom' }).click();

  // Validar desconto sem cancelar o frete grátis
  await expect(page.locator('[data-valor="subtotal"]'))
    .toHaveText('R$ 300,00');

  await expect(page.locator('[data-valor="desconto"]'))
    .toHaveText('- R$ 30,00');

  await expect(page.locator('[data-valor="frete"]'))
    .toHaveText('Grátis');

  await expect(page.locator('[data-valor="total"]'))
    .toHaveText('R$ 270,00');

  // Não deve haver indicação de valor faltante para frete grátis
  await expect(
    page.getByText(/faltam.*frete grátis/i)
  ).not.toBeVisible();
});