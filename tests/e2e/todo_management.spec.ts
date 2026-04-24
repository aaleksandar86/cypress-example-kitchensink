import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage.js';

test.describe('Todo List Management', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    // Clear localStorage to ensure default items are loaded for each test
    await page.addInitScript(() => window.localStorage.clear());
    await todoPage.goto();
    // Validate background state (default items)
    await todoPage.expectTodoVisible('Pay electric bill');
    await todoPage.expectTodoVisible('Walk the dog');
  });

  test('Adding a new todo item', async () => {
    await todoPage.addTodo('Feed the cat');
    await todoPage.expectTodoVisible('Feed the cat');
    await todoPage.expectCount('3 items left');
  });

  test('Marking a todo as completed', async () => {
    await todoPage.toggleTodo('Pay electric bill');
    await todoPage.expectTodoCompleted('Pay electric bill');
    await todoPage.expectCount('1 item left');
    await expect(todoPage.clearCompletedButton).toBeVisible();
  });

  test('Editing an existing todo', async () => {
    const updatedText = 'Walk the dog in the park';
    await todoPage.editTodo('Walk the dog', updatedText);
    await todoPage.page.keyboard.press('Enter');
    await todoPage.expectTodoVisible(updatedText);
    await todoPage.expectTodoNotVisible('Walk the dog');
  });

  test('Deleting a todo item', async () => {
    await todoPage.deleteTodo('Pay electric bill');
    await todoPage.expectTodoNotVisible('Pay electric bill');
    await expect(todoPage.todoItems).toHaveCount(1);
  });

  test('Filtering items by status', async () => {
    await todoPage.toggleTodo('Pay electric bill');
    
    await todoPage.filterBy('Active');
    await todoPage.expectTodoVisible('Walk the dog');
    await todoPage.expectTodoNotVisible('Pay electric bill');

    await todoPage.filterBy('Completed');
    await todoPage.expectTodoVisible('Pay electric bill');
    await todoPage.expectTodoNotVisible('Walk the dog');

    await todoPage.filterBy('All');
    await todoPage.expectTodoVisible('Pay electric bill');
    await todoPage.expectTodoVisible('Walk the dog');
  });

  test('Clearing completed items', async () => {
    await todoPage.toggleTodo('Pay electric bill');
    await todoPage.clearCompleted();
    await todoPage.expectTodoNotVisible('Pay electric bill');
    await todoPage.expectTodoVisible('Walk the dog');
    await expect(todoPage.clearCompletedButton).toBeHidden();
  });

  test('Toggling all items at once', async () => {
    await todoPage.toggleAll();
    await todoPage.expectTodoCompleted('Pay electric bill');
    await todoPage.expectTodoCompleted('Walk the dog');
    await todoPage.expectCount('0 items left');

    await todoPage.toggleAll(); // Toggle back
    await expect(todoPage.todoItems.first()).not.toHaveClass(/completed/);
    await todoPage.expectCount('2 items left');
  });
});