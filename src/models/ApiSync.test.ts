import axios from 'axios';
import { jest, test, expect } from '@jest/globals';
import { ApiSync } from './ApiSync';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('Sync fetch data', () => {
  const rootURL = 'http://localhost:8000';
  const sync = new ApiSync(rootURL);
  sync.fetch(1);
  expect(mockedAxios.get).toHaveBeenCalledWith(`${rootURL}/1`);
});

test('Sync POST data on save if there is no ID on data', () => {
  const rootURL = 'http://localhost:8000';
  const sync = new ApiSync(rootURL);
  const data = { id: undefined, name: 'John', age: 17 };
  sync.save(data);
  expect(mockedAxios.post).toHaveBeenCalledWith(rootURL, data);
});

test('Sync PUT data on save if there is ID on data', () => {
  const rootURL = 'http://localhost:8000';
  const sync = new ApiSync(rootURL);
  const data = { id: 1, name: 'John', age: 17 };
  sync.save(data);
  expect(mockedAxios.put).toHaveBeenCalledWith(`${rootURL}/1`, data);
});
