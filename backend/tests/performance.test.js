import { check, group } from 'k6';
import http from 'k6/http';

export const options = {
  stages: [
    { duration: '1m', target: 10 },  // Ramp up to 10 users
    { duration: '3m', target: 10 },  // Stay at 10 users
    { duration: '1m', target: 0 },   // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% of requests under 2s
    http_req_failed: ['rate<0.01'],    // Less than 1% failures
  },
};

export default function() {
  group('API Performance Test', function() {
    const response = http.get('https://restcountries.com/v3.1/all?fields=name,cca3,region,status');

    check(response, {
      'status is 200': (r) => r.status === 200,
      'response time OK': (r) => r.timings.duration < 2000,
    });
  });
}
