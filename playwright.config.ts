import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 90 * 1000,
  retries: 0,
  fullyParallel: true, // run tests in parallel across files (not within a file)
  reporter: [["html", { open: "never" }], ["./reporters/kwikposph-reporter.ts"]], // group tests by file in the report

  // global settings applied to every test
  use: {
    viewport: { width: 1280, height: 720 },
    trace: "off",
    screenshot: "off",
    video: "off",
    baseURL: "https://kwikpos.ph",
  },

  projects: [
    {
      name: "chrome",
      use: { browserName: "chromium" },
    },
    {
      name: "firefox",
      use: { browserName: "firefox" },
    },
    {
      name: "safari",
      use: { browserName: "webkit" },
    },
  ],
});
