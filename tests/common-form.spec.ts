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

        const errorInputs = await page.locator(
          "input.error, .has-error, .field-error"
        );
        if (shouldPass) {
          await expect(page.locator("h2.title_kwikpospages")).toBeVisible();
        } else {
          const errorCount = await errorInputs.count();
          if (errorCount > 0) {
            throw new Error(
              "Test case failed: Missing validation in form fields."
            );
          }
        }
      });
    }
  });
}

// test.describe("Form Validation on Homepage", () => {
//   for (const { name, data, shouldPass } of formTestCases) {
//     test(`should ${shouldPass ? "succeed" : "fail"} with ${name}`, async ({
//       page,
//     }) => {
//       await page.goto("https://kwikpos.ph/"); // adjust if needed
//       await fillForm(page, data);

//       if (shouldPass) {
//         await expect(page.locator(".form-success")).toBeVisible(); // change selector if needed
//       } else {
//         await expect(page.locator(".form-error")).toBeVisible(); // change selector if needed
//       }
//     });
//   }
// });
