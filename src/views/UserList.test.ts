/**
 * @jest-environment jsdom
 */

import {
  expect, test, jest, beforeEach, afterEach,
} from '@jest/globals';
import axios from 'axios';
import { UserList } from './UserList';
import { Collection } from '../models/Collection';
import { User, UserProps } from '../models/User';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  document.body.innerHTML = `
    <div id="container">
    </div>
  `;
});

afterEach(() => {
  document.body.innerHTML = '';
});

test('User List should render users from collection', (done) => {
  const container = document.getElementById('container');
  const collection = new Collection<User, UserProps>(
    'http://localhost:8000/users',
    (data: UserProps) => User.buildUser(data),
  );
  mockedAxios.get.mockResolvedValue({
    data: [{ id: 1, name: 'John', age: 28 }, { id: 2, name: 'Alex', age: 23 }, { id: 3, name: 'Max', age: 37 }],
  });

  collection.on('change', () => {
    const userList = new UserList(container, collection);
    userList.render();

    expect(container.innerHTML).toContain('John');
    expect(container.innerHTML).toContain('Alex');
    expect(container.innerHTML).toContain('Max');
    done?.();
  });

  collection.fetch();
});
