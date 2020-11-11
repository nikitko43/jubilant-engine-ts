import axios from 'axios';
import {expect} from "@jest/globals";
import {Sync} from "./Sync";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;


test('Sync fetch data', () => {
  const sync = new Sync("http://localhost:8000");
  sync.fetch(1);
  expect(mockedAxios.get).toHaveBeenCalledWith("http://localhost:8000/1");
});

test('Sync POST data on save if there is no ID on data', () => {
  const sync = new Sync("http://localhost:8000");
  const data = {id: undefined, name: 'John', age: 17}
  sync.save(data);
  expect(mockedAxios.post).toHaveBeenCalledWith("http://localhost:8000", data);
})


test('Sync PUT data on save if there is ID on data', () => {
  const sync = new Sync("http://localhost:8000");
  const data = {id: 1, name: 'John', age: 17}
  sync.save(data);
  expect(mockedAxios.put).toHaveBeenCalledWith("http://localhost:8000/1", data);
})

