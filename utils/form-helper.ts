import { Page } from "@playwright/test";

export async function fillForm(page: Page, data: any) {
  if (data.fullName !== undefined)
    await page.getByRole("textbox", { name: "Full Name*" }).fill(data.fullName);

  if (data.companyName !== undefined)
    await page
      .getByRole("textbox", { name: "Company Name" })
      .fill(data.companyName);

  if (data.phone !== undefined)
    await page.getByRole("textbox", { name: "Phone Number*" }).fill(data.phone);

  if (data.email !== undefined)
    await page.getByRole("textbox", { name: "Email*" }).fill(data.email);

  if (data.businessType !== undefined) {
    await page.getByRole("textbox", { name: "Type of Business" }).click();
    await page.getByText("Retail", { exact: true }).click(); // open the dropdown group
    await page.getByRole("treeitem", { name: data.businessType }).click(); // select actual option
  }

  if (data.numOfStores !== undefined)
    await page.locator("#branch").selectOption(data.numOfStores);

  if (data.location !== undefined)
    await page.locator("#region").selectOption(data.location);

  if (data.city !== undefined)
    await page.locator("#city").selectOption(data.city);

  if (data.existingPOS !== undefined)
    await page.getByRole("radio", { name: data.existingPOS }).check();

  if (data.whenCall !== undefined)
    await page
      .getByRole("textbox", { name: /When can we call you/i })
      .fill(data.whenCall);

  if (data.message !== undefined)
    await page
      .getByRole("textbox", { name: /Brief detail of your/i })
      .fill(data.message);

  //await page.getByRole("button", { name: "Inquire Now" }).click(); // more robust for multiple pages
}
