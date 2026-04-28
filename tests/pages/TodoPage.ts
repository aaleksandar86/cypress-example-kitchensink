import { expect, Locator, Page } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly newTodoInput: Locator;
  readonly todoItems: Locator;
  readonly todoCount: Locator;
  readonly clearCompletedButton: Locator;
  readonly toggleAllCheckbox: Locator;
  readonly filters: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodoInput = page.locator('[data-test="new-todo"]');
    this.todoItems = page.locator('.todo-list li');
    this.todoCount = page.locator('.todo-count');
    this.clearCompletedButton = page.locator('.clear-completed');
    this.toggleAllCheckbox = page.locator('.toggle-all');
    this.filters = page.locator('.filters');
  }

  async goto() {
    await this.page.goto('http://localhost:8080/todo');
  }

  async addTodo(text: string) {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  async toggleTodo(text: string) {
    const todo = this.todoItems.filter({ hasText: new RegExp(`^${text}$`) }).first();
    await todo.locator('.toggle').check();
  }

  async editTodo(oldText: string, newText: string) {
    const todoItem = this.todoItems.filter({ hasText: new RegExp(`^${oldText}$`) }).first();
    
    await todoItem.locator('label').dblclick();

    // Wait for the 'editing' class to be applied to the <li> container
    await expect(todoItem).toHaveClass(/editing/, { timeout: 10000 });
    
    const editInput = todoItem.locator('input.edit');
    await editInput.fill(newText);
    await editInput.press('Enter');
  }

  async startEditingTodo(text: string) {
    const todoItem = this.todoItems.filter({ hasText: new RegExp(`^${text}$`) }).first();
    await todoItem.locator('label').dblclick();
    await expect(todoItem).toHaveClass(/editing/);
  }

  async finishEditingTodo(newText: string) {
    const editInput = this.page.locator('li.editing .edit');
    await editInput.fill(newText);
    await editInput.press('Enter');
    await expect(editInput).toBeHidden();
  }

  async deleteTodo(text: string) {
    const todo = this.todoItems.filter({ hasText: new RegExp(`^${text}$`) }).first();
    await todo.hover();
    await todo.locator('.destroy').click({ force: true });
  }

  async filterBy(status: 'All' | 'Active' | 'Completed') {
    await this.filters.getByRole('link', { name: status, exact: true }).click();
  }

  async clearCompleted() {
    await this.clearCompletedButton.click();
  }

  async toggleAll() {
    await this.toggleAllCheckbox.click({ force: true });
  }

  async uncheckToggleAll() {
    await this.toggleAllCheckbox.uncheck({ force: true });
  }

  async clickButton(buttonText: string) {
    await this.page.locator('button', { hasText: buttonText }).click();
  }

  // Assertions Helper
  async expectTotalTodoCount(count: number) {
    await expect(this.todoItems).toHaveCount(count);
  }

  async expectCount(text: string) {
    await expect(this.todoCount).toHaveText(text);
  }

  async expectButtonVisible(buttonText: string) {
    const btn = this.page.locator('button', { hasText: buttonText });
    await expect(btn).toBeVisible();
  }

  async expectTodoVisible(text: string) {
    const todoItem = this.todoItems.filter({ hasText: new RegExp(`^${text}$`) }).first();
    await expect(todoItem).toBeVisible();
  }

  async expectTodoNotVisible(text: string) {
    await expect(this.page.getByText(text, { exact: true })).toBeHidden();
  }

  async expectTodoCompleted(text: string) {
    const todoItem = this.todoItems.filter({ hasText: new RegExp(`^${text}$`) }).first();
    await expect(todoItem).toHaveClass(/completed/);
  }

  async expectAllTodosCompleted() {
    const count = await this.todoItems.count();
    for (let i = 0; i < count; i++) {
      await expect(this.todoItems.nth(i)).toHaveClass(/completed/);
    }
  }
}