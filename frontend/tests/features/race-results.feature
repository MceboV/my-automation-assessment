Feature: Formula 1 Race Results Validation
  As a BBC editor
  I want to accurately report the results of the 2023 Las Vegas Grand Prix
  So that my audience is informed about the key highlights of the race

  @defect @requirements_issue
  Scenario: Validate top 3 finishers of Las Vegas Grand Prix 2023 - REQUIREMENTS DEFECT IDENTIFIED
    Given I navigate to BBC Sport Formula 1 section
    When I search for "Las Vegas Grand Prix 2023 results"
    Then I should see race results showing the actual top 3 finishers
    And I should report the requirements defect: incorrect 2nd place driver
    And the actual results should be:

      | Position | Driver           | Team           |
      | 1        | Max Verstappen   | Red Bull       |
      | 2        | Charles Leclerc  | Ferrari        |
      | 3        | Sergio Perez     | Red Bull       |
