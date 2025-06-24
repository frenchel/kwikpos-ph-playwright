# KwikPOS PH – Web Test Automation with Playwright
This project is a web test automation suite for KwikPOS PH (https://www.kwikpos.ph), built using Playwright. Short demo below:

![Automation Demo](https://github.com/frenchel/kwikpos-ph-playwright/blob/main/assets/kwikposph-playwright-demo-2.gif?raw=true) 

## Project Features

#### Automated Form Validation + Reusable Test Functions
- Validates form fields across pages
- Includes positive and negative testing
- Modular helpers in `utils/form-helper.ts`
- Enables DRY (Don't Repeat Yourself) coding across test cases

#### Chat Widget Automation
- Handles **Tawk.to** chat widget within nested iframes.
- Automates new conversation trigger, filling required fields, and submission validation

#### Custom Reporter
- Custom terminal reporter logs:
  - Success cases
  - Failures with detailed context (e.g., missing field validation)
- Located in `reporters/kwikposph-reporter.ts`

#### UI Navigation Tests
- Verifies correct routing for: Header links, Navbar dropdowns, Footer links, etc.

#### Others
- Custom `playwright.config.ts` file for tailored test runs and project structure
- Tests are organized by feature (navigation, form, chat, etc.)
- Used tools:  Playwright, TypeScript, Node.js / NPM, VS Code, GitHub

## Disclaimer
After interning at OneClickTech, where I performed manual QA testing for the KwikPOS PH website (developed by the company), I created this personal test automation project to further enhance my QA skills. While I worked on the website as a manual QA intern, this automation project was developed independently for learning and portfolio purposes. It is not officially affiliated with OneClickTech or KwikPOS PH.

## Author
Frenchel Karylle B. Laroza
- BS Information Technology Graduate - University of Santo Tomas - Manila
- LinkedIn: www.linkedin.com/in/frenchel-karylle-laroza-264307312
- GitHub: https://github.com/frenchel

##  Run Tests
```bash
# run all tests
npx playwright test

# open HTML report
npx playwright show-report

# run tests for specific concerns
npm run test:nav      # UI navigation tests only
npm run test:common   # Common form validations across product pages
npm run test:chat     # Chat widget iframe automation

