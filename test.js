import http from 'k6/http';
import {Counter} from 'k6/metrics';

let CounterErrors = new Counter("Errors");

export let options = {
  thresholds: {
    "Errors": ["count<100"]
  },
  scenarios: {
      constant_request_rate: {
          executor: 'constant-arrival-rate',
          rate: 100,
          timeUnit: '1s', //100 rps
          duration: '60s',
          preAllocatedVUs: 100,
          maxVUs: 10000,
      }
  }
};

export default function () {
  http.get('http://localhost:3001');
  let data = {image_name: 'test', color: 'test', url: 'test', category: 'test', picture_length: 1, alt: 'text'};
  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  http.post('http://localhost:3001', JSON.stringify(data), params);
};