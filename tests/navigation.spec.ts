import { test, expect } from "@playwright/test";

test.describe("KwikPOS PH Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Homepage Header", async ({ page }) => {
    // check if header items are visible and clickable
    const headerItems = [
      { selector: '.top-info .phone_support a[href="tel:+639171735945"]' }, // contact
      { selector: '.top-info .email_support a[href="mailto:sales@kwikpos.ph"]' }, // email
      { selector: ".grid__item.large--show .site-header__logo-image img" }, // logo
      { selector: '.demo-btn a[href="/pages/request-a-quote-topnav"]' }, // request a quote 
      { selector: '.demo-btn a[href="/pages/get-a-demo-topnav"]' }, // get a demo
    ];

    for (const item of headerItems) {
      const locator = page.locator(item.selector);
      await expect(locator).toBeVisible();
      await locator.click();
    }

    // check if contact is visible and clickable
    // const headerContact = page.locator(
    //   '.top-info .phone_support a[href="tel:+639171735945"]'
    // );
    // await expect(headerContact).toBeVisible();
    // await headerContact.click();
  });

  test.only("Navigation Bar", async ({ page }) => {
    // check if navbar is visible
    const navbar = await page.locator('//ul[@id="AccessibleNav"]');
    await expect(navbar).toBeVisible();

    // check if all nav items are complete
    const navData = [
      { href: "/pages/why-kwikpos", text: "WHY KWIKPOS™?" },
      { href: "/pages/kwikpos-food", text: "KWIKPOS™ Food" },
      { href: "/pages/kwikpos-retail", text: "KWIKPOS™ Retail" },
      { href: "/pages/pos-comparison", text: "POS COMPARISON" },
      //{ href: "/pages/plans", text: "PLANS" },
      { href: "/pages/about-us", text: "ABOUT US" },
      { href: "/pages/contact", text: "CONTACT US" },
      { href: "/blogs/point-of-sale", text: "BLOG" },
    ];

    for (const item of navData) {
      const navLocator = page.locator(
        `//a[@href="${item.href}" and normalize-space(span)="${item.text}"]`
      );
      await expect(navLocator).toBeVisible();
      await navLocator.click();

      await expect(page).toHaveURL(new RegExp(`${item.href}$`)); // check if correct url
      await page.goto("/");
    }

    // for handling plans dropdown
    const plansNav = page.locator(
      '//a[@href="#" and span[normalize-space(.)="PLANS"]]'
    );
    await plansNav.hover();
    await page.waitForSelector(".site-nav__dropdown", { state: "visible" }); // wait for the dropdown to appear

    // check items under plans
    const plansItems = [
      { href: "/pages/kwikpos-food", text: "KwikPOS Food" },
      { href: "/pages/kwikpos-retail", text: "KwikPOS Retail" },
    ];

    for (const item of plansItems) {
      await plansNav.hover(); // hover first to show the dropdown before clicking
      await page.waitForSelector(".site-nav__dropdown", { state: "visible" });

      const plansLocator = page.locator(
        `//ul[contains(@class, "site-nav__dropdown")]//a[@href="${item.href}" and normalize-space(.)="${item.text}"]`
      );

      await expect(plansLocator).toBeVisible();
      await plansLocator.click();

      await expect(page).toHaveURL(new RegExp(`${item.href}$`)); // check if correct url
      await page.goto("/");
    }
  });

  test("Homepage Footer", async ({ page }) => {

  });

  // product (each product should be on different page),
  // footer (privacy policy, socmed icons)
});
