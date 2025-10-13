import { test as base } from '@playwright/test';
import { Api } from '../services/index.js';

/**
 * Declare the custom Playwright fixture typings for JS with @ts-check.
 * @typedef {import('../services/index.js').Api} ApiType
 * @typedef {import('@playwright/test').TestType<{ api: ApiType }, {}>} TestWithApi
 */
/** @type {TestWithApi} */

export const test = base.extend({
    api: async ({ request }, use) => {
    let api = new Api(request);
    await use(api);
  },
});