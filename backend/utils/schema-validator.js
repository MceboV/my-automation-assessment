export class SchemaValidator {
    validateCountry(country, index) {
        const errors = [];
        const countryName = (country.name && country.name.common) ? country.name.common : `Country-${index}`;

        // Checking basic required fields
        if (!country.name) {
            errors.push('Missing name object');
        } else {
            if (!country.name.common) errors.push('Missing common name');
            if (!country.name.official) errors.push('Missing official name');
        }

        if (!country.cca3) errors.push('Missing cca3 code');
        if (!country.region) errors.push('Missing region');
        if (!country.status) errors.push('Missing status');

        // Validating region enum
        const validRegions = ['Antarctic', 'Americas', 'Europe', 'Africa', 'Asia', 'Oceania'];
        if (country.region && !validRegions.includes(country.region)) {
            errors.push(`Invalid region: ${country.region}`);
        }

        // Validating status enum
        const validStatuses = ['officially-assigned', 'user-assigned'];
        if (country.status && !validStatuses.includes(country.status)) {
            errors.push(`Invalid status: ${country.status}`);
        }

        return {
            countryName: countryName,
            isValid: errors.length === 0,
            errors: errors
        };
    }

    isValidCountryStructure(country) {
        return country &&
               country.name &&
               country.cca3 &&
               country.status;
    }
}
