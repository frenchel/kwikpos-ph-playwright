import { test, expect } from "@playwright/test";
import { fillForm } from "../utils/form-helper";
import {
  validFormData,
  invalidNames,
  invalidPhone,
  invalidEmail,
  missingRequiredFields,
} from "../data/form-data";

// test cases for different data scenarios
const formTestCases = [
  // { name: "valid data", data: validFormData, shouldPass: true },
  // { name: "invalid names", data: invalidNames, shouldPass: false },
  // { name: "invalid phone", data: invalidPhone, shouldPass: false },
  // { name: "invalid email", data: invalidEmail, shouldPass: false },
  {
    name: "missing required fields",
    data: missingRequiredFields,
    shouldPass: false,
  },
];

// pages where the common form appears (homepage + all product pages)
const formPages = [
  { label: "Homepage", url: "https://kwikpos.ph/" },
  //{ label: "Mobile", url: "https://kwikpos.ph/pages/mobile-pos" },
  //{ label: "Tablet", url: "https://kwikpos.ph/pages/tablet-pos" },
  //{ label: "Tablet All-in-One", url: "https://kwikpos.ph/pages/tablet-all-in-one-pos" },
  //{ label: "Single Screen", url: "https://kwikpos.ph/pages/single-screen-pos" },
  //{ label: "Dual Screen", url: "https://kwikpos.ph/pages/dual-screen-pos" },
  // {
  //   label: "Self-Ordering Kiosk",
  //   url: "https://kwikpos.ph/pages/self-ordering-kiosk-pos",
  // },
];

for (const { label, url } of formPages) {
  test.describe(`Form on ${label}`, () => {
    for (const { name, data, shouldPass } of formTestCases) {
      test(`should ${shouldPass ? "succeed" : "fail"} with ${name}`, async ({
        page,
      }) => {
        await page.goto(url);
        await page.goto(url, { timeout: 60000 }); // 60 seconds
        await fillForm(page, data);
        await page.waitForTimeout(3000);

        if (shouldPass) {
          // submit the form
          await page.getByRole("button", { name: "Inquire Now" }).click();

          // thank you page should appear
          await expect(page.locator("h2.title_kwikpospages")).toHaveText(
            "Thank You for Contacting Us!"
          );
        } else {
          // submit the form
          const [navigation] = await Promise.all([
            page.waitForNavigation({ timeout: 3000 }).catch(() => null), // if blocked by validation
            page.getByRole("button", { name: "Inquire Now" }).click(),
          ]);

          if (navigation) {
            // form submitted despite invalid fields
            throw new Error(
              "Test case failed: Missing validation on form fields."
            );
          } else {
            console.log(
              'Test case passed: Validation blocked the form (e.g., "Please fill out this field").'
            );
          }
        }
      });
    }
  });
}
