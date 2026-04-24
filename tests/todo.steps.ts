import { Given, When, Then } from '@cucumber/cucumber';

Given('I open the Todo application', async function () {
  await this.todoPage.goto();
});

Given('I see the all the items in the todo list', async function () {
  await this.todoPage.expectTotalTodoCount(2);
});

When('I type {string} into the new todo input and press enter', async function (itemText: string) {
  await this.todoPage.addTodo(itemText);
});

Then('I should see {string} at the bottom of the list', async function (itemText: string) {
  await this.todoPage.expectTodoVisible(itemText);
});

Then('the footer should show {string}', async function (itemsLeft: string) {
  await this.todoPage.expectCount(itemsLeft);
});

When('I click the checkbox for {string}', async function (itemText: string) {
  await this.todoPage.toggleTodo(itemText);
});

Then('the item {string} should be visually marked as completed', async function (itemText: string) {
  await this.todoPage.expectTodoCompleted(itemText);
});

Then('the {string} button should be visible', async function (buttonText: string) {
  await this.todoPage.expectButtonVisible(buttonText);
});

When('I double-click on the label {string}', async function (itemText: string) {
  await this.todoPage.startEditingTodo(itemText);
});

When('I change the text to {string} and press enter', async function (newText: string) {
  await this.todoPage.finishEditingTodo(newText);
});

Then('the list should display {string} instead of {string}', async function (newText: string, oldText: string) {
  await this.todoPage.expectTodoVisible(newText);
  await this.todoPage.expectTodoNotVisible(oldText);
});

When('I click the destroy button for {string}', async function (itemText: string) {
  await this.todoPage.deleteTodo(itemText);
});

Then('{string} should be removed from the list', async function (itemText: string) {
  await this.todoPage.expectTodoNotVisible(itemText);
});

Then('the list should have {int} item remaining', async function (count: number) {
  await this.todoPage.expectTotalTodoCount(count);
});

When('I click on the {string} filter link', async function (filterName: string) {
  await this.todoPage.filterBy(filterName as any);
});

Then('I should only see {string} in the list', async function (itemText: string) {
  await this.todoPage.expectTotalTodoCount(1);
  await this.todoPage.expectTodoVisible(itemText);
});

When('I click the toggle-all checkbox', async function () {
  await this.todoPage.toggleAll();
});

When('I click the toggle-all checkbox again', async function () {
  await this.todoPage.uncheckToggleAll();
});

Then('all items in the list should be marked as completed', async function () {
  await this.todoPage.expectAllTodosCompleted();
});

When('I click the {string} button', async function (buttonText: string) {
  await this.todoPage.clickButton(buttonText);
});