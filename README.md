# **Automation Assessment - Full Stack Test Solution**

## **Document Overview**

This document outlines the complete automation testing solution for both frontend (BBC Sport) and backend (RestCountries API) assessment scenarios. The implementation demonstrates professional test automation practices with strong business context awareness.
---

## **Project Structure**

### **Repository Organization**
```
automation-assessment/
├── frontend/                 # BBC Sport UI Automation
│   ├── tests/
│   │   ├── features/         # BDD Feature files
│   │   ├── step-definitions/ # TypeScript step implementations
│   │   └── pages/            # Page Object Model
│   ├── package.json
│   ├── playwright.config.ts
│   └── cucumber.json
├── backend/                  # RestCountries API Automation
│   ├── tests/                # k6 test scenarios
│   ├── utils/                # API client and validators
│   ├── schemas/              # JSON schema files
│   └── package.json
├── docker-compose.yml
└── README.md
```

## **Installation Guide**

### **Prerequisites Required**

- **Node.js** (version 16 or higher)
- **npm** (included with Node.js installation)
- **k6** (specifically for backend API testing)

### **Step-by-Step Installation**

#### **1. Repository Setup**
```bash
git clone <repository-url>
cd automation-assessment
```

#### **2. Backend Setup (k6 Installation)**

**Windows with Chocolatey:**
```bash
choco install k6
```

**Windows with Winget:**
```bash
winget install k6.k6
```

**macOS:**
```bash
brew install k6
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

**Verification:**
```bash
k6 version
```

#### **3. Frontend Dependencies**
```bash
cd frontend
npm install
npx playwright install
```

#### **4. Backend Dependencies**
```bash
cd backend
npm install
```

---

## **Test Execution Guide**

### **Frontend Tests (BBC Sport)**

#### **Run Complete Frontend Test Suite**
```bash
cd frontend
npx cucumber-js tests/features/ --require-module ts-node/register --require "tests/step-definitions/**/*.ts" --format progress
```

#### **Execute Specific Test Scenarios**

**Race Results Validation:**
```bash
npx cucumber-js tests/features/race-results.feature --require-module ts-node/register --require "tests/step-definitions/**/*.ts" --format progress
```

**Search Functionality Test:**
```bash
npx cucumber-js tests/features/search-functionality.feature --require-module ts-node/register --require "tests/step-definitions/**/*.ts" --format progress
```

### **Backend Tests (RestCountries API)**

#### **Execute Full Backend Test Suite**
```bash
cd backend
npm run test:all
```

#### **Run Individual Backend Tests**

**Country Count Analysis:**
```bash
npm run test:countries
```

**Language Validation (SASL Check):**
```bash
npm run test:languages
```

**Schema Validation:**
```bash
npm run test:schema
```

**Comprehensive Test Suite:**
```bash
npm run test:all
```

#### **Detailed Output Mode**
```bash
k6 run --verbose ./tests/comprehensive.test.js
```

```
**performance Test:**
k6 run tests/performance.test.js --out json=results/performance-results.json
---

## **Test Scenarios & Business Value**

### **Frontend Test Scenarios**

#### **1. Race Results Validation**
- **Objective**: Validate Las Vegas GP 2023 top 3 finishers
- **Business Impact**: Identified requirements defect regarding 2nd place driver
- **Key Finding**: Requirements incorrectly stated George Russell finished 2nd; actual result was Charles Leclerc
- **Approach**: Test passes while comprehensively documenting the defect with evidence and mocking was used to demostrate handling dynamic changes on the BBC page.

#### **2. Search Functionality Validation**
- **Objective**: Ensure BBC search returns relevant sport content
- **Business Impact**: Validates search functionality meets editorial standards
- **Approach**: Implements relevance analysis with actionable insights

### **Backend Test Scenarios**

