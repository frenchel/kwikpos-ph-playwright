import { test, expect } from "@playwright/test";

test("Chat Widget Home", async ({ page }) => {
  await page.goto("https://kwikpos.ph/");

  // chat launcher button
  const widgetFrame = await page
    .frameLocator('iframe[title="chat widget"]')
    .first();
  await widgetFrame
    .getByRole("button", { name: "$i18n('chat', 'chat_widget')" })
    .click();

  // second iframe = chat widget body
  const chatFrame = await page
    .locator('iframe[title="chat widget"]')
    .nth(1)
    .contentFrame();
  if (!chatFrame) throw new Error("Chat frame not found");

  // new conversation div
  await chatFrame
    .locator("#tawk-body div")
    .filter({ hasText: "New Conversation We typically" })
    .nth(2)
    .click();

  // form fields
  await chatFrame.getByRole("textbox", { name: "* Name" }).fill("Maui");
  await chatFrame
    .getByRole("textbox", { name: "* Email" })
    .fill("maui@gmail.com");
  await chatFrame
    .getByRole("textbox", { name: "* Phone Number" })
    .fill("63123456789");
  await chatFrame
    .getByRole("textbox", { name: "Company Name" })
    .fill("Motunui");

  //submit
  await chatFrame.getByRole("button", { name: "Submit" }).click();

  // confirmation that the form is sent
  const chatConfirmation = chatFrame
    .locator("#tawk-body div")
    .filter({ hasText: "Maui" }); 

  await expect(chatConfirmation).toContainText("maui@gmail.com");
  await expect(chatConfirmation).toContainText("Motunui");
});
