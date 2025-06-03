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
  { name: "valid data", data: validFormData, shouldPass: true },
  { name: "invalid names", data: invalidNames, shouldPass: false },
  { name: "invalid phone", data: invalidPhone, shouldPass: false },
  { name: "invalid email", data: invalidEmail, shouldPass: false },
  {
    name: "missing required fields",
    data: missingRequiredFields,
    shouldPass: false,
  },
];

// pages where the common form appears (homepage + all product pages)
const formPages = [
  { label: "Homepage", url: "https://kwikpos.ph/" },
  { label: "Mobile", url: "https://kwikpos.ph/pages/mobile-pos" },
  { label: "Tablet", url: "https://kwikpos.ph/pages/tablet-pos" },
  {
    label: "Tablet All-in-One",
    url: "https://kwikpos.ph/pages/tablet-all-in-one-pos",
  },
  { label: "Single Screen", url: "https://kwikpos.ph/pages/single-screen-pos" },
  { label: "Dual Screen", url: "https://kwikpos.ph/pages/dual-screen-pos" },
  {
    label: "Self-Ordering Kiosk",
    url: "https://kwikpos.ph/pages/self-ordering-kiosk-pos",
  },
];

for (const { label, url } of formPages) {
  test.describe(`Form on ${label}`, () => {
    for (const { name, data, shouldPass } of formTestCases) {
      test(`should ${shouldPass ? "succeed" : "fail"} with ${name}`, async ({
        page,
      }) => {
        await page.goto(url, { timeout: 90000 }); // 90 seconds
        await page.getByRole("textbox", { name: "Full Name*" }).waitFor(); // wait for the form to be ready
        await fillForm(page, data);

        if (shouldPass) {
          await page.getByRole("button", { name: "Inquire Now" }).click(); // submit 
          await expect(page.locator("h2.title_kwikpospages")).toHaveText(  // thank you page should appear
            "Thank You for Contacting Us!"
          );
        } else {
          const [navigation] = await Promise.all([
            page.waitForNavigation({ timeout: 3000 }).catch(() => null), // checks if blocked by validation
            page.getByRole("button", { name: "Inquire Now" }).click(),
          ]);

          if (navigation) {
            throw new Error(
              "Test case failed: Missing validation on form fields." // form submitted despite invalid fields
            );
          } else {
            console.log("Test case passed: Validation blocked the form."); // form did not submit because of the validation
          }
        }
      });
    }
  });
}
