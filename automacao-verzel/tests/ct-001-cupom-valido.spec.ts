import { test, expect } from '@playwright/test';

test('CT-001 - aplicar cupom válido BEMVINDO10', async ({ page }) => {
  await page.goto('/');

  // Adicionar P005 - Mochila Urbana 20L
  await page.locator('.produto-corpo:has(#nome-P005)')
  .getByRole('button', { name: 'Adicionar ao carrinho' })
  .click();

  // Abrir carrinho
  await page.getByRole('link', { name: 'Carrinho' }).click();

  // Aplicar cupom
  await page.locator('#campo-cupom').fill('BEMVINDO10');
  await page.getByRole('button', { name: 'Aplicar cupom'}).click();

  // Validar valores
  await expect(page.locator('[data-valor="subtotal"]'))
  .toHaveText('R$ 100,00');

  await expect(page.locator('[data-valor="desconto"]'))
    .toHaveText('- R$ 10,00');

  await expect(page.locator('[data-valor="frete"]'))
    .toHaveText('R$ 19,90');

  await expect(page.locator('[data-valor="total"]'))
    .toHaveText('R$ 109,90');

  // Validar mensagem
  await expect(page.getByText(
    'Cupom BEMVINDO10 aplicado.'
  )).toBeVisible();
});