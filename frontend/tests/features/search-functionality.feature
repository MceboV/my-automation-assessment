Feature: Search Functionality Validation
  As an editor
  I want to ensure that search functionality returns relevant results
  So that users can access diverse and informative content

  Scenario: Validate BBC search functionality returns relevant results
    Given I am on the BBC website
    When I use the search functionality to search for "Sport"
    Then I should see at least 4 search results
    And the results should contain relevant sport content
