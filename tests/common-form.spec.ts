import { test, expect } from "@playwright/test";
import { fillForm } from "../utils/form-helper";
import { validFormData, invalidNames, invalidPhone, invalidEmail, missingRequiredFields, } from "../data/form-data";

const formTestCases = [
  { name: "valid data", data: validFormData, shouldPass: true },
  { name: "invalid names", data: invalidNames, shouldPass: false },
  { name: "invalid phone", data: invalidPhone, shouldPass: false },
  { name: "invalid email", data: invalidEmail, shouldPass: false },
  { name: "missing required fields", data: missingRequiredFields, shouldPass: false, },
];

test.describe("Form Validation on Homepage", () => {
  for (const { name, data, shouldPass } of formTestCases) {
    test(`should ${shouldPass ? "succeed" : "fail"} with ${name}`, async ({
      page,
    }) => {
      await page.goto("https://kwikpos.ph/"); // adjust if needed
      await fillForm(page, data);

      if (shouldPass) {
        await expect(page.locator(".form-success")).toBeVisible(); // change selector if needed
      } else {
        await expect(page.locator(".form-error")).toBeVisible(); // change selector if needed
      }
    });
  }
});
