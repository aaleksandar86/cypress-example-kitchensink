Feature: Todo List Management
  As a user, I want to manage my tasks in a todo list so that I can keep track of my work.

  Background:
    Given I open the Todo application
    And I see the all the items in the todo list

  Scenario: Adding a new todo item
    When I type "Feed the cat" into the new todo input and press enter
    Then I should see "Feed the cat" at the bottom of the list
    And the footer should show "3 items left"

  Scenario: Marking a todo as completed
    When I click the checkbox for "Pay electric bill"
    Then the item "Pay electric bill" should be visually marked as completed
    And the footer should show "1 item left"
    And the "Clear completed" button should be visible

  Scenario: Editing an existing todo
    When I double-click on the label "Walk the dog"
    And I change the text to "Walk the dog in the park" and press enter
    Then the list should display "Walk the dog in the park" instead of "Walk the dog"

  Scenario: Deleting a todo item
    When I click the destroy button for "Pay electric bill"
    Then "Pay electric bill" should be removed from the list
    And the list should have 1 item remaining

  Scenario: Filtering items by status
    Given I mark "Pay electric bill" as completed
    When I click on the "Active" filter link
    Then I should only see "Walk the dog" in the list
    When I click on the "Completed" filter link
    Then I should only see "Pay electric bill" in the list
    When I click on the "All" filter link
    Then I should see both "Pay electric bill" and "Walk the dog"

  Scenario: Clearing all completed items
    Given I mark "Pay electric bill" as completed
    When I click the "Clear completed" button
    Then "Pay electric bill" should be removed from the list
    And "Walk the dog" should still be in the list
    And the "Clear completed" button should be hidden

  Scenario: Toggling all items at once
    When I click the toggle-all checkbox
    Then all items in the list should be marked as completed
    And the footer should show "0 items left"
    When I click the toggle-all checkbox again
    Then all items in the list should be marked as active
    And the footer should show "2 items left"
