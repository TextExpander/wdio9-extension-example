Feature: Load a Chrome extension

  Scenario: I can open multiple pages in a Chrome extension
    When I open multiple "Hello Extensions" extension pages
    Then I have two page handles to switch between