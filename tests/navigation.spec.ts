import { test, expect, Locator } from "@playwright/test";

test.describe("KwikPOS PH Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { timeout: 60000 });
  });

  test("Homepage Header", async ({ page }) => {
    // check if header items are visible and clickable
    const headerItems = [
      { selector: '.top-info .phone_support a[href="tel:+639171735945"]' }, // contact
      {
        selector: '.top-info .email_support a[href="mailto:sales@kwikpos.ph"]',
      }, // email
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

  test("Navigation Bar", async ({ page }) => {
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
      await page.goto("/", { timeout: 60000 });
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
      await page.goto("/", { timeout: 60000 });
    }
  });

  test("Homepage Footer", async ({ page }) => {
    const footerData: { locator: Locator }[] = [
      {
        locator: page.locator(
          'a[href="/"] > img[src*="footer-logo-white.png"]' // logo
        ),
      },
      {
        locator: page
          .locator("#shopify-section-footer")
          .getByRole("link", { name: "(+63) 917-173-" }), // contact
      },
      {
        locator: page
          .locator("#shopify-section-footer")
          .getByRole("link", { name: "sales@kwikpos.ph" }), // email
      },
      {
        locator: page.getByRole("link", {
          name: "F'7 Building, 3rd Flr., EDSA", // address
        }),
      },
    ];

    for (const item of footerData) {
      await expect(item.locator).toBeVisible();
      await expect(item.locator).toBeEnabled();
      await item.locator.click();
      await page.goto("/", { timeout: 60000 });
    }

    // for footer nav
    const footerNav: { locator: Locator; text: string; href: string }[] = [
      {
        locator: page.getByRole("link", { name: "Why KwikPOS™?", exact: true }),
        text: "Why KwikPOS™?",
        href: "/pages/why-kwikpos",
      },
      {
        locator: page.getByRole("link", { name: "KwikPOS™ Food", exact: true }),
        text: "KwikPOS™ Food",
        href: "/pages/kwikpos-food",
      },
      {
        locator: page.getByRole("link", {
          name: "KwikPOS™ Retail",
          exact: true,
        }),
        text: "KwikPOS™ Retail",
        href: "/pages/kwikpos-retail",
      },
      {
        locator: page.getByRole("link", {
          name: "POS Comparison",
          exact: true,
        }),
        text: "POS Comparison",
        href: "/pages/pos-comparison",
      },
      {
        locator: page.getByRole("link", { name: "Plans", exact: true }),
        text: "Plans",
        href: "/#pos-solutions-section",
      },
      {
        locator: page.getByRole("link", { name: "About Us", exact: true }),
        text: "About Us",
        href: "/pages/about-us",
      },
      {
        locator: page.getByRole("link", { name: "Contact Us", exact: true }),
        text: "Contact Us",
        href: "/pages/contact",
      },
      {
        locator: page.getByRole("link", { name: "Blog", exact: true }),
        text: "Blog",
        href: "/blogs/point-of-sale",
      },
      {
        locator: page.getByRole("link", { name: "Privacy Policy" }),
        text: "Privacy Policy",
        href: "/policies/privacy-policy",
      },
    ];

    for (const item of footerNav) {
      await expect(item.locator).toBeVisible();
      await expect(item.locator).toBeEnabled();
      await item.locator.click();
      // await expect(page).toHaveURL(new RegExp(`${item.href}$`)); // check if correct url
      await expect(page).toHaveURL(`https://www.kwikpos.ph${item.href}`);
      await page.goto("/", { timeout: 60000 });
    }
  });
});
