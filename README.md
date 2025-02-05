[![Playwright Tests](https://github.com/ntua-unit-of-control-and-informatics/jaqpot-e2e-tests/actions/workflows/playwright.yml/badge.svg)](https://github.com/ntua-unit-of-control-and-informatics/jaqpot-e2e-tests/actions/workflows/playwright.yml)

# Jaqpot E2E Tests

This repository contains the end-to-end (E2E) tests for the Jaqpot platform. The tests are written in **Playwright** and interact with the live Jaqpot website to ensure that key workflows operate correctly.

## Features
- Automated browser testing with Playwright.
- Sends notifications with test results to the **Jaqpot-alerts** channel on Discord.

## Getting Started

### Install dependencies:
```bash
npm install
```

Run the tests:
```bash
npx playwright test
```

Run the tests in UI mode:
```bash
npx playwright test --ui
```
