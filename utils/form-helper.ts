import { Page } from "@playwright/test";

export async function fillForm(page: Page, data: any) {
  if (data.fullName !== undefined)
    await page.fill('input[name="full_name"]', data.fullName);

  if (data.companyName !== undefined)
    await page.fill('input[name="company_name"]', data.companyName);

  if (data.phone !== undefined)
    await page.fill('input[name="phone"]', data.phone);

  if (data.email !== undefined)
    await page.fill('input[name="email"]', data.email);

  if (data.businessType !== undefined)
    await page.selectOption('select[name="business_type"]', data.businessType);

  if (data.numOfStores !== undefined)
    await page.selectOption(
      'select[name="number_of_stores"]',
      data.numOfStores
    );

  if (data.location !== undefined)
    await page.selectOption('select[name="location"]', data.location);

  if (data.city !== undefined)
    await page.selectOption('select[name="city"]', data.city);

  if (data.existingPOS !== undefined)
    await page.check(`input[type="radio"][value="${data.existingPOS}"]`);

  if (data.whenCall !== undefined)
    await page.fill('input[name="when_call"]', data.whenCall);

  if (data.message !== undefined)
    await page.fill('textarea[name="message"]', data.message);

  await page.click('button[type="submit"]');
}
