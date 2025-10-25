import http from 'k6/http';

export class ApiClient {
    constructor(baseURL = 'https://restcountries.com/v3.1') {
        this.baseURL = baseURL;
    }

    getAllCountries() {
        const fields = 'name,cca3,region,status,independent,unMember';
        const response = http.get(`${this.baseURL}/all?fields=${fields}`);

        if (response.status !== 200) {
            console.log(`API call failed: ${response.status} - ${response.body}`);
            return [];
        }

        try {
            const countries = JSON.parse(response.body);
            console.log(`Retrieved ${countries.length} countries with essential fields`);
            return countries;
        } catch (e) {
            console.log(`Failed to parse JSON: ${e}`);
            return [];
        }
    }

    getCountryByCode(countryCode) {
        const response = http.get(`${this.baseURL}/alpha/${countryCode}`);

        if (response.status !== 200) {
            console.log(`API call failed for ${countryCode}: ${response.status}`);
            return null;
        }

        try {
            const countries = JSON.parse(response.body);
            return countries[0];
        } catch (e) {
            console.log(`Failed to parse JSON for ${countryCode}: ${e}`);
            return null;
        }
    }
}
