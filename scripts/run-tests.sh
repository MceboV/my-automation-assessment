#!/bin/bash

# run-tests.sh - Master test execution script

set -e

echo "🚀 Starting Full Stack Automation Tests"
echo "========================================"

# Function to run frontend tests
run_frontend_tests() {
    echo "📱 Running Frontend Tests..."
    cd frontend
    npx cucumber-js tests/features/ \
        --require-module ts-node/register \
        --require "tests/step-definitions/**/*.ts" \
        --format progress \
        --format json:tests/reports/cucumber-report.json
}

# Function to run backend tests
run_backend_tests() {
    echo "🔧 Running Backend Tests..."
    cd backend
    k6 run tests/comprehensive.test.js --summary-export=results/k6-results.json
    k6 run tests/country-count.test.js --no-summary
    k6 run tests/language-validation.test.js --no-summary
}

# Function to generate reports
generate_reports() {
    echo "📊 Generating Test Reports..."

    # Frontend report
    if [ -f "frontend/tests/reports/cucumber-report.json" ]; then
        echo "✅ Frontend test report generated"
    fi

    # Backend report
    if [ -f "backend/results/k6-results.json" ]; then
        echo "✅ Backend test report generated"
    fi

    echo "📋 Test execution complete!"
}

# Main execution
main() {
    case $1 in
        "frontend")
            run_frontend_tests
            ;;
        "backend")
            run_backend_tests
            ;;
        "all"|"")
            run_frontend_tests
            run_backend_tests
            generate_reports
            ;;
        "docker")
            docker-compose up --build
            ;;
        *)
            echo "Usage: $0 {frontend|backend|all|docker}"
            exit 1
            ;;
    esac
}

main "$@"
