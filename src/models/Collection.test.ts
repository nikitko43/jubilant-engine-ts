import axios from 'axios';
import { jest, test, expect } from '@jest/globals';
import { Collection } from './Collection';
import { User, UserProps } from './User';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('collection can fetch list of users', (done) => {
  const collection = new Collection<User, UserProps>(
    'http://localhost:8000/users',
    (data: UserProps) => User.buildUser(data),
  );

  mockedAxios.get.mockResolvedValue({
    data: [{ id: 1, name: 'John', age: 28 }, { id: 2, name: 'Alex', age: 23 }],
  });

  collection.on('change', () => {
    expect(collection.models[0].get('id')).toBe(1);
    expect(collection.models[0].get('name')).toBe('John');
    expect(collection.models[0].get('age')).toBe(28);
    expect(collection.models[1].get('id')).toBe(2);
    expect(collection.models[1].get('name')).toBe('Alex');
    expect(collection.models[1].get('age')).toBe(23);
    done?.();
  });
  collection.fetch();
});
