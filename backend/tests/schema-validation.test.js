import { check, group } from 'k6';
import { ApiClient } from '../utils/api-client.js';
import { SchemaValidator } from '../utils/schema-validator.js';

// Initialize utilities
const apiClient = new ApiClient('https://restcountries.com/v3.1');
const validator = new SchemaValidator();

export const options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  group('Schema Validation - Rest Countries API', function () {
    const countries = apiClient.getAllCountries();

    check(countries, {
      'API returned non-empty response': (res) => res && res.length > 0,
    });

    let totalCountries = countries.length;
    let validCount = 0;
    let invalidCount = 0;

    countries.forEach((country, index) => {
      const result = validator.validateCountry(country, index);

      if (!result.isValid) {
        invalidCount++;
        console.error(`${result.countryName} - Schema validation failed: ${result.errors.join(', ')}`);
      } else {
        validCount++;
      }
    });

    console.log(`Valid countries: ${validCount}/${totalCountries}`);
    console.log(`Invalid countries: ${invalidCount}/${totalCountries}`);

    check(null, {
      'All countries passed schema validation': () => invalidCount === 0,
    });
  });
}
