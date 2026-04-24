import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium, Browser } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage.js';

let browser: Browser;

BeforeAll(async function () {
  browser = await chromium.launch({ 
    headless: false,
  });
});

Before(async function () {
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
  this.todoPage = new TodoPage(this.page);
});

After(async function ({ result }) {
  await this.page.close();
  await this.context.close();
});

AfterAll(async function () {
  await browser.close();
});