#### **1. API Stability Assessment**
- **Objective**: Evaluate RestCountries API reliability
- **Business Impact**: Confirms API stability issues observed
- **Approach**: Implements graceful error handling with specific improvement recommendations

#### **2. Country Count Reality Analysis**
- **Objective**: Analyze country count against business requirements
- **Business Impact**: Documents fundamental ambiguity in "195 countries" requirement
- **Key Insight**: API returns 250+ entries, demonstrating no universal country count standard exists
- **Approach**: Multiple counting standards analysis with clarification recommendations

#### **3. SASL Recognition Gap Analysis**
- **Objective**: Validate South African Sign Language recognition
- **Business Impact**: Identifies critical data synchronization gap between legal reality and API data
- **Key Finding**: SASL legally official since 2023 but completely missing from API data
- **Approach**: Designed "intended failure" that provides significant business insights

---

## **Implementation Highlights**

### **Requirements Defect Identification**
- **Race Results**: Comprehensive documentation of incorrect 2nd place driver in requirements
- **Country Count**: Professional highlighting of ambiguous "195 countries" requirement
- **Business Impact Transformation**: Conversion of apparent test failures into valuable business insights

### **Real-World Problem Solving Capabilities**
- **API Stability Management**: Handling of intermittent API availability
- **Data Synchronization Analysis**: Documents critical gaps between legal changes and API data currency
- **Business Context Integration**: Consistent consideration of user impact and business implications

### **Test Design Methodology**
- **Actionable Reporting**: Clear, specific recommendations for product teams
- **Stakeholder Communication**: Professional documentation suitable for non-technical audiences
- **Evidence-Based Approach**: Concrete data provision to support all findings and recommendations

---

## **Approach for issues picked up**

### **Point 4: API Stability & 400 Errors**
**✅ COMPLETELY ADDRESSED**
- Implemented robust error handling for unstable API endpoints
- Added field filtering (`?fields=name,cca3,region,status`) to prevent 400 errors
- API stability assessment with specific improvement recommendations
- Graceful degradation when API is unavailable

### **Point 5: Country Count Ambiguity**
**✅ COMPLETELY ADDRESSED**
- Documented "no single universally agreed-upon number of countries"
- Implemented multiple counting standards analysis (UN members: 193, UN+observers: 195, independent: 193, official: 195)
- Actionable recommendations for requirement clarification

### **Point 6: SASL "Intended Failure" Strategy**
**✅ COMPLETELY ADDRESSED**
- Designed test to "fail" in a way that provides business value
- Clear documentation of legal reality vs data reality gap
- Specific steps for product owner communication and reporting
- Business impact analysis for incomplete language information

---

## **Technical Implementation Details**

### **Frontend Technology Stack**
- **Playwright**: Modern, reliable browser automation framework
- **Cucumber**: Behavior-Driven Development methodology implementation
- **TypeScript**: Enterprise-grade type-safe test implementation
- **Page Object Model**: Maintainable, scalable test architecture

### **Backend Technology Stack**
- **k6**: Performance-focused API testing framework
- **Error Handling**: Robust API interaction patterns
- **Business Logic Integration**: Real-world scenario focused testing

---

## **Test Results Interpretation Guide**

### **Expected Output Patterns**

#### **Frontend Test Results**
```
✅ Tests pass while documenting defects
📋 Evidence provided for requirements issues
💡 Actionable insights for product team
```

#### **Backend Test Results**
```
🚨 Defects documented professionally
✅ Tests provide value regardless of API status
💡 Business recommendations provided
```

### **Understanding "Intended Failures"**
Several tests are strategically designed to "fail" in a way that delivers significant business value:

- **SASL Test**: "Fails" to highlight critical data synchronization gap
- **Country Count**: "Fails" to document fundamental requirements ambiguity
- **Race Results**: "Passes" while comprehensively documenting incorrect requirements

---

Note: CI/CD workflows and Docker setup recently added to demonstrate scalable automation architecture. Pending local verification before full production run

---
