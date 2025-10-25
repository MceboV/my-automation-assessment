import { check } from 'k6';
import http from 'k6/http';

export const options = {
  vus: 20,
  duration: '1m',
};

export default function() {
  const responses = http.batch([
    ['GET', 'https://restcountries.com/v3.1/all?fields=name,cca3'],
    ['GET', 'https://restcountries.com/v3.1/alpha/USA'],
    ['GET', 'https://restcountries.com/v3.1/alpha/ZAF'],
  ]);

  responses.forEach((response, index) => {
    check(response, {
      [`request ${index} status 200`]: (r) => r.status === 200,
    });
  });
}
