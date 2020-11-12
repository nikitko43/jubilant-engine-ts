import {User} from "./User";
import {expect} from "@jest/globals";
import axios from "axios";
import {Sync} from "./Sync";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('creating user', () => {
  const user = new User({name: 'John', age: 27});
  expect(user.get('name')).toBe('John');
  expect(user.get('age')).toBe(27);
});

test('update user', () => {
  const user = new User({name: 'John', age: 27});
  user.attributes.set({name: 'Alex', age: 28});

  expect(user.get('name')).toBe('Alex');
  expect(user.get('age')).toBe(28);
});

test('update user one field', () => {
  const user = new User({name: 'John', age: 27});
  user.attributes.set({name: 'Alex'});

  expect(user.get('name')).toBe('Alex');
});

test('uninitialized user', () => {
  const user = new User({});
  expect(user.get('name')).toBeUndefined();
});

test('add event to user', () => {
  const user = new User({});
  user.on('change', () => console.log('123'));

  expect(user.events.events['change']).toHaveLength(1);
});

test('trigger one event on user', () => {
  const user = new User({});
  const mockCallback = jest.fn();

  user.on('change', mockCallback);
  user.trigger('change');
  user.trigger('change');

  expect(mockCallback.mock.calls).toHaveLength(2);
});

test('trigger multiple events on user', () => {
  const user = new User({});
  const mockCallback1 = jest.fn();
  const mockCallback2 = jest.fn();

  user.on('change', mockCallback1);
  user.on('change', mockCallback2);
  user.trigger('change');

  expect(mockCallback1.mock.calls).toHaveLength(1);
  expect(mockCallback2.mock.calls).toHaveLength(1);
});

test('event of other type not triggers on user', () => {
  const user = new User({});
  const mockCallback = jest.fn();

  user.on('change', mockCallback);
  user.trigger('click');

  expect(mockCallback.mock.calls).toHaveLength(0);
});

test('event change fired on set call', () => {
  const user = new User({name: 'John', age: 27});
  const mockCallback = jest.fn();

  user.on('change', mockCallback);
  user.set({name: 'Alex', age: 29});
  user.set({name: 'Alex', age: 30});

  expect(mockCallback.mock.calls).toHaveLength(2);
});

test('user correct fetch', () => {
  const user = new User({id: 1});

  user.on('change', () => {
    expect(user.get('name')).toBe('John');
    expect(user.get('age')).toBe(28);
  })

  mockedAxios.get.mockResolvedValue({data: {id: 1, name: 'John', age: 28}});
  user.fetch();

  expect(mockedAxios.get).toHaveBeenCalledWith("http://localhost:3000/users/1");
});

test('user try to fetch without id', () => {
  const user = new User({});

  expect(() => user.fetch()).toThrowError();
});

test('new user correct save', (done) => {
  const data = {name: 'John', age: 28}
  const dataWithID = {id: 6, ...data};
  const user = new User(data);
  mockedAxios.post.mockResolvedValue({data: dataWithID});

  user.on('change', () => {
    try {
      expect(user.attributes.getAll()).toStrictEqual(dataWithID);
      done();
    } catch (error) {
      done(error);
    }
  })
  user.save();

  expect(mockedAxios.post).toHaveBeenCalledWith("http://localhost:3000/users", data);
});


test('user with id correct save ', (done) => {
  const data = {id: 6, name: 'John', age: 28};
  const user = new User(data);
  mockedAxios.put.mockResolvedValue({data});

  user.on('change', () => {
    try {
      expect(user.attributes.getAll()).toStrictEqual(data);
      done();
    } catch (error) {
      done(error);
    }
  })
  user.save();

  expect(mockedAxios.put).toHaveBeenCalledWith("http://localhost:3000/users/6", data);
});


test('user with id correct save ', (done) => {
  const data = {id: 6, name: 'John', age: 28};
  const user = new User(data);
  mockedAxios.put.mockRejectedValue({data: {detail: 'error'}});

  user.on('error', () => {
    done();
  })
  user.save();
});